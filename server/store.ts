import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import type {
  AnnouncementItem,
  ContactEnquiryRecord,
  EventRegistrationRecord,
  GrievanceEnquiryRecord,
  JuniorApplicationRecord,
  ProposedEventItem,
  SeniorSupporterRecord,
} from '../src/types.ts';

export interface AdminCredential {
  salt: string;
  hash: string;
  createdAt: string;
}

export interface MajawaStoreData {
  adminCredential: AdminCredential | null;
  juniorApplications: JuniorApplicationRecord[];
  seniorSupporters: SeniorSupporterRecord[];
  grievances: GrievanceEnquiryRecord[];
  contactEnquiries: ContactEnquiryRecord[];
  eventRegistrations: EventRegistrationRecord[];
  announcements: AnnouncementItem[];
  events: ProposedEventItem[];
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const STORE_PATH = path.resolve(DATA_DIR, 'majawa-store.json');

const SEED_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-founding-proposal',
    category: 'association',
    titleEn: 'Draft Founding Proposal Released for Discussion Across Bhiwandi, Kalyan & Thane',
    titleMr: 'भिवंडी, कल्याण आणि ठाणे येथे चर्चेसाठी संस्थापना मसुदा प्रस्ताव प्रसिद्ध',
    summaryEn:
      'Proposed by Adv. Sarfaraz Shahezad Ansari (Bhiwandi), the founding discussion draft outlines MAJAWA’s mission to safeguard dignity, fair engagement terms, and lawful institutional support for junior advocates with up to 7 years of practice. MAJAWA is currently a proposed association undergoing pre-registration consultations.',
    summaryMr:
      'अॅड. सरफराज शहजाद अन्सारी (भिवंडी) यांनी मांडलेला संस्थापना मसुदा ७ वर्षांपर्यंत वकिली अनुभव असलेल्या कनिष्ठ वकिलांचा सन्मान, न्याय्य कार्यपद्धती आणि कायदेशीर संस्थात्मक सहाय्य याची रूपरेषा स्पष्ट करतो. MAJAWA ही सध्या प्रस्तावित संस्था असून नोंदणीपूर्व चर्चा सुरू आहे.',
    publicationDate: '2026-11-01',
    sourceReference: 'MAJAWA Founding Proposal Draft (For Discussion)',
    published: true,
    createdAt: '2026-11-01T09:00:00.000Z',
  },
  {
    id: 'ann-founding-cohort',
    category: 'membership',
    titleEn: 'Invitation for 9 to 11 Founding Advocates & Senior Ethical Chamber Supporters',
    titleMr: '९ ते ११ संस्थापक कनिष्ठ वकील आणि ज्येष्ठ नैतिक चेंबर समर्थकांसाठी आवाहन',
    summaryEn:
      'During Stage 1 (Pre-registration), expressions of interest are open for advocates in Bhiwandi, Kalyan, and Thane. No membership fee is collected until legal registration under the Societies Registration Act, 1860 and an official association bank account are completed.',
    summaryMr:
      'टप्पा १ (नोंदणीपूर्व) अंतर्गत भिवंडी, कल्याण आणि ठाणे येथील वकिलांकडून स्वारस्य अर्ज मागविण्यात येत आहेत. सोसायटी नोंदणी कायदा १८६० अंतर्गत कायदेशीर नोंदणी आणि संस्थेचे अधिकृत बँक खाते सुरू होईपर्यंत कोणतेही शुल्क आकारले जाणार नाही.',
    publicationDate: '2026-11-10',
    sourceReference: 'Stage 1 Pre-Registration Notice',
    published: true,
    createdAt: '2026-11-10T09:00:00.000Z',
  },
  {
    id: 'ann-rights-charter',
    category: 'welfare',
    titleEn: 'Proposed 10-Point Junior Advocates’ Rights Charter & Model Engagement Letter',
    titleMr: 'प्रस्तावित १०-सूत्री कनिष्ठ वकील हक्क सनद आणि आदर्श कार्यकरार पत्र',
    summaryEn:
      'The draft charter proposes written engagement terms between seniors and juniors, timely payment of agreed remuneration, reimbursement of out-of-pocket court expenses, protection against defamation when changing chambers, and confidential mediation.',
    summaryMr:
      'प्रस्तावित सनदेत ज्येष्ठ व कनिष्ठ वकिलांमधील लेखी कार्यकरार, ठरलेले मानधन वेळेत मिळणे, न्यायालयीन खर्चाची परतफेड, चेंबर बदलताना होणाऱ्या बदनामीपासून संरक्षण आणि गोपनीय मध्यस्थी यांचा समावेश आहे.',
    publicationDate: '2026-11-18',
    sourceReference: 'MAJAWA Draft Charter § 5',
    published: true,
    createdAt: '2026-11-18T09:00:00.000Z',
  },
];

