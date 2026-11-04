import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Clock,
  Eye,
  Film,
  Sparkles,
  ShieldCheck,
  Crown,
  Share2,
  Lock,
  ArrowLeft
} from 'lucide-react';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Back button */}
      <Link
        href="/catalog"
        className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-gold transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Catalog
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
            <div className="absolute top-4 left-4 pointer-events-none">
              <span className="px-3 py-1 bg-black/80 border border-white/20 text-text-primary text-[11px] font-bold uppercase tracking-wider rounded-full backdrop-blur-md">
                Official Teaser Preview
              </span>
            </div>
          </div>

          {/* Video Title and Metadata */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-surface-2 border border-gold/40 text-gold text-xs font-bold uppercase rounded-full">
                {video.categoryName}
              </span>
              {video.resolution && (
                <span className="px-2.5 py-0.5 bg-surface-2 border border-border text-white text-xs font-bold uppercase rounded">
                  {video.resolution}
                </span>
              )}
              {video.isSubscriptionOnly && (
                <span className="px-3 py-1 bg-gold/15 border border-gold text-gold text-xs font-bold uppercase rounded-full flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5" />
                  VIP Club Exclusive
                </span>
              )}
            </div>

            <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-text-primary leading-tight">
              {video.title}
            </h1>

            {/* Quick stats */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-text-muted border-y border-border/80 py-3">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-gold" />
                <span className="text-text-primary font-medium">{formatDuration(video.durationSeconds)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                <span>{video.viewCount.toLocaleString()} plays</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Film className="w-4 h-4" />
                <span>Full Uncut 4K Master</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>18 U.S.C. 2257 Verified</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                Drop Description
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {video.description}
              </p>
            </div>

            {/* Tags */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-text-muted block mb-2">Tags:</span>
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
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-text-primary uppercase tracking-tight">
              More Drops From DB
            </h2>
            <Link href="/catalog" className="text-xs font-semibold text-gold hover:underline">
              View All &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedVideos.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
