import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Share2,
  Flame,
  Camera,
  Shield,
  Lock,
  Cpu,
  Briefcase,
  Grid,
  ChevronRight
} from 'lucide-react';

interface CategorySidebarProps {
  onCategorySelect?: () => void;
  isMobileDrawer?: boolean;
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({
  onCategorySelect,
  isMobileDrawer = false
}) => {
  const { categories, products, activeCategory, setActiveCategory, navigateTo } = useApp();

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Share2':
        return <Share2 className="w-4 h-4" />;
      case 'Flame':
        return <Flame className="w-4 h-4" />;
      case 'Camera':
        return <Camera className="w-4 h-4" />;
      case 'Shield':
        return <Shield className="w-4 h-4" />;
      case 'Lock':
        return <Lock className="w-4 h-4" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4" />;
      case 'Briefcase':
        return <Briefcase className="w-4 h-4" />;
      default:
        return <Grid className="w-4 h-4" />;
    }
  };

  const handleSelect = (categoryName: string | null) => {
    setActiveCategory(categoryName);
    navigateTo('products');
    if (onCategorySelect) {
      onCategorySelect();
    }
  };

  return (
    <div className={`w-full ${isMobileDrawer ? '' : 'bg-slate-900/60 rounded-xl border border-slate-800/80 p-3'}`}>
      <div className="flex items-center justify-between px-3 py-2 mb-2 border-b border-slate-800/80">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Service Categories
        </h3>
        <span className="text-[11px] font-mono-numbers text-slate-500">
          {products.length} Items
        </span>
      </div>

      <div className="space-y-1">
        {/* All Products */}
        <button
          onClick={() => handleSelect(null)}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeCategory === null
              ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-bold'
              : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2.5 truncate">
            <span className={activeCategory === null ? 'text-cyan-400' : 'text-slate-400'}>
              <Grid className="w-4 h-4" />
            </span>
            <span className="truncate">All Services & Logs</span>
          </div>
          <span className="text-[11px] font-mono-numbers text-slate-500 ml-2">
            {products.length}
          </span>
        </button>

        {/* Dynamic categories */}
        {categories.map((cat) => {
          const count = products.filter(
            (p) => p.category.toLowerCase() === cat.name.toLowerCase()
          ).length;
          const isSelected = activeCategory?.toLowerCase() === cat.name.toLowerCase();

          return (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.name)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-bold'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className={isSelected ? 'text-cyan-400' : 'text-slate-400'}>
                  {getCategoryIcon(cat.iconName)}
                </span>
                <span className="truncate">{cat.name}</span>
              </div>
              <div className="flex items-center gap-1 ml-2">
                <span className="text-[11px] font-mono-numbers text-slate-500">
                  {count}
                </span>
                <ChevronRight className="w-3 h-3 text-slate-600" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Quick Trust Notice */}
      <div className="mt-4 pt-3 border-t border-slate-800/60 px-3 pb-1 text-[11px] text-slate-400 space-y-1">
        <p className="font-medium text-slate-300">Direct Support</p>
        <p className="text-[10px] text-slate-500 leading-relaxed">
          Need custom volume or immediate setup assistance? Connect via Telegram or WhatsApp.
        </p>
      </div>
    </div>
  );
};
