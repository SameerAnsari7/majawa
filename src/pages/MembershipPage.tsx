import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import type { Language, LegalDocType, PublicSummary } from '../types.ts';
import { SITE_COPY, t } from '../i18n/content.ts';

interface MembershipPageProps {
  lang: Language;
  summary: PublicSummary | null;
  onSubmitted: () => void;
  onOpenLegal: (doc: LegalDocType) => void;
}

const COURTS_LIST = ['Bhiwandi', 'Thane', 'Kalyan', 'Other'];

const JUNIOR_ISSUES = [
  { id: 'non_payment', en: 'Non-payment or low payment', mr: 'मानधन न मिळणे किंवा अत्यंत कमी मानधन' },
  { id: 'expenses', en: 'Expenses not refunded', mr: 'न्यायालयीन खर्चाची परतफेड न होणे' },
  { id: 'defamation', en: 'Defamation or bad-mouthing', mr: 'बदनामी किंवा गैरप्रचार' },
  { id: 'client_interference', en: 'Client interference', mr: 'अशीलांच्या कामात हस्तक्षेप' },
  { id: 'lack_training', en: 'Lack of training', mr: 'प्रशिक्षणाचा अभाव' },
  { id: 'no_written_terms', en: 'No written terms', mr: 'लेखी अटींचा अभाव' },
  { id: 'harassment', en: 'Harassment', mr: 'छळ किंवा दडपण' },
  { id: 'welfare_insurance', en: 'Need for welfare or insurance', mr: 'कल्याण व विमा योजनेची गरज' },
];

const HELP_ROLES = [
  { id: 'founding_member', en: 'Founding member (9 to 11 needed)', mr: 'संस्थापक सदस्य (९ ते ११ आवश्यक)' },
  { id: 'member_only', en: 'Member only', mr: 'केवळ सदस्य' },
  { id: 'organise_court', en: 'Organise in my court', mr: 'माझ्या न्यायालयात संघटन करणे' },
  { id: 'drafting_research', en: 'Legal drafting and research', mr: 'कायदेशीर मसुदा आणि संशोधन' },
  { id: 'events_training', en: 'Events and training', mr: 'उपक्रम आणि प्रशिक्षण' },
  { id: 'social_website', en: 'Social media and website', mr: 'सोशल मीडिया आणि वेबसाइट' },
];

const SENIOR_SUPPORT_ROLES = [
  { id: 'supporter', en: 'Supporter', mr: 'समर्थक' },
  { id: 'mentor', en: 'Mentor to juniors', mr: 'कनिष्ठांना मार्गदर्शन' },
  { id: 'speaker', en: 'Guest speaker or trainer', mr: 'अतिथी वक्ता किंवा प्रशिक्षक' },
  { id: 'grievance_panel', en: 'Member of the grievance or mediation panel (independent)', mr: 'तक्रार किंवा मध्यस्थी समिती सदस्य (स्वतंत्र)' },
  { id: 'advisor', en: 'Advisor', mr: 'सल्लागार' },
  { id: 'founding_supporter', en: 'Founding supporter', mr: 'संस्थापक समर्थक' },
];

const ETHICAL_PLEDGES = [
  { id: 'written_terms', en: 'I will give my junior(s) clear terms of engagement, preferably in writing.', mr: 'मी माझ्या कनिष्ठांना कामाच्या स्पष्ट व शक्यतो लेखी अटी देईन.' },
  { id: 'timely_pay', en: 'I will pay agreed remuneration on time.', mr: 'मी ठरलेले मानधन वेळेवर देईन.' },
  { id: 'refund_expenses', en: 'I will refund legitimate out-of-pocket expenses.', mr: 'मी न्याय्य कार्यालयीन व न्यायालयीन खर्च परत देईन.' },
  { id: 'no_badmouth', en: 'I will not speak ill of a junior who leaves my chamber, and will resolve any dispute through discussion or mediation.', mr: 'चेंबर सोडणाऱ्या कनिष्ठाबद्दल अपप्रचार करणार नाही व वाद संवादातून सोडवीन.' },
  { id: 'no_interference', en: 'I will not interfere with the junior’s lawful work for his/her own clients.', mr: 'कनिष्ठाच्या स्वतःच्या अशीलांच्या कायदेशीर कामात हस्तक्षेप करणार नाही.' },
  { id: 'real_training', en: 'I will provide real training and exposure.', mr: 'मी प्रत्यक्ष कामाचे खरे प्रशिक्षण आणि संधी देईन.' },
];

