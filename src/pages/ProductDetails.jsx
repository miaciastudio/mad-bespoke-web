import React, { useState, useEffect, useRef } from 'react';
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
  Share2,
  Heart,
  Star,
  ChevronRight,
  ChevronLeft,
  PenTool,
  Clock,
  CheckCircle2,
  Tag,
  Smile
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

  // Customization & configurator states
  const [selectedImage, setSelectedImage] = useState(0);
  const [customText, setCustomText] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('');
  const [selectedPackaging, setSelectedPackaging] = useState('');
  const [selectedAddon, setSelectedAddon] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showOffers, setShowOffers] = useState(false);
  const [showSpecialModal, setShowSpecialModal] = useState(false);
  const [giftNote, setGiftNote] = useState('');

  const variantScrollRef = useRef(null);

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      try {
        const prod = await fetchProductById(id);
        if (prod) {
          setProduct(prod);
          setSelectedVariant(prod.variants && prod.variants.length > 0 ? prod.variants[0] : 'Standard Edition');
          setSelectedPackaging(prod.packaging || 'Standard Protective Box');
          
          // Load related products
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
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-burgundy-700 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="font-serif text-lg font-bold text-burgundy-950">Loading bespoke masterpiece...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4 bg-white rounded-3xl p-8 border border-canvas-subtle shadow-warm mt-8">
        <h2 className="font-serif text-3xl font-bold text-burgundy-950">Product Not Found</h2>
        <p className="text-ink-secondary text-sm">The requested product could not be located in our catalogue.</p>
        <Link to="/shop" className="inline-block bg-burgundy-700 text-gold-100 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider">
          Return to Shop
        </Link>
      </div>
    );
  }

  const images = (product.images && product.images.length > 0)
    ? product.images
    : ['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80'];

  const addonPrice = selectedAddon ? selectedAddon.price : 0;
  const unitPrice = Number(product.price) + addonPrice;
  const totalPrice = unitPrice * quantity;

  const handleWhatsAppSubmit = () => {
    openWhatsAppEnquiry({
      product,
      customText: customText.trim() + (giftNote.trim() ? ` [Gift Card Note: ${giftNote.trim()}]` : ''),
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

  const scrollVariants = (dir) => {
    if (variantScrollRef.current) {
      variantScrollRef.current.scrollBy({
        left: dir === 'left' ? -180 : 180,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
        
        {/* 1. BREADCRUMBS & NAVIGATION */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-ink-muted border-b border-canvas-subtle pb-4">
          <div className="flex items-center gap-1.5 font-medium">
            <Link to="/" className="hover:text-burgundy-700 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link to="/shop" className="hover:text-burgundy-700 transition-colors">Shop</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link to={`/shop?category=${product.category_id}`} className="hover:text-burgundy-700 transition-colors capitalize">
              {product.category_id?.replace(/-/g, ' ')}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-burgundy-950 font-bold truncate max-w-[200px] sm:max-w-xs">{product.name}</span>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1 text-ink-secondary hover:text-burgundy-700 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
        </div>

        {/* 2. MAIN PRODUCT SHOWCASE STAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ================= LEFT: MEDIA GALLERY (IGP VERTICAL RAIL STYLE) ================= */}
          <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4 sticky top-24">
            
            {/* Vertical Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[520px] scrollbar-none shrink-0 py-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 transition-all p-0.5 bg-white shrink-0 ${
                      selectedImage === idx
                        ? 'border-burgundy-700 ring-2 ring-burgundy-200 shadow-warm'
                        : 'border-canvas-subtle opacity-70 hover:opacity-100 hover:border-gold-400'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover rounded-xl" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Hero Lifestyle View */}
            <div className="flex-1 relative aspect-square rounded-3xl overflow-hidden bg-canvas-light border-2 border-canvas-subtle shadow-warm group">
              <img
                src={images[selectedImage] || images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                {product.is_bestseller ? (
                  <span className="bg-burgundy-700 text-gold-100 text-xs font-bold uppercase px-3 py-1 rounded-full shadow-warm border border-gold-300 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-gold-300 text-gold-300" /> Best Seller
                  </span>
                ) : (
                  <span className="bg-white/95 backdrop-blur-md text-burgundy-900 text-[11px] font-bold uppercase px-3 py-1 rounded-full shadow-sm border border-gold-300">
                    ✦ Handcrafted Bespoke
                  </span>
                )}
              </div>

              {/* Wishlist Button (Top Right like IGP) */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md shadow-warm border transition-all ${
                  isWishlisted
                    ? 'bg-burgundy-700 text-white border-burgundy-700'
                    : 'bg-white/90 text-gray-600 hover:text-burgundy-700 border-canvas-subtle'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
              </button>

              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md text-[11px] font-bold text-burgundy-950 px-3 py-1 rounded-full border border-gray-200">
                🔍 Image {selectedImage + 1} of {images.length}
              </div>
            </div>

          </div>

          {/* ================= RIGHT: PRODUCT DETAILS & CONFIGURATOR ================= */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Fast Dispatch Badge & Category */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-burgundy-50 text-burgundy-700 text-[11px] font-bold px-3 py-1 rounded-full border border-burgundy-200">
                <Clock className="w-3.5 h-3.5" /> 24-48 Hr Fast Dispatch
              </span>
              <span className="inline-flex items-center gap-1 bg-gold-50 text-gold-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-gold-200">
                <Sparkles className="w-3 h-3" /> Free Engraving
              </span>
            </div>

            {/* Product Title */}
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-burgundy-950 leading-tight">
                {product.name}
              </h1>
              
              {/* Reviews Star Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-gold-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-500" />
                  ))}
                </div>
                <span className="text-xs font-bold text-ink-primary">4.9</span>
                <span className="text-xs text-ink-muted">(48 Bespoke Reviews)</span>
                <span className="text-xs text-green-600 font-semibold ml-2">✓ In Stock</span>
              </div>
            </div>

            {/* Price & Quantity Row */}
            <div className="bg-canvas-light p-4 rounded-2xl border border-canvas-subtle flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-burgundy-950">
                  ₹{product.price}
                </span>
                {product.mrp && product.mrp > product.price && (
                  <>
                    <span className="text-sm text-ink-muted line-through">
                      MRP ₹{product.mrp}
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                      {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                    </span>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => setShowOffers(!showOffers)}
                  className="text-xs font-bold text-burgundy-700 hover:underline ml-2"
                >
                  View Offers
                </button>
              </div>

              {/* Quantity Stepper (Right aligned like IGP) */}
              <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 transition-colors font-bold text-sm"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 font-bold text-sm text-burgundy-950">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 bg-burgundy-700 text-white hover:bg-burgundy-800 transition-colors font-bold text-sm"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Collapsible Offers Box */}
            {showOffers && (
              <div className="p-3.5 bg-gold-50 border border-gold-300 rounded-xl text-xs space-y-1.5 text-gold-900 animate-fadeIn">
                <p className="font-bold flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-gold-600" /> Active Gifting Offers:
                </p>
                <p>• <strong>FLAT10:</strong> Get 10% off on your first personalized gift combo.</p>
                <p>• <strong>BULK20:</strong> Special tiered wholesale discount on 20+ units for corporate/wedding gifting.</p>
              </div>
            )}

            {/* Free Gift Card Value-Add Banner (IGP Style) */}
            <div className="bg-gradient-to-r from-burgundy-50 via-pink-50 to-gold-50 border border-burgundy-200/80 rounded-2xl p-3.5 flex items-center gap-3 text-xs shadow-warm-sm">
              <span className="text-2xl p-1 bg-white rounded-xl shadow-sm">💌</span>
              <div className="flex-1">
                <span className="font-bold text-burgundy-950 block">Complimentary Greeting Card & Digital Draft</span>
                <span className="text-ink-secondary text-[11px]">Say what you feel — designer will share digital mockup on WhatsApp before engraving.</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              {product.description}
            </p>

            {/* ================= VISUAL VARIANT SELECTOR (CAROUSEL CARDS LIKE IGP) ================= */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-burgundy-950 flex items-center gap-1.5">
                    Select Variant / Finish ({product.variants.length} Options)
                  </label>
                  {product.variants.length > 3 && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => scrollVariants('left')}
                        className="p-1 rounded-full border border-gray-200 hover:bg-gray-100 text-gray-600"
                        aria-label="Previous variants"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => scrollVariants('right')}
                        className="p-1 rounded-full border border-gray-200 hover:bg-gray-100 text-gray-600"
                        aria-label="Next variants"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                <div
                  ref={variantScrollRef}
                  className="flex items-stretch gap-3 overflow-x-auto pb-2 scrollbar-none"
                >
                  {product.variants.map((variantName, idx) => {
                    const isSelected = selectedVariant === variantName;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedVariant(variantName)}
                        className={`min-w-[130px] sm:min-w-[140px] max-w-[160px] p-2.5 rounded-2xl border-2 text-left flex flex-col justify-between transition-all shrink-0 ${
                          isSelected
                            ? 'border-burgundy-700 bg-burgundy-50/60 shadow-warm'
                            : 'border-canvas-subtle bg-white hover:border-gold-400'
                        }`}
                      >
                        <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-2 relative">
                          <img
                            src={images[idx % images.length] || images[0]}
                            alt={variantName}
                            className="w-full h-full object-cover"
                          />
                          {isSelected && (
                            <span className="absolute top-1 right-1 bg-burgundy-700 text-white p-0.5 rounded-full shadow">
                              <Check className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-serif font-bold text-xs text-burgundy-950 line-clamp-1">
                            {variantName}
                          </p>
                          <p className="text-[11px] font-bold text-burgundy-700 mt-0.5">
                            ₹{product.price}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ================= LIVE CUSTOMISATION INPUT BOX ================= */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-gold-300 shadow-warm space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-burgundy-950 flex items-center gap-1.5">
                  <PenTool className="w-3.5 h-3.5 text-gold-600" />
                  Personalize with Name / Date / Message:
                </label>
                <span className="text-[10px] text-ink-muted font-mono">{customText.length}/40 Chars</span>
              </div>

              <div className="relative">
                <input
                  type="text"
                  maxLength={40}
                  placeholder='e.g., "Rahul Sharma", "Dr. Ayesha", "24.12.2024"'
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="w-full bg-canvas-light px-4 py-3 text-sm rounded-xl border border-canvas-subtle focus:outline-none focus:ring-2 focus:ring-burgundy-700 text-ink-primary font-bold tracking-wide"
                />
              </div>

              {/* Live Laser Simulator Preview */}
              {customText.trim() && (
                <div className="p-3 bg-burgundy-950 text-gold-200 rounded-xl border border-gold-500/40 text-center space-y-1 animate-fadeIn">
                  <span className="text-[10px] uppercase font-semibold text-gold-400 tracking-widest block">
                    ★ Simulated Laser Etch Preview
                  </span>
                  <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-gold-100">
                    "{customText}"
                  </span>
                </div>
              )}

              <p className="text-[11px] text-ink-muted flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                Font style, charm symbol & draft confirmation will be shared on WhatsApp.
              </p>
            </div>

            {/* ================= OPTIONAL PACKAGING UPGRADE ================= */}
            {product.add_ons && product.add_ons.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-burgundy-950 block">
                  Packaging Options:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedAddon(null)}
                    className={`p-3 text-xs rounded-xl border-2 text-left flex items-center justify-between transition-all ${
                      !selectedAddon
                        ? 'border-burgundy-700 bg-burgundy-50 text-burgundy-950 font-bold'
                        : 'border-canvas-subtle bg-white text-ink-secondary'
                    }`}
                  >
                    <span>Standard ({product.packaging || 'Paper Box'})</span>
                    <span className="text-gray-400 font-semibold">Included</span>
                  </button>

                  {product.add_ons.map((addon, idx) => {
                    const isSelected = selectedAddon?.name === addon.name;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedAddon(addon)}
                        className={`p-3 text-xs rounded-xl border-2 text-left flex items-center justify-between transition-all ${
                          isSelected
                            ? 'border-burgundy-700 bg-burgundy-50 text-burgundy-950 font-bold'
                            : 'border-canvas-subtle bg-white text-ink-secondary hover:border-gold-400'
                        }`}
                      >
                        <span>+ {addon.name}</span>
                        <span className="font-bold text-burgundy-700">+₹{addon.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ================= BOTTOM DUAL ACTION CTAS (IGP STYLE) ================= */}
            <div className="pt-4 space-y-3">
              
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                {/* Secondary CTA: Make It Extra Special */}
                <button
                  type="button"
                  onClick={() => setShowSpecialModal(true)}
                  className="sm:col-span-5 inline-flex items-center justify-center gap-2 bg-white hover:bg-canvas-light text-burgundy-950 border-2 border-burgundy-800 py-3.5 px-4 rounded-2xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  <Gift className="w-4 h-4 text-gold-600" />
                  <span>Make It Extra Special</span>
                </button>

                {/* Primary CTA: Personalize on WhatsApp (Prominent) */}
                <button
                  type="button"
                  onClick={handleWhatsAppSubmit}
                  className="sm:col-span-7 flex items-center justify-center gap-2 bg-burgundy-700 hover:bg-burgundy-800 text-gold-100 py-3.5 px-6 rounded-2xl text-sm font-bold uppercase tracking-wider shadow-warm hover:shadow-gold-glow transition-all duration-300 group"
                >
                  <MessageCircle className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
                  <span>Personalize Now (₹{totalPrice}) →</span>
                </button>
              </div>

              {/* Utility Row: Corporate & Share */}
              <div className="flex items-center justify-between gap-3 pt-2 text-xs">
                <button
                  onClick={() => openWhatsAppEnquiry({ product, type: 'bulk_corporate', quantity: 50 })}
                  className="text-burgundy-800 font-bold hover:underline flex items-center gap-1.5"
                >
                  <Building2 className="w-3.5 h-3.5 text-gold-600" />
                  Need 20+ units? Request Bulk Corporate Discount
                </button>

                <button
                  onClick={handleShare}
                  className="p-2 rounded-xl text-gray-500 hover:text-burgundy-700 hover:bg-gray-100 flex items-center gap-1 font-semibold"
                  title="Share product link"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Share'}</span>
                </button>
              </div>

            </div>

            {/* Trust Badges 3-Col Bar */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-canvas-subtle text-center text-[11px] text-ink-secondary">
              <div className="p-2.5 bg-canvas-light rounded-xl space-y-0.5">
                <ShieldCheck className="w-4 h-4 text-gold-600 mx-auto" />
                <span className="font-bold text-burgundy-950 block">Laser Precision</span>
                <span className="text-[10px] text-gray-400">Digital preview check</span>
              </div>
              <div className="p-2.5 bg-canvas-light rounded-xl space-y-0.5">
                <Truck className="w-4 h-4 text-gold-600 mx-auto" />
                <span className="font-bold text-burgundy-950 block">Pan-India Express</span>
                <span className="text-[10px] text-gray-400">Tracked shipping</span>
              </div>
              <div className="p-2.5 bg-canvas-light rounded-xl space-y-0.5">
                <Gift className="w-4 h-4 text-gold-600 mx-auto" />
                <span className="font-bold text-burgundy-950 block">Gift Ready</span>
                <span className="text-[10px] text-gray-400">Signature hamper box</span>
              </div>
            </div>

          </div>

        </div>

        {/* ================= 3. "MAKE IT EXTRA SPECIAL" MODAL / DRAWER ================= */}
        {showSpecialModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border-2 border-gold-300 shadow-2xl space-y-5 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-serif text-xl font-bold text-burgundy-950 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-gold-600" /> Make It Extra Special
                </h3>
                <button
                  onClick={() => setShowSpecialModal(false)}
                  className="text-gray-400 hover:text-gray-700 text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <label className="font-bold uppercase text-burgundy-950 block">
                  Add Personalized Gift Card Message (Free):
                </label>
                <textarea
                  rows={3}
                  placeholder="Write a sweet heartfelt message to be handwritten or printed on the complimentary greeting card..."
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  className="w-full bg-canvas-light p-3 rounded-xl border border-canvas-subtle focus:ring-2 focus:ring-burgundy-700 text-xs text-ink-primary font-medium"
                />
              </div>

              <div className="bg-pink-50 p-3 rounded-xl border border-pink-200 text-xs text-pink-900 space-y-1">
                <span className="font-bold block">✨ Complimentary Mad Bespoke Inclusions:</span>
                <p>• Premium wax seal sticker packaging</p>
                <p>• Handwritten or printed calligraphy card</p>
                <p>• Dispatched in crush-proof protective container</p>
              </div>

              <button
                type="button"
                onClick={() => setShowSpecialModal(false)}
                className="w-full bg-burgundy-700 text-gold-100 font-bold py-3 rounded-xl text-xs uppercase tracking-wider"
              >
                Save & Continue Gifting
              </button>
            </div>
          </div>
        )}

        {/* ================= 4. RELATED PRODUCTS ROW ================= */}
        {related.length > 0 && (
          <div className="pt-12 border-t border-canvas-subtle space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-700 block">
                  Curated Suggestions
                </span>
                <h3 className="font-serif text-2xl font-bold text-burgundy-950">
                  Customers Also Loved
                </h3>
              </div>
              <Link to="/shop" className="text-xs font-bold text-burgundy-800 hover:underline">
                View Entire Catalog →
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
    </div>
  );
}
