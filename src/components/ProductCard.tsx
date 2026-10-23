import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { ShoppingCart, Zap, Check, ArrowRight, Shield } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { formatPrice, addToCart, navigateTo, setQuickOrderProduct } = useApp();
  const [imageError, setImageError] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      productId: product.id,
      productTitle: product.title,
      productImage: product.image,
      packageId: product.packages?.[0]?.id,
      packageName: product.packages?.[0]?.name,
      priceNGN: product.priceNGN,
      quantity: 1,
      category: product.category
    });
  };

  const handleOrderNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickOrderProduct(product);
  };

  const handleCardClick = () => {
    navigateTo('product-detail', { productId: product.id });
  };

  // Determine starting price label
  const hasPackages = product.packages && product.packages.length > 0;

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-slate-900/80 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/5 cursor-pointer flex flex-col"
    >
      {/* Product Image Slot (4:3 aspect ratio) */}
      <div className="relative aspect-4/3 w-full bg-slate-950 overflow-hidden border-b border-slate-800/80">
        {!imageError && product.image ? (
          <img
            src={product.image}
            alt={product.title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 to-slate-900 p-4 text-center">
            <Shield className="w-10 h-10 text-cyan-500/40 mb-2" />
            <span className="text-xs font-semibold text-slate-400">{product.category}</span>
          </div>
        )}

        {/* Stock tag (Clean unboxed style) */}
        <div className="absolute top-2.5 right-2.5 bg-slate-950/85 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-medium border border-slate-800/60 flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-emerald-400' : 'bg-rose-400'}`} />
          <span className="text-slate-200">{product.inStock ? 'Available' : 'Sold Out'}</span>
        </div>

        {/* Tier Count Badge if applicable */}
        {hasPackages && (
          <div className="absolute bottom-2.5 left-2.5 bg-slate-950/85 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-medium text-cyan-300 border border-cyan-500/30">
            {product.packages?.length} Package Tiers Available
          </div>
        )}
      </div>

      {/* Card Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Zero-Pill Metadata */}
          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium mb-1.5">
            <span className="text-cyan-400/90">{product.category}</span>
            {product.duration && (
              <>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-slate-400">{product.duration}</span>
              </>
            )}
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug mb-1.5">
            {product.title}
          </h3>

          {/* Short description */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 mt-auto">
          <div className="min-w-0 flex-1">
            <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-medium">
              {hasPackages ? 'Starting at' : 'Price'}
            </span>
            <div className="text-base font-bold text-white font-mono-numbers truncate">
              {formatPrice(product.priceNGN)}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleQuickAdd}
              title="Add to cart"
              aria-label={`Add ${product.title} to cart`}
              className="p-2 sm:p-2 min-w-[38px] min-h-[38px] flex items-center justify-center text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 rounded-lg transition-colors cursor-pointer border border-slate-700/60"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>

            <button
              onClick={handleOrderNow}
              aria-label={`Order ${product.title} now`}
              className="inline-flex items-center justify-center gap-1 px-3 py-2 min-h-[38px] text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-sm shadow-cyan-500/10"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Order Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
