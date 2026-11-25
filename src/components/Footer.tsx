import React from 'react';
import type { Language, LegalDocType, PageId } from '../types.ts';
import { SITE_COPY, t } from '../i18n/content.ts';
import { MajawaCrest } from './BrandMark.tsx';

interface FooterProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onOpenLegal: (doc: LegalDocType) => void;
}

export function Footer({ lang, onNavigate, onOpenLegal }: FooterProps) {
  const go = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-50 text-slate-800 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-slate-200">
          {/* Identity Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <MajawaCrest className="w-14 h-14 shrink-0 border border-slate-200" />
              <div>
                <p className="font-editorial text-xl font-bold tracking-tight text-[#162C46]">
                  {t(lang, SITE_COPY.orgFullName)}
                </p>
                <p className="text-xs uppercase tracking-[0.16em] text-[#9A7823] font-semibold mt-0.5">
                  MAJAWA
                </p>
              </div>
            </div>
            <p className="font-editorial italic text-base text-[#162C46]">
              “{SITE_COPY.sloganEn}”
            </p>
            <p className="text-sm text-slate-600">
              “{SITE_COPY.sloganMr}”
            </p>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              {t(lang, SITE_COPY.statusBanner)} — {t(lang, SITE_COPY.proposedOffice)}.
              <br />
              {t(lang, SITE_COPY.proposedBy)} · Mobile: 9323268400 · saz.9323268400@gmail.com
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#162C46]">
              {lang === 'mr' ? 'जलद दुवे' : 'Quick Links'}
            </h3>
            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-sm text-slate-600">
              <li>
                <button type="button" onClick={() => go('home')} className="hover:text-[#162C46] transition-colors">
                  {t(lang, SITE_COPY.nav.home)}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => go('about')} className="hover:text-[#162C46] transition-colors">
                  {t(lang, SITE_COPY.nav.about)}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => go('objectives')} className="hover:text-[#162C46] transition-colors">
                  {t(lang, SITE_COPY.nav.objectives)}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => go('membership')} className="hover:text-[#162C46] transition-colors">
                  {t(lang, SITE_COPY.nav.membership)}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => go('welfare')} className="hover:text-[#162C46] transition-colors">
                  {t(lang, SITE_COPY.nav.welfare)}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => go('grievance')} className="hover:text-[#162C46] transition-colors">
                  {t(lang, SITE_COPY.nav.grievance)}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => go('training')} className="hover:text-[#162C46] transition-colors">
                  {t(lang, SITE_COPY.nav.training)}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => go('contact')} className="hover:text-[#162C46] transition-colors">
                  {t(lang, SITE_COPY.nav.contact)}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Admin Column */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#162C46]">
              {lang === 'mr' ? 'कायदेशीर माहिती व व्यवस्थापन' : 'Legal & Governance'}
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-[#162C46] transition-colors"
                >
                  {lang === 'mr' ? 'गोपनीयता धोरण (Privacy Policy)' : 'Privacy Policy'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-[#162C46] transition-colors"
                >
                  {lang === 'mr' ? 'अटी व शर्ती (Terms & Conditions)' : 'Terms and Conditions'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('disclaimer')}
                  className="hover:text-[#162C46] transition-colors"
                >
                  {lang === 'mr' ? 'अस्वीकरण (Disclaimer)' : 'Disclaimer'}
                </button>
              </li>
              <li className="pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => go('admin')}
                  className="text-xs uppercase tracking-[0.12em] text-slate-500 hover:text-[#162C46] transition-colors"
                >
                  {lang === 'mr' ? 'प्रशासक पोर्टल (Admin Portal)' : 'Administrator Portal'}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} MAJAWA — Maharashtra Junior Advocates Welfare Association. All Rights Reserved.</p>
          <p>{t(lang, SITE_COPY.statusBanner)}</p>
        </div>
      </div>
    </footer>
  );
}
