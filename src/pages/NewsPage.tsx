import React, { useState } from 'react';
import type { AnnouncementItem, Language } from '../types.ts';
import { SITE_COPY, t } from '../i18n/content.ts';

interface NewsPageProps {
  lang: Language;
  announcements: AnnouncementItem[];
}

const CATEGORIES: { id: 'all' | AnnouncementItem['category']; en: string; mr: string }[] = [
  { id: 'all', en: 'All Updates', mr: 'सर्व अद्यतने' },
  { id: 'association', en: 'Association', mr: 'संघटना सूचना' },
  { id: 'membership', en: 'Membership', mr: 'सदस्यत्व' },
  { id: 'welfare', en: 'Welfare', mr: 'कल्याण' },
  { id: 'training', en: 'Training', mr: 'प्रशिक्षण' },
  { id: 'representation', en: 'Representations', mr: 'निवेदने' },
  { id: 'legal_updates', en: 'Bar & Legal Updates', mr: 'बार कौन्सिल व कायदा' },
];

export function NewsPage({ lang, announcements }: NewsPageProps) {
  const [filter, setFilter] = useState<'all' | AnnouncementItem['category']>('all');

  const filtered =
    filter === 'all' ? announcements : announcements.filter((a) => a.category === filter);

  const categoryLabel = (cat: AnnouncementItem['category']) => {
    const found = CATEGORIES.find((c) => c.id === cat);
    return found ? (lang === 'mr' ? found.mr : found.en) : cat;
  };

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <header className="max-w-3xl space-y-4 border-b border-stone-200 pb-8">
          <p className="text-xs uppercase tracking-[0.14em] text-[#9A7823] font-semibold">
            {t(lang, SITE_COPY.statusBanner)}
          </p>
          <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-[#162C46]">
            {lang === 'mr' ? 'बातम्या, सूचना आणि अद्यतने' : 'News, Announcements & Legal Updates'}
          </h1>
          <p className="text-base sm:text-lg text-stone-700 leading-relaxed">
            {lang === 'mr'
              ? 'संघटना सूचना, सदस्यत्व माहिती, कल्याण उपक्रम, प्रशिक्षण कार्यक्रम आणि बार कौन्सिल परिपत्रकांची अधिकृत नोंद.'
              : 'Association announcements, membership notices, welfare updates, training notifications, and sourced Bar Council or legal developments.'}
          </p>
        </header>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-stone-200/75 rounded-md w-fit">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilter(cat.id)}
              className={`px-3.5 py-2 text-xs font-medium rounded-sm transition-colors whitespace-nowrap ${
                filter === cat.id
                  ? 'bg-[#162C46] text-[#FBF9F5]'
                  : 'text-stone-700 hover:text-[#162C46]'
              }`}
            >
              {lang === 'mr' ? cat.mr : cat.en}
            </button>
          ))}
        </div>

        {/* Announcements List */}
        {filtered.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-md p-10 text-center text-sm text-stone-600">
            {lang === 'mr'
              ? 'या श्रेणीमध्ये सध्या कोणतीही सूचना उपलब्ध नाही.'
              : 'No announcements published under this category yet.'}
          </div>
        ) : (
          <div className="space-y-6">
            {filtered.map((item) => (
              <article
                key={item.id}
                className="bg-white border border-stone-200 rounded-md p-6 sm:p-8 space-y-3"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                  <span className="font-semibold text-[#9A7823]">{categoryLabel(item.category)}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={item.publicationDate} className="tabular-nums">
                    {item.publicationDate}
                  </time>
                  <span aria-hidden="true">·</span>
                  <span>
                    {lang === 'mr' ? 'संदर्भ:' : 'Source:'} {item.sourceReference}
                  </span>
                </div>
                <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#162C46]">
                  {lang === 'mr' ? item.titleMr : item.titleEn}
                </h2>
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed max-w-4xl">
                  {lang === 'mr' ? item.summaryMr : item.summaryEn}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
