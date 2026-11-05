'use client';

import React, { useState, useMemo } from 'react';
import { INITIAL_VIDEOS, INITIAL_CATEGORIES } from '@/lib/db/mock-data';
import VideoCard from '@/components/VideoCard';

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'price-asc' | 'price-desc'>('newest');

  const filteredVideos = useMemo(() => {
    let result = [...INITIAL_VIDEOS];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((v) => v.categoryId === selectedCategory);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q) ||
          v.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
      if (sortBy === 'popular') {
        return b.viewCount - a.viewCount;
      }
      if (sortBy === 'price-asc') {
        return a.priceCents - b.priceCents;
      }
      if (sortBy === 'price-desc') {
        return b.priceCents - a.priceCents;
      }
      return 0;
    });

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 font-mono">
      {/* Catalog Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-surface-2 border border-border text-xs text-text-secondary font-mono">
          <span className="text-gold font-bold mr-1.5">CATALOG</span>
          <span>Full Creator Vault</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-text-primary uppercase tracking-tight font-sans">
          All Video Drops
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary max-w-2xl font-sans">
          Browse the complete collection of DB productions. Stream in ultra 4K 60fps with instant private access.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-surface-1 border border-border flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="SEARCH DROPS, TAGS, 4K..."
            className="w-full px-4 py-2 bg-surface-2 border border-border focus:border-gold rounded-xl text-xs text-text-primary placeholder:text-text-muted outline-none transition-colors uppercase font-mono"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none font-mono">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap uppercase transition-all ${
              selectedCategory === 'all'
                ? 'bg-gold text-black shadow-md shadow-gold/20'
                : 'bg-surface-2 text-text-secondary hover:text-text-primary border border-border'
            }`}
          >
            All Drops ({INITIAL_VIDEOS.length})
          </button>
          {INITIAL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap uppercase transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gold text-black shadow-md shadow-gold/20'
                  : 'bg-surface-2 text-text-secondary hover:text-text-primary border border-border'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end font-mono">
          <span className="text-[11px] text-text-muted uppercase">SORT:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-surface-2 border border-border text-xs text-text-primary rounded-lg px-3 py-2 outline-none focus:border-gold font-mono uppercase"
          >
            <option value="newest">Newest Drops</option>
            <option value="popular">Most Popular</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Videos Grid */}
      {filteredVideos.length === 0 ? (
        <div className="py-20 text-center space-y-3 bg-surface-1 border border-border rounded-2xl font-mono">
          <p className="text-base font-semibold text-text-primary uppercase">NO DROPS FOUND</p>
          <p className="text-xs text-text-muted">Try clearing your search query or choosing another category.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 bg-surface-2 border border-border text-xs text-gold rounded-lg font-semibold uppercase"
          >
            Reset Filters &rarr;
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 font-sans">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
