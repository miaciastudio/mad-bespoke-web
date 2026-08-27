import React from 'react';
import { Sparkles } from 'lucide-react';

export default function SectionHeading({
  badge,
  title,
  subtitle,
  centered = true,
  className = '',
}) {
  return (
    <div className={`space-y-3 mb-10 sm:mb-14 ${centered ? 'text-center max-w-3xl mx-auto' : ''} ${className}`}>
      {badge && (
        <span className="inline-flex items-center gap-1.5 bg-burgundy-100 text-burgundy-800 text-xs font-semibold uppercase tracking-[0.2em] px-3.5 py-1 rounded-full border border-burgundy-200 shadow-sm">
          <Sparkles className="w-3 h-3 text-gold-600" />
          {badge}
        </span>
      )}
      
      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-burgundy-950 leading-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="text-base sm:text-lg text-ink-secondary leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Decorative Gold Accent Line */}
      <div className={`flex items-center gap-2 pt-1 ${centered ? 'justify-center' : ''}`}>
        <div className="h-0.5 w-12 bg-gradient-to-r from-gold-300 to-gold-500 rounded-full" />
        <div className="w-2 h-2 rounded-full bg-burgundy-700" />
        <div className="h-0.5 w-12 bg-gradient-to-l from-gold-300 to-gold-500 rounded-full" />
      </div>
    </div>
  );
}
