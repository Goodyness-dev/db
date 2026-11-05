'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Video } from '@/lib/types';

interface VideoCardProps {
  video: Video;
  isUnlocked?: boolean;
}

export default function VideoCard({ video, isUnlocked = false }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSecs = sec % 60;
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const formatPrice = (cents: number) => {
    if (cents === 0) return 'FREE WITH VIP';
    return `$${(cents / 100).toFixed(2)}`;
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col bg-surface-1 rounded-2xl border border-border hover:border-gold/50 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-gold/10 hover:-translate-y-1"
    >
      {/* 16:9 Aspect Media Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-surface-2">
        {/* Still Thumbnail */}
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
        />

        {/* Teaser Video Preview on Hover */}
        <video
          ref={videoRef}
          src={video.teaserUrl}
          muted
          playsInline
          loop
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
        />

        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none font-mono">
          {video.isSubscriptionOnly ? (
            <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-surface-1/90 border border-gold/60 text-gold rounded-full shadow-md">
              [ VIP ONLY ]
            </span>
          ) : (
            <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-surface-1/90 border border-border text-text-primary rounded-full">
              {video.categoryName}
            </span>
          )}

          {video.resolution && (
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-black/80 border border-white/10 text-white rounded">
              {video.resolution}
            </span>
          )}
        </div>

        {/* Bottom Badges on Image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs pointer-events-none font-mono">
          <div className="px-2 py-0.5 rounded bg-black/80 text-text-secondary text-[11px]">
            <span>{formatDuration(video.durationSeconds)}</span>
          </div>

          <div className="px-2 py-0.5 rounded bg-black/80 text-text-muted text-[11px]">
            <span>{video.viewCount.toLocaleString()} PLAYS</span>
          </div>
        </div>

        {/* Hover Teaser Indicator */}
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="px-4 py-2 rounded-full bg-gold/90 text-black font-mono font-bold text-xs uppercase shadow-lg shadow-gold/30">
              PREVIEW
            </div>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <h3 className="font-display font-bold text-sm text-text-primary group-hover:text-gold transition-colors line-clamp-1 uppercase tracking-tight">
            {video.title}
          </h3>
          <p className="mt-1 text-xs text-text-muted line-clamp-2 leading-relaxed">
            {video.description}
          </p>
        </div>

        {/* Price & CTA */}
        <div className="pt-2 border-t border-border/60 flex items-center justify-between">
          <div>
            {video.isSubscriptionOnly ? (
              <span className="text-xs font-mono font-bold text-gold tracking-wide">
                VIP MEMBERS ONLY
              </span>
            ) : (
              <div className="flex items-baseline gap-1.5">
                <span className="font-display font-extrabold text-base text-text-primary">
                  {formatPrice(video.priceCents)}
                </span>
                <span className="text-[10px] uppercase font-mono text-text-muted">Direct</span>
              </div>
            )}
          </div>

          <Link
            href={`/video/${video.slug}`}
            className="px-3.5 py-1.5 bg-surface-2 hover:bg-gold hover:text-black border border-border hover:border-gold text-xs font-mono font-bold uppercase rounded-lg transition-all duration-200 text-text-primary"
          >
            {isUnlocked ? 'WATCH NOW &rarr;' : 'UNLOCK &rarr;'}
          </Link>
        </div>
      </div>
    </div>
  );
}
