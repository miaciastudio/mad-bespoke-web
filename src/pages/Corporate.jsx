import React, { useState } from 'react';
import {
  Building2,
  Sparkles,
  MessageCircle,
  CheckCircle2,
  Users,
  Award,
  Gift,
  Briefcase,
  TrendingUp,
  Clock,
  ShieldCheck,
  Send
} from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import { openWhatsAppEnquiry } from '../services/whatsapp';

export default function Corporate() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    phone: '',
    itemType: 'Curated 3-in-1 / 4-in-1 Executive Hamper',
    quantity: '50',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    openWhatsAppEnquiry({
      customerName: `${formData.contactName} (${formData.companyName})`,
      customText: `Item: ${formData.itemType}`,
      quantity: formData.quantity,
      type: 'bulk_corporate',
      note: `Phone: ${formData.phone} | Notes: ${formData.notes}`,
    });
    setSubmitted(true);
  };

  const useCases = [
    {
      title: 'Employee Onboarding & Welcome Kits',
      desc: 'Welcome new hires with branded leather notebooks, personalized metal pens, vacuum temperature flasks, and custom ID card holders.',
      icon: <Users className="w-6 h-6 text-gold-600" />,
    },
    {
      title: 'Annual Summits & Milestone Awards',
      desc: 'Honor top-performing teams, loyal employees, and executive leaders with laser-etched stainless steel awards and curated luxury hampers.',
      icon: <Award className="w-6 h-6 text-gold-600" />,
    },
    {
      title: 'Festive Hampers (Diwali & New Year)',
      desc: 'Show gratitude to partners and clients with customized velvet gift boxes featuring leather wallets, engraved bottles, and bespoke diaries.',
      icon: <Gift className="w-6 h-6 text-gold-600" />,
    },
    {
      title: 'Client Appreciation & High-Ticket Deals',
      desc: 'Leave an indelible mark on VIP clients with bespoke monogrammed leather ensembles and laser-etched executive desk organizers.',
      icon: <Briefcase className="w-6 h-6 text-gold-600" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20">
      
      {/* 1. Header */}
      <SectionHeading
        badge="Enterprise & B2B Solutions"
        title="Gifting at Scale."
        subtitle="Custom-crafted branded merchandise and executive hampers tailored for corporate excellence."
      />

      {/* 2. Hero Corporate Banner */}
      <div className="bg-burgundy-950 text-gold-100 rounded-3xl p-8 sm:p-14 border-2 border-gold-500 shadow-warm-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 bg-burgundy-800 text-gold-300 text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-gold-500/40">
            <Building2 className="w-4 h-4" />
            Direct Manufacturer Pricing
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gold-100 leading-tight">
            Elevate Your Brand Identity Through Bespoke Luxury
          </h2>
          <p className="text-sm sm:text-base text-burgundy-200 leading-relaxed">
            From 25 pieces to 5,000+ units, Mad Bespoke provides seamless corporate fulfillment with laser precision logo etching, custom gift box sleeves, and dedicated dispatch timelines.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 border-t border-burgundy-800">
            <div>
              <span className="font-serif font-bold text-2xl text-gold-400">25+</span>
              <p className="text-xs text-burgundy-200">Min. Bulk Order</p>
            </div>
            <div>
              <span className="font-serif font-bold text-2xl text-gold-400">100%</span>
              <p className="text-xs text-burgundy-200">Logo Precision</p>
            </div>
            <div>
              <span className="font-serif font-bold text-2xl text-gold-400">Pan-India</span>
              <p className="text-xs text-burgundy-200">Multi-City Delivery</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-canvas-card text-ink-primary p-6 sm:p-8 rounded-2xl border border-gold-300 shadow-warm space-y-4">
            <h3 className="font-serif text-xl font-bold text-burgundy-950">
              Request Instant Corporate Quote
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3 text-left">
              <div>
                <label className="text-[11px] font-bold uppercase text-ink-secondary block mb-1">Company / Organization</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tata Consultancy / Reliance"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full bg-canvas text-xs p-2.5 rounded-lg border border-canvas-subtle focus:ring-2 focus:ring-burgundy-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold uppercase text-ink-secondary block mb-1">Contact Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full bg-canvas text-xs p-2.5 rounded-lg border border-canvas-subtle focus:ring-2 focus:ring-burgundy-700"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase text-ink-secondary block mb-1">WhatsApp / Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-canvas text-xs p-2.5 rounded-lg border border-canvas-subtle focus:ring-2 focus:ring-burgundy-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold uppercase text-ink-secondary block mb-1">Product Category</label>
                  <select
                    value={formData.itemType}
                    onChange={(e) => setFormData({ ...formData, itemType: e.target.value })}
                    className="w-full bg-canvas text-xs p-2.5 rounded-lg border border-canvas-subtle"
                  >
                    <option>Executive Gift Hampers</option>
                    <option>Engraved Metal Pens</option>
                    <option>Leather Diary & Planner Sets</option>
                    <option>Smart Temp Bottles & Flasks</option>
                    <option>Custom Hoodies & Polo Tees</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase text-ink-secondary block mb-1">Est. Quantity</label>
                  <input
                    type="number"
                    min="10"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full bg-canvas text-xs p-2.5 rounded-lg border border-canvas-subtle"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-ink-secondary block mb-1">Customisation Note / Timeline</label>
                <textarea
                  rows="2"
                  placeholder="Need logo laser engraved + required within 7 days..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-canvas text-xs p-2.5 rounded-lg border border-canvas-subtle"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-burgundy-700 hover:bg-burgundy-800 text-gold-100 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-warm"
              >
                <MessageCircle className="w-4 h-4 text-green-400" />
                <span>Submit Quote to WhatsApp →</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 3. Corporate Use Cases */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-burgundy-950">
            Tailored for Every Enterprise Occasion
          </h2>
          <p className="text-sm text-ink-secondary mt-2">
            Comprehensive gifting suites engineered to impress clients, partners, and high-performing staff.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {useCases.map((uc, i) => (
            <div
              key={i}
              className="bg-canvas-card p-6 sm:p-8 rounded-3xl border border-canvas-subtle shadow-warm flex items-start gap-5 hover:border-gold-500 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-canvas flex items-center justify-center shrink-0 border border-gold-300/60">
                {uc.icon}
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-xl font-bold text-burgundy-950">
                  {uc.title}
                </h3>
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                  {uc.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Corporate Assurance & Guarantee */}
      <div className="bg-canvas-card rounded-3xl p-8 sm:p-12 border border-gold-300 shadow-warm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-full bg-burgundy-100 text-burgundy-800 mx-auto flex items-center justify-center">
              <Clock className="w-6 h-6 text-gold-600" />
            </div>
            <h4 className="font-serif font-bold text-burgundy-950 text-base">Rapid Sample Turnaround</h4>
            <p className="text-xs text-ink-secondary">Digital 3D render mockups in 2 hours, physical sample dispatched in 24 hours.</p>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 rounded-full bg-burgundy-100 text-burgundy-800 mx-auto flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-gold-600" />
            </div>
            <h4 className="font-serif font-bold text-burgundy-950 text-base">Tiered Volume Rebates</h4>
            <p className="text-xs text-ink-secondary">Enjoy progressive wholesale pricing brackets for 50, 100, 500, and 2,000+ quantities.</p>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 rounded-full bg-burgundy-100 text-burgundy-800 mx-auto flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-gold-600" />
            </div>
            <h4 className="font-serif font-bold text-burgundy-950 text-base">GST Invoice & Corporate Support</h4>
            <p className="text-xs text-ink-secondary">Official GST compliant tax billing, purchase orders, and dedicated account manager.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
