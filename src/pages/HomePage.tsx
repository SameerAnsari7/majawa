import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { Language, PageId, PublicSummary } from '../types.ts';
import { ASSET_IMAGES, SITE_COPY, t } from '../i18n/content.ts';
import { EditorialImage, MajawaCrest } from '../components/BrandMark.tsx';

interface HomePageProps {
  lang: Language;
  summary: PublicSummary | null;
  onNavigate: (page: PageId) => void;
}

export function HomePage({ lang, summary, onNavigate }: HomePageProps) {
  const h = SITE_COPY.home;
  const go = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const foundingCount = summary?.foundingInterestCount ?? 0;
  const foundingTarget = summary?.foundingTarget ?? 11;

  return (
    <div>
      {/* Clean Institutional Hero with Uploaded Crest + Full Organisation Name */}
      <section className="bg-white text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Hero Copy & Full-Name Brand Lockup */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                {/* Prominent Home Page Logo + Full Name */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-5 border-b border-slate-200">
                  <MajawaCrest className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 border border-slate-200" />
                  <div className="space-y-1">
                    <p className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-[#162C46] uppercase">
                      Maharashtra Junior Advocates Welfare Association
                    </p>
                    {lang === 'mr' && (
                      <p className="text-base font-semibold text-[#162C46]">
                        महाराष्ट्र कनिष्ठ वकील कल्याण संघटना (MAJAWA)
                      </p>
                    )}
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9A7823]">
                      {lang === 'en' ? 'MAJAWA · ' : ''}
                      {t(lang, h.kicker)}
                    </p>
                  </div>
                </div>

                <h1 className="font-editorial text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold leading-[1.12] tracking-tight text-balance text-[#162C46]">
                  {t(lang, h.heroTitle)}
                </h1>
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl">
                  {t(lang, h.heroSubheading)}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed max-w-2xl border-t border-slate-200 pt-4">
                  {t(lang, h.coreInsight)}
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm border-t border-b border-slate-200 py-4">
                  <span className="font-editorial italic text-lg font-semibold text-[#162C46]">
                    “{SITE_COPY.sloganEn}”
                  </span>
                  <span className="hidden sm:inline text-slate-300" aria-hidden="true">
                    ·
                  </span>
                  <span className="text-slate-700 font-medium">
                    “{SITE_COPY.sloganMr}”
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => go('membership')}
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-[#162C46] text-white rounded-md hover:bg-[#1E3B5E] transition-colors whitespace-nowrap"
                  >
                    {t(lang, h.btnBecomeMember)}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go('objectives')}
                    className="inline-flex items-center px-5 py-3 text-sm font-medium border border-slate-300 bg-white text-[#162C46] rounded-md hover:bg-slate-50 transition-colors whitespace-nowrap"
                  >
                    {t(lang, h.btnExploreMission)}
                  </button>
                  <button
                    type="button"
                    onClick={() => go('contact')}
                    className="inline-flex items-center px-4 py-3 text-sm font-medium text-[#162C46] hover:text-[#9A7823] underline underline-offset-4 transition-colors whitespace-nowrap"
                  >
                    {t(lang, h.btnContactUs)}
                  </button>
                </div>
              </div>
            </div>

            {/* Hero Visual Frame */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="flex-1 flex flex-col rounded-md overflow-hidden border border-slate-200 bg-slate-50">
                <div className="relative flex-1 min-h-[260px] lg:min-h-[360px]">
                  <img
                    src={ASSET_IMAGES.courthouseHero}
                    alt="Indian Courthouse Stone Colonnade Architecture"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 sm:p-5 bg-white border-t border-slate-200 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold text-[#162C46]">
                      {t(lang, SITE_COPY.orgFullName)}
                    </p>
                    <p className="text-xs text-slate-600">
                      {t(lang, SITE_COPY.proposedBy)}
                    </p>
                  </div>
                  <MajawaCrest className="w-12 h-12 shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Utility Ribbon */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div>
              <dt className="text-xs uppercase tracking-[0.12em] text-slate-500 font-medium">
                {t(lang, h.utilityStrip.areaLabel)}
              </dt>
              <dd className="text-sm font-semibold text-[#162C46] mt-1">
                {t(lang, h.utilityStrip.areaValue)}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.12em] text-slate-500 font-medium">
                {t(lang, h.utilityStrip.eligLabel)}
              </dt>
              <dd className="text-sm font-semibold text-[#162C46] mt-1">
                {t(lang, h.utilityStrip.eligValue)}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.12em] text-slate-500 font-medium">
                {t(lang, h.utilityStrip.feeLabel)}
              </dt>
              <dd className="text-sm font-semibold text-[#162C46] mt-1 tabular-nums">
                {t(lang, h.utilityStrip.feeValue)}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.12em] text-slate-500 font-medium">
                {t(lang, h.utilityStrip.cohortLabel)}
              </dt>
              <dd className="text-sm font-semibold text-[#162C46] mt-1 tabular-nums">
                {t(lang, h.utilityStrip.cohortValue)}{' '}
                <span className="text-slate-500 font-normal">
                  ({foundingCount}/{foundingTarget} {lang === 'mr' ? 'नोंदवलेले' : 'recorded'})
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Why MAJAWA? + 4 Core Pillars */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-[#9A7823] font-semibold">
                  {lang === 'mr' ? 'संस्थापनेचा उद्देश' : 'Institutional Purpose'}
                </p>
                <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#162C46] mt-2">
                  {t(lang, h.whyTitle)}
                </h2>
              </div>
              <p className="text-base text-slate-700 leading-relaxed">
                {t(lang, h.whyBody1)}
              </p>
              <p className="text-base text-slate-700 leading-relaxed">
                {t(lang, h.whyBody2)}
              </p>
              <EditorialImage
                src={ASSET_IMAGES.mentorshipLibrary}
                alt="Senior and junior advocates reviewing legal briefs in chamber"
                caption={
                  lang === 'mr'
                    ? 'चित्र १ — ज्येष्ठ-कनिष्ठ संवाद आणि चेंबरमधील कायदेशीर मार्गदर्शन'
                    : 'Fig. 1 — Constructive chamber mentorship and dignified professional training'
                }
                aspectClass="aspect-[4/3]"
              />
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {h.pillars.map((pillar) => (
                <div
                  key={pillar.num}
                  className="bg-slate-50/70 border border-slate-200 rounded-md p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <span className="text-xs font-semibold tracking-[0.14em] text-[#9A7823] tabular-nums">
                      {pillar.num}
                    </span>
                    <h3 className="font-editorial text-2xl font-semibold text-[#162C46]">
                      {t(lang, pillar.title)}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {t(lang, pillar.desc)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What Juniors Actually Face (PDF Section 2) */}
      <section className="py-16 lg:py-20 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs uppercase tracking-[0.14em] text-[#9A7823] font-semibold">
              {lang === 'mr' ? 'संस्थापना प्रस्तावातील वस्तुस्थिती' : 'From the Founding Proposal'}
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#162C46]">
              {t(lang, h.realityTitle)}
            </h2>
            <p className="text-base text-slate-700 leading-relaxed">
              {t(lang, h.realitySubtitle)}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
            <div className="divide-y divide-slate-200">
              {h.realities.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 px-6 py-4 items-baseline"
                >
                  <div className="md:col-span-4 flex items-baseline gap-3">
                    <span className="text-xs font-semibold text-[#9A7823] tabular-nums">
                      0{idx + 1}.
                    </span>
                    <h3 className="text-sm font-semibold text-[#162C46]">
                      {t(lang, row.problem)}
                    </h3>
                  </div>
                  <p className="md:col-span-8 text-sm text-slate-700 leading-relaxed">
                    {t(lang, row.practice)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission & Closing Quote */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50/70 border border-slate-200 rounded-md p-8 space-y-3">
              <p className="text-xs uppercase tracking-[0.14em] text-[#9A7823] font-semibold">
                01 · {lang === 'mr' ? 'दृष्टी' : 'Direction'}
              </p>
              <h2 className="font-editorial text-3xl font-semibold text-[#162C46]">
                {t(lang, h.visionTitle)}
              </h2>
              <p className="text-base text-slate-700 leading-relaxed">
                {t(lang, h.visionBody)}
              </p>
            </div>

            <div className="bg-slate-50/70 border border-slate-200 rounded-md p-8 space-y-3">
              <p className="text-xs uppercase tracking-[0.14em] text-[#9A7823] font-semibold">
                02 · {lang === 'mr' ? 'कार्यपद्धती' : 'Mandate'}
              </p>
              <h2 className="font-editorial text-3xl font-semibold text-[#162C46]">
                {t(lang, h.missionTitle)}
              </h2>
              <p className="text-base text-slate-700 leading-relaxed">
                {t(lang, h.missionBody)}
              </p>
            </div>
          </div>

          <blockquote className="max-w-4xl mx-auto text-center py-8 border-t border-b border-slate-200 space-y-5">
            <p className="font-editorial italic text-2xl sm:text-3xl text-[#162C46] leading-snug text-balance">
              {t(lang, h.closingQuote)}
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => go('membership')}
                className="px-6 py-2.5 text-sm font-semibold bg-[#162C46] text-white rounded-md hover:bg-[#1E3B5E] transition-colors"
              >
                {t(lang, h.btnBecomeMember)}
              </button>
              <button
                type="button"
                onClick={() => go('grievance')}
                className="px-6 py-2.5 text-sm font-medium border border-slate-300 bg-white text-[#162C46] rounded-md hover:bg-slate-50 transition-colors"
              >
                {t(lang, SITE_COPY.nav.grievance)}
              </button>
            </div>
          </blockquote>
        </div>
      </section>
    </div>
  );
}
