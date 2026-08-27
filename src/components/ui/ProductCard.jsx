import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Sparkles, Eye } from 'lucide-react';
import { openWhatsAppEnquiry } from '../../services/whatsapp';

export default function ProductCard({ product }) {
  if (!product) return null;

  const discountPercent = product.mrp && product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : null;

  const image = (product.images && product.images.length > 0)
    ? product.images[0]
    : 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80';

  const handleQuickWhatsApp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openWhatsAppEnquiry({ product, quantity: 1 });
  };

  return (
    <div className="group bg-canvas-card rounded-2xl border border-canvas-subtle hover:border-gold-500 overflow-hidden shadow-warm hover:shadow-warm-lg transition-all duration-300 flex flex-col justify-between">
      
      {/* Image & Badges Container */}
      <Link to={`/product/${product.id}`} className="relative block aspect-square overflow-hidden bg-canvas-light">
        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />

        {/* Customisable Gold Badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="inline-flex items-center gap-1 bg-burgundy-900/90 backdrop-blur-sm text-gold-300 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border border-gold-500/40 shadow-sm">
            <Sparkles className="w-2.5 h-2.5 text-gold-500" />
            Customisable
          </span>
          {product.is_bestseller && (
            <span className="inline-block bg-gold-600 text-burgundy-900 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full shadow-sm">
              Best Seller
            </span>
          )}
        </div>

        {/* Discount Badge */}
        {discountPercent && (
          <span className="absolute top-3 right-3 bg-burgundy-700 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-sm">
            {discountPercent}% OFF
          </span>
        )}

        {/* Quick View Overlay on Hover */}
        <div className="absolute inset-0 bg-burgundy-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 p-4">
          <span className="bg-canvas-card text-burgundy-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="w-3.5 h-3.5" />
            View Details
          </span>
        </div>
      </Link>

      {/* Info Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category Tag */}
          <span className="text-[11px] font-medium uppercase tracking-wider text-ink-muted block mb-1">
            {product.category_name || product.category_id?.replace(/-/g, ' ')}
          </span>

          {/* Title */}
          <Link to={`/product/${product.id}`}>
            <h3 className="font-serif text-base sm:text-lg font-semibold text-burgundy-950 group-hover:text-burgundy-700 transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Description Snippet */}
          {product.description && (
            <p className="text-xs text-ink-secondary line-clamp-2 mt-1.5 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-canvas-subtle flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-burgundy-900">
                ₹{product.price}
              </span>
              {product.mrp && product.mrp > product.price && (
                <span className="text-xs text-ink-muted line-through">
                  ₹{product.mrp}
                </span>
              )}
            </div>
            <span className="text-[10px] text-ink-muted block">Bulk rates available</span>
          </div>

          <button
            onClick={handleQuickWhatsApp}
            className="inline-flex items-center gap-1.5 bg-burgundy-700 hover:bg-burgundy-800 text-gold-100 text-xs font-semibold px-3 py-2 rounded-xl transition-all duration-200 shadow-warm-sm hover:scale-102"
            title="Enquire on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 text-green-400" />
            <span>Enquire</span>
          </button>
        </div>

      </div>
    </div>
  );
}
