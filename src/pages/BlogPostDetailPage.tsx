import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, BookOpen, Clock, User, Share2, ShieldCheck, ArrowRight } from 'lucide-react';

export const BlogPostDetailPage: React.FC = () => {
  const { blogs, selectedBlogId, navigateTo, showToast } = useApp();

  const blog = blogs.find((b) => b.id === selectedBlogId) || blogs[0];

  if (!blog) {
    return (
      <div className="py-16 text-center text-slate-400">
        <p>Article not found.</p>
        <button
          onClick={() => navigateTo('blog')}
          className="mt-4 px-4 py-2 bg-slate-800 text-white rounded-lg text-xs"
        >
          Return to Blog
        </button>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard', 'info');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Back button */}
      <button
        onClick={() => navigateTo('blog')}
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Articles</span>
      </button>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
          <span>{blog.category}</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400">{blog.readTime}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {blog.title}
        </h1>

        <div className="flex items-center justify-between py-3 border-y border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-500" />
              <span>{blog.author}</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{blog.date}</span>
            </span>
          </div>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="aspect-16/9 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-xl">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="space-y-5 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
        {blog.content.map((paragraph, idx) => (
          <p key={idx} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Bottom Service Recommendation Callout */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 mt-12">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-bold text-white">Ready to Put Strategy into Action?</h4>
          <p className="text-xs text-slate-400">
            Browse our verified marketing packages and authorized VPN passes.
          </p>
        </div>
        <button
          onClick={() => navigateTo('products')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          <span>Explore Services</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
