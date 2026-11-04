'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Lock,
  ArrowLeft,
  Loader2,
} from 'lucide-react';
import Player from '@/components/Player';
import { INITIAL_VIDEOS } from '@/lib/db/mock-data';

function WatchContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const videoId = params.id as string;
  const emailParam = searchParams.get('email');

  const [email, setEmail] = useState(emailParam || '');
  const [tokenData, setTokenData] = useState<{
    streamUrl: string;
    watermarkText: string;
    title: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const video = INITIAL_VIDEOS.find((v) => v.id === videoId);

  useEffect(() => {
    let activeEmail = email;
    if (!activeEmail) {
      const saved = localStorage.getItem('vault_member_email');
      if (saved) {
        activeEmail = saved;
        setEmail(saved);
      }
    }

    if (!activeEmail) {
      setLoading(false);
      setError('Please provide your buyer or member email to unlock the player.');
      return;
    }

    // Call media token endpoint
    const fetchToken = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/media/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ videoId, email: activeEmail }),
        });

        const data = await res.json();
        if (!res.ok) {
          setError(data.error || 'Access denied.');
          setTokenData(null);
        } else {
          setTokenData({
            streamUrl: data.streamUrl,
            watermarkText: data.watermarkText,
            title: data.title,
          });
        }
      } catch (err: unknown) {
        setError('Failed to reach media streaming server.');
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, [videoId, email]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Navigation & Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/library"
          className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to My Library
        </Link>
        {video && (
          <span className="text-xs font-bold uppercase tracking-wider text-gold">
            {video.categoryName}
          </span>
        )}
      </div>

      {loading ? (
        <div className="aspect-video max-w-5xl mx-auto bg-black border border-border rounded-2xl flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-gold animate-spin" />
          <p className="text-xs text-text-secondary tracking-wider uppercase font-semibold">
            Verifying Entitlement & Generating Signed Stream...
          </p>
        </div>
      ) : error ? (
        <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-surface-1 border border-border text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-crimson/15 text-crimson flex items-center justify-center mx-auto border border-crimson/30">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="font-display font-extrabold text-2xl text-text-primary uppercase">
              Protected Media Access Required
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
              {error}
            </p>
          </div>

          <div className="max-w-sm mx-auto space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter purchaser email (e.g. vip@dbvault.com)..."
              className="w-full px-4 py-2.5 bg-surface-2 border border-border focus:border-gold rounded-xl text-xs text-text-primary outline-none"
            />
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => {
                  if (email) localStorage.setItem('vault_member_email', email);
                }}
                className="px-4 py-2 bg-gold hover:bg-gold-light text-black font-bold text-xs rounded-xl"
              >
                Verify Email
              </button>
              <button
                onClick={() => setEmail('vip@dbvault.com')}
                className="px-4 py-2 bg-surface-2 hover:bg-surface-3 text-text-secondary text-xs rounded-xl border border-border"
              >
                Use Demo VIP Email
              </button>
            </div>
          </div>

          {video && (
            <div className="pt-4 border-t border-border flex justify-center gap-4">
              <Link
                href={`/video/${video.slug}`}
                className="px-6 py-3 bg-gold hover:bg-gold-light text-black font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-gold/20"
              >
                Unlock This Drop
              </Link>
              <Link
                href="/pricing"
                className="px-6 py-3 bg-surface-2 hover:bg-surface-3 text-text-primary text-xs font-semibold rounded-xl border border-border"
              >
                Join VIP Club ($29.99/mo)
              </Link>
            </div>
          )}
        </div>
      ) : tokenData ? (
        <div className="space-y-6">
          <Player
            streamUrl={tokenData.streamUrl}
            title={tokenData.title}
            viewerEmail={email}
            watermarkText={tokenData.watermarkText}
          />

          {video && (
            <div className="max-w-5xl mx-auto p-6 bg-surface-1 border border-border rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h1 className="font-display font-extrabold text-xl sm:text-2xl text-text-primary">
                  {video.title}
                </h1>
                <p className="text-xs text-text-secondary line-clamp-1">
                  {video.description}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="px-3 py-1 bg-surface-2 border border-border text-xs text-gold font-bold rounded-lg">
                  {video.resolution || '4K UHD'}
                </span>
                <span className="text-xs text-text-muted">
                  Authenticated: {email}
                </span>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default function WatchPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-gold animate-spin" />
        </div>
      }
    >
      <WatchContent />
    </Suspense>
  );
}
