import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  MessageCircle,
  ShieldCheck,
  Truck,
  Gift,
  ArrowLeft,
  Check,
  Plus,
  Minus,
  Building2,
  Share2
} from 'lucide-react';
import { fetchProductById, fetchProducts } from '../services/api';
import { openWhatsAppEnquiry } from '../services/whatsapp';
import ProductCard from '../components/ui/ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  // Customization builder states
  const [selectedImage, setSelectedImage] = useState(0);
  const [customText, setCustomText] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('');
  const [selectedPackaging, setSelectedPackaging] = useState('');
  const [selectedAddon, setSelectedAddon] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      try {
        const prod = await fetchProductById(id);
        if (prod) {
          setProduct(prod);
          setSelectedVariant(prod.variants && prod.variants.length > 0 ? prod.variants[0] : '');
          setSelectedPackaging(prod.packaging || 'Standard Packaging');
          
          // Load related
          const relatedProds = await fetchProducts({ category: prod.category_id });
          setRelated(relatedProds.filter((p) => p.id !== prod.id).slice(0, 4));
        }
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="font-serif text-lg text-burgundy-950">Loading bespoke masterpiece...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-burgundy-950">Product Not Found</h2>
        <p className="text-ink-secondary">The requested product could not be located in our catalogue.</p>
        <Link to="/shop" className="inline-block bg-burgundy-700 text-gold-100 px-6 py-3 rounded-full text-xs uppercase font-semibold">
          Return to Shop
        </Link>
      </div>
    );
  }

  const images = (product.images && product.images.length > 0)
    ? product.images
    : ['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80'];

  const addonPrice = selectedAddon ? selectedAddon.price : 0;
  const totalPrice = (Number(product.price) + addonPrice) * quantity;

  const handleWhatsAppSubmit = () => {
    openWhatsAppEnquiry({
      product,
      customText: customText.trim(),
      variant: selectedVariant,
      packaging: selectedAddon ? `${selectedPackaging} + ${selectedAddon.name}` : selectedPackaging,
      quantity,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      
      {/* Back button & Breadcrumbs */}
      <div className="flex items-center justify-between text-xs text-ink-secondary">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 hover:text-burgundy-700 font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Collections
        </button>
        <div className="flex items-center gap-2">
          <span>Home</span> / <span>Shop</span> / <span className="text-burgundy-950 font-semibold">{product.name}</span>
        </div>
      </div>

      {/* Main Product Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        
        {/* Left: Gallery (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Main Hero Image */}
          <div className="aspect-square rounded-3xl overflow-hidden bg-canvas-card border-2 border-gold-300 shadow-warm relative group">
            <img
              src={images[selectedImage] || images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {product.is_bestseller && (
              <span className="absolute top-4 left-4 bg-burgundy-900/90 backdrop-blur-sm text-gold-300 text-xs font-bold uppercase px-3 py-1 rounded-full border border-gold-500/40 shadow-sm">
                ★ Best Seller
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-burgundy-700 ring-2 ring-gold-400' : 'border-canvas-subtle opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Reassurance Features */}
          <div className="bg-canvas-card p-5 rounded-2xl border border-canvas-subtle space-y-3 text-xs text-ink-secondary">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-gold-600" />
              <span>Laser precision customisation with digital preview approval</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-gold-600" />
              <span>Pan-India secure delivery within 24-48 dispatch hours</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Gift className="w-4 h-4 text-gold-600" />
              <span>Individual presentation box packing included</span>
            </div>
          </div>

        </div>

        {/* Right: Info & Configurator (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700 block mb-1">
              {product.category_name || product.category_id?.replace(/-/g, ' ')}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy-950 leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-3 pb-4 border-b border-canvas-subtle">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-burgundy-900">
              ₹{product.price}
            </span>
            {product.mrp && product.mrp > product.price && (
              <>
                <span className="text-base text-ink-muted line-through">
                  MRP ₹{product.mrp}
                </span>
                <span className="bg-burgundy-100 text-burgundy-800 text-xs font-bold px-2.5 py-1 rounded-md">
                  {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                </span>
              </>
            )}
            <span className="text-xs text-ink-muted ml-auto">Inclusive of all taxes</span>
          </div>

          {/* Description */}
          <p className="text-sm text-ink-secondary leading-relaxed">
            {product.description}
          </p>

          {/* Customisation Options Tags */}
          {product.customisation_options && product.customisation_options.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-burgundy-950 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                Available Customisation Styles:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.customisation_options.map((opt, i) => (
                  <span key={i} className="bg-canvas-card border border-gold-300 text-burgundy-900 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-warm-sm">
                    ✓ {opt}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Live Custom Text Input */}
          <div className="space-y-2 bg-canvas-card p-4 rounded-2xl border border-gold-300 shadow-warm-sm">
            <label className="text-xs font-bold uppercase tracking-wider text-burgundy-950 block">
              Enter Custom Name / Initials / Message:
            </label>
            <input
              type="text"
              placeholder='e.g., "Manoj Kumar", "Dr. Prisha", "CA Sharma"'
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="w-full bg-canvas px-4 py-2.5 text-sm rounded-xl border border-canvas-subtle focus:outline-none focus:ring-2 focus:ring-burgundy-700 text-ink-primary font-medium"
            />
            <p className="text-[11px] text-ink-muted">
              ✨ Our designer will confirm the font style on WhatsApp before engraving.
            </p>
          </div>

          {/* Variants Selector */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-burgundy-950 block">
                Select Color / Material Variant:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedVariant(v)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-xl border transition-all ${
                      selectedVariant === v
                        ? 'bg-burgundy-700 text-gold-100 border-burgundy-700 shadow-sm font-semibold'
                        : 'bg-canvas-card text-ink-primary border-canvas-subtle hover:border-gold-400'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add-ons (e.g. Acrylic Box +20) */}
          {product.add_ons && product.add_ons.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-burgundy-950 block">
                Optional Packaging Upgrade:
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedAddon(null)}
                  className={`px-3 py-1.5 text-xs rounded-xl border ${
                    !selectedAddon ? 'bg-burgundy-700 text-gold-100' : 'bg-canvas-card border-canvas-subtle'
                  }`}
                >
                  Standard ({product.packaging || 'Paper Box'})
                </button>
                {product.add_ons.map((addon, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedAddon(addon)}
                    className={`px-3 py-1.5 text-xs rounded-xl border ${
                      selectedAddon?.name === addon.name ? 'bg-burgundy-700 text-gold-100' : 'bg-canvas-card border-canvas-subtle'
                    }`}
                  >
                    + {addon.name} (+₹{addon.price})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Actions */}
          <div className="pt-4 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gold-300 rounded-full bg-canvas-card p-1 shadow-warm-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-ink-primary hover:bg-canvas"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 font-bold text-sm text-burgundy-950">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-ink-primary hover:bg-canvas"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <span className="text-xs text-ink-muted block">Total Estimate:</span>
                <span className="font-serif font-bold text-xl text-burgundy-950">₹{totalPrice}</span>
              </div>
            </div>

            {/* PRIMARY CTA: ENQUIRE ON WHATSAPP */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleWhatsAppSubmit}
                className="w-full flex items-center justify-center gap-3 bg-burgundy-700 hover:bg-burgundy-800 text-gold-100 py-4 px-8 rounded-2xl text-base font-bold uppercase tracking-wider shadow-warm hover:shadow-gold-glow transition-all duration-300 group"
              >
                <MessageCircle className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
                <span>Enquire on WhatsApp →</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openWhatsAppEnquiry({ product, type: 'bulk_corporate', quantity: 50 })}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-canvas-card hover:bg-canvas text-burgundy-900 border border-gold-400 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  <Building2 className="w-4 h-4 text-gold-600" />
                  <span>Bulk / Corporate Quote (50+ pcs)</span>
                </button>

                <button
                  onClick={handleShare}
                  className="p-3 bg-canvas-card border border-canvas-subtle hover:border-gold-400 rounded-xl text-ink-secondary"
                  title="Share product link"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="pt-12 border-t border-canvas-subtle space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-burgundy-950">
              You May Also Adore
            </h3>
            <Link to="/shop" className="text-xs font-semibold text-burgundy-800 hover:underline">
              View All Collections →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
