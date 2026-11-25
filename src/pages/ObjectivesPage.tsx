import React from 'react';
import type { Language, PageId } from '../types.ts';
import { SITE_COPY, t } from '../i18n/content.ts';

interface ObjectivesPageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export function ObjectivesPage({ lang, onNavigate }: ObjectivesPageProps) {
  const o = SITE_COPY.objectives;

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        <header className="max-w-3xl space-y-4 border-b border-slate-200 pb-8">
          <p className="text-xs uppercase tracking-[0.14em] text-[#9A7823] font-semibold">
            {t(lang, SITE_COPY.statusBanner)}
          </p>
          <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-[#162C46]">
            {t(lang, o.title)}
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            {t(lang, o.subtitle)}
          </p>
        </header>

        {/* Four Objective Pillars A, B, C, D */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {o.groups.map((grp) => (
            <div key={grp.code} className="bg-white border border-slate-200 rounded-md p-7 space-y-4">
              <div className="flex items-baseline gap-3 border-b border-slate-200 pb-3">
                <span className="text-sm font-semibold text-[#9A7823] tracking-wider">
                  {grp.code}.
                </span>
                <h2 className="font-editorial text-2xl font-semibold text-[#162C46]">
                  {t(lang, grp.title)}
                </h2>
              </div>
              <ul className="space-y-3 text-sm text-slate-700 leading-relaxed">
                {grp.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#9A7823] font-semibold mt-0.5 tabular-nums">·</span>
                    <span>{t(lang, item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Proposed 10-Point Junior Advocates' Rights Charter */}
        <section className="bg-slate-50 border border-slate-200 rounded-md p-7 sm:p-10 space-y-6">
          <div className="space-y-2 border-b border-slate-200 pb-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#9A7823] font-semibold">
              {lang === 'mr' ? 'मसुदा प्रस्ताव कलम ५' : 'Founding Proposal Section 5'}
            </p>
            <h2 className="font-editorial text-3xl font-semibold text-[#162C46]">
              {t(lang, o.charterTitle)}
            </h2>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            {o.charterItems.map((item, idx) => (
              <li key={idx} className="flex items-baseline gap-3 text-sm sm:text-base text-slate-800 leading-relaxed">
                <span className="font-semibold text-[#162C46] tabular-nums shrink-0">
                  {String(idx + 1).padStart(2, '0')}.
                </span>
                <span>{t(lang, item)}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* What MAJAWA Will Never Do */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="font-editorial text-3xl font-semibold text-[#162C46]">
              {t(lang, o.neverTitle)}
            </h2>
            <p className="text-base text-slate-700">
              {t(lang, o.neverSubtitle)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {o.neverItems.map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-md p-5 space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9A7823]">
                  {lang === 'mr' ? `मर्यादा ०${idx + 1}` : `Boundary 0${idx + 1}`}
                </span>
                <p className="text-sm text-slate-700 leading-relaxed">{t(lang, item)}</p>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={() => {
                onNavigate('welfare');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-2.5 text-sm font-semibold bg-[#162C46] text-white rounded-md hover:bg-[#1E3B5E] transition-colors"
            >
              {lang === 'mr' ? 'कनिष्ठ कल्याण उपक्रम पहा' : 'Explore Proposed Welfare Initiatives'}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
