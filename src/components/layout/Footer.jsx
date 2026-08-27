import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, Heart, ShieldCheck, Truck, Award } from 'lucide-react';
import { InstagramIcon } from '../ui/Icons';
import { openWhatsAppEnquiry } from '../../services/whatsapp';

export default function Footer() {
  return (
    <footer className="bg-burgundy-900 text-canvas-light pt-16 pb-12 border-t-4 border-gold-500">
      
      {/* Brand Trust Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-12 border-b border-burgundy-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-burgundy-800 flex items-center justify-center text-gold-300">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-semibold text-gold-100 text-sm">Artisanal Craftsmanship</h4>
            <p className="text-xs text-burgundy-200">Laser precision & meticulous detailing on every order</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-burgundy-800 flex items-center justify-center text-gold-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-semibold text-gold-100 text-sm">100% Personalised</h4>
            <p className="text-xs text-burgundy-200">Custom names, charms, dates, and bespoke logos</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-burgundy-800 flex items-center justify-center text-gold-300">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-semibold text-gold-100 text-sm">Pan-India Delivery</h4>
            <p className="text-xs text-burgundy-200">Dispatched in 24–48 hours with secure shockproof packing</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-burgundy-800 flex items-center justify-center text-gold-300">
              <MessageCircle className="w-6 h-6 text-green-400" />
            </div>
            <h4 className="font-serif font-semibold text-gold-100 text-sm">Seamless WhatsApp Orders</h4>
            <p className="text-xs text-burgundy-200">Direct design preview approval before final crafting</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gold-500 bg-canvas-card">
                <img src="/logo.jpg" alt="Mad Bespoke" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-gold-100">
                  MAD BESPOKE
                </span>
                <span className="block text-xs tracking-[0.2em] uppercase text-gold-300">
                  Make It Personal
                </span>
              </div>
            </div>
            
            <p className="text-sm text-burgundy-200 leading-relaxed pr-6">
              Mad Bespoke creates unforgettable personalized keepsakes, luxury laser-engraved stationery, stainless steel jewellery, and bespoke corporate hampers tailored with timeless distinction.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/mad-bespoke"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-burgundy-800 hover:bg-gold-500 hover:text-burgundy-900 flex items-center justify-center text-gold-300 transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <button
                onClick={() => openWhatsAppEnquiry({})}
                className="w-10 h-10 rounded-full bg-burgundy-800 hover:bg-green-600 hover:text-white flex items-center justify-center text-gold-300 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Col 2: Collections */}
          <div>
            <h3 className="font-serif text-base font-semibold text-gold-100 mb-4 tracking-wide uppercase">
              Collections
            </h3>
            <ul className="space-y-2.5 text-sm text-burgundy-200">
              <li><Link to="/shop?category=pens-stationery" className="hover:text-gold-300 transition-colors">Pens & Stationery</Link></li>
              <li><Link to="/shop?category=leather-gifts" className="hover:text-gold-300 transition-colors">Leather Wallets & Sets</Link></li>
              <li><Link to="/shop?category=stainless-steel" className="hover:text-gold-300 transition-colors">Stainless Steel Kadas</Link></li>
              <li><Link to="/shop?category=gift-sets" className="hover:text-gold-300 transition-colors">Curated Gift Sets</Link></li>
              <li><Link to="/shop?category=bottles-mugs" className="hover:text-gold-300 transition-colors">Smart Temp Bottles</Link></li>
              <li><Link to="/shop?category=apparel" className="hover:text-gold-300 transition-colors">Custom Streetwear & Hoodies</Link></li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h3 className="font-serif text-base font-semibold text-gold-100 mb-4 tracking-wide uppercase">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm text-burgundy-200">
              <li><Link to="/shop" className="hover:text-gold-300 transition-colors">All Products (70+)</Link></li>
              <li><Link to="/personalisation" className="hover:text-gold-300 transition-colors">How Personalisation Works</Link></li>
              <li><Link to="/corporate" className="hover:text-gold-300 transition-colors">Corporate & Bulk Gifting</Link></li>
              <li><Link to="/about" className="hover:text-gold-300 transition-colors">About Our Brand</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact Information */}
          <div>
            <h3 className="font-serif text-base font-semibold text-gold-100 mb-4 tracking-wide uppercase">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-burgundy-200">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span>+91 9730672323</span>
              </li>
              <li className="flex items-start gap-2.5">
                <InstagramIcon className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <a href="https://instagram.com/mad-bespoke" target="_blank" rel="noreferrer" className="hover:underline">
                  @mad-bespoke
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span>orders@madbespoke.in</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span>Mumbai, Maharashtra • Shipping Across India</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright / Bottom Strip */}
        <div className="mt-12 pt-6 border-t border-burgundy-800 flex flex-col sm:flex-row items-center justify-between text-xs text-burgundy-300 gap-4">
          <p>© {new Date().getFullYear()} Mad Bespoke. All rights reserved.</p>
          <p className="flex items-center gap-1 text-gold-300">
            Handcrafted with <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> for your cherished moments.
          </p>
        </div>
      </div>
    </footer>
  );
}
