'use client';

import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, Send, Loader2 } from 'lucide-react';

export default function DmcaPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    videoUrl: '',
    reason: 'depicted_person_removal',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-2 border border-border text-xs text-text-secondary">
          <ShieldAlert className="w-3.5 h-3.5 text-crimson" />
          <span>Notice & Takedown Procedure</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary uppercase tracking-tight">
          DMCA & CONTENT REMOVAL PORTAL
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          If you are a copyright owner or a depicted individual seeking prompt review, submit details below. All claims are addressed within 24 to 48 hours.
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-surface-1 border border-border shadow-2xl">
        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-display font-bold text-xl text-text-primary">
              Takedown Claim Received
            </h3>
            <p className="text-xs text-text-secondary max-w-md mx-auto leading-relaxed">
              Your request ticket has been dispatched to our compliance and legal custodian team. We investigate and take appropriate removal or privacy actions within 48 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5">
                Full Name / Authorized Agent
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Jane Doe"
                className="w-full px-4 py-3 bg-surface-2 border border-border focus:border-gold rounded-xl text-xs text-text-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5">
                Contact Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="agent@domain.com"
                className="w-full px-4 py-3 bg-surface-2 border border-border focus:border-gold rounded-xl text-xs text-text-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5">
                Video Title or URL
              </label>
              <input
                type="text"
                required
                value={formData.videoUrl}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                placeholder="https://vaultbydb.com/video/midnight-encounter-4k"
                className="w-full px-4 py-3 bg-surface-2 border border-border focus:border-gold rounded-xl text-xs text-text-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5">
                Reason for Notice
              </label>
              <select
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="w-full px-4 py-3 bg-surface-2 border border-border focus:border-gold rounded-xl text-xs text-text-primary outline-none"
              >
                <option value="depicted_person_removal">Depicted Individual Privacy / Consent Withdrawal</option>
                <option value="copyright_infringement">Copyright Infringement (DMCA)</option>
                <option value="unauthorized_distribution">Unauthorized Distribution or Leak</option>
                <option value="other">Other Statutory Claim</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5">
                Detailed Statement & Documentation Ref
              </label>
              <textarea
                rows={4}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Please describe your claim, rights ownership, or specific timecodes..."
                className="w-full px-4 py-3 bg-surface-2 border border-border focus:border-gold rounded-xl text-xs text-text-primary outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-crimson hover:bg-crimson-dark text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-crimson/25 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting Request...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Official Notice
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
