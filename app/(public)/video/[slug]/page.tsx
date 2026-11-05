import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { store } from '@/lib/db/store';
import BuyPanel from '@/components/BuyPanel';
import VideoCard from '@/components/VideoCard';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function VideoDetailPage({ params }: Props) {
  const { slug } = await params;
  const video = store.getVideoBySlug(slug);

  if (!video) {
    notFound();
  }

  const allVideos = store.getVideos();
  const relatedVideos = allVideos
    .filter((v) => v.id !== video.id)
    .slice(0, 3);

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSecs = sec % 60;
    return `${mins}m ${remainingSecs}s`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 font-mono">
      {/* Back button */}
      <Link
        href="/catalog"
        className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-gold transition-colors font-mono"
      >
        &larr; BACK TO CATALOG
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Teaser Media Player & Details */}
        <div className="lg:col-span-8 space-y-8">
          {/* Teaser Video Preview Container */}
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-black border border-border shadow-2xl">
            <video
              src={video.teaserUrl}
              controls
              playsInline
              poster={video.thumbnailUrl}
              className="w-full h-full object-contain"
            />
            {/* Watermark / Teaser Banner */}
            <div className="absolute top-4 left-4 pointer-events-none font-mono">
              <span className="px-3 py-1 bg-black/80 border border-white/20 text-text-primary text-[10px] font-bold uppercase tracking-wider rounded-full backdrop-blur-md">
                OFFICIAL TEASER PREVIEW
              </span>
            </div>
          </div>

          {/* Video Title and Metadata */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 font-mono">
              <span className="px-3 py-1 bg-surface-2 border border-gold/40 text-gold text-xs font-bold uppercase rounded-full">
                {video.categoryName}
              </span>
              {video.resolution && (
                <span className="px-2.5 py-0.5 bg-surface-2 border border-border text-white text-xs font-bold uppercase rounded">
                  {video.resolution}
                </span>
              )}
              {video.isSubscriptionOnly && (
                <span className="px-3 py-1 bg-gold/15 border border-gold text-gold text-xs font-bold uppercase rounded-full">
                  [ VIP CLUB EXCLUSIVE ]
                </span>
              )}
            </div>

            <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-text-primary leading-tight uppercase font-sans">
              {video.title}
            </h1>

            {/* Quick stats */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-text-muted border-y border-border/80 py-3 font-mono">
              <div>
                <span className="text-text-muted">DURATION: </span>
                <span className="text-text-primary font-medium">{formatDuration(video.durationSeconds)}</span>
              </div>
              <div>
                <span className="text-text-muted">PLAYS: </span>
                <span>{video.viewCount.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-text-muted">MASTER: </span>
                <span>Full Uncut 4K</span>
              </div>
              <div>
                <span className="text-emerald-400 font-bold">[ 18 U.S.C. 2257 VERIFIED ]</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3 pt-2 font-sans">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary font-mono">
                Drop Description
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {video.description}
              </p>
            </div>

            {/* Tags */}
            <div className="pt-2 font-mono">
              <span className="text-xs font-semibold text-text-muted block mb-2">TAGS:</span>
              <div className="flex flex-wrap gap-1.5">
                {video.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-surface-2 text-text-secondary text-[11px] font-medium rounded-lg border border-border"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Checkout / VIP Panel */}
        <div className="lg:col-span-4 sticky top-28 space-y-6">
          <BuyPanel video={video} />
        </div>
      </div>

      {/* Related Drops */}
      {relatedVideos.length > 0 && (
        <section className="pt-16 border-t border-border space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-text-primary uppercase tracking-tight font-sans">
              More Drops From DB
            </h2>
            <Link href="/catalog" className="text-xs font-mono font-semibold text-gold hover:underline">
              VIEW ALL &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
            {relatedVideos.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
