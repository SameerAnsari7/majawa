import 'dotenv/config';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import express, { type NextFunction, type Request, type Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { generateReferenceId, readStore, writeStore } from './server/store.ts';
import type {
  AnnouncementItem,
  ContactEnquiryRecord,
  EventRegistrationRecord,
  GrievanceEnquiryRecord,
  JuniorApplicationRecord,
  ProposedEventItem,
  SeniorSupporterRecord,
} from './src/types.ts';

const PORT = Number(process.env.PORT) || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');
const TOKEN_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

// Simple in-memory per-IP rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string, bucket: string, maxRequests: number, windowMs: number): boolean {
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= maxRequests) {
    return false;
  }
  entry.count += 1;
  return true;
}

function cleanStr(val: unknown, maxLen = 500): string {
  if (typeof val !== 'string') return '';
  return val.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, maxLen);
}

function cleanStrArray(val: unknown, maxItems = 20, maxItemLen = 120): string[] {
  if (!Array.isArray(val)) return [];
  const out: string[] = [];
  for (const item of val.slice(0, maxItems)) {
    const cleaned = cleanStr(item, maxItemLen);
    if (cleaned) out.push(cleaned);
  }
  return out;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 13;
}

function containsSensitiveIdPattern(text: string): boolean {
  // Block accidental submission of Aadhaar-like 12-digit numbers or explicit password sharing
  const aadhaarPattern = /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/;
  return aadhaarPattern.test(text);
}

function hashPassword(password: string): { salt: string; hash: string } {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return { salt, hash };
}

function verifyScryptPassword(password: string, salt: string, expectedHash: string): boolean {
  const derived = crypto.scryptSync(password, salt, 64);
  const expectedBuf = Buffer.from(expectedHash, 'hex');
  if (derived.length !== expectedBuf.length) return false;
  return crypto.timingSafeEqual(derived, expectedBuf);
}

function verifyEnvPasscode(candidate: string, configured: string): boolean {
  const a = crypto.createHash('sha256').update(candidate).digest();
  const b = crypto.createHash('sha256').update(configured).digest();
  return crypto.timingSafeEqual(a, b);
}

function signAdminToken(): string {
  const payload = Buffer.from(
    JSON.stringify({
      role: 'admin',
      exp: Date.now() + TOKEN_TTL_MS,
      nonce: crypto.randomBytes(8).toString('hex'),
    })
  ).toString('base64url');
  const sig = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

function verifyAdminToken(token: string): boolean {
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;
  if (!payload || !sig) return false;
  const expectedSig = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return false;
  }
  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {
      role?: string;
      exp?: number;
    };
    return parsed.role === 'admin' && typeof parsed.exp === 'number' && parsed.exp > Date.now();
  } catch {
    return false;
  }
}

function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Administrator authentication required.' });
    return;
  }
  const token = auth.slice('Bearer '.length).trim();
  if (!verifyAdminToken(token)) {
    res.status(401).json({ error: 'Invalid or expired administrator session.' });
    return;
  }
  next();
}

