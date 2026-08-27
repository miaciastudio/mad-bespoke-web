import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  Cpu,
  Layers,
  Palette,
  ShieldCheck,
  Zap,
  Box
} from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import { openWhatsAppEnquiry } from '../services/whatsapp';

export default function Personalisation() {
  const customisationTypes = [
    {
      title: 'Precision Laser Engraving',
      desc: 'Surgical fiber laser etching that permanently embeds names, signatures, badges, and logos into metallic pens, stainless steel kadas, and thermal flasks. Will never peel or fade.',
      tag: 'Steel & Metal',
      icon: '⚡',
      image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Charm & Name-Strip Monograms',
      desc: 'Hand-riveted antique metallic charms (Crown, Aviator Wings, Anchor, Hearts) paired with custom debossed / printed name tags on premium faux & full-grain leather wallets and passport sleeves.',
      tag: 'Leather Accessories',
      icon: '👑',
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'HD Sublimation & UV Printing',
      desc: 'Vivid, scratch-resistant photographic printing on 2D aluminum phone covers (250+ phone models), glossy ceramic coffee mugs, gaming mouse pads, and plush velvet cushions.',
      tag: 'Photo Keepsakes',
      icon: '🎨',
      image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: '4-Sided Secret Bar Inscriptions',
      desc: 'Multi-faceted architectural pillar pendants and solid keychains engraved on all 4 faces with coordinates, anniversary dates, secret vows, or loved ones’ names.',
      tag: 'Secret Pendants',
      icon: '✨',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Corporate & Executive Branding',
      desc: 'High-volume custom branding with exact brand pantone fidelity, executive font matching, and bespoke box sleeves for corporate gifting and executive recognition kits.',
      tag: 'Corporate & B2B',
      icon: '🏢',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20">
      
      {/* 1. Header */}
      <SectionHeading
        badge="Artisanal Mastery"
        title="How Bespoke Personalisation Works"
        subtitle="Transforming meaningful moments into enduring, handcrafted keepsakes."
      />

      {/* 2. 4-Step Visual Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            num: '01',
            title: 'Select Your Canvas',
            desc: 'Browse our collection of 70+ luxury leather items, engraved pens, kadas, bottles, or apparel.',
            icon: <Box className="w-6 h-6 text-gold-600" />,
          },
          {
            num: '02',
            title: 'Provide Requirements',
            desc: 'Enter your names, choose your favorite metal charm, send high-res photos, or upload corporate vector logos.',
            icon: <Palette className="w-6 h-6 text-gold-600" />,
          },
          {
            num: '03',
            title: 'Artisan Precision Crafting',
            desc: 'We generate digital previews for your WhatsApp confirmation before laser-engraving or printing.',
            icon: <Zap className="w-6 h-6 text-gold-600" />,
          },
          {
            num: '04',
            title: 'Gift Box Delivery',
            desc: 'Packed in shock-proof presentation packaging and dispatched with express tracking across India.',
            icon: <ShieldCheck className="w-6 h-6 text-gold-600" />,
          },
        ].map((s) => (
          <div
            key={s.num}
            className="bg-canvas-card border border-canvas-subtle hover:border-gold-500 rounded-3xl p-6 shadow-warm relative flex flex-col justify-between transition-all duration-300 group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif text-3xl font-bold text-gold-600 group-hover:scale-110 transition-transform">
                  {s.num}
                </span>
                <div className="w-12 h-12 rounded-2xl bg-canvas flex items-center justify-center border border-gold-300/40">
                  {s.icon}
                </div>
              </div>
              <h3 className="font-serif text-lg font-bold text-burgundy-950 mb-2">
                {s.title}
              </h3>
              <p className="text-xs text-ink-secondary leading-relaxed">
                {s.desc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-canvas-subtle flex items-center gap-1.5 text-[11px] font-semibold text-gold-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Standard Step</span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Customisation Craft Types Grid */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-burgundy-950">
            Our 5 Bespoke Crafting Disciplines
          </h2>
          <p className="text-sm text-ink-secondary mt-2">
            Each technique is executed with specialized equipment to ensure lifelong durability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {customisationTypes.map((type, i) => (
            <div
              key={i}
              className="bg-canvas-card rounded-3xl overflow-hidden border border-canvas-subtle shadow-warm hover:shadow-warm-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="aspect-[16/10] overflow-hidden bg-canvas-light relative">
                <img
                  src={type.image}
                  alt={type.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-burgundy-900/90 text-gold-300 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-gold-500/40">
                  {type.tag}
                </span>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{type.icon}</span>
                    <h3 className="font-serif text-xl font-bold text-burgundy-950">
                      {type.title}
                    </h3>
                  </div>
                  <p className="text-xs text-ink-secondary leading-relaxed mt-2">
                    {type.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-canvas-subtle">
                  <button
                    onClick={() => openWhatsAppEnquiry({ note: `Inquiry about ${type.title}` })}
                    className="w-full inline-flex items-center justify-center gap-2 bg-canvas hover:bg-burgundy-700 hover:text-gold-100 text-burgundy-900 text-xs font-semibold py-2.5 rounded-xl border border-canvas-subtle transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Inquire About This Style</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Bottom CTA */}
      <div className="bg-burgundy-900 text-gold-100 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6 border-2 border-gold-500 shadow-warm-lg">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gold-100">
          Ready to Craft Your Signature Piece?
        </h2>
        <p className="text-sm sm:text-base text-burgundy-200 max-w-xl mx-auto leading-relaxed">
          Chat directly with our master artisan on WhatsApp. Share your names or logos and receive a complimentary digital sample mockup.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => openWhatsAppEnquiry({})}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-burgundy-950 font-bold px-8 py-4 rounded-full text-xs uppercase tracking-wider shadow-warm transition-all"
          >
            <MessageCircle className="w-4 h-4 text-burgundy-950" />
            <span>Start WhatsApp Order (+91 9730672323)</span>
          </button>
          <Link
            to="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent hover:bg-burgundy-800 text-gold-200 border border-gold-400 font-semibold px-8 py-4 rounded-full text-xs uppercase tracking-wider transition-all"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
