import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { Language, PageId } from '../types.ts';
import { SITE_COPY, t } from '../i18n/content.ts';
import { MajawaCrest } from './BrandMark.tsx';

interface HeaderProps {
  currentPage: PageId;
  lang: Language;
  onNavigate: (page: PageId) => void;
  onToggleLang: (lang: Language) => void;
}

const NAV_ITEMS: { id: PageId; label: { en: string; mr: string } }[] = [
  { id: 'home', label: SITE_COPY.nav.home },
  { id: 'about', label: SITE_COPY.nav.about },
  { id: 'objectives', label: SITE_COPY.nav.objectives },
  { id: 'welfare', label: SITE_COPY.nav.welfare },
  { id: 'membership', label: SITE_COPY.nav.membership },
  { id: 'grievance', label: SITE_COPY.nav.grievance },
  { id: 'training', label: SITE_COPY.nav.training },
  { id: 'news', label: SITE_COPY.nav.news },
  { id: 'contact', label: SITE_COPY.nav.contact },
];

export function Header({ currentPage, lang, onNavigate, onToggleLang }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (id: PageId) => {
    onNavigate(id);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 lg:gap-6">
        {/* Zone 1: Uploaded Brand Crest + Single-Line Wordmark */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#162C46] rounded-sm"
          aria-label="MAJAWA Home"
        >
          <MajawaCrest className="w-10 h-10 shrink-0" />
          <span className="font-editorial text-xl font-bold tracking-tight text-[#162C46] whitespace-nowrap shrink-0">
            MAJAWA
          </span>
        </button>

        {/* Zone 2: Clean Single-Line Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden xl:flex items-center gap-5 text-[13px] font-medium text-slate-600"
        >
          {NAV_ITEMS.map((item) => {
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`py-1 whitespace-nowrap shrink-0 transition-colors duration-150 border-b-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#162C46] ${
                  active
                    ? 'border-[#B08D32] text-[#162C46] font-semibold'
                    : 'border-transparent hover:text-[#162C46] hover:border-slate-300'
                }`}
              >
                {t(lang, item.label)}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Language Switch & Primary CTA */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div
            role="group"
            aria-label="Language selection"
            className="inline-flex items-center border border-slate-300 bg-slate-50 rounded-md p-0.5 shrink-0"
          >
            <button
              type="button"
              onClick={() => onToggleLang('en')}
              className={`px-2 py-1 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 ${
                lang === 'en'
                  ? 'bg-[#162C46] text-white'
                  : 'text-slate-600 hover:text-[#162C46]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onToggleLang('mr')}
              className={`px-2 py-1 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 ${
                lang === 'mr'
                  ? 'bg-[#162C46] text-white'
                  : 'text-slate-600 hover:text-[#162C46]'
              }`}
            >
              मराठी
            </button>
          </div>

          <button
            type="button"
            onClick={() => handleNav('membership')}
            className="hidden sm:inline-flex items-center px-4 py-2 text-xs font-semibold tracking-wide bg-[#162C46] text-white rounded-md hover:bg-[#1E3B5E] transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B08D32]"
          >
            {t(lang, SITE_COPY.nav.joinCta)}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="xl:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-slate-300 bg-white text-[#162C46] hover:bg-slate-50"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Drawer for Tablet / Mobile */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white">
          <nav
            aria-label="Mobile Navigation"
            className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 sm:grid-cols-2 gap-1.5"
          >
            {NAV_ITEMS.map((item) => {
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    active
                      ? 'bg-[#162C46] text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {t(lang, item.label)}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => handleNav('membership')}
              className="sm:hidden w-full text-center mt-2 px-4 py-3 rounded-md text-sm font-semibold bg-[#162C46] text-white hover:bg-[#1E3B5E]"
            >
              {t(lang, SITE_COPY.nav.joinCta)}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
