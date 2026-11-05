'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { store } from '@/lib/db/store';
import { INITIAL_VIDEOS } from '@/lib/db/mock-data';
import VideoCard from '@/components/VideoCard';

function LibraryContent() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email');
  const upgradedParam = searchParams.get('upgraded');

  const [email, setEmail] = useState(emailParam || '');
  const [activeTab, setActiveTab] = useState<'all' | 'purchased' | 'vip'>('all');

  useEffect(() => {
    if (!email) {
      const saved = localStorage.getItem('vault_member_email');
      if (saved) setEmail(saved);
    } else {
      localStorage.setItem('vault_member_email', email);
    }
  }, [email]);

  const allVideos = INITIAL_VIDEOS;

  const isVip = email ? store.getSubscriptions().some(
    (s) => s.userEmail.toLowerCase() === email.toLowerCase().trim() && s.status === 'active'
  ) : false;

  const unlockedVideos = allVideos.filter((v) => {
    if (!email) return false;
    return store.hasAccess(email, v.id);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 font-mono">
      {upgradedParam && (
        <div className="p-4 rounded-2xl bg-gold/10 border border-gold/40 text-gold flex items-center justify-between animate-in fade-in">
          <div>
            <p className="text-xs sm:text-sm font-semibold">
              [ VIP CLUB CONFIRMED ] All vault drops and future weekly releases are unlocked.
            </p>
          </div>
          <Link
            href="/billing"
            className="text-xs underline font-bold hover:text-white"
          >
            MANAGE BILLING &rarr;
          </Link>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/80 pb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-surface-2 border border-border text-xs text-text-secondary">
            <span className="text-gold font-bold mr-1.5">[ MEMBER PORTAL ]</span>
            <span>Private Archive</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary uppercase tracking-tight font-sans">
            My Vault & Library
          </h1>
          <p className="text-xs sm:text-sm text-text-muted font-sans">
            All your permanent purchases and VIP subscription releases in one place.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-surface-1 border border-border space-y-2 w-full md:w-80">
          <label className="block text-[11px] uppercase font-bold text-text-muted">
            VIEWING AS MEMBER:
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              className="flex-1 px-3 py-1.5 bg-surface-2 border border-border focus:border-gold rounded-lg text-xs text-text-primary outline-none"
            />
            <button
              onClick={() => {
                if (email) localStorage.setItem('vault_member_email', email);
              }}
              className="px-3 py-1.5 bg-surface-3 hover:bg-gold hover:text-black text-xs font-semibold rounded-lg transition-colors uppercase"
            >
              Sync
            </button>
          </div>
          <div className="flex items-center justify-between pt-1 text-[11px] text-text-muted">
            <span>Demo: <button onClick={() => setEmail('vip@dbvault.com')} className="text-gold hover:underline">vip@dbvault.com</button></span>
            {isVip && (
              <span className="text-gold font-bold">
                [ VIP ACTIVE ]
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase transition-all ${
            activeTab === 'all'
              ? 'bg-gold text-black shadow-md shadow-gold/20'
              : 'bg-surface-1 text-text-secondary hover:text-text-primary border border-border'
          }`}
        >
          All Unlocked ({unlockedVideos.length})
        </button>
        <Link
          href="/billing"
          className="px-4 py-2 bg-surface-1 hover:bg-surface-2 border border-border text-xs font-semibold text-text-secondary hover:text-text-primary rounded-xl transition-all uppercase"
        >
          Subscription & Receipts &rarr;
        </Link>
      </div>

      {unlockedVideos.length === 0 ? (
        <div className="py-20 text-center space-y-5 bg-surface-1 border border-border rounded-3xl p-8">
          <div className="space-y-1">
            <h3 className="font-display font-bold text-xl text-text-primary uppercase font-sans">
              No Unlocked Drops Found For This Email
            </h3>
            <p className="text-xs text-text-muted max-w-md mx-auto font-sans">
              If you just purchased with a different email, enter it in the box above or check out our latest drops.
            </p>
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <Link
              href="/catalog"
              className="px-6 py-3 bg-gold hover:bg-gold-light text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-gold/20"
            >
              Browse Catalog &rarr;
            </Link>
            <button
              onClick={() => setEmail('vip@dbvault.com')}
              className="px-5 py-3 bg-surface-2 hover:bg-surface-3 text-text-secondary hover:text-text-primary border border-border text-xs font-semibold rounded-xl uppercase"
            >
              Switch to Demo VIP Account
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 font-sans">
          {unlockedVideos.map((video) => (
            <div key={video.id} className="relative group">
              <VideoCard video={video} isUnlocked={true} />
              <div className="mt-2 text-center">
                <Link
                  href={`/watch/${video.id}?email=${encodeURIComponent(email)}`}
                  className="w-full py-2 bg-gold/15 hover:bg-gold text-gold hover:text-black border border-gold/40 text-xs font-mono font-bold uppercase rounded-lg flex items-center justify-center transition-all"
                >
                  WATCH IN 4K PLAYER &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MemberLibraryPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 flex items-center justify-center font-mono text-gold text-xs">
          LOADING VAULT LIBRARY...
        </div>
      }
    >
      <LibraryContent />
    </Suspense>
  );
}
