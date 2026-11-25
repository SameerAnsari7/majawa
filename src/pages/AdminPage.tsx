import React, { useEffect, useState } from 'react';
import { Download, LogOut, Shield, Trash2 } from 'lucide-react';
import type {
  AnnouncementItem,
  ContactEnquiryRecord,
  EventRegistrationRecord,
  GrievanceEnquiryRecord,
  JuniorApplicationRecord,
  ProposedEventItem,
  SeniorSupporterRecord,
} from '../types.ts';

interface AdminPageProps {
  onContentUpdated: () => void;
}

interface AdminDashboardData {
  juniorApplications: JuniorApplicationRecord[];
  seniorSupporters: SeniorSupporterRecord[];
  grievances: GrievanceEnquiryRecord[];
  contactEnquiries: ContactEnquiryRecord[];
  eventRegistrations: EventRegistrationRecord[];
  announcements: AnnouncementItem[];
  events: ProposedEventItem[];
}

export function AdminPage({ onContentUpdated }: AdminPageProps) {
  const [token, setToken] = useState<string | null>(null);
  const [statusLoading, setStatusLoading] = useState(true);
  const [needsSetup, setNeedsSetup] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmInput, setConfirmInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSubmitting, setAuthSubmitting] = useState(false);

  const [activeTab, setActiveTab] = useState<'overview' | 'membership' | 'grievances' | 'enquiries' | 'cms'>('overview');
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [loadingData, setLoadingData] = useState(false);

  // CMS New Announcement state
  const [newAnn, setNewAnn] = useState({
    category: 'association' as AnnouncementItem['category'],
    titleEn: '',
    titleMr: '',
    summaryEn: '',
    summaryMr: '',
    publicationDate: new Date().toISOString().slice(0, 10),
    sourceReference: '',
  });
  const [newEvt, setNewEvt] = useState({
    category: 'Workshop',
    titleEn: '',
    titleMr: '',
    descriptionEn: '',
    descriptionMr: '',
    statusLabelEn: 'Proposed · Coming Soon',
    statusLabelMr: 'प्रस्तावित · लवकरच येत आहे',
    targetRegion: 'Bhiwandi · Kalyan · Thane',
  });
  const [cmsFeedback, setCmsFeedback] = useState('');

  useEffect(() => {
    fetch('/api/admin/status')
      .then((r) => r.json())
      .then((res: { needsSetup?: boolean }) => {
        setNeedsSetup(Boolean(res.needsSetup));
      })
      .catch(() => {})
      .finally(() => setStatusLoading(false));
  }, []);

  const fetchDashboard = async (authToken: string) => {
    setLoadingData(true);
    try {
      const res = await fetch('/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.status === 401) {
        setToken(null);
        setAuthError('Session expired. Please sign in again.');
        return;
      }
      if (res.ok) {
        const json = (await res.json()) as AdminDashboardData;
        setData(json);
      }
    } finally {
      setLoadingData(false);
    }
  };

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (passwordInput.length < 8) {
      setAuthError('Password must be at least 8 characters.');
      return;
    }
    if (passwordInput !== confirmInput) {
      setAuthError('Passwords do not match.');
      return;
    }
    setAuthSubmitting(true);
    try {
      const res = await fetch('/api/admin/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      });
      const json = (await res.json()) as { token?: string; error?: string };
      if (!res.ok || !json.token) {
        setAuthError(json.error || 'Could not claim administrator account.');
      } else {
        setToken(json.token);
        setPasswordInput('');
        setConfirmInput('');
        setNeedsSetup(false);
        await fetchDashboard(json.token);
      }
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSubmitting(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      });
      const json = (await res.json()) as { token?: string; error?: string };
      if (!res.ok || !json.token) {
        setAuthError(json.error || 'Invalid credentials.');
      } else {
        setToken(json.token);
        setPasswordInput('');
        await fetchDashboard(json.token);
      }
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleDownloadBackup = async () => {
    if (!token) return;
    const res = await fetch('/api/admin/backup', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `majawa-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleUpdateJuniorStatus = async (id: string, status: JuniorApplicationRecord['status']) => {
    if (!token) return;
    const res = await fetch(`/api/admin/membership/junior/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      await fetchDashboard(token);
      onContentUpdated();
    }
  };

  const handleUpdateGrievanceStatus = async (id: string, status: GrievanceEnquiryRecord['status']) => {
    if (!token) return;
    const res = await fetch(`/api/admin/grievances/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      await fetchDashboard(token);
    }
  };

  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setCmsFeedback('');
    const res = await fetch('/api/admin/announcements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newAnn),
    });
    if (res.ok) {
      setNewAnn({
        category: 'association',
        titleEn: '',
        titleMr: '',
        summaryEn: '',
        summaryMr: '',
        publicationDate: new Date().toISOString().slice(0, 10),
        sourceReference: '',
      });
      setCmsFeedback('Announcement published.');
      await fetchDashboard(token);
      onContentUpdated();
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (!token) return;
    await fetch(`/api/admin/announcements/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    await fetchDashboard(token);
    onContentUpdated();
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setCmsFeedback('');
    const res = await fetch('/api/admin/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newEvt),
    });
    if (res.ok) {
      setNewEvt({
        category: 'Workshop',
        titleEn: '',
        titleMr: '',
        descriptionEn: '',
        descriptionMr: '',
        statusLabelEn: 'Proposed · Coming Soon',
        statusLabelMr: 'प्रस्तावित · लवकरच येत आहे',
        targetRegion: 'Bhiwandi · Kalyan · Thane',
      });
      setCmsFeedback('Proposed event added.');
      await fetchDashboard(token);
      onContentUpdated();
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!token) return;
    await fetch(`/api/admin/events/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    await fetchDashboard(token);
    onContentUpdated();
  };

  if (statusLoading) {
    return (
      <div className="py-20 text-center text-sm text-stone-600">
        Checking administrator portal status...
      </div>
    );
  }

  if (!token) {
    return (
      <div className="py-16 px-4">
        <div className="max-w-md mx-auto bg-white border border-stone-200 rounded-md p-8 space-y-6">
          <div className="space-y-2 border-b border-stone-200 pb-4">
            <div className="flex items-center gap-2 text-[#162C46]">
              <Shield className="w-5 h-5" />
              <span className="text-xs uppercase tracking-[0.14em] font-semibold text-[#9A7823]">
                Restricted Governance Access
              </span>
            </div>
            <h1 className="font-editorial text-3xl font-semibold text-[#162C46]">
              {needsSetup ? 'Claim Administrator Access' : 'Administrator Sign In'}
            </h1>
            <p className="text-sm text-stone-600">
              {needsSetup
                ? 'First-run setup: choose a strong administrator password (minimum 8 characters) to secure membership, confidential grievance records, and content updates.'
                : 'Sign in with the association administrator password to manage enquiries, confidential grievance triage, announcements, and backups.'}
            </p>
          </div>

          {authError && (
            <div role="alert" className="p-3.5 rounded-md bg-red-50 border border-red-200 text-sm text-red-900">
              {authError}
            </div>
          )}

          <form onSubmit={needsSetup ? handleSetup : handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                {needsSetup ? 'Create Administrator Password' : 'Administrator Password'}
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF]"
              />
            </div>

            {needsSetup && (
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Confirm Administrator Password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={confirmInput}
                  onChange={(e) => setConfirmInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-[#FFFFFF]"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={authSubmitting}
              className="w-full py-2.5 text-sm font-semibold bg-[#162C46] text-[#FFFFFF] rounded-md hover:bg-[#193054] disabled:opacity-60"
            >
              {authSubmitting
                ? 'Verifying...'
                : needsSetup
                ? 'Save Password & Enter Portal'
                : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-[#9A7823] font-semibold">
              MAJAWA Governance Console
            </p>
            <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#162C46]">
              Administrator Portal
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleDownloadBackup}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-white border border-stone-300 text-[#162C46] rounded-md hover:bg-stone-50"
            >
              <Download className="w-4 h-4" />
              Download Backup (JSON)
            </button>
            <button
              type="button"
              onClick={() => {
                setToken(null);
                setData(null);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#162C46] text-[#FFFFFF] rounded-md hover:bg-[#193054]"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </header>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-stone-200/80 rounded-md w-fit">
          {[
            { id: 'overview', label: 'Overview & Backup' },
            { id: 'membership', label: `Membership (${(data?.juniorApplications.length ?? 0) + (data?.seniorSupporters.length ?? 0)})` },
            { id: 'grievances', label: `Confidential Grievances (${data?.grievances.length ?? 0})` },
            { id: 'enquiries', label: `Contact & Events (${(data?.contactEnquiries.length ?? 0) + (data?.eventRegistrations.length ?? 0)})` },
            { id: 'cms', label: 'News & Events CMS' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-sm transition-colors whitespace-nowrap ${
                activeTab === tab.id ? 'bg-[#162C46] text-white' : 'text-stone-700 hover:text-[#162C46]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loadingData || !data ? (
          <p className="text-sm text-stone-600">Loading portal records...</p>
        ) : (
          <>
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="bg-white border border-stone-200 rounded-md p-5">
                    <p className="text-xs uppercase tracking-wider text-stone-500">Junior Applications</p>
                    <p className="font-editorial text-4xl font-semibold text-[#162C46] mt-1 tabular-nums">
                      {data.juniorApplications.length}
                    </p>
                  </div>
                  <div className="bg-white border border-stone-200 rounded-md p-5">
                    <p className="text-xs uppercase tracking-wider text-stone-500">Senior Supporters</p>
                    <p className="font-editorial text-4xl font-semibold text-[#162C46] mt-1 tabular-nums">
                      {data.seniorSupporters.length}
                    </p>
                  </div>
                  <div className="bg-white border border-stone-200 rounded-md p-5">
                    <p className="text-xs uppercase tracking-wider text-stone-500">Confidential Grievances</p>
                    <p className="font-editorial text-4xl font-semibold text-[#162C46] mt-1 tabular-nums">
                      {data.grievances.length}
                    </p>
                  </div>
                  <div className="bg-white border border-stone-200 rounded-md p-5">
                    <p className="text-xs uppercase tracking-wider text-stone-500">Contact & Event Enquiries</p>
                    <p className="font-editorial text-4xl font-semibold text-[#162C46] mt-1 tabular-nums">
                      {data.contactEnquiries.length + data.eventRegistrations.length}
                    </p>
                  </div>
                </div>
                <div className="bg-white border border-stone-200 rounded-md p-6 text-sm text-stone-700 space-y-2">
                  <h2 className="font-editorial text-2xl font-semibold text-[#162C46]">
                    Website Backup & Data Custody
                  </h2>
                  <p>
                    Use the <strong>Download Backup (JSON)</strong> button above to export all membership
                    enquiries, supporter pledges, grievance triage logs, contact messages, event enquiries,
                    and published announcements for secure offline archiving.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'membership' && (
              <div className="space-y-8">
                <section className="space-y-3">
                  <h2 className="font-editorial text-2xl font-semibold text-[#162C46]">
                    Form 1: Junior Advocate Pre-Registrations ({data.juniorApplications.length})
                  </h2>
                  {data.juniorApplications.length === 0 ? (
                    <p className="text-sm text-stone-600 bg-white border border-stone-200 rounded-md p-6">
                      No junior membership enquiries received yet.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {data.juniorApplications.map((app) => (
                        <div key={app.id} className="bg-white border border-stone-200 rounded-md p-5 space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                              <span className="text-xs font-semibold text-[#9A7823] tabular-nums">
                                {app.referenceId}
                              </span>
                              <h3 className="font-semibold text-[#162C46] text-base">{app.fullName}</h3>
                              <p className="text-xs text-stone-600">
                                {app.enrolmentNumber} · {app.stateBarCouncil} · {app.yearsOfPractice} · {app.taluka}, {app.district}
                              </p>
                            </div>
                            <select
                              value={app.status}
                              onChange={(e) =>
                                handleUpdateJuniorStatus(
                                  app.id,
                                  e.target.value as JuniorApplicationRecord['status']
                                )
                              }
                              className="px-3 py-1.5 text-xs border border-stone-300 rounded-md bg-[#FFFFFF]"
                            >
                              <option value="pending_verification">Pending Verification</option>
                              <option value="founding_cohort">Founding Cohort (9–11)</option>
                              <option value="shortlisted">Shortlisted</option>
                              <option value="archived">Archived</option>
                            </select>
                          </div>
                          <p className="text-xs text-stone-700">
                            Mobile: {app.mobile} · Email: {app.email} · Help: {app.howToHelp.join(', ') || 'Member'}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </section>

                <section className="space-y-3">
                  <h2 className="font-editorial text-2xl font-semibold text-[#162C46]">
                    Form 2: Senior Advocate Supporters ({data.seniorSupporters.length})
                  </h2>
                  {data.seniorSupporters.length === 0 ? (
                    <p className="text-sm text-stone-600 bg-white border border-stone-200 rounded-md p-6">
                      No senior supporter pre-registrations yet.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {data.seniorSupporters.map((sup) => (
                        <div key={sup.id} className="bg-white border border-stone-200 rounded-md p-5 space-y-1.5">
                          <span className="text-xs font-semibold text-[#9A7823] tabular-nums">{sup.referenceId}</span>
                          <h3 className="font-semibold text-[#162C46]">{sup.fullName}</h3>
                          <p className="text-xs text-stone-600">
                            {sup.stateBarCouncilAndEnrolment} (Enrolled {sup.yearOfEnrolment}) · {sup.mobile} · {sup.email}
                          </p>
                          <p className="text-xs text-stone-700">
                            Ethical Chamber Pledges Accepted: {sup.ethicalPledges.length}/6
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </div>
            )}

            {activeTab === 'grievances' && (
              <div className="space-y-4">
                <p className="text-xs text-stone-600">
                  Confidential records — restricted strictly to committee review. Do not share externally.
                </p>
                {data.grievances.length === 0 ? (
                  <p className="text-sm text-stone-600 bg-white border border-stone-200 rounded-md p-6">
                    No grievance enquiries recorded.
                  </p>
                ) : (
                  data.grievances.map((grv) => (
                    <div key={grv.id} className="bg-white border border-stone-200 rounded-md p-5 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <span className="text-xs font-semibold text-[#9A7823] tabular-nums">
                            {grv.referenceId} · {grv.createdAt.slice(0, 10)}
                          </span>
                          <h3 className="font-semibold text-[#162C46]">{grv.natureOfConcern}</h3>
                          <p className="text-xs text-stone-600">
                            {grv.nameOptional || 'Anonymous Initial Enquiry'} · {grv.contactDetails} ({grv.preferredContactMethod}) · {grv.district}
                          </p>
                        </div>
                        <select
                          value={grv.status}
                          onChange={(e) =>
                            handleUpdateGrievanceStatus(
                              grv.id,
                              e.target.value as GrievanceEnquiryRecord['status']
                            )
                          }
                          className="px-3 py-1.5 text-xs border border-stone-300 rounded-md bg-[#FFFFFF]"
                        >
                          <option value="submitted">Submitted</option>
                          <option value="acknowledged">Acknowledged (7d)</option>
                          <option value="scrutinising">Scrutinising (15d)</option>
                          <option value="mediation_or_referral">Mediation / Bar Council Referral</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                      <p className="text-sm text-stone-800 bg-[#FFFFFF] p-3.5 rounded-md border border-stone-200">
                        {grv.briefDescription}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'enquiries' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <section className="space-y-3">
                  <h2 className="font-editorial text-2xl font-semibold text-[#162C46]">
                    Contact Enquiries ({data.contactEnquiries.length})
                  </h2>
                  {data.contactEnquiries.length === 0 ? (
                    <p className="text-sm text-stone-600 bg-white border border-stone-200 rounded-md p-5">
                      No contact messages yet.
                    </p>
                  ) : (
                    data.contactEnquiries.map((c) => (
                      <div key={c.id} className="bg-white border border-stone-200 rounded-md p-4 space-y-1.5 text-sm">
                        <p className="text-xs text-[#9A7823] font-semibold tabular-nums">{c.referenceId}</p>
                        <p className="font-semibold text-[#162C46]">{c.subject}</p>
                        <p className="text-xs text-stone-600">
                          {c.fullName} · {c.email} {c.mobile ? `· ${c.mobile}` : ''}
                        </p>
                        <p className="text-stone-700 pt-1">{c.message}</p>
                      </div>
                    ))
                  )}
                </section>

                <section className="space-y-3">
                  <h2 className="font-editorial text-2xl font-semibold text-[#162C46]">
                    Event Registrations ({data.eventRegistrations.length})
                  </h2>
                  {data.eventRegistrations.length === 0 ? (
                    <p className="text-sm text-stone-600 bg-white border border-stone-200 rounded-md p-5">
                      No event registration enquiries yet.
                    </p>
                  ) : (
                    data.eventRegistrations.map((ev) => (
                      <div key={ev.id} className="bg-white border border-stone-200 rounded-md p-4 space-y-1 text-sm">
                        <p className="text-xs text-[#9A7823] font-semibold tabular-nums">{ev.referenceId}</p>
                        <p className="font-semibold text-[#162C46]">{ev.eventTitle}</p>
                        <p className="text-xs text-stone-600">
                          {ev.fullName} · {ev.mobile} · {ev.email} · {ev.courtDistrict}
                        </p>
                      </div>
                    ))
                  )}
                </section>
              </div>
            )}

            {activeTab === 'cms' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Publish Announcement */}
                <div className="bg-white border border-stone-200 rounded-md p-6 space-y-4">
                  <h2 className="font-editorial text-2xl font-semibold text-[#162C46]">
                    Publish News / Bar Update
                  </h2>
                  {cmsFeedback && (
                    <p className="text-xs font-semibold text-[#14532D] bg-[#F3EFE6] p-2.5 rounded">
                      {cmsFeedback}
                    </p>
                  )}
                  <form onSubmit={handleCreateAnnouncement} className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        value={newAnn.category}
                        onChange={(e) =>
                          setNewAnn({ ...newAnn, category: e.target.value as AnnouncementItem['category'] })
                        }
                        className="px-3 py-2 border border-stone-300 rounded-md bg-[#FFFFFF]"
                      >
                        <option value="association">Association</option>
                        <option value="membership">Membership</option>
                        <option value="welfare">Welfare</option>
                        <option value="training">Training</option>
                        <option value="representation">Representation</option>
                        <option value="legal_updates">Bar & Legal Updates</option>
                      </select>
                      <input
                        type="date"
                        value={newAnn.publicationDate}
                        onChange={(e) => setNewAnn({ ...newAnn, publicationDate: e.target.value })}
                        className="px-3 py-2 border border-stone-300 rounded-md bg-[#FFFFFF]"
                      />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="English Title *"
                      value={newAnn.titleEn}
                      onChange={(e) => setNewAnn({ ...newAnn, titleEn: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-md bg-[#FFFFFF]"
                    />
                    <input
                      type="text"
                      placeholder="Marathi Title (मराठी शीर्षक)"
                      value={newAnn.titleMr}
                      onChange={(e) => setNewAnn({ ...newAnn, titleMr: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-md bg-[#FFFFFF]"
                    />
                    <textarea
                      rows={3}
                      required
                      placeholder="English Summary *"
                      value={newAnn.summaryEn}
                      onChange={(e) => setNewAnn({ ...newAnn, summaryEn: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-md bg-[#FFFFFF]"
                    />
                    <textarea
                      rows={2}
                      placeholder="Marathi Summary (मराठी सारांश)"
                      value={newAnn.summaryMr}
                      onChange={(e) => setNewAnn({ ...newAnn, summaryMr: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-md bg-[#FFFFFF]"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Source Reference * (e.g., Bar Council Circular / MAJAWA Notice)"
                      value={newAnn.sourceReference}
                      onChange={(e) => setNewAnn({ ...newAnn, sourceReference: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-md bg-[#FFFFFF]"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-semibold bg-[#162C46] text-white rounded-md hover:bg-[#193054]"
                    >
                      Publish Announcement
                    </button>
                  </form>

                  <div className="pt-4 border-t border-stone-200 space-y-2">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Published Announcements ({data.announcements.length})
                    </h3>
                    {data.announcements.map((a) => (
                      <div key={a.id} className="flex items-start justify-between gap-3 py-2 border-b border-stone-100 text-xs">
                        <div>
                          <p className="font-semibold text-[#162C46]">{a.titleEn}</p>
                          <p className="text-stone-500">{a.publicationDate} · {a.sourceReference}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteAnnouncement(a.id)}
                          className="p-1.5 text-stone-500 hover:text-red-700"
                          aria-label="Delete announcement"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Manage Proposed Events */}
                <div className="bg-white border border-stone-200 rounded-md p-6 space-y-4">
                  <h2 className="font-editorial text-2xl font-semibold text-[#162C46]">
                    Add Proposed Training Event
                  </h2>
                  <form onSubmit={handleCreateEvent} className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Category (e.g. Drafting)"
                        value={newEvt.category}
                        onChange={(e) => setNewEvt({ ...newEvt, category: e.target.value })}
                        className="px-3 py-2 border border-stone-300 rounded-md bg-[#FFFFFF]"
                      />
                      <input
                        type="text"
                        placeholder="Target Region"
                        value={newEvt.targetRegion}
                        onChange={(e) => setNewEvt({ ...newEvt, targetRegion: e.target.value })}
                        className="px-3 py-2 border border-stone-300 rounded-md bg-[#FFFFFF]"
                      />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="English Event Title *"
                      value={newEvt.titleEn}
                      onChange={(e) => setNewEvt({ ...newEvt, titleEn: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-md bg-[#FFFFFF]"
                    />
                    <input
                      type="text"
                      placeholder="Marathi Event Title"
                      value={newEvt.titleMr}
                      onChange={(e) => setNewEvt({ ...newEvt, titleMr: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-md bg-[#FFFFFF]"
                    />
                    <textarea
                      rows={3}
                      required
                      placeholder="English Description *"
                      value={newEvt.descriptionEn}
                      onChange={(e) => setNewEvt({ ...newEvt, descriptionEn: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-md bg-[#FFFFFF]"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-semibold bg-[#162C46] text-white rounded-md hover:bg-[#193054]"
                    >
                      Add Proposed Event
                    </button>
                  </form>

                  <div className="pt-4 border-t border-stone-200 space-y-2">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Current Events ({data.events.length})
                    </h3>
                    {data.events.map((ev) => (
                      <div key={ev.id} className="flex items-start justify-between gap-3 py-2 border-b border-stone-100 text-xs">
                        <div>
                          <p className="font-semibold text-[#162C46]">{ev.titleEn}</p>
                          <p className="text-stone-500">{ev.statusLabelEn} · {ev.targetRegion}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteEvent(ev.id)}
                          className="p-1.5 text-stone-500 hover:text-red-700"
                          aria-label="Delete event"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
