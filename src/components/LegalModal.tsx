import React from 'react';
import { X } from 'lucide-react';
import type { Language, LegalDocType } from '../types.ts';

interface LegalModalProps {
  doc: LegalDocType;
  lang: Language;
  onClose: () => void;
}

export function LegalModal({ doc, lang, onClose }: LegalModalProps) {
  if (!doc) return null;

  const titles: Record<Exclude<LegalDocType, null>, { en: string; mr: string }> = {
    privacy: { en: 'Privacy Policy (Draft / Pre-Registration)', mr: 'गोपनीयता धोरण (मसुदा)' },
    terms: { en: 'Terms & Conditions of Use', mr: 'वापराच्या अटी व शर्ती' },
    disclaimer: { en: 'Institutional & Statutory Disclaimer', mr: 'संस्थात्मक व वैधानिक अस्वीकरण' },
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div className="bg-white border border-slate-200 rounded-lg max-w-2xl w-full max-h-[85vh] flex flex-col shadow-xl">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4 bg-slate-50 rounded-t-lg">
          <h2 id="legal-modal-title" className="font-editorial text-2xl font-semibold text-[#162C46]">
            {lang === 'mr' ? titles[doc].mr : titles[doc].en}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 inline-flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:text-[#162C46] hover:bg-slate-100"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-5 overflow-y-auto text-sm text-slate-700 leading-relaxed space-y-4">
          {doc === 'privacy' && (
            <>
              <p>
                Maharashtra Junior Advocates Welfare Association (MAJAWA) is currently a proposed
                association in its pre-registration discussion stage. Information submitted through
                pre-registration, membership enquiry, event registration, or contact forms is collected
                solely for founding coordination, verification of advocate eligibility, and lawful
                association communication.
              </p>
              <p>
                <strong>Confidentiality of Grievance Enquiries:</strong> Preliminary grievance enquiries
                are strictly restricted to authorised committee review and are never published, shared
                publicly, or opened to public comments. Applicants are instructed never to submit
                Aadhaar numbers, passwords, or unrelated sensitive identity documents through online forms.
              </p>
              <p>
                Submitted records are stored securely on the application server for review by the
                proposed founding organisers. To request correction or removal of your submitted
                pre-registration enquiry, contact Adv. Sarfaraz Shahezad Ansari via the Contact page.
              </p>
            </>
          )}

          {doc === 'terms' && (
            <>
              <p>
                <strong>Pre-Registration Status:</strong> Submitting a Membership Enquiry or Expression
                of Interest does not automatically confer membership, voting rights, or office-bearer
                authority. Formal membership takes effect only after registration under the Societies
                Registration Act, 1860 / Maharashtra Public Trust framework, approval of final rules,
                and formal verification.
              </p>
              <p>
                <strong>No Financial Collection Before Registration:</strong> No membership fee (proposed
                at ₹500/year) or donation is collected through this website or into any personal bank
                account prior to legal registration and opening of an official bank account in MAJAWA’s name.
              </p>
              <p>
                <strong>Lawful Conduct:</strong> All participants agree to abide by the Advocates Act,
                1961, Bar Council of India rules, and MAJAWA’s commitment to lawful, non-violent, and
                non-disruptive institutional representation.
              </p>
            </>
          )}

          {doc === 'disclaimer' && (
            <>
              <p>
                <strong>Proposed Association Notice:</strong> MAJAWA (Maharashtra Junior Advocates Welfare
                Association) is currently proposed and not yet registered. No registration number,
                statutory recognition, or government affiliation is claimed.
              </p>
              <p>
                <strong>Non-Statutory Authority:</strong> MAJAWA is not a statutory disciplinary authority
                and does not replace the jurisdiction of the Bar Council of Maharashtra and Goa, the Bar
                Council of India, courts, or police authorities.
              </p>
              <p>
                <strong>No Advocate–Client Relationship:</strong> Submitting a grievance enquiry, contact
                message, or reading legal training updates on this platform does not establish an
                advocate–client relationship or constitute formal legal advice or guarantee a particular
                outcome.
              </p>
            </>
          )}
        </div>

        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 rounded-b-lg flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold bg-[#162C46] text-white rounded-md hover:bg-[#1E3B5E]"
          >
            {lang === 'mr' ? 'बंद करा' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