async function startServer() {
  const app = express();
  app.set('trust proxy', 1);
  app.use(express.json({ limit: '256kb' }));

  // Basic security headers (iFrame-compatible for AI Studio preview)
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  // Public summary (safe aggregate counts + published announcements + proposed events)
  app.get('/api/public/summary', (_req, res) => {
    const store = readStore();
    const foundingInterestCount = store.juniorApplications.filter((a) =>
      a.howToHelp.some((h) => h.toLowerCase().includes('founding'))
    ).length;
    res.json({
      foundingInterestCount,
      juniorApplicationsCount: store.juniorApplications.length,
      seniorSupportersCount: store.seniorSupporters.length,
      foundingTarget: 11,
      announcements: store.announcements.filter((a) => a.published),
      events: store.events,
    });
  });

  // Submit Form 1: Junior Advocate Pre-Registration / Membership Enquiry
  app.post('/api/membership/junior', (req, res) => {
    const ip = req.ip || 'unknown';
    if (!checkRateLimit(ip, 'public_form', 25, 15 * 60 * 1000)) {
      res.status(429).json({ error: 'Too many submissions. Please wait a few minutes and try again.' });
      return;
    }

    const body = req.body as Record<string, unknown>;
    if (cleanStr(body.websiteUrl, 100)) {
      res.status(400).json({ error: 'Invalid submission.' });
      return;
    }

    const fullName = cleanStr(body.fullName, 140);
    const enrolmentNumber = cleanStr(body.enrolmentNumber, 80);
    const stateBarCouncil = cleanStr(body.stateBarCouncil, 140);
    const dateOfEnrolment = cleanStr(body.dateOfEnrolment, 40);
    const yearsOfPractice = cleanStr(body.yearsOfPractice, 40);
    const district = cleanStr(body.district, 80);
    const taluka = cleanStr(body.taluka, 80);
    const mobile = cleanStr(body.mobile, 25);
    const email = cleanStr(body.email, 140);
    const consentAccepted = body.consentAccepted === true;

    if (!fullName || !enrolmentNumber || !stateBarCouncil || !dateOfEnrolment || !yearsOfPractice || !district || !taluka) {
      res.status(400).json({ error: 'Please complete all required advocate and practice fields.' });
      return;
    }
    if (!isValidPhone(mobile)) {
      res.status(400).json({ error: 'Please enter a valid 10-digit mobile / WhatsApp number.' });
      return;
    }
    if (!isValidEmail(email)) {
      res.status(400).json({ error: 'Please enter a valid email address.' });
      return;
    }
    if (!consentAccepted) {
      res.status(400).json({ error: 'Please confirm the accuracy and proposed rules consent declaration.' });
      return;
    }

    const experiencesOptional = cleanStr(body.experiencesOptional, 1000);
    if (containsSensitiveIdPattern(experiencesOptional)) {
      res.status(400).json({ error: 'Please do not include Aadhaar or 12-digit ID numbers in free-text fields.' });
      return;
    }

    const prefLang = cleanStr(body.preferredLanguage, 10);
    const preferredLanguage: 'en' | 'mr' | 'both' =
      prefLang === 'mr' || prefLang === 'both' ? prefLang : 'en';

    const cat = cleanStr(body.membershipCategory, 20);
    const membershipCategory: 'junior' | 'associate' | 'institutional' =
      cat === 'associate' || cat === 'institutional' ? cat : 'junior';

    const practisingMode = body.practisingMode === 'independent' ? 'independent' : 'chamber';

    const record: JuniorApplicationRecord = {
      id: crypto.randomUUID(),
      referenceId: generateReferenceId('MAJ-JR'),
      fullName,
      dateOfBirth: cleanStr(body.dateOfBirth, 30) || undefined,
      enrolmentNumber,
      stateBarCouncil,
      dateOfEnrolment,
      yearsOfPractice,
      district,
      taluka,
      courtsOfPractice: cleanStrArray(body.courtsOfPractice, 10, 60),
      otherCourt: cleanStr(body.otherCourt, 100) || undefined,
      areasOfPractice: cleanStr(body.areasOfPractice, 200) || undefined,
      practisingMode,
      yearsInCurrentChamber: cleanStr(body.yearsInCurrentChamber, 40) || undefined,
      monthlyIncomeRange: cleanStr(body.monthlyIncomeRange, 60) || undefined,
      mobile,
      email,
      chamberAddress: cleanStr(body.chamberAddress, 300) || undefined,
      preferredLanguage,
      membershipCategory,
      issuesMattersMost: cleanStrArray(body.issuesMattersMost, 15, 100),
      otherIssue: cleanStr(body.otherIssue, 150) || undefined,
      howToHelp: cleanStrArray(body.howToHelp, 10, 100),
      experiencesOptional: experiencesOptional || undefined,
      consentAccepted: true,
      status: 'pending_verification',
      createdAt: new Date().toISOString(),
    };

    const store = readStore();
    store.juniorApplications.unshift(record);
    writeStore(store);

    res.status(201).json({
      referenceId: record.referenceId,
      createdAt: record.createdAt,
      message:
        'Thank you for your interest in MAJAWA. Your membership application/enquiry has been received. Membership will be subject to verification and approval under the applicable rules.',
    });
  });

  // Submit Form 2: Senior Advocate Supporter / Mentor Pre-Registration
  app.post('/api/membership/senior', (req, res) => {
    const ip = req.ip || 'unknown';
    if (!checkRateLimit(ip, 'public_form', 25, 15 * 60 * 1000)) {
      res.status(429).json({ error: 'Too many submissions. Please wait a few minutes and try again.' });
      return;
    }

    const body = req.body as Record<string, unknown>;
    if (cleanStr(body.websiteUrl, 100)) {
      res.status(400).json({ error: 'Invalid submission.' });
      return;
    }

    const fullName = cleanStr(body.fullName, 140);
    const mobile = cleanStr(body.mobile, 25);
    const email = cleanStr(body.email, 140);
    const officeAddress = cleanStr(body.officeAddress, 300);
    const stateBarCouncilAndEnrolment = cleanStr(body.stateBarCouncilAndEnrolment, 160);
    const yearOfEnrolment = cleanStr(body.yearOfEnrolment, 20);
    const consentAccepted = body.consentAccepted === true;

    if (!fullName || !officeAddress || !stateBarCouncilAndEnrolment || !yearOfEnrolment) {
      res.status(400).json({ error: 'Please complete all required supporter and chamber fields.' });
      return;
    }
    if (!isValidPhone(mobile)) {
      res.status(400).json({ error: 'Please enter a valid 10-digit mobile / WhatsApp number.' });
      return;
    }
    if (!isValidEmail(email)) {
      res.status(400).json({ error: 'Please enter a valid email address.' });
      return;
    }
    if (!consentAccepted) {
      res.status(400).json({ error: 'Please accept the declaration confirming your details.' });
      return;
    }

    const record: SeniorSupporterRecord = {
      id: crypto.randomUUID(),
      referenceId: generateReferenceId('MAJ-SR'),
      fullName,
      mobile,
      email,
      officeAddress,
      stateBarCouncilAndEnrolment,
      yearOfEnrolment,
      courtsOfPractice: cleanStrArray(body.courtsOfPractice, 10, 60),
      otherCourt: cleanStr(body.otherCourt, 100) || undefined,
      areasOfPractice: cleanStr(body.areasOfPractice, 200),
      juniorsCount: cleanStr(body.juniorsCount, 30),
      supportRoles: cleanStrArray(body.supportRoles, 10, 100),
      ethicalPledges: cleanStrArray(body.ethicalPledges, 10, 200),
      consentAccepted: true,
      status: 'pending_verification',
      createdAt: new Date().toISOString(),
    };

    const store = readStore();
    store.seniorSupporters.unshift(record);
    writeStore(store);

    res.status(201).json({
      referenceId: record.referenceId,
      createdAt: record.createdAt,
      message:
        'Thank you for pledging your support as a Senior Advocate Supporter / Mentor. Your pre-registration has been recorded for review by the founding committee.',
    });
  });

  // Submit Confidential Preliminary Grievance Enquiry
  app.post('/api/grievance', (req, res) => {
    const ip = req.ip || 'unknown';
    if (!checkRateLimit(ip, 'public_form', 20, 15 * 60 * 1000)) {
      res.status(429).json({ error: 'Too many submissions. Please wait a few minutes and try again.' });
      return;
    }

    const body = req.body as Record<string, unknown>;
    if (cleanStr(body.websiteUrl, 100)) {
      res.status(400).json({ error: 'Invalid submission.' });
      return;
    }

    const nameOptional = cleanStr(body.nameOptional, 140);
    const contactDetails = cleanStr(body.contactDetails, 160);
    const district = cleanStr(body.district, 80);
    const natureOfConcern = cleanStr(body.natureOfConcern, 160);
    const briefDescription = cleanStr(body.briefDescription, 2500);
    const pref = cleanStr(body.preferredContactMethod, 20);
    const disclaimerAccepted = body.disclaimerAccepted === true;

    if (!contactDetails || !district || !natureOfConcern || !briefDescription) {
      res.status(400).json({ error: 'Please complete all required grievance enquiry fields.' });
      return;
    }
    if (briefDescription.length < 20) {
      res.status(400).json({ error: 'Please provide at least 20 characters describing the concern.' });
      return;
    }
    if (containsSensitiveIdPattern(briefDescription) || containsSensitiveIdPattern(contactDetails)) {
      res.status(400).json({
        error: 'For your privacy and security, please do not enter Aadhaar numbers, passwords, or 12-digit ID numbers.',
      });
      return;
    }
    if (!disclaimerAccepted) {
      res.status(400).json({ error: 'Please acknowledge the statutory scope disclaimer before submitting.' });
      return;
    }

    const preferredContactMethod: GrievanceEnquiryRecord['preferredContactMethod'] =
      pref === 'whatsapp' || pref === 'email' || pref === 'in_person' ? pref : 'phone';

    const record: GrievanceEnquiryRecord = {
      id: crypto.randomUUID(),
      referenceId: generateReferenceId('MAJ-GRV'),
      nameOptional: nameOptional || undefined,
      contactDetails,
      district,
      natureOfConcern,
      briefDescription,
      preferredContactMethod,
      status: 'submitted',
      createdAt: new Date().toISOString(),
    };

    const store = readStore();
    store.grievances.unshift(record);
    writeStore(store);

    res.status(201).json({
      referenceId: record.referenceId,
      createdAt: record.createdAt,
    });
  });

  // Submit Event Registration Enquiry
  app.post('/api/events/register', (req, res) => {
    const ip = req.ip || 'unknown';
    if (!checkRateLimit(ip, 'public_form', 25, 15 * 60 * 1000)) {
      res.status(429).json({ error: 'Too many submissions. Please wait a few minutes.' });
      return;
    }

    const body = req.body as Record<string, unknown>;
    if (cleanStr(body.websiteUrl, 100)) {
      res.status(400).json({ error: 'Invalid submission.' });
      return;
    }

    const eventId = cleanStr(body.eventId, 80);
    const eventTitle = cleanStr(body.eventTitle, 200);
    const fullName = cleanStr(body.fullName, 140);
    const enrolmentNumber = cleanStr(body.enrolmentNumber, 80);
    const mobile = cleanStr(body.mobile, 25);
    const email = cleanStr(body.email, 140);
    const courtDistrict = cleanStr(body.courtDistrict, 100);
    const notes = cleanStr(body.notes, 600);

    if (!eventId || !eventTitle || !fullName || !courtDistrict) {
      res.status(400).json({ error: 'Please complete all required registration fields.' });
      return;
    }
    if (!isValidPhone(mobile) || !isValidEmail(email)) {
      res.status(400).json({ error: 'Please provide a valid mobile number and email address.' });
      return;
    }

    const record: EventRegistrationRecord = {
      id: crypto.randomUUID(),
      referenceId: generateReferenceId('MAJ-EVT'),
      eventId,
      eventTitle,
      fullName,
      enrolmentNumber: enrolmentNumber || undefined,
      mobile,
      email,
      courtDistrict,
      notes: notes || undefined,
      createdAt: new Date().toISOString(),
    };

    const store = readStore();
    store.eventRegistrations.unshift(record);
    writeStore(store);

    res.status(201).json({
      referenceId: record.referenceId,
      createdAt: record.createdAt,
    });
  });

  // Submit General Contact Enquiry
  app.post('/api/contact', (req, res) => {
    const ip = req.ip || 'unknown';
    if (!checkRateLimit(ip, 'public_form', 25, 15 * 60 * 1000)) {
      res.status(429).json({ error: 'Too many submissions. Please wait a few minutes.' });
      return;
    }

    const body = req.body as Record<string, unknown>;
    if (cleanStr(body.websiteUrl, 100)) {
      res.status(400).json({ error: 'Invalid submission.' });
      return;
    }

    const fullName = cleanStr(body.fullName, 140);
    const email = cleanStr(body.email, 140);
    const mobile = cleanStr(body.mobile, 25);
    const subject = cleanStr(body.subject, 160);
    const message = cleanStr(body.message, 2000);

    if (!fullName || !subject || !message) {
      res.status(400).json({ error: 'Please enter your name, subject, and message.' });
      return;
    }
    if (!isValidEmail(email)) {
      res.status(400).json({ error: 'Please enter a valid email address.' });
      return;
    }
    if (mobile && !isValidPhone(mobile)) {
      res.status(400).json({ error: 'Please enter a valid 10-digit mobile number or leave it blank.' });
      return;
    }

    const record: ContactEnquiryRecord = {
      id: crypto.randomUUID(),
      referenceId: generateReferenceId('MAJ-CON'),
      fullName,
      email,
      mobile: mobile || undefined,
      subject,
      message,
      createdAt: new Date().toISOString(),
    };

    const store = readStore();
    store.contactEnquiries.unshift(record);
    writeStore(store);

    res.status(201).json({
      referenceId: record.referenceId,
      createdAt: record.createdAt,
    });
  });

  // ==================== ADMIN AUTH & MANAGEMENT ====================

  app.get('/api/admin/status', (_req, res) => {
    const envConfigured = Boolean(process.env.ADMIN_PASSCODE && process.env.ADMIN_PASSCODE.trim().length > 0);
    const store = readStore();
    const isClaimed = Boolean(store.adminCredential);
    res.json({
      envConfigured,
      isClaimed,
      needsSetup: !envConfigured && !isClaimed,
    });
  });

  app.post('/api/admin/setup', (req, res) => {
    const envPass = process.env.ADMIN_PASSCODE?.trim();
    const store = readStore();
    if (envPass || store.adminCredential) {
      res.status(409).json({ error: 'Administrator credentials are already configured.' });
      return;
    }
    const body = req.body as Record<string, unknown>;
    const password = typeof body.password === 'string' ? body.password : '';
    if (password.length < 8 || password.length > 128) {
      res.status(400).json({ error: 'Choose an administrator password between 8 and 128 characters.' });
      return;
    }
    const { salt, hash } = hashPassword(password);
    store.adminCredential = {
      salt,
      hash,
      createdAt: new Date().toISOString(),
    };
    writeStore(store);

    const token = signAdminToken();
    res.status(201).json({ token });
  });

  app.post('/api/admin/login', (req, res) => {
    const ip = req.ip || 'unknown';
    if (!checkRateLimit(ip, 'admin_login', 12, 15 * 60 * 1000)) {
      res.status(429).json({ error: 'Too many sign-in attempts. Please wait 15 minutes.' });
      return;
    }
    const body = req.body as Record<string, unknown>;
    const password = typeof body.password === 'string' ? body.password : '';
    if (!password) {
      res.status(400).json({ error: 'Administrator password is required.' });
      return;
    }

    const envPass = process.env.ADMIN_PASSCODE?.trim();
    const store = readStore();

    let authorized = false;
    if (envPass) {
      authorized = verifyEnvPasscode(password, envPass);
    } else if (store.adminCredential) {
      authorized = verifyScryptPassword(password, store.adminCredential.salt, store.adminCredential.hash);
    } else {
      res.status(409).json({ error: 'Administrator account has not been set up yet.' });
      return;
    }

    if (!authorized) {
      res.status(401).json({ error: 'Invalid administrator password.' });
      return;
    }

    res.json({ token: signAdminToken() });
  });

  app.get('/api/admin/dashboard', requireAdmin, (_req, res) => {
    const store = readStore();
    res.json({
      juniorApplications: store.juniorApplications,
      seniorSupporters: store.seniorSupporters,
      grievances: store.grievances,
      contactEnquiries: store.contactEnquiries,
      eventRegistrations: store.eventRegistrations,
      announcements: store.announcements,
      events: store.events,
    });
  });

  app.patch('/api/admin/grievances/:id', requireAdmin, (req, res) => {
    const id = cleanStr(req.params.id, 80);
    const body = req.body as Record<string, unknown>;
    const status = cleanStr(body.status, 40);
    const adminNotes = cleanStr(body.adminNotes, 1000);
    const validStatuses = ['submitted', 'acknowledged', 'scrutinising', 'mediation_or_referral', 'closed'];
    if (!validStatuses.includes(status)) {
      res.status(400).json({ error: 'Invalid status value.' });
      return;
    }
    const store = readStore();
    const item = store.grievances.find((g) => g.id === id);
    if (!item) {
      res.status(404).json({ error: 'Grievance record not found.' });
      return;
    }
    item.status = status as GrievanceEnquiryRecord['status'];
    if (body.adminNotes !== undefined) {
      item.adminNotes = adminNotes || undefined;
    }
    writeStore(store);
    res.json({ ok: true, item });
  });

  app.patch('/api/admin/membership/junior/:id', requireAdmin, (req, res) => {
    const id = cleanStr(req.params.id, 80);
    const body = req.body as Record<string, unknown>;
    const status = cleanStr(body.status, 40);
    const validStatuses = ['pending_verification', 'founding_cohort', 'shortlisted', 'archived'];
    if (!validStatuses.includes(status)) {
      res.status(400).json({ error: 'Invalid status value.' });
      return;
    }
    const store = readStore();
    const item = store.juniorApplications.find((j) => j.id === id);
    if (!item) {
      res.status(404).json({ error: 'Application not found.' });
      return;
    }
    item.status = status as JuniorApplicationRecord['status'];
    writeStore(store);
    res.json({ ok: true, item });
  });

  app.post('/api/admin/announcements', requireAdmin, (req, res) => {
    const body = req.body as Record<string, unknown>;
    const category = cleanStr(body.category, 40) as AnnouncementItem['category'];
    const titleEn = cleanStr(body.titleEn, 220);
    const titleMr = cleanStr(body.titleMr, 260);
    const summaryEn = cleanStr(body.summaryEn, 2000);
    const summaryMr = cleanStr(body.summaryMr, 2400);
    const publicationDate = cleanStr(body.publicationDate, 30) || new Date().toISOString().slice(0, 10);
    const sourceReference = cleanStr(body.sourceReference, 200);

    const validCategories = ['association', 'membership', 'welfare', 'training', 'representation', 'legal_updates'];
    if (!validCategories.includes(category) || !titleEn || !summaryEn || !sourceReference) {
      res.status(400).json({ error: 'Please complete category, English title, summary, and source reference.' });
      return;
    }

    const item: AnnouncementItem = {
      id: `ann-${crypto.randomUUID().slice(0, 8)}`,
      category,
      titleEn,
      titleMr: titleMr || titleEn,
      summaryEn,
      summaryMr: summaryMr || summaryEn,
      publicationDate,
      sourceReference,
      published: true,
      createdAt: new Date().toISOString(),
    };

    const store = readStore();
    store.announcements.unshift(item);
    writeStore(store);
    res.status(201).json({ item });
  });

  app.delete('/api/admin/announcements/:id', requireAdmin, (req, res) => {
    const id = cleanStr(req.params.id, 80);
    const store = readStore();
    store.announcements = store.announcements.filter((a) => a.id !== id);
    writeStore(store);
    res.json({ ok: true });
  });

  app.post('/api/admin/events', requireAdmin, (req, res) => {
    const body = req.body as Record<string, unknown>;
    const category = cleanStr(body.category, 80);
    const titleEn = cleanStr(body.titleEn, 200);
    const titleMr = cleanStr(body.titleMr, 240);
    const descriptionEn = cleanStr(body.descriptionEn, 1000);
    const descriptionMr = cleanStr(body.descriptionMr, 1200);
    const statusLabelEn = cleanStr(body.statusLabelEn, 60) || 'Proposed · Coming Soon';
    const statusLabelMr = cleanStr(body.statusLabelMr, 60) || 'प्रस्तावित · लवकरच येत आहे';
    const targetRegion = cleanStr(body.targetRegion, 120) || 'Bhiwandi · Kalyan · Thane';

    if (!category || !titleEn || !descriptionEn) {
      res.status(400).json({ error: 'Please complete event category, title, and description.' });
      return;
    }

    const item: ProposedEventItem = {
      id: `evt-${crypto.randomUUID().slice(0, 8)}`,
      category,
      titleEn,
      titleMr: titleMr || titleEn,
      descriptionEn,
      descriptionMr: descriptionMr || descriptionEn,
      statusLabelEn,
      statusLabelMr,
      targetRegion,
      createdAt: new Date().toISOString(),
    };

    const store = readStore();
    store.events.unshift(item);
    writeStore(store);
    res.status(201).json({ item });
  });

  app.delete('/api/admin/events/:id', requireAdmin, (req, res) => {
    const id = cleanStr(req.params.id, 80);
    const store = readStore();
    store.events = store.events.filter((e) => e.id !== id);
    writeStore(store);
    res.json({ ok: true });
  });

  app.get('/api/admin/backup', requireAdmin, (_req, res) => {
    const store = readStore();
    const safeSnapshot = {
      exportedAt: new Date().toISOString(),
      organisation: 'Maharashtra Junior Advocates Welfare Association (MAJAWA)',
      juniorApplications: store.juniorApplications,
      seniorSupporters: store.seniorSupporters,
      grievances: store.grievances,
      contactEnquiries: store.contactEnquiries,
      eventRegistrations: store.eventRegistrations,
      announcements: store.announcements,
      events: store.events,
    };
    const dateStamp = new Date().toISOString().slice(0, 10);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="majawa-backup-${dateStamp}.json"`);
    res.send(JSON.stringify(safeSnapshot, null, 2));
  });

  // Vite dev middleware or production static assets
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      const indexFile = path.resolve(distDir, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send('Build output not found.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MAJAWA server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start MAJAWA server:', err);
  process.exit(1);
});
