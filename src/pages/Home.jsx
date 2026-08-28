import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  Gift,
  Feather,
  Layers,
  Send,
  Building2,
  ShieldCheck,
  Star,
  ChevronRight,
  Eye,
  Wand2
} from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import ProductCard from '../components/ui/ProductCard';
import RotatingText from '../components/originkit/ui/text-carousel';
import DitherReveal from '../components/originkit/ui/dither-reveal';
import { fetchProducts, fetchCategories } from '../services/api';
import { openWhatsAppEnquiry } from '../services/whatsapp';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [bestsellers, setBestsellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomeData() {
      try {
        const [catsData, prodsData] = await Promise.all([
          fetchCategories(),
          fetchProducts({ bestseller: true }),
        ]);
        setCategories(catsData);
        setBestsellers(prodsData.slice(0, 8));
      } catch (err) {
        console.error('Home data load error:', err);
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();
  }, []);

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      
      {/* 1. HERO SECTION WITH ORIGINKIT ROTATING TEXT */}
      <section className="relative overflow-hidden hero-pattern pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-canvas-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-canvas-card px-4 py-1.5 rounded-full border border-gold-300 shadow-warm-sm">
                <div className="w-2 h-2 rounded-full bg-burgundy-700 animate-ping" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy-900">
                  Mad Bespoke • Handcrafted Luxury
                </span>
              </div>

              {/* Originkit Text Carousel Heading */}
              <div className="py-2">
                <h1 className="sr-only">Make It Personal - Mad Bespoke Luxury Gifts</h1>
                <div className="flex justify-center lg:justify-start">
                  <RotatingText
                    prefix="Make It"
                    texts={["Personal.", "Timeless.", "Artisanal.", "Bespoke.", "Memorable."]}
                    prefixColor="#2B0E12"
                    color="#FAF7F4"
                    badgeBackground="#722F37"
                    badgeRadius={14}
                    badgePaddingX={16}
                    badgePaddingY={6}
                    gap={12}
                    font={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 700,
                      fontSize: 'clamp(2.3rem, 5.5vw, 4.4rem)',
                      lineHeight: '1.18em',
                      textAlign: 'left',
                    }}
                    transition={{
                      type: "tween",
                      duration: 0.45,
                      ease: "easeOut",
                      staggerChildren: 0.03,
                    }}
                  />
                </div>
              </div>

              {/* Subtext */}
              <p className="text-base sm:text-xl text-ink-secondary max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Elevate gifting into an art form. From precision laser-engraved executive pens and genuine leather hampers to stainless steel kadas and bespoke phone covers.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-burgundy-700 hover:bg-burgundy-800 text-gold-100 px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider shadow-warm hover:shadow-gold-glow transition-all duration-300 group"
                >
                  <span>Explore 70+ Products</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  onClick={() => openWhatsAppEnquiry({})}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-canvas-card hover:bg-canvas text-burgundy-900 border-2 border-gold-400 px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider shadow-warm-sm transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4 text-green-600" />
                  <span>Customise on WhatsApp</span>
                </button>
              </div>

              {/* Feature Highlights Ticker */}
              <div className="pt-6 grid grid-cols-3 gap-3 border-t border-canvas-subtle max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <p className="text-xl sm:text-2xl font-bold font-serif text-burgundy-900">250+</p>
                  <p className="text-xs text-ink-muted">Phone Models</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold font-serif text-burgundy-900">1.2K+</p>
                  <p className="text-xs text-ink-muted">Happy Clients</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold font-serif text-burgundy-900">24-48h</p>
                  <p className="text-xs text-ink-muted">Fast Dispatch</p>
                </div>
              </div>

            </div>

            {/* Right Visual Showcase Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-canvas-card p-4 sm:p-6 rounded-3xl border-2 border-gold-300 shadow-warm-lg">
                
                {/* Brand Seal floating badge */}
                <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full border-2 border-gold-500 bg-canvas shadow-warm flex items-center justify-center overflow-hidden z-20">
                  <img src="/logo.jpg" alt="Wax Seal" className="w-full h-full object-cover" />
                </div>

                <div className="aspect-[4/5] rounded-2xl overflow-hidden relative group">
                  <img
                    src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80"
                    alt="Mad Bespoke Curated Gift Hamper"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-gold-300 text-xs font-semibold uppercase tracking-widest">
                      Featured Collection
                    </span>
                    <h3 className="font-serif text-2xl font-bold mt-1">
                      Men's Bespoke 4-Piece Hamper
                    </h3>
                    <p className="text-xs text-canvas-light/80 mt-1">
                      Wallet • Keychain • Sunglasses Cover • Passport Cover
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-bold text-gold-300">₹899 per set</span>
                      <button
                        onClick={() => openWhatsAppEnquiry({ product: { name: "Men's Bespoke 4-Piece Hamper", price: 899 } })}
                        className="bg-gold-500 hover:bg-gold-600 text-burgundy-950 text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors"
                      >
                        Order Set
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SHORT BRAND STORY STRIP */}
      <section className="max-w-5xl mx-auto px-4 text-center space-y-4">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-burgundy-100 text-burgundy-800 border border-gold-400 mb-2">
          <Feather className="w-6 h-6 text-gold-600" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-burgundy-950">
          "Every gift should carry a heartbeat, not just a tag."
        </h2>
        <p className="text-ink-secondary text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          At Mad Bespoke, we transform everyday essentials into timeless personal treasures. Every engraving is executed with surgical laser precision, and every leather set is hand-assembled to honor your most cherished occasions.
        </p>
      </section>

      {/* 3. FEATURED CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Curated Catalog"
          title="Explore Our Collections"
          subtitle="Discover over 70+ personalised products crafted for elegance and utility."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 justify-items-center">
          {categories.map((cat) => {
            const logoSrc = cat.image_url || `/categories/${cat.id}.jpg`;
            return (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.id}`}
                className="group flex flex-col items-center text-center cursor-pointer transition-transform duration-300"
              >
                {/* Luxury Circular Image Container */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full p-1 bg-gradient-to-br from-gold-400 via-gold-200 to-burgundy-800 shadow-warm group-hover:shadow-gold-glow group-hover:scale-105 transition-all duration-300">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white p-0.5 border border-gold-300">
                    <img
                      src={logoSrc}
                      alt={cat.name}
                      className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `/categories/${cat.id}.jpg`;
                      }}
                    />
                  </div>
                </div>
                
                {/* Text Outside Below Circle */}
                <div className="mt-3.5 space-y-0.5 max-w-[140px]">
                  <h3 className="font-serif text-sm sm:text-base font-bold text-burgundy-950 group-hover:text-burgundy-700 transition-colors leading-tight">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] sm:text-xs text-ink-muted group-hover:text-gold-700 font-medium transition-colors block">
                    {cat.product_count ? `${cat.product_count} Products` : 'View Range →'}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. BEST-SELLING PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-burgundy-100 text-burgundy-800 text-xs font-semibold uppercase tracking-[0.2em] px-3.5 py-1 rounded-full border border-burgundy-200 shadow-sm">
              <Star className="w-3 h-3 text-gold-600 fill-gold-600" />
              Most Cherished
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-burgundy-950 mt-2">
              Best-Selling Creations
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-burgundy-800 hover:text-burgundy-600 font-semibold text-sm group"
          >
            <span>View All Catalog Items</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-canvas-card rounded-2xl h-80 animate-pulse border border-canvas-subtle" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 5. "CUSTOMISED FOR YOU" SHOWCASE */}
      <section className="bg-canvas-card border-y border-canvas-subtle py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Mosaic */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-warm border border-gold-300">
                  <img
                    src="https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=500&q=80"
                    alt="Laser Engraved Gold Zari Pen"
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="bg-canvas p-4 rounded-2xl border border-canvas-subtle text-center">
                  <span className="font-serif font-bold text-burgundy-900 text-lg">Laser Etched</span>
                  <p className="text-xs text-ink-muted mt-1">Permanent precision engraving on steel & metal</p>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="bg-burgundy-900 text-gold-100 p-4 rounded-2xl text-center border border-gold-500/40">
                  <span className="font-serif font-bold text-lg">Charm Monogram</span>
                  <p className="text-xs text-burgundy-200 mt-1">Personalised name strip + antique charms</p>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-warm border border-gold-300">
                  <img
                    src="https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=500&q=80"
                    alt="Leather Wallet Customised"
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Content description */}
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-1.5 bg-gold-100 text-gold-800 text-xs font-semibold uppercase tracking-[0.2em] px-3.5 py-1 rounded-full border border-gold-300 shadow-sm">
                <Sparkles className="w-3 h-3 text-gold-600" />
                Tailored Craftsmanship
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-burgundy-950 leading-tight">
                Crafted Exclusively For Your Story
              </h2>

              <p className="text-ink-secondary text-base leading-relaxed">
                Whether you are celebrating an anniversary, welcoming a new team member, or gifting yourself a signature accessory, our personalization options bring distinct luxury to every piece.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif font-semibold text-burgundy-950 text-sm">Laser Name & Logo Engraving</h4>
                    <p className="text-xs text-ink-muted">Razor-sharp permanent etching on metal pens, kadas, bottles, and diaries.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif font-semibold text-burgundy-950 text-sm">Charm & Name-Strip Embossing</h4>
                    <p className="text-xs text-ink-muted">Choose from 50+ antique metal charms (crown, airplane, feather, heart) on leather items.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif font-semibold text-burgundy-950 text-sm">High-Definition Photo Printing</h4>
                    <p className="text-xs text-ink-muted">Vivid sublimation printing on 2D phone covers, mugs, pillows, and apparel.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/personalisation"
                  className="inline-flex items-center gap-2 bg-burgundy-700 hover:bg-burgundy-800 text-gold-100 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider shadow-warm transition-all"
                >
                  <span>See How Personalisation Works</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 6. CORPORATE & BULK GIFTING BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-burgundy-950 text-canvas-light rounded-3xl p-8 sm:p-14 relative overflow-hidden border-2 border-gold-500 shadow-warm-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-burgundy-800 text-gold-300 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider border border-gold-500/40">
                <Building2 className="w-3.5 h-3.5" />
                Corporate & Bulk Gifting
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gold-100 leading-tight">
                Gifting at Scale. <br className="hidden sm:inline" />
                <span className="text-gold-300 font-normal italic">Leave an Impeccable Impression.</span>
              </h2>

              <p className="text-sm sm:text-base text-burgundy-200 max-w-2xl leading-relaxed">
                Elevate employee onboarding kits, executive annual events, and festive hampers with your company logo laser-engraved on premium diaries, temperature flasks, and curated sets.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gold-200 pt-2">
                <li className="flex items-center gap-2">✓ Tiered wholesale bulk rates on 20+ units</li>
                <li className="flex items-center gap-2">✓ Free digital mockups & sample approval</li>
                <li className="flex items-center gap-2">✓ Custom logo & employee name etching</li>
                <li className="flex items-center gap-2">✓ Premium presentation box packing</li>
              </ul>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                to="/corporate"
                className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-burgundy-950 font-bold px-6 py-4 rounded-full text-xs uppercase tracking-wider shadow-warm transition-all duration-300"
              >
                <span>Explore Corporate Kits</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => openWhatsAppEnquiry({ type: 'bulk_corporate' })}
                className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-burgundy-900 text-gold-200 border border-gold-400 font-semibold px-6 py-4 rounded-full text-xs uppercase tracking-wider transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4 text-green-400" />
                <span>Get Instant Bulk Quote</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS (4 STEPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Seamless Process"
          title="How It Works"
          subtitle="Ordering your bespoke gift takes just 4 effortless steps."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Choose Your Piece',
              desc: 'Select from our curated range of leather wallets, engraved pens, kadas, bottles, or hoodies.',
              icon: '🛍️',
            },
            {
              step: '02',
              title: 'Share Requirements',
              desc: 'Tell us the name, charm, initials, design photo, or corporate logo you want personalised.',
              icon: '✍️',
            },
            {
              step: '03',
              title: 'We Customise & Craft',
              desc: 'Our artisans craft and laser-engrave your piece with surgical precision and premium finishes.',
              icon: '✨',
            },
            {
              step: '04',
              title: 'Doorstep Delivery',
              desc: 'Securely packaged in our signature presentation boxes and dispatched across India.',
              icon: '📦',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-canvas-card rounded-2xl p-6 border border-canvas-subtle shadow-warm relative overflow-hidden flex flex-col justify-between group hover:border-gold-500 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif text-3xl font-bold text-gold-500/80">
                  {item.step}
                </span>
                <span className="text-2xl p-2 rounded-xl bg-canvas">{item.icon}</span>
              </div>

              <div>
                <h3 className="font-serif text-lg font-semibold text-burgundy-950 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-ink-secondary leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-canvas-subtle flex items-center gap-1 text-[11px] font-semibold text-gold-700">
                <span>Step {item.step} of 04</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. ORIGINKIT DITHER REVEAL INTERACTIVE ARTISAN SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-canvas-card border-2 border-gold-400 rounded-3xl p-6 sm:p-12 shadow-warm-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 bg-burgundy-100 text-burgundy-800 text-xs font-semibold px-3.5 py-1 rounded-full uppercase tracking-wider border border-burgundy-200 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              Interactive Craftsmanship
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-burgundy-950 leading-tight">
              Laser Precision Revealed
            </h2>

            <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
              Every Mad Bespoke piece starts from raw industrial-grade materials before being transformed through precision fiber laser optics. Hover or glide across the canvas to peel away the dither matrix and reveal the finished luxury luster.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-semibold text-burgundy-900">
              <span className="inline-flex items-center gap-1.5 bg-canvas px-3 py-1.5 rounded-xl border border-gold-300 shadow-warm-sm">
                <Wand2 className="w-3.5 h-3.5 text-gold-600" />
                Hover & Touch Interactive
              </span>
              <span className="inline-flex items-center gap-1.5 bg-canvas px-3 py-1.5 rounded-xl border border-gold-300 shadow-warm-sm">
                <Eye className="w-3.5 h-3.5 text-burgundy-700" />
                Live WebGL Dither Shader
              </span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-gold-500 shadow-warm-lg relative bg-burgundy-950 group">
              <DitherReveal
                image="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&q=80"
                ditherStyle="bayer8"
                dotSize={5}
                revealRadius={140}
                revealSoftness={40}
                wave={true}
                waveSpeed={75}
                waveDensity={28}
              />
              <div className="absolute bottom-3 left-3 bg-burgundy-950/85 backdrop-blur-md text-gold-200 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-gold-500/40 pointer-events-none shadow-md">
                ✦ Interactive Shader Reveal
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 9. WHATSAPP CONCIERGE BANNER */}
      <section className="max-w-5xl mx-auto px-4 text-center">
        <div className="bg-canvas-card border-2 border-gold-400 p-8 sm:p-12 rounded-3xl shadow-warm-lg space-y-5">
          <div className="w-14 h-14 rounded-full bg-green-100 text-green-700 mx-auto flex items-center justify-center shadow-inner">
            <MessageCircle className="w-7 h-7" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-burgundy-950">
            Have a unique customisation idea?
          </h2>
          <p className="text-ink-secondary text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Message us directly on WhatsApp. We share instant digital mockups and quote the best custom rates for individuals and bulk orders alike!
          </p>
          <button
            onClick={() => openWhatsAppEnquiry({})}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-full text-sm uppercase tracking-wider shadow-warm transition-all duration-300 hover:scale-105"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Chat on WhatsApp (+91 9730672323)</span>
          </button>
        </div>
      </section>

    </div>
  );
}
