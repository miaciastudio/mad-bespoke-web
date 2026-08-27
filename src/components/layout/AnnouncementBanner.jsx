import React from 'react';
import { Sparkles } from 'lucide-react';

export default function AnnouncementBanner() {
  return (
    <div className="bg-burgundy-900 text-gold-300 text-xs py-2 px-4 text-center font-medium tracking-wide border-b border-burgundy-800 flex items-center justify-center gap-2">
      <Sparkles className="w-3.5 h-3.5 text-gold-500 animate-pulse" />
      <span>✨ <strong>Complimentary Laser Name Engraving</strong> on all curated sets this week • Pan-India Safe Delivery</span>
    </div>
  );
}
