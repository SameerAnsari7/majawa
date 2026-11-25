import React from 'react';
import type { Language, PageId } from '../types.ts';
import { ASSET_IMAGES, SITE_COPY, t } from '../i18n/content.ts';
import { EditorialImage } from '../components/BrandMark.tsx';

interface WelfarePageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export function WelfarePage({ lang, onNavigate }: WelfarePageProps) {
  const w = SITE_COPY.welfare;

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        <header className="max-w-3xl space-y-4 border-b border-slate-200 pb-8">
          <p className="text-xs uppercase tracking-[0.14em] text-[#9A7823] font-semibold">
            {t(lang, w.proposedTag)}
          </p>
          <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-[#162C46]">
            {t(lang, w.title)}
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            {t(lang, w.subtitle)}
          </p>
        </header>

        {/* Context & Rationale */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <h2 className="font-editorial text-3xl font-semibold text-[#162C46]">
              {lang === 'mr'
                ? 'प्रारंभिक वकिलीतील आर्थिक असुरक्षितता आणि सन्मानाची गरज'
                : 'Why Structured Welfare Matters in the First Seven Years'}
            </h2>
            <p className="text-base text-slate-700 leading-relaxed">
              {lang === 'mr'
                ? 'अनेक कनिष्ठ वकील संपूर्ण कुटुंबाची जबाबदारी सांभाळून अत्यंत तुटपुंज्या मानधनावर किंवा विनामूल्य काम करतात. न्यायालयीन खर्च परत न मिळाल्यास आणि वैद्यकीय संकट आल्यास त्यांचे आर्थिक कंबरडे मोडते.'
                : 'Consider an advocate in their thirties who is the sole earner for a family. Surviving on ₹5,000 a month—or zero stipend while paying filing and travel costs out of pocket—pushes talented young lawyers out of the profession not for lack of ability, but for lack of basic fairness.'}
            </p>
            <p className="text-base text-slate-700 leading-relaxed">
              {lang === 'mr'
                ? 'MAJAWA चा प्रस्तावित कल्याणकारी आराखडा हा नियमित मानधन, स्वतंत्र आपत्कालीन निधी, विमा सुविधा, नैतिक मार्गदर्शन आणि कायदेशीर संदर्भ साधनांची उपलब्धता यावर आधारित आहे.'
                : 'MAJAWA’s welfare framework combines fair engagement standards with an Emergency Assistance Fund, insurance exploration, senior mentorship, and shared legal resources. Every initiative listed below is currently proposed and will be implemented strictly following registration and formal approval.'}
            </p>
          </div>
          <div className="lg:col-span-6">
            <EditorialImage
              src={ASSET_IMAGES.mentorshipLibrary}
              alt="Advocates discussing legal briefs and chamber welfare"
              caption={
                lang === 'mr'
                  ? 'प्रस्तावित नैतिक चेंबर मार्गदर्शन व कल्याण आराखडा'
                  : 'Fig. 2 — Fair chamber engagement and sustained professional mentorship'
              }
              aspectClass="aspect-[4/3]"
            />
          </div>
        </section>

        {/* OUR PROPOSED WELFARE INITIATIVES */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-[#9A7823] font-semibold">
                {t(lang, w.proposedTag)}
              </p>
              <h2 className="font-editorial text-3xl font-semibold text-[#162C46] mt-1">
                {t(lang, w.sectionTitle)}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {w.initiatives.map((item, idx) => (
              <article
                key={idx}
                className="bg-slate-50/70 border border-slate-200 rounded-md p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <span className="font-semibold text-[#9A7823]">
                      {lang === 'mr' ? 'प्रस्तावित उपक्रम' : 'Proposed Initiative'}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{t(lang, item.focus)}</span>
                  </div>
                  <h3 className="font-editorial text-2xl font-semibold text-[#162C46]">
                    {t(lang, item.title)}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {t(lang, item.desc)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-slate-50 border border-slate-200 rounded-md p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-slate-700 max-w-2xl">
            {lang === 'mr'
              ? 'तुम्ही ७ वर्षांपेक्षा कमी अनुभव असलेले कनिष्ठ वकील किंवा नैतिक चेंबर समर्थक ज्येष्ठ वकील असल्यास नोंदणीपूर्व प्रक्रियेत सहभागी व्हा.'
              : 'Interested in shaping these proposed welfare initiatives as a founding member or Ethical Chamber Supporter?'}
          </p>
          <button
            type="button"
            onClick={() => {
              onNavigate('membership');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-2.5 text-sm font-semibold bg-[#162C46] text-white rounded-md hover:bg-[#1E3B5E] whitespace-nowrap shrink-0"
          >
            {t(lang, SITE_COPY.nav.joinCta)}
          </button>
        </section>
      </div>
    </div>
  );
}
