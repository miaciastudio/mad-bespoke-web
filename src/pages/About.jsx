import React from 'react';
import {
  Sparkles,
  Heart,
  Award,
  ShieldCheck,
  MessageCircle,
  Feather,
  CheckCircle2,
  Users,
  Smile
} from 'lucide-react';
import { InstagramIcon } from '../components/ui/Icons';
import SectionHeading from '../components/ui/SectionHeading';
import { openWhatsAppEnquiry } from '../services/whatsapp';

export default function About() {
  const values = [
    {
      title: 'Artisanal Precision',
      desc: 'We combine state-of-the-art laser engraving technology with time-honored leathercrafting to ensure millimeter perfection on every item.',
      icon: <Award className="w-6 h-6 text-gold-600" />,
    },
    {
      title: 'Radical Personalisation',
      desc: 'No generic gifts. From full names and company emblems to meaningful dates and anniversary vows, your imagination is our blueprint.',
      icon: <Feather className="w-6 h-6 text-gold-600" />,
    },
    {
      title: 'Accessible Luxury',
      desc: 'Bespoke craftsmanship should not be inaccessible. We deliver museum-grade presentation boxes and premium metal finishes at direct honest pricing.',
      icon: <ShieldCheck className="w-6 h-6 text-gold-600" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20">
      
      {/* 1. Header */}
      <SectionHeading
        badge="Our Heritage & Philosophy"
        title="About Mad Bespoke"
        subtitle="Where heartfelt human sentiment meets timeless bespoke craftsmanship."
      />

      {/* 2. Brand Story / Founder Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left: Wax Seal & Brand Visual */}
        <div className="lg:col-span-5 relative">
          <div className="bg-canvas-card p-6 rounded-3xl border-2 border-gold-400 shadow-warm-lg space-y-4">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-canvas relative">
              <img
                src="/logo.jpg"
                alt="Mad Bespoke Artisan Seal"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-gold-300 text-xs font-semibold uppercase tracking-widest">
                  Authentic Wax Seal Emblem
                </span>
                <h3 className="font-serif text-xl font-bold mt-1">
                  The Hallmark of Distinction
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Narrative Story */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 bg-gold-100 text-gold-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider border border-gold-300">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            Born Out of Passion
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy-950 leading-tight">
            We Believe Every Gift Tells a Story. We Make Sure It’s Unforgettable.
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-ink-secondary leading-relaxed">
            <p>
              Mad Bespoke was founded with a singular conviction: ordinary store-bought gifts often lack soul. When you present someone with a token bearing their exact name, a secret shared anniversary date, or an emblem of their profession—the gift transforms into an emotional heirloom.
            </p>
            <p>
              From our artisan studio in Mumbai, we hand-finish every piece. Whether it’s an executive signing multi-million contracts with our laser-etched Gold Zari Pen, a doctor carrying our Caduceus emblem keychain, or a loved one unwrapping our 4-piece leather hamper—we take immense pride in crafting pieces that spark genuine delight.
            </p>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-canvas-subtle">
            <div>
              <p className="font-serif text-3xl font-bold text-burgundy-900">1.2K+</p>
              <p className="text-xs text-ink-muted">Delighted Customers</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-bold text-burgundy-900">70+</p>
              <p className="text-xs text-ink-muted">Bespoke Catalog Items</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-bold text-burgundy-900">250+</p>
              <p className="text-xs text-ink-muted">Supported Phone Models</p>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Core Brand Values */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-burgundy-950">
            The Pillars of Our Craft
          </h2>
          <p className="text-sm text-ink-secondary mt-2">
            Every creation adheres to our uncompromising standards of material and finish.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((val, i) => (
            <div
              key={i}
              className="bg-canvas-card p-6 sm:p-8 rounded-3xl border border-canvas-subtle shadow-warm hover:border-gold-500 transition-all duration-300 space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-canvas flex items-center justify-center border border-gold-300/60">
                {val.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-burgundy-950">
                {val.title}
              </h3>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Instagram Feed Section */}
      <div className="bg-canvas-card rounded-3xl p-8 sm:p-12 border border-gold-300 shadow-warm space-y-8 text-center">
        <div className="max-w-xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 bg-burgundy-100 text-burgundy-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            <InstagramIcon className="w-3.5 h-3.5" />
            @mad-bespoke on Instagram
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-burgundy-950">
            Follow Our Bespoke Journey
          </h3>
          <p className="text-xs sm:text-sm text-ink-secondary">
            Join over 1,200+ patrons seeing our daily engraving reels, custom hamper unboxings, and new product launches!
          </p>
        </div>

        {/* Gallery Preview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=400&q=80',
            'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80',
          ].map((img, idx) => (
            <a
              key={idx}
              href="https://instagram.com/mad-bespoke"
              target="_blank"
              rel="noreferrer"
              className="aspect-square rounded-2xl overflow-hidden bg-canvas relative group shadow-sm"
            >
              <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-burgundy-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <InstagramIcon className="w-6 h-6" />
              </div>
            </a>
          ))}
        </div>

        <div>
          <a
            href="https://instagram.com/mad-bespoke"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-burgundy-700 hover:bg-burgundy-800 text-gold-100 font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-warm transition-all"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Follow @mad-bespoke</span>
          </a>
        </div>
      </div>

    </div>
  );
}
