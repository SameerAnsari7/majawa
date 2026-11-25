import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import type { Language } from '../types.ts';
import { SITE_COPY, t } from '../i18n/content.ts';

interface ContactPageProps {
  lang: Language;
}

export function ContactPage({ lang }: ContactPageProps) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    subject: '',
    message: '',
    websiteUrl: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [receiptId, setReceiptId] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.websiteUrl) return; // Honeypot spam protection
    setErrorMsg('');
    setSubmitting(true);

    try {
      // 1. Save to local/Render backend store (if active)
      let refId = `MAJ-CON-${Date.now().toString().slice(-5)}`;
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          const data = (await res.json()) as { referenceId?: string };
          if (data.referenceId) refId = data.referenceId;
        }
      } catch {
        // Ignore backend error if offline; FormSubmit will still deliver email
      }

      // 2. Send email directly via FormSubmit
      const mailRes = await fetch('https://formsubmit.co', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `MAJAWA Enquiry (${refId}): ${form.subject}`,
          _template: 'table',
          'Reference ID': refId,
          'Full Name': form.fullName,
          'Email Address': form.email,
          'Mobile Number': form.mobile || 'Not provided',
          Subject: form.subject,
          Message: form.message,
        }),
      });

      if (!mailRes.ok) {
        setErrorMsg('Unable to send enquiry email right now. Please try again.');
      } else {
        setReceiptId(refId);
        setForm({ fullName: '', email: '', mobile: '', subject: '', message: '', websiteUrl: '' });
      }
    } catch {
      setErrorMsg('Network error while submitting contact enquiry.');
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-14">
        <header className="max-w-3xl space-y-4 border-b border-stone-200 pb-8">
          <p className="text-xs uppercase tracking-[0.14em] text-[#9A7823] font-semibold">
            {t(lang, SITE_COPY.statusBanner)}
          </p>
          <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-[#162C46]">
            {lang === 'mr' ? 'संपर्क आणि चौकशी' : 'Contact & Enquiries'}
          </h1>
          <p className="text-base sm:text-lg text-stone-700 leading-relaxed">
            {lang === 'mr'
              ? 'संस्थापना मसुदा चर्चा, नोंदणीपूर्व सहभाग किंवा सर्वसाधारण चौकशीसाठी खालील तपशीलांद्वारे संपर्क साधा.'
              : 'Reach out regarding founding discussions, pre-registration enquiries, Ethical Chamber support, or general information.'}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Official & Founding Proposal Contact Details */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-stone-200 rounded-md p-6 sm:p-7 space-y-4">
              <h2 className="font-editorial text-2xl font-semibold text-[#162C46] border-b border-stone-200 pb-3">
                {lang === 'mr' ? 'संस्था संपर्क तपशील' : 'Organisation Information'}
              </h2>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-[0.12em] text-stone-500 font-semibold">
                    {lang === 'mr' ? 'संघटना' : 'Organisation'}
                  </dt>
                  <dd className="font-semibold text-[#162C46] mt-1">
                    {t(lang, SITE_COPY.orgFullName)} (MAJAWA)
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.12em] text-stone-500 font-semibold">
                    {lang === 'mr' ? 'प्रस्तावित कार्यालय' : 'Proposed Office'}
                  </dt>
                  <dd className="text-stone-700 mt-1">{t(lang, SITE_COPY.proposedOffice)}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.12em] text-stone-500 font-semibold">
                    {lang === 'mr' ? 'प्रस्तावक (संस्थापना मसुदा)' : 'Proposed By (Founding Proposal)'}
                  </dt>
                  <dd className="text-stone-700 mt-1">
                    Adv. Sarfaraz Shahezad Ansari, Advocate, Bhiwandi
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.12em] text-stone-500 font-semibold">
                    {lang === 'mr' ? 'प्रस्तावक मोबाईल' : 'Proposer Mobile'}
                  </dt>
                  <dd className="text-stone-700 mt-1 tabular-nums">9323268400</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.12em] text-stone-500 font-semibold">
                    {lang === 'mr' ? 'प्रस्तावक ईमेल' : 'Proposer Email'}
                  </dt>
                  <dd className="text-stone-700 mt-1">saz.9323268400@gmail.com</dd>
                </div>
                <div className="pt-3 border-t border-stone-200">
                  <dt className="text-xs uppercase tracking-[0.12em] text-stone-500 font-semibold">
                    {lang === 'mr' ? 'अधिकृत पदाधिकारी व कार्यालयाचा पत्ता' : 'Official Association Office Bearers & Office Helpline'}
                  </dt>
                  <dd className="text-stone-600 mt-1">
                    {lang === 'mr'
                      ? 'नोंदणीनंतर जाहीर केले जातील (To be announced after registration)'
                      : 'To be announced upon formal association registration.'}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>

          {/* Contact Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-stone-200 rounded-md p-6 sm:p-8 space-y-6">
              <h2 className="font-editorial text-3xl font-semibold text-[#162C46] border-b border-stone-200 pb-3">
                {lang === 'mr' ? 'ऑनलाइन संपर्क अर्ज' : 'Send an Enquiry'}
              </h2>

              {receiptId ? (
                <div className="p-5 rounded-md bg-[#F8FAFC] border border-stone-300 space-y-3">
                  <div className="flex items-center gap-2 text-[#14532D] font-semibold text-sm">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>
                      {lang === 'mr' ? 'संदेश प्राप्त झाला' : 'Enquiry Received'} ·{' '}
                      <span className="tabular-nums">{receiptId}</span>
                    </span>
                  </div>
                  <p className="text-sm text-stone-700">
                    {lang === 'mr'
                      ? 'तुमचा संदेश जतन केला आहे. लवकरच योग्य तो प्रतिसाद दिला जाईल.'
                      : 'Thank you for contacting MAJAWA. Your enquiry has been recorded.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setReceiptId(null)}
                    className="px-4 py-2 text-xs font-semibold bg-[#162C46] text-white rounded-md"
                  >
                    {lang === 'mr' ? 'नवीन संदेश पाठवा' : 'Send Another Message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        {lang === 'mr' ? 'मोबाईल क्रमांक (ऐच्छिक)' : 'Mobile Number (Optional)'}
                      </label>
                      <input
                        type="tel"
                        value={form.mobile}
                        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        {lang === 'mr' ? 'विषय *' : 'Subject *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      {lang === 'mr' ? 'संदेश *' : 'Message *'}
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3 text-sm font-semibold bg-[#162C46] text-[#FFFFFF] rounded-md hover:bg-[#193054] disabled:opacity-60"
                  >
                    {submitting
                      ? lang === 'mr'
                        ? 'पाठवत आहे...'
                        : 'Sending...'
                      : lang === 'mr'
                      ? 'संदेश पाठवा'
                      : 'Send Enquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