const SEED_EVENTS: ProposedEventItem[] = [
  {
    id: 'evt-bns-bnss-bsa',
    category: 'Criminal Law & Procedure',
    titleEn: 'BNS, BNSS & BSA Practical Transition Workshop',
    titleMr: 'भारतीय न्याय संहिता (BNS), BNSS आणि BSA व्यावहारिक कार्यशाळा',
    descriptionEn:
      'Proposed practical session covering procedural transitions, remand drafting, bail applications, and evidentiary changes under the new criminal statutes.',
    descriptionMr:
      'नवीन फौजदारी कायद्यांमधील प्रक्रियात्मक बदल, रिमांड अर्ज, जामीन मसुदा आणि पुरावा कायद्यातील सुधारणांवर प्रस्तावित व्यावहारिक कार्यशाळा.',
    statusLabelEn: 'Proposed · Coming Soon',
    statusLabelMr: 'प्रस्तावित · लवकरच येत आहे',
    targetRegion: 'Bhiwandi · Kalyan · Thane',
    createdAt: '2026-11-01T09:00:00.000Z',
  },
  {
    id: 'evt-drafting-pleading',
    category: 'Drafting & Advocacy',
    titleEn: 'Civil Pleadings, Written Statements & Interim Applications Clinic',
    titleMr: 'दिवाणी मसुदा लेखन, लेखी जबाब आणि अंतरिम अर्ज कार्यशाळा',
    descriptionEn:
      'Sample workshop module designed to build foundational precision in plaints, injunctions, and court-ready pleadings for advocates in their first seven years.',
    descriptionMr:
      'वकिलीच्या पहिल्या सात वर्षांतील वकिलांसाठी दावा मसुदा, मनाई हुकूम अर्ज आणि न्यायालयीन लेखन कौशल्य विकसित करण्यासाठी प्रस्तावित कार्यशाळा.',
    statusLabelEn: 'Sample Event · Coming Soon',
    statusLabelMr: 'नमुना कार्यक्रम · लवकरच येत आहे',
    targetRegion: 'Bhiwandi · Kalyan · Thane',
    createdAt: '2026-11-02T09:00:00.000Z',
  },
  {
    id: 'evt-mentorship-circle',
    category: 'Mentorship & Ethics',
    titleEn: 'Senior–Junior Mentorship & Independent Practice-Building Orientation',
    titleMr: 'ज्येष्ठ-कनिष्ठ मार्गदर्शन आणि स्वतंत्र वकिली उभारणी अभिमुखता',
    descriptionEn:
      'Proposed interactive orientation pairing junior advocates with Ethical Chamber Supporters to discuss chamber ethics, client communication, and local practice sustainability.',
    descriptionMr:
      'नैतिक चेंबर समर्थक ज्येष्ठ वकिलांसोबत कनिष्ठ वकिलांचे मार्गदर्शन, चेंबर शिष्टाचार, अशील संवाद आणि स्थानिक पातळीवर वकिली उभारणी यावर प्रस्तावित सत्र.',
    statusLabelEn: 'Proposed · Coming Soon',
    statusLabelMr: 'प्रस्तावित · लवकरच येत आहे',
    targetRegion: 'Bhiwandi Court Complex (Proposed)',
    createdAt: '2026-11-03T09:00:00.000Z',
  },
];

function createInitialStore(): MajawaStoreData {
  return {
    adminCredential: null,
    juniorApplications: [],
    seniorSupporters: [],
    grievances: [],
    contactEnquiries: [],
    eventRegistrations: [],
    announcements: SEED_ANNOUNCEMENTS,
    events: SEED_EVENTS,
  };
}

function ensureStoreExists(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(STORE_PATH)) {
    const initial = createInitialStore();
    fs.writeFileSync(STORE_PATH, JSON.stringify(initial, null, 2), 'utf8');
  }
}

export function readStore(): MajawaStoreData {
  ensureStoreExists();
  try {
    const raw = fs.readFileSync(STORE_PATH, 'utf8');
    const parsed = JSON.parse(raw) as Partial<MajawaStoreData>;
    return {
      adminCredential: parsed.adminCredential ?? null,
      juniorApplications: Array.isArray(parsed.juniorApplications) ? parsed.juniorApplications : [],
      seniorSupporters: Array.isArray(parsed.seniorSupporters) ? parsed.seniorSupporters : [],
      grievances: Array.isArray(parsed.grievances) ? parsed.grievances : [],
      contactEnquiries: Array.isArray(parsed.contactEnquiries) ? parsed.contactEnquiries : [],
      eventRegistrations: Array.isArray(parsed.eventRegistrations) ? parsed.eventRegistrations : [],
      announcements:
        Array.isArray(parsed.announcements) && parsed.announcements.length > 0
          ? parsed.announcements
          : SEED_ANNOUNCEMENTS,
      events:
        Array.isArray(parsed.events) && parsed.events.length > 0
          ? parsed.events
          : SEED_EVENTS,
    };
  } catch {
    return createInitialStore();
  }
}

export function writeStore(data: MajawaStoreData): void {
  ensureStoreExists();
  const tmpPath = path.resolve(DATA_DIR, `majawa-store.${crypto.randomUUID()}.tmp`);
  if (!tmpPath.startsWith(DATA_DIR + path.sep)) {
    throw new Error('Invalid store path');
  }
  fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf8');
  fs.renameSync(tmpPath, STORE_PATH);
}

export function generateReferenceId(prefix: string): string {
  const num = crypto.randomInt(1000, 9999);
  const tag = crypto.randomBytes(2).toString('hex').toUpperCase();
  return `${prefix}-${num}-${tag}`;
}
