import React from 'react';
import type { Language, PageId } from '../types.ts';
import { SITE_COPY, t } from '../i18n/content.ts';

interface AboutPageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export function AboutPage({ lang, onNavigate }: AboutPageProps) {
  const a = SITE_COPY.about;
  const h = SITE_COPY.home;

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Page Masthead */}
        <header className="max-w-3xl space-y-4 border-b border-slate-200 pb-8">
          <p className="text-xs uppercase tracking-[0.14em] text-[#9A7823] font-semibold">
            {t(lang, SITE_COPY.statusBanner)}
          </p>
          <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-[#162C46]">
            {t(lang, a.title)}
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            {t(lang, a.subtitle)}
          </p>
        </header>

        {/* Introduction & Why Proposed */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-5">
            <h2 className="font-editorial text-3xl font-semibold text-[#162C46]">
              {t(lang, a.introTitle)}
            </h2>
            <p className="text-base text-slate-700 leading-relaxed">
              {t(lang, a.introBody1)}
            </p>
            <p className="text-base text-slate-700 leading-relaxed">
              {t(lang, a.introBody2)}
            </p>
          </div>

          <aside className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-md p-6 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.14em] text-[#9A7823] font-semibold">
              {lang === 'mr' ? 'संस्थात्मक तपशील' : 'Proposal Overview'}
            </h3>
            <dl className="divide-y divide-slate-200 text-sm">
              <div className="py-2.5 flex justify-between gap-4">
                <dt className="text-slate-500">{lang === 'mr' ? 'प्रस्तावित नाव' : 'Proposed Name'}</dt>
                <dd className="font-medium text-[#162C46] text-right">MAJAWA</dd>
              </div>
              <div className="py-2.5 flex justify-between gap-4">
                <dt className="text-slate-500">{lang === 'mr' ? 'प्रस्तावक' : 'Proposed By'}</dt>
                <dd className="font-medium text-[#162C46] text-right">Adv. Sarfaraz Shahezad Ansari</dd>
              </div>
              <div className="py-2.5 flex justify-between gap-4">
                <dt className="text-slate-500">{lang === 'mr' ? 'नोंदणी स्थिती' : 'Status'}</dt>
                <dd className="font-medium text-[#162C46] text-right">
                  {lang === 'mr' ? 'प्रस्तावित (नोंदणी बाकी)' : 'Proposed (Not Yet Registered)'}
                </dd>
              </div>
              <div className="py-2.5 flex justify-between gap-4">
                <dt className="text-slate-500">{lang === 'mr' ? 'प्रारंभिक क्षेत्र' : 'Starting Area'}</dt>
                <dd className="font-medium text-[#162C46] text-right">Bhiwandi, Kalyan & Thane</dd>
              </div>
              <div className="py-2.5 flex justify-between gap-4">
                <dt className="text-slate-500">{lang === 'mr' ? 'दीर्घकालीन दृष्टी' : 'Long-Term Vision'}</dt>
                <dd className="font-medium text-[#162C46] text-right">Maharashtra-wide</dd>
              </div>
            </dl>
          </aside>
        </section>

        {/* Vision & Mission */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-50 border border-slate-200 rounded-md p-7 space-y-3">
            <h2 className="font-editorial text-2xl font-semibold text-[#162C46]">
              {t(lang, h.visionTitle)}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {t(lang, h.visionBody)}
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-md p-7 space-y-3">
            <h2 className="font-editorial text-2xl font-semibold text-[#162C46]">
              {t(lang, h.missionTitle)}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {t(lang, h.missionBody)}
            </p>
          </div>
        </section>

        {/* Core Values */}
        <section className="space-y-6">
          <h2 className="font-editorial text-3xl font-semibold text-[#162C46]">
            {t(lang, a.valuesTitle)}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {a.values.map((val, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-md p-5 space-y-1.5"
              >
                <span className="text-xs font-semibold text-[#9A7823] tabular-nums">
                  0{idx + 1}
                </span>
                <p className="font-editorial text-xl font-semibold text-[#162C46]">
                  {t(lang, val)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Five-Point Institutional Position */}
        <section className="space-y-6">
          <h2 className="font-editorial text-3xl font-semibold text-[#162C46]">
            {t(lang, a.positionTitle)}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {a.positions.map((pos, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-md p-6 space-y-2">
                <h3 className="font-editorial text-xl font-semibold text-[#162C46]">
                  {t(lang, pos.title)}
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {t(lang, pos.desc)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5-Stage Roadmap */}
        <section className="space-y-6">
          <h2 className="font-editorial text-3xl font-semibold text-[#162C46]">
            {t(lang, a.roadmapTitle)}
          </h2>
          <div className="bg-white border border-slate-200 rounded-md overflow-hidden divide-y divide-slate-200">
            {a.roadmap.map((item, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 px-6 py-4">
                <div className="md:col-span-4 font-semibold text-sm text-[#162C46]">
                  {t(lang, item.stage)}
                </div>
                <p className="md:col-span-8 text-sm text-slate-700 leading-relaxed">
                  {t(lang, item.desc)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Commitment */}
        <section className="bg-slate-50 border border-slate-200 rounded-md p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#162C46]">
              {t(lang, a.commitmentTitle)}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {t(lang, a.commitmentBody)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              onNavigate('membership');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 text-sm font-semibold bg-[#162C46] text-white rounded-md hover:bg-[#1E3B5E] transition-colors whitespace-nowrap shrink-0"
          >
            {t(lang, SITE_COPY.nav.joinCta)}
          </button>
        </section>
      </div>
    </div>
  );
}
