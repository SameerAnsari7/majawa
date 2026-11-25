import React, { useState } from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';
import type { Language, PublicSummary } from '../types.ts';
import { ASSET_IMAGES, SITE_COPY, t } from '../i18n/content.ts';
import { EditorialImage } from '../components/BrandMark.tsx';

interface TrainingPageProps {
  lang: Language;
  summary: PublicSummary | null;
}

const TRAINING_AREAS = [
  { en: 'Legal drafting and pleading workshops', mr: 'कायदेशीर मसुदा व दावा लेखन कार्यशाळा' },
  { en: 'BNSS, BNS and BSA practical training', mr: 'BNSS, BNS आणि BSA व्यावहारिक प्रशिक्षण' },
  { en: 'Civil and criminal procedure workshops', mr: 'दिवाणी व फौजदारी प्रक्रिया कार्यशाळा' },
  { en: 'Moot court competitions', mr: 'अभिरूप न्यायालय (Moot Court) स्पर्धा' },
  { en: 'Mock trial practice', mr: 'सराव खटले (Mock Trials)' },
  { en: 'Legal research & database access', mr: 'कायदेशीर संशोधन व डेटाबेस प्रशिक्षण' },
  { en: 'English communication & legal writing', mr: 'इंग्रजी संवाद व कायदेशीर लेखन कौशल्य' },
  { en: 'Senior–junior mentorship programmes', mr: 'ज्येष्ठ-कनिष्ठ मार्गदर्शन कार्यक्रम' },
];

