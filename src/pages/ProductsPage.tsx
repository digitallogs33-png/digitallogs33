import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { CategorySidebar } from '../components/CategorySidebar';
import {
  Search,
  SlidersHorizontal,
  X,
  Filter,
  ArrowUpDown,
  Grid,
  ShieldAlert
} from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const {
    products,
    categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'name'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter products by active category & search query
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory) {
      result = result.filter(
        (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.features.some((f) => f.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.priceNGN - b.priceNGN);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.priceNGN - a.priceNGN);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // featured
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <button
              onClick={() => setActiveCategory(null)}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              All Services
            </button>
            {activeCategory && (
              <>
                <span>/</span>
                <span className="text-cyan-400 font-medium">{activeCategory}</span>
              </>
            )}
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {activeCategory || 'All Digital Services & Subscriptions'}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Showing {filteredProducts.length} authorized digital items ready for delivery
          </p>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 min-h-[44px] cursor-pointer"
          >
            <Filter className="w-4 h-4 text-cyan-400" />
            <span>Browse Categories ({categories.length})</span>
          </button>
        </div>
      </div>

      {/* Main layout with Left Sidebar + Right Catalog */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Category Sidebar (Desktop) */}
        <div className="hidden lg:block lg:col-span-3 sticky top-24">
          <CategorySidebar />
        </div>

        {/* Right Catalog View */}
        <div className="lg:col-span-9 space-y-6">
          {/* Controls Bar: Search, Category Active Badge, Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
            {/* Search within page */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter services..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-7 py-2 sm:py-1.5 text-sm sm:text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white min-w-[24px] min-h-[24px] flex items-center justify-center cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Right sort selector & active filter clear */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end flex-wrap">
              {activeCategory && (
                <button
                  onClick={() => setActiveCategory(null)}
                  className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-1.5 rounded-md min-h-[32px] cursor-pointer"
                >
                  <span>Category: {activeCategory}</span>
                  <X className="w-3 h-3" />
                </button>
              )}

              <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 sm:py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer min-h-[36px] sm:min-h-0"
                >
                  <option value="featured">Sort: Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="p-8 sm:p-12 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
              <ShieldAlert className="w-10 h-10 text-slate-500 mx-auto stroke-1" />
              <h3 className="text-base font-bold text-white">No digital services found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No products match your current search query "{searchQuery}" or category filter.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory(null);
                  }}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer min-h-[40px]"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Category Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
          />
          <div className="fixed inset-y-0 left-0 max-w-full flex pr-4 sm:pr-10">
            <div className="w-screen max-w-xs sm:max-w-sm bg-slate-900 border-r border-slate-800 p-4 overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <h3 className="text-sm font-bold text-white">Select Category</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
                  aria-label="Close categories"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <CategorySidebar
                isMobileDrawer={true}
                onCategorySelect={() => setMobileFilterOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
