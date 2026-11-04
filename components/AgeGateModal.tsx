'use client';

import React, { useState, useEffect } from 'react';
import { ShieldAlert, ArrowRight, Lock } from 'lucide-react';

export default function AgeGateModal() {
  const [confirmed, setConfirmed] = useState<boolean | null>(null);

  useEffect(() => {
    // Check localStorage or cookie
    const isAdult = localStorage.getItem('vault_age_confirmed');
    if (isAdult === 'true') {
      setConfirmed(true);
    } else {
      setConfirmed(false);
    }
  }, []);

  const handleEnter = () => {
    localStorage.setItem('vault_age_confirmed', 'true');
    setConfirmed(true);
  };

  const handleLeave = () => {
    window.location.href = 'https://www.google.com';
  };

  if (confirmed === null || confirmed === true) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg p-8 border border-border bg-surface-1 rounded-2xl shadow-2xl text-center space-y-6">
        {/* Subtle accent glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-40 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-surface-2 border border-border text-gold">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <div className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase text-gold bg-gold/10 border border-gold/30 rounded-full">
            Age Verification Required
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary">
            VAULT <span className="text-gold font-light tracking-wide">BY DB</span>
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed max-w-sm mx-auto">
            This private platform features adult artistic content exclusively intended for mature individuals. You must be at least 18 years of age (or legal age in your jurisdiction) to proceed.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleEnter}
            className="w-full sm:w-auto px-8 py-3.5 bg-gold hover:bg-gold-light text-black font-semibold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-gold/20 hover:scale-[1.02]"
          >
            I am 18+ — Enter Vault
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={handleLeave}
            className="w-full sm:w-auto px-6 py-3.5 bg-surface-2 hover:bg-surface-3 text-text-secondary hover:text-text-primary border border-border font-medium text-sm rounded-xl transition-colors"
          >
            Exit Site
          </button>
        </div>

        <div className="text-[11px] text-text-muted flex items-center justify-center gap-2">
          <Lock className="w-3.5 h-3.5 text-text-muted" />
          <span>Strict 18 U.S.C. 2257 compliance statement on file. 100% discreet billing.</span>
        </div>
      </div>
    </div>
  );
}