export function TrainingPage({ lang, summary }: TrainingPageProps) {
  const events = summary?.events ?? [];
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id ?? 'general-training');
  const [form, setForm] = useState({
    fullName: '',
    enrolmentNumber: '',
    mobile: '',
    email: '',
    courtDistrict: 'Bhiwandi / Thane / Kalyan',
    notes: '',
    websiteUrl: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [receiptId, setReceiptId] = useState<string | null>(null);

  const selectedEvent = events.find((e) => e.id === selectedEventId) ?? events[0];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);
    try {
      const eventTitle = selectedEvent
        ? lang === 'mr'
          ? selectedEvent.titleMr
          : selectedEvent.titleEn
        : 'General Training Programme Enquiry';
      const res = await fetch('/api/events/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: selectedEvent?.id || 'general-training',
          eventTitle,
          ...form,
        }),
      });
      const data = (await res.json()) as { referenceId?: string; error?: string };
      if (!res.ok) {
        setErrorMsg(data.error || 'Unable to submit registration enquiry.');
      } else {
        setReceiptId(data.referenceId || 'MAJ-EVT');
        setForm({
          fullName: '',
          enrolmentNumber: '',
          mobile: '',
          email: '',
          courtDistrict: 'Bhiwandi / Thane / Kalyan',
          notes: '',
          websiteUrl: '',
        });
      }
    } catch {
      setErrorMsg('Network error while submitting event enquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        <header className="max-w-3xl space-y-4 border-b border-stone-200 pb-8">
          <p className="text-xs uppercase tracking-[0.14em] text-[#9A7823] font-semibold">
            {t(lang, SITE_COPY.statusBanner)}
          </p>
          <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-[#162C46]">
            {lang === 'mr' ? 'प्रशिक्षण, कार्यशाळा आणि उपक्रम' : 'Training, Workshops & Events'}
          </h1>
          <p className="text-base sm:text-lg text-stone-700 leading-relaxed">
            {lang === 'mr'
              ? 'कनिष्ठ वकिलांचे व्यावहारिक कौशल्य, मसुदा लेखन आणि न्यायालयीन आत्मविश्वास वाढविण्यासाठी प्रस्तावित प्रशिक्षण कार्यक्रम.'
              : 'Proposed continuing legal education, practical drafting clinics, procedural training, and mentorship circles designed for advocates in their first seven years.'}
          </p>
        </header>

        {/* Curriculum & Editorial Image */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <h2 className="font-editorial text-3xl font-semibold text-[#162C46]">
              {lang === 'mr' ? 'प्रस्तावित प्रशिक्षण विषय' : 'Core Training & Mentorship Areas'}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-stone-700">
              {TRAINING_AREAS.map((area, idx) => (
                <li key={idx} className="bg-white border border-stone-200 rounded-md p-4 flex items-start gap-2.5">
                  <span className="text-xs font-semibold text-[#9A7823] tabular-nums mt-0.5">
                    0{idx + 1}
                  </span>
                  <span>{t(lang, area)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6">
            <EditorialImage
              src={ASSET_IMAGES.draftingWorkshop}
              alt="Legal drafting and advocacy workshop for junior advocates"
              caption={
                lang === 'mr'
                  ? 'प्रस्तावित मसुदा लेखन व कायदेशीर कार्यशाळा सत्र'
                  : 'Fig. 3 — Practical legal drafting, procedural clinics, and peer learning'
              }
              aspectClass="aspect-[4/3]"
            />
          </div>
        </section>

        {/* Proposed Calendar */}
        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.14em] text-[#9A7823] font-semibold">
              {lang === 'mr' ? 'नमुना / प्रस्तावित वेळापत्रक (तारखा व वक्ते लवकरच जाहीर होतील)' : 'Sample / Proposed Schedule — Dates & Speakers To Be Announced'}
            </p>
            <h2 className="font-editorial text-3xl font-semibold text-[#162C46]">
              {lang === 'mr' ? 'प्रस्तावित कार्यक्रम आणि कार्यशाळा' : 'Proposed Events & Workshops Calendar'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((evt) => (
              <article key={evt.id} className="bg-white border border-stone-200 rounded-md p-6 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <Calendar className="w-3.5 h-3.5 text-[#9A7823]" />
                    <span className="font-semibold text-[#9A7823]">
                      {lang === 'mr' ? evt.statusLabelMr : evt.statusLabelEn}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{evt.category}</span>
                  </div>
                  <h3 className="font-editorial text-2xl font-semibold text-[#162C46]">
                    {lang === 'mr' ? evt.titleMr : evt.titleEn}
                  </h3>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    {lang === 'mr' ? evt.descriptionMr : evt.descriptionEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-2 text-xs">
                  <span className="text-stone-500">{evt.targetRegion}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedEventId(evt.id);
                      document.getElementById('event-enquiry-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="font-semibold text-[#162C46] hover:text-[#9A7823] underline underline-offset-4"
                  >
                    {lang === 'mr' ? 'नोंदणी स्वारस्य' : 'Register Interest'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Event Registration Enquiry Form */}
        <section id="event-enquiry-form" className="max-w-3xl">
          <div className="bg-white border border-stone-200 rounded-md p-6 sm:p-8 space-y-6">
            <div className="space-y-1 border-b border-stone-200 pb-4">
              <h2 className="font-editorial text-3xl font-semibold text-[#162C46]">
                {lang === 'mr' ? 'कार्यशाळा व कार्यक्रम नोंदणी चौकशी' : 'Event Registration Enquiry Form'}
              </h2>
              <p className="text-sm text-stone-600">
                {lang === 'mr'
                  ? 'कार्यशाळांच्या तारखा निश्चित झाल्यावर तुम्हाला सूचित करण्यासाठी तुमचे नाव नोंदवा.'
                  : 'Register your interest to be notified when official session dates and venues are announced.'}
              </p>
            </div>

            {receiptId ? (
              <div className="p-5 rounded-md bg-[#F8FAFC] border border-stone-300 space-y-3">
                <div className="flex items-center gap-2 text-[#14532D] font-semibold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>
                    {lang === 'mr' ? 'कार्यक्रम नोंदणी स्वारस्य प्राप्त झाले' : 'Event Enquiry Received'} ·{' '}
                    <span className="tabular-nums">{receiptId}</span>
                  </span>
                </div>
                <p className="text-sm text-stone-700">
                  {lang === 'mr'
                    ? 'संबंधित कार्यशाळेची तारीख व वेळ निश्चित झाल्यावर तुमच्याशी संपर्क साधला जाईल.'
                    : 'Your interest has been recorded. Organisers will reach out once confirmed dates and speakers are scheduled.'}
                </p>
                <button
                  type="button"
                  onClick={() => setReceiptId(null)}
                  className="px-4 py-2 text-xs font-semibold bg-[#162C46] text-white rounded-md"
                >
                  {lang === 'mr' ? 'पुन्हा नोंदणी करा' : 'Register Another Session'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-5">
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.websiteUrl}
                    onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
                  />
                </div>

                {errorMsg && (
                  <div role="alert" className="p-3.5 rounded-md bg-red-50 border border-red-200 text-sm text-red-900">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    {lang === 'mr' ? 'प्रस्तावित कार्यक्रम / कार्यशाळा निवडा *' : 'Select Proposed Event / Workshop *'}
                  </label>
                  <select
                    value={selectedEventId}
                    onChange={(e) => setSelectedEventId(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF]"
                  >
                    {events.map((evt) => (
                      <option key={evt.id} value={evt.id}>
                        {lang === 'mr' ? evt.titleMr : evt.titleEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {lang === 'mr' ? 'पूर्ण नाव *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {lang === 'mr' ? 'नोंदणी क्रमांक (ऐच्छिक)' : 'Enrolment Number (Optional)'}
                    </label>
                    <input
                      type="text"
                      value={form.enrolmentNumber}
                      onChange={(e) => setForm({ ...form, enrolmentNumber: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {lang === 'mr' ? 'मोबाईल क्रमांक *' : 'Mobile Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.mobile}
                      onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {lang === 'mr' ? 'ईमेल *' : 'Email Address *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    {lang === 'mr' ? 'न्यायालय / जिल्हा *' : 'Court / District *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.courtDistrict}
                    onChange={(e) => setForm({ ...form, courtDistrict: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    {lang === 'mr' ? 'सुचवलेले विषय किंवा प्रश्न (ऐच्छिक)' : 'Suggested Topics or Questions (Optional)'}
                  </label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FBF9F5]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 text-sm font-semibold bg-[#0F1E36] text-[#FBF9F5] rounded-md hover:bg-[#193054] disabled:opacity-60"
                >
                  {submitting
                    ? lang === 'mr'
                      ? 'नोंदणी होत आहे...'
                      : 'Submitting...'
                    : lang === 'mr'
                    ? 'नोंदणी स्वारस्य पाठवा'
                    : 'Submit Event Enquiry'}
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
