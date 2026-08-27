import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Sparkles, Filter, X, ArrowUpDown } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import ProductCard from '../components/ui/ProductCard';
import { fetchProducts, fetchCategories } from '../services/api';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const currentCategory = searchParams.get('category') || 'all';
  const currentSearch = searchParams.get('search') || '';
  const currentSort = searchParams.get('sort') || 'default';
  const isBestsellerFilter = searchParams.get('bestseller') === 'true';

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [catsData, prodsData] = await Promise.all([
          fetchCategories(),
          fetchProducts({
            category: currentCategory,
            search: currentSearch,
            sort: currentSort,
            bestseller: isBestsellerFilter,
          }),
        ]);
        setCategories(catsData);
        setProducts(prodsData);
      } catch (err) {
        console.error('Error fetching shop data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [currentCategory, currentSearch, currentSort, isBestsellerFilter]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === 'all' || value === 'default') {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next);
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <SectionHeading
        badge="Catalogue & Collections"
        title="Curated Bespoke Creations"
        subtitle="Explore over 70+ personalised gifts, accessories, and executive keepsakes."
      />

      {/* Search & Sort Bar */}
      <div className="bg-canvas-card border border-canvas-subtle p-4 rounded-2xl shadow-warm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            type="text"
            placeholder="Search by name, material, or keyword..."
            value={currentSearch}
            onChange={(e) => updateParam('search', e.target.value)}
            className="w-full bg-canvas pl-10 pr-4 py-2.5 text-sm rounded-xl border border-canvas-subtle focus:outline-none focus:ring-2 focus:ring-burgundy-700 text-ink-primary"
          />
          {currentSearch && (
            <button
              onClick={() => updateParam('search', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink-primary"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort & Bestseller Toggle */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          
          <button
            onClick={() => updateParam('bestseller', isBestsellerFilter ? '' : 'true')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
              isBestsellerFilter
                ? 'bg-burgundy-700 text-gold-100 border-burgundy-700 shadow-sm'
                : 'bg-canvas text-ink-secondary border-canvas-subtle hover:border-gold-400'
            }`}
          >
            ★ Best Sellers Only
          </button>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-ink-muted" />
            <select
              value={currentSort}
              onChange={(e) => updateParam('sort', e.target.value)}
              className="bg-canvas text-ink-primary text-xs font-semibold py-2 px-3 rounded-xl border border-canvas-subtle focus:outline-none focus:ring-2 focus:ring-burgundy-700"
            >
              <option value="default">Featured First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name_asc">Name: A to Z</option>
            </select>
          </div>

        </div>
      </div>

      {/* Horizontal Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => updateParam('category', 'all')}
          className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
            currentCategory === 'all'
              ? 'bg-burgundy-700 text-gold-100 shadow-warm-sm'
              : 'bg-canvas-card text-ink-secondary hover:bg-canvas border border-canvas-subtle'
          }`}
        >
          All Collections
        </button>

        {categories.map((cat) => {
          const isActive = currentCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => updateParam('category', cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all duration-200 ${
                isActive
                  ? 'bg-burgundy-700 text-gold-100 shadow-warm-sm'
                  : 'bg-canvas-card text-ink-secondary hover:bg-canvas border border-canvas-subtle'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
              {cat.product_count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ml-1 ${
                  isActive ? 'bg-burgundy-900 text-gold-300' : 'bg-canvas text-ink-muted'
                }`}>
                  {cat.product_count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Filter Indicators & Count */}
      <div className="flex items-center justify-between text-xs text-ink-secondary pt-2">
        <p>
          Showing <strong className="text-burgundy-950">{products.length}</strong> bespoke product{products.length === 1 ? '' : 's'}
        </p>

        {(currentCategory !== 'all' || currentSearch || isBestsellerFilter || currentSort !== 'default') && (
          <button
            onClick={clearAllFilters}
            className="text-burgundy-700 hover:text-burgundy-900 font-semibold underline flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Clear all filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-canvas-card rounded-2xl h-80 animate-pulse border border-canvas-subtle" />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-canvas-card rounded-3xl border border-canvas-subtle p-12 text-center space-y-4 max-w-lg mx-auto shadow-warm">
          <div className="w-16 h-16 rounded-full bg-burgundy-50 text-burgundy-700 mx-auto flex items-center justify-center">
            <Filter className="w-8 h-8 text-gold-600" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-burgundy-950">No products found</h3>
          <p className="text-sm text-ink-secondary">
            We could not find any items matching your active search or filter criteria.
          </p>
          <button
            onClick={clearAllFilters}
            className="bg-burgundy-700 hover:bg-burgundy-800 text-gold-100 text-xs font-semibold uppercase px-6 py-3 rounded-full transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}
