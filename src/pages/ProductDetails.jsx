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
  Phone,
  User,
  Package,
  Layers
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

  // Configurator states
  const [selectedImage, setSelectedImage] = useState(0);
  const [customText, setCustomText] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('');
  const [selectedPackaging, setSelectedPackaging] = useState('');
  const [selectedAddon, setSelectedAddon] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showOffers, setShowOffers] = useState(false);

  // Lead capture dialog before WhatsApp
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [formError, setFormError] = useState('');

  const variantScrollRef = useRef(null);

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      try {
        const prod = await fetchProductById(id);
        if (prod) {
          setProduct(prod);
          setSelectedVariant(prod.variants && prod.variants.length > 0 ? prod.variants[0] : 'Standard Edition');
          setSelectedPackaging(prod.packaging || 'With Paper Box Packing');
          
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
        <p className="font-serif text-lg font-bold text-burgundy-950">Loading bespoke price list item...</p>
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
  const isBulk = quantity >= 20;

  const handleOpenLeadModal = (qtyOverride = null) => {
    if (qtyOverride) setQuantity(qtyOverride);
    setFormError('');
    setShowLeadModal(true);
  };

  const handleFinalWhatsAppSubmit = (e) => {
    if (e) e.preventDefault();
    if (!customerName.trim()) {
      setFormError('Please enter your Name');
      return;
    }
    if (!customerPhone.trim() || customerPhone.replace(/[^0-9]/g, '').length < 10) {
      setFormError('Please enter a valid 10-digit WhatsApp phone number');
      return;
    }

    setFormError('');
    setShowLeadModal(false);

    openWhatsAppEnquiry({
      product,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customText: customText.trim(),
      variant: selectedVariant,
      packaging: selectedAddon ? `${selectedPackaging} (+${selectedAddon.name})` : selectedPackaging,
      quantity,
      note: orderNote.trim(),
      type: isBulk ? 'bulk_corporate' : 'retail',
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
        
        {/* 1. BREADCRUMBS & CONTACT HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-ink-muted border-b border-canvas-subtle pb-4">
          <div className="flex items-center gap-1.5 font-medium">
            <Link to="/" className="hover:text-burgundy-700 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link to="/shop" className="hover:text-burgundy-700 transition-colors">Price List & Catalog</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link to={`/shop?category=${product.category_id}`} className="hover:text-burgundy-700 transition-colors capitalize">
              {product.category_id?.replace(/-/g, ' ')}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-burgundy-950 font-bold truncate max-w-[200px] sm:max-w-xs">{product.name}</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-burgundy-900">
            <span>📱 Contact: 9730672323</span>
            <span>📸 Insta: @mad-bespoke</span>
          </div>
        </div>

        {/* 2. MAIN PRODUCT SHOWCASE STAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ================= LEFT: MEDIA GALLERY ================= */}
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
              
              {/* Top Floating Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                <span className="bg-burgundy-700 text-gold-100 text-xs font-bold uppercase px-3 py-1 rounded-full shadow-warm border border-gold-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-gold-300" /> MAD Bespoke Genuine
                </span>
                <span className="bg-white/95 backdrop-blur-md text-burgundy-900 text-[11px] font-bold uppercase px-3 py-1 rounded-full shadow-sm border border-gold-300">
                  Bulk Rates Available
                </span>
              </div>

              {/* Wishlist Button */}
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
                🔍 Photo {selectedImage + 1} of {images.length}
              </div>
            </div>

          </div>

          {/* ================= RIGHT: DETAILS & CONFIGURATOR ================= */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Category & Badge */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-burgundy-50 text-burgundy-700 text-[11px] font-bold px-3 py-1 rounded-full border border-burgundy-200">
                <Clock className="w-3.5 h-3.5" /> 24-48 Hr Dispatch
              </span>
              <span className="inline-flex items-center gap-1 bg-gold-50 text-gold-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-gold-200">
                <Sparkles className="w-3 h-3" /> With Name Engraving / Custom Print
              </span>
            </div>

            {/* Product Title */}
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-burgundy-950 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-gold-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-500" />
                  ))}
                </div>
                <span className="text-xs font-bold text-ink-primary">4.9 / 5.0</span>
                <span className="text-xs text-ink-muted">(Bespoke Catalog Item)</span>
                <span className="text-xs text-green-600 font-bold ml-2">✓ In Stock & Ready to Customise</span>
              </div>
            </div>

            {/* Price & Bulk Callout Box */}
            <div className="bg-canvas-light p-4 sm:p-5 rounded-2xl border border-canvas-subtle space-y-3">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-burgundy-950">
                    ₹{product.price}
                  </span>
                  <span className="text-xs font-bold uppercase text-burgundy-700 bg-burgundy-100 px-2 py-0.5 rounded">
                    Per Piece
                  </span>
                  {product.mrp && product.mrp > product.price && (
                    <span className="text-sm text-ink-muted line-through ml-2">
                      MRP ₹{product.mrp}
                    </span>
                  )}
                </div>

                {/* Quantity Stepper */}
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

              {/* Bulk Quantity Best Rates Banner from PDF */}
              <div className="bg-gradient-to-r from-gold-100 via-amber-50 to-burgundy-50 p-3 rounded-xl border border-gold-300 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📦</span>
                  <div>
                    <span className="font-bold text-burgundy-950 block">Bulk Quantity Order?</span>
                    <span className="text-ink-secondary text-[11px]">Contact us for special tiered wholesale rates on 20+ units.</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenLeadModal(25)}
                  className="bg-burgundy-700 hover:bg-burgundy-800 text-gold-100 text-[11px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-sm"
                >
                  Get Bulk Rate
                </button>
              </div>
            </div>

            {/* Description & Packaging Note */}
            <div className="space-y-1.5">
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                {product.description}
              </p>
              <p className="text-xs font-bold text-burgundy-900 flex items-center gap-1.5 pt-1">
                <Package className="w-3.5 h-3.5 text-gold-600" />
                Packaging: {product.packaging || 'With Paper Box Packing (Acrylic Box +₹20 extra)'}
              </p>
            </div>

            {/* ================= VISUAL VARIANT CARDS ================= */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-burgundy-950 flex items-center gap-1.5">
                    Select Finish / Variant ({product.variants.length} Options)
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
                            ₹{product.price} Per
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ================= CUSTOMISATION BOX ================= */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-gold-300 shadow-warm space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-burgundy-950 flex items-center gap-1.5">
                  <PenTool className="w-3.5 h-3.5 text-gold-600" />
                  Custom Name / Design to Engrave:
                </label>
                <span className="text-[10px] text-ink-muted font-mono">{customText.length}/40</span>
              </div>

              <input
                type="text"
                maxLength={40}
                placeholder='e.g., "Rahul Verma", "Dr. Ayesha", "CA Sharma", "Love You"'
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="w-full bg-canvas-light px-4 py-3 text-sm rounded-xl border border-canvas-subtle focus:outline-none focus:ring-2 focus:ring-burgundy-700 text-ink-primary font-bold tracking-wide"
              />

              {customText.trim() && (
                <div className="p-3 bg-burgundy-950 text-gold-200 rounded-xl border border-gold-500/40 text-center space-y-0.5 animate-fadeIn">
                  <span className="text-[10px] uppercase font-semibold text-gold-400 tracking-widest block">
                    ★ Simulated Laser Etch Preview
                  </span>
                  <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-gold-100">
                    "{customText}"
                  </span>
                </div>
              )}
            </div>

            {/* ================= PACKAGING UPGRADE (+20 ACRYLIC BOX) ================= */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-burgundy-950 block">
                Select Box / Packing:
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
                  <span>With Standard Paper Box</span>
                  <span className="text-gray-400 font-semibold">Included</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedAddon({ name: 'Acrylic Box Packaging', price: 20 })}
                  className={`p-3 text-xs rounded-xl border-2 text-left flex items-center justify-between transition-all ${
                    selectedAddon?.name === 'Acrylic Box Packaging'
                      ? 'border-burgundy-700 bg-burgundy-50 text-burgundy-950 font-bold'
                      : 'border-canvas-subtle bg-white text-ink-secondary hover:border-gold-400'
                  }`}
                >
                  <span>With Acrylic Box Packing</span>
                  <span className="font-bold text-burgundy-700">+₹20</span>
                </button>
              </div>
            </div>

            {/* ================= PRIMARY ORDER TRIGGER ================= */}
            <div className="pt-4 space-y-3">
              <button
                type="button"
                onClick={() => handleOpenLeadModal()}
                className="w-full flex items-center justify-center gap-3 bg-burgundy-700 hover:bg-burgundy-800 text-gold-100 py-4 px-8 rounded-2xl text-base font-bold uppercase tracking-wider shadow-warm hover:shadow-gold-glow transition-all duration-300 group"
              >
                <MessageCircle className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
                <span>Fill Details & Order on WhatsApp (₹{totalPrice}) →</span>
              </button>

              <div className="flex items-center justify-between gap-3 text-xs">
                <button
                  onClick={() => handleOpenLeadModal(50)}
                  className="text-burgundy-800 font-bold hover:underline flex items-center gap-1.5"
                >
                  <Building2 className="w-3.5 h-3.5 text-gold-600" />
                  Need 20+ units? Request Bulk Rate
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

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-canvas-subtle text-center text-[11px] text-ink-secondary">
              <div className="p-2.5 bg-canvas-light rounded-xl space-y-0.5">
                <ShieldCheck className="w-4 h-4 text-gold-600 mx-auto" />
                <span className="font-bold text-burgundy-950 block">Laser Precision</span>
                <span className="text-[10px] text-gray-400">Digital preview</span>
              </div>
              <div className="p-2.5 bg-canvas-light rounded-xl space-y-0.5">
                <Truck className="w-4 h-4 text-gold-600 mx-auto" />
                <span className="font-bold text-burgundy-950 block">Fast Dispatch</span>
                <span className="text-[10px] text-gray-400">24-48 Hours</span>
              </div>
              <div className="p-2.5 bg-canvas-light rounded-xl space-y-0.5">
                <Gift className="w-4 h-4 text-gold-600 mx-auto" />
                <span className="font-bold text-burgundy-950 block">Bespoke Finish</span>
                <span className="text-[10px] text-gray-400">Box packaging</span>
              </div>
            </div>

          </div>

        </div>

        {/* ================= 3. LEAD CAPTURE MODAL BEFORE WHATSAPP ================= */}
        {showLeadModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border-2 border-gold-400 shadow-2xl space-y-5 animate-fadeIn max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700 block">
                    MAD Bespoke Order Form
                  </span>
                  <h3 className="font-serif text-xl font-bold text-burgundy-950">
                    Enter Details for WhatsApp Order
                  </h3>
                </div>
                <button
                  onClick={() => setShowLeadModal(false)}
                  className="text-gray-400 hover:text-gray-700 text-xl font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Product Summary Header */}
              <div className="flex items-center gap-3 p-3 bg-canvas-light rounded-2xl border border-canvas-subtle">
                <img
                  src={images[selectedImage] || images[0]}
                  alt={product.name}
                  className="w-14 h-14 rounded-xl object-cover border border-gold-300 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-serif font-bold text-xs text-burgundy-950 truncate">
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-ink-muted">
                    Variant: <strong className="text-burgundy-900">{selectedVariant}</strong>
                  </p>
                  <p className="text-[11px] font-bold text-burgundy-700">
                    ₹{unitPrice} × {quantity} = ₹{totalPrice} {isBulk && '(Bulk Order)'}
                  </p>
                </div>
              </div>

              {formError && (
                <div className="p-3 bg-red-50 text-red-700 text-xs font-bold rounded-xl border border-red-200">
                  ⚠️ {formError}
                </div>
              )}

              <form onSubmit={handleFinalWhatsAppSubmit} className="space-y-4 text-xs">
                {/* Customer Name */}
                <div className="space-y-1">
                  <label className="font-bold uppercase text-burgundy-950 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-gold-600" /> Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Rahul Verma / ABC Enterprises"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-canvas-light px-3.5 py-2.5 rounded-xl border border-canvas-subtle focus:ring-2 focus:ring-burgundy-700 font-medium text-ink-primary"
                  />
                </div>

                {/* WhatsApp Phone Number */}
                <div className="space-y-1">
                  <label className="font-bold uppercase text-burgundy-950 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-green-600" /> Your WhatsApp Number *
                  </label>
                  <div className="flex gap-2">
                    <span className="px-3 py-2.5 bg-gray-100 border border-canvas-subtle rounded-xl font-bold text-gray-700">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit WhatsApp number"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="flex-1 bg-canvas-light px-3.5 py-2.5 rounded-xl border border-canvas-subtle focus:ring-2 focus:ring-burgundy-700 font-bold text-ink-primary"
                    />
                  </div>
                </div>

                {/* Quantity */}
                <div className="space-y-1">
                  <label className="font-bold uppercase text-burgundy-950 block">
                    Quantity Required:
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 5, 20, 50, 100].map((qty) => (
                      <button
                        key={qty}
                        type="button"
                        onClick={() => setQuantity(qty)}
                        className={`flex-1 py-2 rounded-xl font-bold text-xs border transition-all ${
                          quantity === qty
                            ? 'bg-burgundy-700 text-gold-100 border-burgundy-700'
                            : 'bg-canvas-light text-ink-secondary border-canvas-subtle hover:border-gold-400'
                        }`}
                      >
                        {qty} {qty >= 20 ? '🔥' : 'pc'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Name / Text to Engrave */}
                <div className="space-y-1">
                  <label className="font-bold uppercase text-burgundy-950 flex items-center gap-1.5">
                    <PenTool className="w-3.5 h-3.5 text-gold-600" /> Name / Text to Engrave:
                  </label>
                  <input
                    type="text"
                    placeholder='e.g., "Dr. Rahul Verma", "Special Date 24.12.2024"'
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    className="w-full bg-canvas-light px-3.5 py-2.5 rounded-xl border border-canvas-subtle focus:ring-2 focus:ring-burgundy-700 font-medium text-ink-primary"
                  />
                </div>

                {/* Optional Message / Special Request */}
                <div className="space-y-1">
                  <label className="font-bold uppercase text-burgundy-950 block">
                    Special Instructions / Notes (Optional):
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Mention any logo requirement, font choice, or delivery deadline..."
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    className="w-full bg-canvas-light p-2.5 rounded-xl border border-canvas-subtle focus:ring-2 focus:ring-burgundy-700 text-xs font-medium text-ink-primary"
                  />
                </div>

                <div className="bg-gold-50 p-3 rounded-xl border border-gold-300 text-[11px] text-gold-900 space-y-1">
                  <p className="font-bold">✨ What happens next?</p>
                  <p>1. Your order details will be saved and opened directly in WhatsApp with Mad Bespoke founder (9730672323).</p>
                  <p>2. We will share a digital engraving proof for your approval before crafting.</p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl text-sm uppercase tracking-wider shadow-warm flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-green-600" />
                  <span>Send Order to WhatsApp (9730672323) 🚀</span>
                </button>
              </form>

            </div>
          </div>
        )}

        {/* ================= 4. RELATED PRODUCTS ================= */}
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
