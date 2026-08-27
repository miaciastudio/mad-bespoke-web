import React, { useState } from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import { openWhatsAppEnquiry } from '../../services/whatsapp';

export default function WhatsAppFloat() {
  const [tooltipOpen, setTooltipOpen] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      
      {/* Interactive Tooltip Card */}
      {tooltipOpen && (
        <div className="bg-canvas-card border border-gold-300 text-ink-primary p-3 rounded-2xl shadow-warm-lg max-w-xs flex items-start gap-2.5 animate-bounce-subtle">
          <div className="w-8 h-8 rounded-full bg-burgundy-100 flex items-center justify-center shrink-0 text-burgundy-700">
            <Sparkles className="w-4 h-4 text-gold-600" />
          </div>
          <div className="flex-1 text-xs">
            <p className="font-semibold text-burgundy-900">Need Customisation Help?</p>
            <p className="text-ink-secondary text-[11px] mt-0.5">Chat directly with our bespoke gifting designer on WhatsApp!</p>
          </div>
          <button
            onClick={() => setTooltipOpen(false)}
            className="text-ink-muted hover:text-ink-primary p-0.5"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => openWhatsAppEnquiry({})}
        className="whatsapp-pulse flex items-center gap-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-3.5 rounded-full shadow-warm-lg transition-all duration-300 hover:scale-105"
        aria-label="Contact Mad Bespoke on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white text-green-600" />
        <span className="text-sm tracking-wide hidden sm:inline">WhatsApp Order</span>
      </button>
    </div>
  );
}
