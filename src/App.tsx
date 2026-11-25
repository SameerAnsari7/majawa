/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useState } from 'react';
import { Footer } from './components/Footer.tsx';
import { Header } from './components/Header.tsx';
import { LegalModal } from './components/LegalModal.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { AdminPage } from './pages/AdminPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { GrievancePage } from './pages/GrievancePage.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { MembershipPage } from './pages/MembershipPage.tsx';
import { NewsPage } from './pages/NewsPage.tsx';
import { ObjectivesPage } from './pages/ObjectivesPage.tsx';
import { TrainingPage } from './pages/TrainingPage.tsx';
import { WelfarePage } from './pages/WelfarePage.tsx';
import type { Language, LegalDocType, PageId, PublicSummary } from './types.ts';

const VALID_PAGES: PageId[] = [
  'home',
  'about',
  'objectives',
  'welfare',
  'membership',
  'grievance',
  'training',
  'news',
  'contact',
  'admin',
];

function getInitialPage(): PageId {
  const hash = window.location.hash.replace('#', '') as PageId;
  return VALID_PAGES.includes(hash) ? hash : 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);
  const [lang, setLang] = useState<Language>('en');
  const [legalDoc, setLegalDoc] = useState<LegalDocType>(null);
  const [summary, setSummary] = useState<PublicSummary | null>(null);

  const loadSummary = useCallback(async () => {
    try {
      const res = await fetch('/api/public/summary');
      if (res.ok) {
        const json = (await res.json()) as PublicSummary;
        setSummary(json);
      }
    } catch {
      // Keep UI operational even if offline/reloading
    }
  }, []);

  useEffect(() => {
    void loadSummary();
  }, [loadSummary]);

  useEffect(() => {
    document.documentElement.lang = lang === 'mr' ? 'mr' : 'en';
  }, [lang]);

  useEffect(() => {
    const onHashChange = () => {
      const next = window.location.hash.replace('#', '') as PageId;
      if (VALID_PAGES.includes(next)) {
        setCurrentPage(next);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (page: PageId) => {
    setCurrentPage(page);
    if (window.location.hash !== `#${page}`) {
      window.history.pushState(null, '', `#${page}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header
        currentPage={currentPage}
        lang={lang}
        onNavigate={navigate}
        onToggleLang={setLang}
      />

      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage lang={lang} summary={summary} onNavigate={navigate} />
        )}
        {currentPage === 'about' && <AboutPage lang={lang} onNavigate={navigate} />}
        {currentPage === 'objectives' && <ObjectivesPage lang={lang} onNavigate={navigate} />}
        {currentPage === 'welfare' && <WelfarePage lang={lang} onNavigate={navigate} />}
        {currentPage === 'membership' && (
          <MembershipPage
            lang={lang}
            summary={summary}
            onSubmitted={() => void loadSummary()}
            onOpenLegal={setLegalDoc}
          />
        )}
        {currentPage === 'grievance' && <GrievancePage lang={lang} />}
        {currentPage === 'training' && <TrainingPage lang={lang} summary={summary} />}
        {currentPage === 'news' && (
          <NewsPage lang={lang} announcements={summary?.announcements ?? []} />
        )}
        {currentPage === 'contact' && <ContactPage lang={lang} />}
        {currentPage === 'admin' && <AdminPage onContentUpdated={() => void loadSummary()} />}
      </main>

      <Footer lang={lang} onNavigate={navigate} onOpenLegal={setLegalDoc} />

      <LegalModal doc={legalDoc} lang={lang} onClose={() => setLegalDoc(null)} />
    </div>
  );
}
