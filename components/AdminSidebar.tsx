'use client';

import React from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Film,
  ShoppingCart,
  Users,
  ShieldAlert,
  Settings,
  Sparkles,
  ExternalLink,
  DollarSign
} from 'lucide-react';

interface AdminSidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export default function AdminSidebar({ currentTab, onTabChange }: AdminSidebarProps) {
  const navItems = [
    { id: 'overview', label: 'Overview & MRR', icon: LayoutDashboard },
    { id: 'videos', label: 'Video Catalog', icon: Film },
    { id: 'orders', label: 'Orders & Refunds', icon: ShoppingCart },
    { id: 'subscribers', label: 'VIP Subscribers', icon: Users },
    { id: 'compliance', label: '2257 Compliance', icon: ShieldAlert },
    { id: 'settings', label: 'Processor & Alerts', icon: Settings },
  ];

  return (
    <aside className="w-full md:w-64 bg-surface-1 border border-border rounded-3xl p-5 space-y-6 shrink-0 h-fit">
      {/* Admin header */}
      <div className="flex items-center gap-3 border-b border-border/80 pb-4">
        <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center font-display font-black text-lg">
          DB
        </div>
        <div>
          <h2 className="font-display font-bold text-sm text-text-primary">
            VAULT ADMIN
          </h2>
          <span className="text-[10px] text-text-muted uppercase tracking-wider">
            Creator Control Room
          </span>
        </div>
      </div>

      {/* Nav list */}
      <nav className="space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                isActive
                  ? 'bg-gold text-black shadow-md shadow-gold/20'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-2'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Quick Creator Links */}
      <div className="pt-4 border-t border-border/80 space-y-2">
        <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted block">
          Shortcuts
        </span>
        <Link
          href="/"
          className="flex items-center justify-between text-xs text-text-secondary hover:text-gold transition-colors py-1"
        >
          <span>Storefront Preview</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/pricing"
          className="flex items-center justify-between text-xs text-text-secondary hover:text-gold transition-colors py-1"
        >
          <span>VIP Offer Page</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </aside>
  );
}
