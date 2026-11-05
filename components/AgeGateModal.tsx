'use client';

import React, { useState, useEffect } from 'react';

export default function AgeGateModal() {
  const [confirmed, setConfirmed] = useState<boolean | null>(null);

  useEffect(() => {
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
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-40 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-surface-2 border border-border text-gold font-mono font-bold text-xs uppercase tracking-widest">
          18+ AGE VERIFICATION
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-display font-extrabold tracking-tight text-text-primary uppercase">
            VAULT <span className="text-gold font-light tracking-wide">BY DB</span>
          </h2>
          <p className="text-xs text-text-secondary leading-relaxed max-w-sm mx-auto font-sans">
            This private platform features adult artistic content exclusively intended for mature individuals. You must be at least 18 years of age (or legal age in your jurisdiction) to proceed.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleEnter}
            className="w-full sm:w-auto px-8 py-3.5 bg-gold hover:bg-gold-light text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 shadow-lg shadow-gold/20 hover:scale-[1.02]"
          >
            I am 18+ — Enter Vault &rarr;
          </button>
          <button
            onClick={handleLeave}
            className="w-full sm:w-auto px-6 py-3.5 bg-surface-2 hover:bg-surface-3 text-text-secondary hover:text-text-primary border border-border font-mono text-xs uppercase rounded-xl transition-colors"
          >
            Exit Site
          </button>
        </div>

        <div className="text-[11px] text-text-muted font-mono">
          Strict 18 U.S.C. 2257 compliance statement on file. 100% discreet billing.
        </div>
      </div>
    </div>
  );
}