export function MembershipPage({ lang, summary, onSubmitted, onOpenLegal }: MembershipPageProps) {
  const [activeForm, setActiveForm] = useState<'junior' | 'senior'>('junior');

  // Form 1 (Junior) State
  const [jrForm, setJrForm] = useState({
    fullName: '',
    dateOfBirth: '',
    enrolmentNumber: '',
    stateBarCouncil: 'Bar Council of Maharashtra and Goa',
    dateOfEnrolment: '',
    yearsOfPractice: '',
    district: 'Thane',
    taluka: 'Bhiwandi',
    courtsOfPractice: ['Bhiwandi'] as string[],
    otherCourt: '',
    areasOfPractice: '',
    practisingMode: 'chamber' as 'independent' | 'chamber',
    yearsInCurrentChamber: '',
    monthlyIncomeRange: '',
    mobile: '',
    email: '',
    chamberAddress: '',
    preferredLanguage: 'en' as 'en' | 'mr' | 'both',
    membershipCategory: 'junior' as 'junior' | 'associate' | 'institutional',
    issuesMattersMost: [] as string[],
    otherIssue: '',
    howToHelp: ['member_only'] as string[],
    experiencesOptional: '',
    consentAccepted: false,
    websiteUrl: '', // honeypot
  });

  // Form 2 (Senior) State
  const [srForm, setSrForm] = useState({
    fullName: '',
    mobile: '',
    email: '',
    officeAddress: '',
    stateBarCouncilAndEnrolment: '',
    yearOfEnrolment: '',
    courtsOfPractice: ['Bhiwandi'] as string[],
    otherCourt: '',
    areasOfPractice: '',
    juniorsCount: '',
    supportRoles: ['supporter'] as string[],
    ethicalPledges: [] as string[],
    consentAccepted: false,
    websiteUrl: '', // honeypot
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [receipt, setReceipt] = useState<{ referenceId: string; message: string; type: 'junior' | 'senior' } | null>(null);

  const toggleArrayItem = (arr: string[], value: string): string[] =>
    arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value];

  const handleJuniorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/membership/junior', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jrForm),
      });
      const data = (await res.json()) as { referenceId?: string; message?: string; error?: string };
      if (!res.ok) {
        setErrorMsg(data.error || 'Could not submit application. Please verify your entries.');
      } else {
        setReceipt({
          referenceId: data.referenceId || 'MAJ-JR',
          message:
            data.message ||
            'Thank you for your interest in MAJAWA. Your membership application/enquiry has been received. Membership will be subject to verification and approval under the applicable rules.',
          type: 'junior',
        });
        onSubmitted();
      }
    } catch {
      setErrorMsg('Network error while submitting application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSeniorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/membership/senior', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(srForm),
      });
      const data = (await res.json()) as { referenceId?: string; message?: string; error?: string };
      if (!res.ok) {
        setErrorMsg(data.error || 'Could not submit supporter enquiry.');
      } else {
        setReceipt({
          referenceId: data.referenceId || 'MAJ-SR',
          message:
            data.message ||
            'Thank you for pledging your support as a Senior Advocate Supporter / Mentor. Your pre-registration has been recorded for review by the founding committee.',
          type: 'senior',
        });
        onSubmitted();
      }
    } catch {
      setErrorMsg('Network error while submitting form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const foundingCount = summary?.foundingInterestCount ?? 0;
  const foundingTarget = summary?.foundingTarget ?? 11;

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-14">
        <header className="max-w-3xl space-y-4 border-b border-stone-200 pb-8">
          <p className="text-xs uppercase tracking-[0.14em] text-[#9A7823] font-semibold">
            {t(lang, SITE_COPY.statusBanner)}
          </p>
          <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-[#162C46]">
            {lang === 'mr' ? 'सदस्यत्व माहिती आणि नोंदणीपूर्व अर्ज' : 'Membership Information & Pre-Registration'}
          </h1>
          <p className="text-base sm:text-lg text-stone-700 leading-relaxed">
            {lang === 'mr'
              ? '७ वर्षांपर्यंत वकिली अनुभव असलेल्या कनिष्ठ वकिलांसाठी तसेच नैतिक चेंबर समर्थक ज्येष्ठ वकिलांसाठी नोंदणीपूर्व स्वारस्य अर्ज.'
              : 'Open to advocates having up to seven years of legal practice (Junior Members) and senior advocates pledging fair chamber mentorship (Senior Supporters).'}
          </p>
        </header>

        {/* Key Membership Rules & No-Payment-Yet Safeguard */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-stone-200 rounded-md p-6 space-y-2">
            <p className="text-xs uppercase tracking-[0.12em] text-stone-500 font-semibold">
              {lang === 'mr' ? 'पात्रता' : 'Eligibility'}
            </p>
            <p className="font-editorial text-2xl font-semibold text-[#162C46]">
              {lang === 'mr' ? '७ वर्षांपर्यंत सराव' : 'Up to 7 Years of Practice'}
            </p>
            <p className="text-sm text-stone-600">
              {lang === 'mr'
                ? 'नोंदणीकृत वकील (नोंदणी तारखेपासून ७ वर्षांपर्यंत), मंजूर नियमांच्या अधीन.'
                : 'Enrolled advocates up to 7 years from date of enrolment, subject to approved membership rules.'}
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded-md p-6 space-y-2">
            <p className="text-xs uppercase tracking-[0.12em] text-stone-500 font-semibold">
              {lang === 'mr' ? 'प्रस्तावित वार्षिक शुल्क' : 'Proposed Annual Fee'}
            </p>
            <p className="font-editorial text-2xl font-semibold text-[#162C46] tabular-nums">
              ₹500 / {lang === 'mr' ? 'वर्ष (प्रस्तावित)' : 'Year (Proposed)'}
            </p>
            <p className="text-sm text-stone-600">
              {lang === 'mr'
                ? 'कायदेशीर नोंदणी आणि अधिकृत बँक खाते सुरू होईपर्यंत कोणतेही शुल्क घेतले जाणार नाही.'
                : 'No payment is collected until legal registration, bank arrangements, and authorised payment rules are in place.'}
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded-md p-6 space-y-2">
            <p className="text-xs uppercase tracking-[0.12em] text-stone-500 font-semibold">
              {lang === 'mr' ? 'संस्थापक गट टप्पा १' : 'Stage 1 Founding Cohort'}
            </p>
            <p className="font-editorial text-2xl font-semibold text-[#162C46] tabular-nums">
              {foundingCount} / {foundingTarget} {lang === 'mr' ? 'संस्थापक स्वारस्य' : 'Founding Interest'}
            </p>
            <p className="text-sm text-stone-600">
              {lang === 'mr'
                ? 'भिवंडी, कल्याण आणि ठाणे येथे ९ ते ११ संस्थापक वकिलांचा गट उभारणे.'
                : 'Target of 9 to 11 founding advocates across Bhiwandi, Kalyan & Thane; concessions for hardship.'}
            </p>
          </div>
        </section>

        {/* Membership Categories Table (PDF Section 8) */}
        <section className="space-y-4">
          <h2 className="font-editorial text-3xl font-semibold text-[#162C46]">
            {lang === 'mr' ? 'कोण सहभागी होऊ शकते (प्रस्तावित श्रेणी)' : 'Who Can Join (Proposed Categories)'}
          </h2>
          <div className="bg-white border border-stone-200 rounded-md overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#162C46] text-[#FFFFFF] text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3.5 font-semibold">{lang === 'mr' ? 'श्रेणी' : 'Category'}</th>
                  <th className="px-5 py-3.5 font-semibold">{lang === 'mr' ? 'पात्रता' : 'Who'}</th>
                  <th className="px-5 py-3.5 font-semibold">{lang === 'mr' ? 'मतदान हक्क' : 'Vote'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-stone-700">
                <tr>
                  <td className="px-5 py-3.5 font-semibold text-[#162C46]">
                    {lang === 'mr' ? 'कनिष्ठ सदस्य (Junior Member)' : 'Junior Member'}
                  </td>
                  <td className="px-5 py-3.5">
                    {lang === 'mr'
                      ? 'नोंदणीच्या तारखेपासून ७ वर्षांपर्यंत वकिली करणारे नोंदणीकृत वकील'
                      : 'Enrolled advocate with up to 7 years of practice from the date of enrolment'}
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-[#162C46]">
                    {lang === 'mr' ? 'होय' : 'Yes'}
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 font-semibold text-[#162C46]">
                    {lang === 'mr' ? 'ज्येष्ठ समर्थक / मार्गदर्शक' : 'Senior Supporter / Mentor'}
                  </td>
                  <td className="px-5 py-3.5">
                    {lang === 'mr'
                      ? '७ वर्षांपेक्षा अधिक अनुभव असलेले वकील जे या उद्दिष्टाला पाठिंबा देतात आणि नैतिक चेंबर संहिता मान्य करतात'
                      : 'Advocate with more than 7 years of practice who supports the cause and agrees to the Ethical Chamber Code'}
                  </td>
                  <td className="px-5 py-3.5 text-stone-500">{lang === 'mr' ? 'नाही' : 'No'}</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 font-semibold text-[#162C46]">
                    {lang === 'mr' ? 'सहयोगी सदस्य (Associate)' : 'Associate Member'}
                  </td>
                  <td className="px-5 py-3.5">
                    {lang === 'mr'
                      ? 'संस्थेच्या उद्दिष्टांना पाठिंबा देणारे इतर कोणतेही वकील'
                      : 'Any other advocate who supports the objects'}
                  </td>
                  <td className="px-5 py-3.5 text-stone-500">{lang === 'mr' ? 'नाही' : 'No'}</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 font-semibold text-[#162C46]">
                    {lang === 'mr' ? 'संस्थात्मक सदस्य (Institutional)' : 'Institutional Member'}
                  </td>
                  <td className="px-5 py-3.5">
                    {lang === 'mr'
                      ? 'उद्दिष्टांना पाठिंबा देणाऱ्या लॉ फर्म्स, महाविद्यालये किंवा संस्था'
                      : 'Law firms, colleges or organisations that support the objects'}
                  </td>
                  <td className="px-5 py-3.5 text-stone-500">{lang === 'mr' ? 'नाही' : 'No'}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-stone-600">
            {lang === 'mr'
              ? 'धर्म, जात, लिंग, भाषा, दिव्यांगत्व किंवा कोणत्याही बेकायदेशीर भेदभावाच्या आधारे सदस्यत्व नाकारले जाणार नाही.'
              : 'Membership will not be refused on grounds of religion, caste, gender, language, disability or other unlawful discrimination.'}
          </p>
        </section>

        {/* Interactive Application Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <h2 className="font-editorial text-3xl font-semibold text-[#162C46]">
                {lang === 'mr' ? 'ऑनलाइन सदस्यत्व / स्वारस्य अर्ज' : 'Online Membership Enquiry & Pre-Registration'}
              </h2>
              <p className="text-sm text-stone-600 mt-1">
                {lang === 'mr'
                  ? 'कृपया तुमच्या श्रेणीनुसार योग्य अर्ज निवडा (या टप्प्यावर कोणतेही शुल्क देय नाही).'
                  : 'Select the applicable form below. No fee is payable at this pre-registration stage.'}
              </p>
            </div>

            <div className="inline-flex p-1 bg-stone-200/80 rounded-md self-start">
              <button
                type="button"
                onClick={() => {
                  setActiveForm('junior');
                  setReceipt(null);
                  setErrorMsg('');
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-sm transition-colors whitespace-nowrap ${
                  activeForm === 'junior' ? 'bg-[#162C46] text-white' : 'text-stone-700 hover:text-[#162C46]'
                }`}
              >
                {lang === 'mr' ? 'फॉर्म १: कनिष्ठ वकील अर्ज' : 'Form 1: Junior Advocate (<=7 Yrs)'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveForm('senior');
                  setReceipt(null);
                  setErrorMsg('');
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-sm transition-colors whitespace-nowrap ${
                  activeForm === 'senior' ? 'bg-[#162C46] text-white' : 'text-stone-700 hover:text-[#162C46]'
                }`}
              >
                {lang === 'mr' ? 'फॉर्म २: ज्येष्ठ समर्थक / मार्गदर्शक' : 'Form 2: Senior Supporter / Mentor'}
              </button>
            </div>
          </div>

          {receipt ? (
            <div className="bg-white border border-stone-300 rounded-md p-8 space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#14532D] shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.14em] text-[#14532D] font-semibold">
                    {lang === 'mr' ? 'अर्ज नोंदवला गेला' : 'Enquiry Recorded'} · {receipt.referenceId}
                  </p>
                  <h3 className="font-editorial text-2xl font-semibold text-[#162C46]">
                    {lang === 'mr' ? 'MAJAWA मध्ये स्वारस्य दाखवल्याबद्दल धन्यवाद' : 'Application / Enquiry Received'}
                  </h3>
                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                    {receipt.message}
                  </p>
                  <p className="text-xs text-stone-500 pt-1">
                    {lang === 'mr'
                      ? 'कृपया भविष्यातील संदर्भासाठी तुमचा संदर्भ क्रमांक जतन करा. पडताळणी व नियमांच्या मंजुरीशिवाय सदस्यत्व आपोआप लागू होत नाही.'
                      : 'Please note your Reference ID for future correspondence. Submitting this enquiry does not automatically confer membership.'}
                  </p>
                </div>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setReceipt(null)}
                  className="px-5 py-2 text-xs font-semibold border border-stone-300 rounded-md text-[#162C46] hover:bg-stone-50"
                >
                  {lang === 'mr' ? 'दुसरा अर्ज भरा' : 'Submit Another Enquiry'}
                </button>
              </div>
            </div>
          ) : activeForm === 'junior' ? (
            <form onSubmit={handleJuniorSubmit} className="bg-white border border-stone-200 rounded-md p-6 sm:p-8 space-y-8">
              {/* Honeypot */}
              <div className="hidden" aria-hidden="true">
                <label>
                  Website URL
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={jrForm.websiteUrl}
                    onChange={(e) => setJrForm({ ...jrForm, websiteUrl: e.target.value })}
                  />
                </label>
              </div>

              {errorMsg && (
                <div role="alert" className="p-4 rounded-md bg-red-50 border border-red-200 text-sm text-red-900">
                  {errorMsg}
                </div>
              )}

              {/* Section 1: Advocate Identity & Enrolment */}
              <div className="space-y-4">
                <h3 className="font-editorial text-2xl font-semibold text-[#162C46] border-b border-stone-200 pb-2">
                  {lang === 'mr' ? '१. वैयक्तिक व बार कौन्सिल माहिती' : '1. Advocate & Enrolment Details'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {lang === 'mr' ? 'पूर्ण नाव *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={jrForm.fullName}
                      onChange={(e) => setJrForm({ ...jrForm, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#162C46]"
                      placeholder="Adv. Full Name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {lang === 'mr' ? 'जन्मतारीख (ऐच्छिक)' : 'Date of Birth (Optional)'}
                    </label>
                    <input
                      type="date"
                      value={jrForm.dateOfBirth}
                      onChange={(e) => setJrForm({ ...jrForm, dateOfBirth: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#162C46]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {lang === 'mr' ? 'वकील नोंदणी क्रमांक *' : 'Advocate Enrolment Number *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={jrForm.enrolmentNumber}
                      onChange={(e) => setJrForm({ ...jrForm, enrolmentNumber: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#162C46]"
                      placeholder="e.g. MAH/XXXX/2023"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {lang === 'mr' ? 'राज्य बार कौन्सिल *' : 'State Bar Council *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={jrForm.stateBarCouncil}
                      onChange={(e) => setJrForm({ ...jrForm, stateBarCouncil: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#162C46]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {lang === 'mr' ? 'नोंदणी तारीख *' : 'Date of Enrolment *'}
                    </label>
                    <input
                      type="date"
                      required
                      value={jrForm.dateOfEnrolment}
                      onChange={(e) => setJrForm({ ...jrForm, dateOfEnrolment: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#162C46]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {lang === 'mr' ? 'वकिली अनुभवाची वर्षे *' : 'Years of Practice *'}
                    </label>
                    <select
                      required
                      value={jrForm.yearsOfPractice}
                      onChange={(e) => setJrForm({ ...jrForm, yearsOfPractice: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#162C46]"
                    >
                      <option value="">{lang === 'mr' ? 'निवडा' : 'Select'}</option>
                      <option value="Under 1 year">Under 1 year</option>
                      <option value="1–2 years">1–2 years</option>
                      <option value="3–5 years">3–5 years</option>
                      <option value="5–7 years">5–7 years</option>
                      <option value="Above 7 years (Associate)">Above 7 years (Associate)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Practice Location & Contact */}
              <div className="space-y-4">
                <h3 className="font-editorial text-2xl font-semibold text-[#162C46] border-b border-stone-200 pb-2">
                  {lang === 'mr' ? '२. कार्यक्षेत्र आणि संपर्क तपशील' : '2. Practice Location & Contact'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {lang === 'mr' ? 'जिल्हा *' : 'District *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={jrForm.district}
                      onChange={(e) => setJrForm({ ...jrForm, district: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#162C46]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {lang === 'mr' ? 'तालुका *' : 'Taluka *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={jrForm.taluka}
                      onChange={(e) => setJrForm({ ...jrForm, taluka: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#162C46]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {lang === 'mr' ? 'मोबाईल / व्हॉट्सअॅप *' : 'Mobile / WhatsApp Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={jrForm.mobile}
                      onChange={(e) => setJrForm({ ...jrForm, mobile: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#162C46]"
                      placeholder="10-digit mobile"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {lang === 'mr' ? 'ईमेल पत्ता *' : 'Email Address *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={jrForm.email}
                      onChange={(e) => setJrForm({ ...jrForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#162C46]"
                      placeholder="advocate@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {lang === 'mr' ? 'पसंतीची भाषा *' : 'Preferred Language *'}
                    </label>
                    <select
                      value={jrForm.preferredLanguage}
                      onChange={(e) => setJrForm({ ...jrForm, preferredLanguage: e.target.value as 'en' | 'mr' | 'both' })}
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#162C46]"
                    >
                      <option value="en">English</option>
                      <option value="mr">मराठी (Marathi)</option>
                      <option value="both">Both English & Marathi</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {lang === 'mr' ? 'सदस्यत्व श्रेणी *' : 'Membership Category *'}
                    </label>
                    <select
                      value={jrForm.membershipCategory}
                      onChange={(e) =>
                        setJrForm({ ...jrForm, membershipCategory: e.target.value as 'junior' | 'associate' | 'institutional' })
                      }
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#162C46]"
                    >
                      <option value="junior">Junior Member (Up to 7 Years)</option>
                      <option value="associate">Associate Member</option>
                      <option value="institutional">Institutional Member</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-2">
                      {lang === 'mr' ? 'सरावाची न्यायालये' : 'Court(s) of Practice'}
                    </label>
                    <div className="flex flex-wrap gap-4 text-sm text-stone-700">
                      {COURTS_LIST.map((c) => (
                        <label key={c} className="inline-flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={jrForm.courtsOfPractice.includes(c)}
                            onChange={() =>
                              setJrForm({ ...jrForm, courtsOfPractice: toggleArrayItem(jrForm.courtsOfPractice, c) })
                            }
                            className="rounded border-stone-300 text-[#162C46] focus:ring-[#162C46]"
                          />
                          <span>{c}</span>
                        </label>
                      ))}
                    </div>
                    {jrForm.courtsOfPractice.includes('Other') && (
                      <input
                        type="text"
                        value={jrForm.otherCourt}
                        onChange={(e) => setJrForm({ ...jrForm, otherCourt: e.target.value })}
                        placeholder="Specify court"
                        className="mt-2 w-full px-3 py-2 text-sm border border-stone-300 rounded-md bg-[#FFFFFF]"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {lang === 'mr' ? 'चेंबर / कार्यालय पत्ता (ऐच्छिक)' : 'Chamber / Office Address (Optional)'}
                    </label>
                    <input
                      type="text"
                      value={jrForm.chamberAddress}
                      onChange={(e) => setJrForm({ ...jrForm, chamberAddress: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#162C46]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {lang === 'mr' ? 'वकिलीची कार्यपद्धती' : 'Practising Mode'}
                    </label>
                    <div className="flex gap-5 pt-1 text-sm">
                      <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="practisingMode"
                          checked={jrForm.practisingMode === 'chamber'}
                          onChange={() => setJrForm({ ...jrForm, practisingMode: 'chamber' })}
                        />
                        <span>{lang === 'mr' ? 'चेंबरमध्ये' : 'In a chamber'}</span>
                      </label>
                      <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="practisingMode"
                          checked={jrForm.practisingMode === 'independent'}
                          onChange={() => setJrForm({ ...jrForm, practisingMode: 'independent' })}
                        />
                        <span>{lang === 'mr' ? 'स्वतंत्र' : 'Independently'}</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {lang === 'mr' ? 'सध्याच्या चेंबरमधील वर्षे (ऐच्छिक)' : 'Years in Current Chamber (Optional)'}
                    </label>
                    <input
                      type="text"
                      value={jrForm.yearsInCurrentChamber}
                      onChange={(e) => setJrForm({ ...jrForm, yearsInCurrentChamber: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {lang === 'mr' ? 'मासिक उत्पन्न श्रेणी (ऐच्छिक)' : 'Monthly Income Range (Optional)'}
                    </label>
                    <select
                      value={jrForm.monthlyIncomeRange}
                      onChange={(e) => setJrForm({ ...jrForm, monthlyIncomeRange: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF]"
                    >
                      <option value="">{lang === 'mr' ? 'ऐच्छिक' : 'Prefer not to say'}</option>
                      <option value="Below ₹5,000">Below ₹5,000</option>
                      <option value="₹5,000 to ₹10,000">₹5,000 to ₹10,000</option>
                      <option value="₹10,000 to ₹20,000">₹10,000 to ₹20,000</option>
                      <option value="Above ₹20,000">Above ₹20,000</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 3: Issues & Participation */}
              <div className="space-y-5">
                <h3 className="font-editorial text-2xl font-semibold text-[#162C46] border-b border-stone-200 pb-2">
                  {lang === 'mr' ? '३. महत्त्वाचे विषय आणि सहभाग' : '3. Key Issues & Participation'}
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-2">
                    {lang === 'mr' ? 'तुमच्यासाठी कोणते मुद्दे सर्वात महत्त्वाचे आहेत?' : 'Which issues matter most to you? (Select all that apply)'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-sm text-stone-700">
                    {JUNIOR_ISSUES.map((issue) => (
                      <label key={issue.id} className="inline-flex items-start gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={jrForm.issuesMattersMost.includes(issue.en)}
                          onChange={() =>
                            setJrForm({ ...jrForm, issuesMattersMost: toggleArrayItem(jrForm.issuesMattersMost, issue.en) })
                          }
                          className="mt-1 rounded border-stone-300 text-[#162C46]"
                        />
                        <span>{lang === 'mr' ? issue.mr : issue.en}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-2">
                    {lang === 'mr' ? 'तुम्ही कशी मदत करू इच्छिता?' : 'How would you like to help?'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-sm text-stone-700">
                    {HELP_ROLES.map((role) => (
                      <label key={role.id} className="inline-flex items-start gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={jrForm.howToHelp.includes(role.en)}
                          onChange={() => setJrForm({ ...jrForm, howToHelp: toggleArrayItem(jrForm.howToHelp, role.en) })}
                          className="mt-1 rounded border-stone-300 text-[#162C46]"
                        />
                        <span>{lang === 'mr' ? role.mr : role.en}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    {lang === 'mr'
                      ? 'अनुभव (ऐच्छिक — २ ते ३ ओळीत समस्या नमूद करा, कोणाचेही नाव घेऊ नका)'
                      : 'Experiences (Optional — in 2 to 3 lines, describe a problem faced; do not name any person)'}
                  </label>
                  <textarea
                    rows={3}
                    value={jrForm.experiencesOptional}
                    onChange={(e) => setJrForm({ ...jrForm, experiencesOptional: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#162C46]"
                  />
                </div>
              </div>

              {/* Declaration & Submit */}
              <div className="border-t border-stone-200 pt-5 space-y-5">
                <label className="flex items-start gap-3 text-sm text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={jrForm.consentAccepted}
                    onChange={(e) => setJrForm({ ...jrForm, consentAccepted: e.target.checked })}
                    className="mt-1 rounded border-stone-300 text-[#162C46]"
                  />
                  <span>
                    {lang === 'mr' ? (
                      <>
                        मी प्रमाणित करतो/करते की दिलेली माहिती सत्य आहे आणि मी नोंदणीकृत वकील आहे. मला जाणीव आहे की MAJAWA ही प्रस्तावित संघटना असून अद्याप नोंदणीकृत नाही. मी प्रस्तावित सदस्यत्व नियम आणि{' '}
                        <button type="button" onClick={() => onOpenLegal('privacy')} className="underline text-[#162C46] font-medium">
                          गोपनीयता धोरण
                        </button>{' '}
                        मान्य करतो/करते आणि कायदेशीर, अहिंसक व व्यावसायिक मार्गांचे पालन करेन.
                      </>
                    ) : (
                      <>
                        I confirm that the information provided is accurate and that I am an enrolled advocate. I understand that MAJAWA is a proposed association, agree to the proposed membership rules and{' '}
                        <button type="button" onClick={() => onOpenLegal('privacy')} className="underline text-[#162C46] font-medium">
                          Privacy Policy
                        </button>
                        , and will follow lawful, non-violent and professional methods.
                      </>
                    )}
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-7 py-3 text-sm font-semibold bg-[#162C46] text-[#FFFFFF] rounded-md hover:bg-[#193054] disabled:opacity-60 transition-colors"
                >
                  {submitting
                    ? lang === 'mr'
                      ? 'सादर होत आहे...'
                      : 'Submitting...'
                    : lang === 'mr'
                    ? 'अर्ज सादर करा (SUBMIT APPLICATION)'
                    : 'SUBMIT APPLICATION'}
                </button>
              </div>
            </form>
          ) : (
            /* FORM 2: Senior Advocate Supporter / Mentor */
            <form onSubmit={handleSeniorSubmit} className="bg-white border border-stone-200 rounded-md p-6 sm:p-8 space-y-8">
              <div className="hidden" aria-hidden="true">
                <label>
                  Website URL
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={srForm.websiteUrl}
                    onChange={(e) => setSrForm({ ...srForm, websiteUrl: e.target.value })}
                  />
                </label>
              </div>

              {errorMsg && (
                <div role="alert" className="p-4 rounded-md bg-red-50 border border-red-200 text-sm text-red-900">
                  {errorMsg}
                </div>
              )}

              <div className="space-y-4">
                <h3 className="font-editorial text-2xl font-semibold text-[#162C46] border-b border-stone-200 pb-2">
                  {lang === 'mr'
                    ? 'ज्येष्ठ वकील समर्थक / मार्गदर्शक नोंदणीपूर्व अर्ज (>७ वर्षे अनुभव)'
                    : 'Senior Advocate Supporter / Mentor Pre-Registration (>7 Years Practice)'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {lang === 'mr' ? 'पूर्ण नाव *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={srForm.fullName}
                      onChange={(e) => setSrForm({ ...srForm, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {lang === 'mr' ? 'मोबाईल / व्हॉट्सअॅप *' : 'Mobile / WhatsApp *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={srForm.mobile}
                      onChange={(e) => setSrForm({ ...srForm, mobile: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {lang === 'mr' ? 'ईमेल *' : 'Email *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={srForm.email}
                      onChange={(e) => setSrForm({ ...srForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF]"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {lang === 'mr' ? 'कार्यालय / चेंबर पत्ता *' : 'Office / Chamber Address *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={srForm.officeAddress}
                      onChange={(e) => setSrForm({ ...srForm, officeAddress: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {lang === 'mr' ? 'नोंदणी वर्ष *' : 'Year of Enrolment *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={srForm.yearOfEnrolment}
                      onChange={(e) => setSrForm({ ...srForm, yearOfEnrolment: e.target.value })}
                      placeholder="e.g. 2012"
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF]"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {lang === 'mr' ? 'राज्य बार कौन्सिल आणि नोंदणी क्रमांक *' : 'State Bar Council & Enrolment Number *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={srForm.stateBarCouncilAndEnrolment}
                      onChange={(e) => setSrForm({ ...srForm, stateBarCouncilAndEnrolment: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {lang === 'mr' ? 'सध्या तुमच्याकडे कार्यरत कनिष्ठ संख्या' : 'Number of Juniors Working With You'}
                    </label>
                    <input
                      type="text"
                      value={srForm.juniorsCount}
                      onChange={(e) => setSrForm({ ...srForm, juniorsCount: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-2">
                    {lang === 'mr' ? 'तुम्ही MAJAWA ला कसा पाठिंबा देऊ इच्छिता?' : 'How would you like to support MAJAWA?'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-stone-700">
                    {SENIOR_SUPPORT_ROLES.map((role) => (
                      <label key={role.id} className="inline-flex items-start gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={srForm.supportRoles.includes(role.en)}
                          onChange={() =>
                            setSrForm({ ...srForm, supportRoles: toggleArrayItem(srForm.supportRoles, role.en) })
                          }
                          className="mt-1 rounded border-stone-300 text-[#162C46]"
                        />
                        <span>{lang === 'mr' ? role.mr : role.en}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-[#F8FAFC] border border-stone-200 rounded-md p-5 space-y-3">
                  <h4 className="font-editorial text-xl font-semibold text-[#162C46]">
                    {lang === 'mr'
                      ? 'नैतिक चेंबर प्रतिज्ञा (ऐच्छिक — Ethical Chamber Supporter सूचीसाठी)'
                      : 'Ethical Chamber Pledge (Optional — to be listed as an Ethical Chamber Supporter)'}
                  </h4>
                  <div className="space-y-2.5 text-sm text-stone-800">
                    {ETHICAL_PLEDGES.map((pledge) => (
                      <label key={pledge.id} className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={srForm.ethicalPledges.includes(pledge.en)}
                          onChange={() =>
                            setSrForm({
                              ...srForm,
                              ethicalPledges: toggleArrayItem(srForm.ethicalPledges, pledge.en),
                            })
                          }
                          className="mt-1 rounded border-stone-300 text-[#0F1E36]"
                        />
                        <span>{lang === 'mr' ? pledge.mr : pledge.en}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-stone-200 pt-5 space-y-5">
                <label className="flex items-start gap-3 text-sm text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={srForm.consentAccepted}
                    onChange={(e) => setSrForm({ ...srForm, consentAccepted: e.target.checked })}
                    className="mt-1 rounded border-stone-300 text-[#0F1E36]"
                  />
                  <span>
                    {lang === 'mr'
                      ? 'मी प्रमाणित करतो/करते की दिलेली माहिती सत्य आहे. MAJAWA ही प्रस्तावित संघटना असून ज्येष्ठ समर्थकांना मतदान हक्क नाही याची मला जाणीव आहे.'
                      : 'I confirm that the information is true. I understand that MAJAWA is a proposed association and not yet registered, and that senior supporters do not vote. I consent to my details being used only for founding and membership purposes.'}
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-7 py-3 text-sm font-semibold bg-[#0F1E36] text-[#FBF9F5] rounded-md hover:bg-[#193054] disabled:opacity-60 transition-colors"
                >
                  {submitting
                    ? lang === 'mr'
                      ? 'सादर होत आहे...'
                      : 'Submitting...'
                    : lang === 'mr'
                    ? 'समर्थक नोंदणी सादर करा'
                    : 'SUBMIT SUPPORTER APPLICATION'}
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
