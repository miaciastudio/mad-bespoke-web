import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MessageCircle, Menu, X, Search, Sparkles } from 'lucide-react';
import { openWhatsAppEnquiry } from '../../services/whatsapp';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop & Collections', path: '/shop' },
    { name: 'Personalisation', path: '/personalisation' },
    { name: 'Corporate & Bulk', path: '/corporate' },
    { name: 'About', path: '/about' },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-header shadow-warm py-3' : 'bg-canvas py-4 border-b border-canvas-subtle'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-gold-500 shadow-warm-sm group-hover:scale-105 transition-transform duration-300 bg-canvas-card">
            <img src="/logo.jpg" alt="Mad Bespoke Emblem" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-burgundy-900 group-hover:text-burgundy-700 transition-colors">
              MAD BESPOKE
            </span>
            <span className="block text-[10px] tracking-[0.25em] uppercase text-gold-700 font-medium -mt-1">
              Make It Personal
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-burgundy-700 text-gold-100 shadow-warm-sm font-semibold'
                    : 'text-ink-secondary hover:text-burgundy-800 hover:bg-canvas-card'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Search Toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search catalog"
            className="p-2 text-ink-secondary hover:text-burgundy-700 hover:bg-canvas-card rounded-full transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* WhatsApp Direct Order CTA */}
          <button
            onClick={() => openWhatsAppEnquiry({})}
            className="hidden sm:inline-flex items-center gap-2 bg-burgundy-700 hover:bg-burgundy-800 text-gold-100 px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase shadow-warm hover:shadow-gold-glow transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4 text-green-400" />
            <span>Order on WhatsApp</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-ink-primary hover:bg-canvas-card rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Expandable Search Bar */}
      {searchOpen && (
        <div className="border-t border-canvas-subtle bg-canvas-card px-4 py-3 shadow-inner">
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
              <input
                type="text"
                placeholder="Search engraved pens, leather wallets, kada, custom hoodies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-canvas pl-9 pr-4 py-2 text-sm rounded-full border border-gold-300 focus:outline-none focus:ring-2 focus:ring-burgundy-700 text-ink-primary"
              />
            </div>
            <button
              type="submit"
              className="bg-burgundy-700 text-gold-100 px-4 py-2 rounded-full text-xs font-semibold uppercase hover:bg-burgundy-800 transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-canvas border-b border-canvas-subtle px-4 pt-2 pb-6 space-y-3 shadow-warm-lg">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-burgundy-700 text-gold-100 font-semibold'
                      : 'text-ink-secondary hover:bg-canvas-card'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          <div className="pt-2 border-t border-canvas-subtle">
            <button
              onClick={() => openWhatsAppEnquiry({})}
              className="w-full flex items-center justify-center gap-2 bg-burgundy-700 hover:bg-burgundy-800 text-gold-100 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider shadow-warm"
            >
              <MessageCircle className="w-5 h-5 text-green-400" />
              <span>WhatsApp Direct Order</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
