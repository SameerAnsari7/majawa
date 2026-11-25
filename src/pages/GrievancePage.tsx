import React, { useState } from 'react';
import { Lock, ShieldCheck } from 'lucide-react';
import type { Language } from '../types.ts';
import { SITE_COPY, t } from '../i18n/content.ts';

interface GrievancePageProps {
  lang: Language;
}

const CONCERN_TYPES = [
  'Non-payment or withholding of agreed remuneration',
  'Unreimbursed out-of-pocket court/filing expenses',
  'Unfair working arrangements / lack of written terms',
  'Workplace harassment, intimidation or defamation',
  'Interference with independent clients after leaving chamber',
  'Mentorship or professional guidance request',
  'Other professional welfare concern',
];

export function GrievancePage({ lang }: GrievancePageProps) {
  const g = SITE_COPY.grievance;

  const [form, setForm] = useState({
    nameOptional: '',
    contactDetails: '',
    district: 'Thane (Bhiwandi / Kalyan / Thane)',
    natureOfConcern: CONCERN_TYPES[0],
    briefDescription: '',
    preferredContactMethod: 'phone' as 'phone' | 'whatsapp' | 'email' | 'in_person',
    disclaimerAccepted: false,
    websiteUrl: '', // honeypot
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/grievance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { referenceId?: string; error?: string };
      if (!res.ok) {
        setErrorMsg(data.error || 'Could not submit enquiry. Please review the required fields.');
      } else {
        setSubmittedRef(data.referenceId || 'MAJ-GRV');
        setForm({
          nameOptional: '',
          contactDetails: '',
          district: 'Thane (Bhiwandi / Kalyan / Thane)',
          natureOfConcern: CONCERN_TYPES[0],
          briefDescription: '',
          preferredContactMethod: 'phone',
          disclaimerAccepted: false,
          websiteUrl: '',
        });
      }
    } catch {
      setErrorMsg('Network error while submitting confidential enquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-14">
        <header className="max-w-3xl space-y-4 border-b border-stone-200 pb-8">
          <p className="text-xs uppercase tracking-[0.14em] text-[#9A7823] font-semibold">
            {lang === 'mr' ? 'गोपनीय तक्रार निवारण व मार्गदर्शन' : 'Confidential Support & Guidance'}
          </p>
          <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-[#162C46]">
            {t(lang, g.heading)}
          </h1>
          <p className="text-base sm:text-lg text-stone-700 leading-relaxed">
            {t(lang, g.intro)}
          </p>
        </header>

        {/* Matters Covered & 6-Step Confidential Process */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-stone-200 rounded-md p-6 space-y-4">
              <h2 className="font-editorial text-2xl font-semibold text-[#162C46]">
                {t(lang, g.concernsTitle)}
              </h2>
              <ul className="space-y-3 text-sm text-stone-700 leading-relaxed">
                {g.concerns.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#9A7823] font-semibold">·</span>
                    <span>{t(lang, item)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#F8FAFC] border border-stone-300 rounded-md p-6 space-y-3">
              <div className="flex items-center gap-2 text-[#162C46]">
                <Lock className="w-4 h-4 shrink-0" />
                <h3 className="text-xs font-semibold uppercase tracking-[0.12em]">
                  {lang === 'mr' ? 'वैधानिक अस्वीकरण' : 'Statutory Disclaimer'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                {t(lang, g.disclaimer)}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-editorial text-3xl font-semibold text-[#162C46]">
              {t(lang, g.processTitle)}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {g.processSteps.map((st) => (
                <div key={st.step} className="bg-white border border-stone-200 rounded-md p-5 space-y-1.5">
                  <span className="text-xs font-semibold tracking-[0.14em] text-[#9A7823] tabular-nums">
                    {st.step}
                  </span>
                  <h3 className="font-editorial text-xl font-semibold text-[#162C46]">
                    {t(lang, st.title)}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{t(lang, st.desc)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Confidential Preliminary Grievance Enquiry Form */}
        <section className="max-w-4xl">
          <div className="bg-white border border-stone-200 rounded-md p-6 sm:p-8 space-y-6">
            <div className="space-y-2 border-b border-stone-200 pb-4">
              <h2 className="font-editorial text-3xl font-semibold text-[#162C46]">
                {lang === 'mr' ? 'प्राथमिक गोपनीय तक्रार / सहाय्य चौकशी अर्ज' : 'Preliminary Confidential Grievance Enquiry Form'}
              </h2>
              <p className="text-sm text-stone-600">
                {t(lang, g.privacyReminder)}
              </p>
            </div>

            {submittedRef ? (
              <div className="p-6 rounded-md bg-[#F8FAFC] border border-stone-300 space-y-3">
                <div className="flex items-center gap-2 text-[#14532D] font-semibold text-sm">
                  <ShieldCheck className="w-5 h-5" />
                  <span>
                    {lang === 'mr' ? 'गोपनीय चौकशी नोंदवली गेली' : 'Confidential Enquiry Securely Recorded'} ·{' '}
                    <span className="tabular-nums">{submittedRef}</span>
                  </span>
                </div>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {lang === 'mr'
                    ? 'तुमची प्राथमिक चौकशी गोपनीय स्वरूपात जतन करण्यात आली आहे. तक्रारी सार्वजनिक केल्या जात नाहीत. संदर्भ क्रमांक जतन करा.'
                    : 'Your preliminary enquiry has been stored securely for restricted committee review only. Complaints are never publicly displayed or opened for comments.'}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmittedRef(null)}
                  className="px-4 py-2 text-xs font-semibold bg-[#162C46] text-white rounded-md"
                >
                  {lang === 'mr' ? 'नवीन चौकशी नोंदवा' : 'Submit Another Enquiry'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="hidden" aria-hidden="true">
                  <label>
                    Website URL
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.websiteUrl}
                      onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
                    />
                  </label>
                </div>

                {errorMsg && (
                  <div role="alert" className="p-4 rounded-md bg-red-50 border border-red-200 text-sm text-red-900">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {lang === 'mr' ? 'नाव (प्राथमिक चौकशीसाठी ऐच्छिक)' : 'Name (Optional for Initial Enquiry)'}
                    </label>
                    <input
                      type="text"
                      value={form.nameOptional}
                      onChange={(e) => setForm({ ...form, nameOptional: e.target.value })}
                      placeholder={lang === 'mr' ? 'ऐच्छिक' : 'Optional'}
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {lang === 'mr' ? 'संपर्क तपशील (मोबाईल / ईमेल) *' : 'Contact Details (Phone / Email) *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.contactDetails}
                      onChange={(e) => setForm({ ...form, contactDetails: e.target.value })}
                      placeholder={lang === 'mr' ? 'सुरक्षित मोबाईल किंवा ईमेल' : 'Mobile number or email'}
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {lang === 'mr' ? 'जिल्हा / न्यायालय परिसर *' : 'District / Court Area *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.district}
                      onChange={(e) => setForm({ ...form, district: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {lang === 'mr' ? 'संपर्काचे पसंतीचे माध्यम *' : 'Preferred Contact Method *'}
                    </label>
                    <select
                      value={form.preferredContactMethod}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          preferredContactMethod: e.target.value as 'phone' | 'whatsapp' | 'email' | 'in_person',
                        })
                      }
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF]"
                    >
                      <option value="phone">Phone Call</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="email">Email</option>
                      <option value="in_person">In-Person Discussion (By Appointment)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    {lang === 'mr' ? 'समस्येचे स्वरूप *' : 'Nature of Concern *'}
                  </label>
                  <select
                    value={form.natureOfConcern}
                    onChange={(e) => setForm({ ...form, natureOfConcern: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF]"
                  >
                    {CONCERN_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    {lang === 'mr'
                      ? 'संक्षिप्त वर्णन * (कृपया पासवर्ड किंवा आधार क्रमांक लिहू नका)'
                      : 'Brief Description * (Do not include passwords or Aadhaar numbers)'}
                  </label>
                  <textarea
                    required
                    rows={5}
                    minLength={20}
                    value={form.briefDescription}
                    onChange={(e) => setForm({ ...form, briefDescription: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF]"
                  />
                </div>

                <label className="flex items-start gap-3 text-xs sm:text-sm text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={form.disclaimerAccepted}
                    onChange={(e) => setForm({ ...form, disclaimerAccepted: e.target.checked })}
                    className="mt-1 rounded border-stone-300 text-[#162C46]"
                  />
                  <span>{t(lang, g.disclaimer)}</span>
                </label>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 text-sm font-semibold bg-[#162C46] text-[#FFFFFF] rounded-md hover:bg-[#193054] disabled:opacity-60"
                >
                  {submitting
                    ? lang === 'mr'
                      ? 'पाठवत आहे...'
                      : 'Submitting...'
                    : lang === 'mr'
                    ? 'गोपनीय चौकशी सादर करा'
                    : 'Submit Confidential Enquiry'}
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
