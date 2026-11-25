export type Language = 'en' | 'mr';

export type PageId =
  | 'home'
  | 'about'
  | 'objectives'
  | 'welfare'
  | 'membership'
  | 'grievance'
  | 'training'
  | 'news'
  | 'contact'
  | 'admin';

export type LegalDocType = 'privacy' | 'terms' | 'disclaimer' | null;

export interface PublicSummary {
  foundingInterestCount: number;
  juniorApplicationsCount: number;
  seniorSupportersCount: number;
  foundingTarget: number;
  announcements: AnnouncementItem[];
  events: ProposedEventItem[];
}

export interface AnnouncementItem {
  id: string;
  category:
    | 'association'
    | 'membership'
    | 'welfare'
    | 'training'
    | 'representation'
    | 'legal_updates';
  titleEn: string;
  titleMr: string;
  summaryEn: string;
  summaryMr: string;
  publicationDate: string;
  sourceReference: string;
  published: boolean;
  createdAt: string;
}

export interface ProposedEventItem {
  id: string;
  category: string;
  titleEn: string;
  titleMr: string;
  descriptionEn: string;
  descriptionMr: string;
  statusLabelEn: string;
  statusLabelMr: string;
  targetRegion: string;
  createdAt: string;
}

export interface JuniorApplicationRecord {
  id: string;
  referenceId: string;
  fullName: string;
  dateOfBirth?: string;
  enrolmentNumber: string;
  stateBarCouncil: string;
  dateOfEnrolment: string;
  yearsOfPractice: string;
  district: string;
  taluka: string;
  courtsOfPractice: string[];
  otherCourt?: string;
  areasOfPractice?: string;
  practisingMode: 'independent' | 'chamber';
  yearsInCurrentChamber?: string;
  monthlyIncomeRange?: string;
  mobile: string;
  email: string;
  chamberAddress?: string;
  preferredLanguage: 'en' | 'mr' | 'both';
  membershipCategory: 'junior' | 'associate' | 'institutional';
  issuesMattersMost: string[];
  otherIssue?: string;
  howToHelp: string[];
  experiencesOptional?: string;
  consentAccepted: boolean;
  status: 'pending_verification' | 'founding_cohort' | 'shortlisted' | 'archived';
  createdAt: string;
}

export interface SeniorSupporterRecord {
  id: string;
  referenceId: string;
  fullName: string;
  mobile: string;
  email: string;
  officeAddress: string;
  stateBarCouncilAndEnrolment: string;
  yearOfEnrolment: string;
  courtsOfPractice: string[];
  otherCourt?: string;
  areasOfPractice: string;
  juniorsCount: string;
  supportRoles: string[];
  ethicalPledges: string[];
  consentAccepted: boolean;
  status: 'pending_verification' | 'listed_ethical_chamber' | 'mentor_panel';
  createdAt: string;
}

export interface GrievanceEnquiryRecord {
  id: string;
  referenceId: string;
  nameOptional?: string;
  contactDetails: string;
  district: string;
  natureOfConcern: string;
  briefDescription: string;
  preferredContactMethod: 'phone' | 'whatsapp' | 'email' | 'in_person';
  status: 'submitted' | 'acknowledged' | 'scrutinising' | 'mediation_or_referral' | 'closed';
  adminNotes?: string;
  createdAt: string;
}

export interface ContactEnquiryRecord {
  id: string;
  referenceId: string;
  fullName: string;
  email: string;
  mobile?: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface EventRegistrationRecord {
  id: string;
  referenceId: string;
  eventId: string;
  eventTitle: string;
  fullName: string;
  enrolmentNumber?: string;
  mobile: string;
  email: string;
  courtDistrict: string;
  notes?: string;
  createdAt: string;
}
