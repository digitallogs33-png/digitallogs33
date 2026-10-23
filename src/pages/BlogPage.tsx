import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, ArrowRight, ArrowLeft } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { blogs, navigateTo } = useApp();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Title */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-semibold mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Digital Logs Insights & Field Manuals</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Articles & Tactical Guides
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
          Deep dives on digital privacy protocols, server-side attribution with Meta CAPI, and organic social media algorithms.
        </p>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <article
            key={blog.id}
            onClick={() => navigateTo('blog-detail', { blogId: blog.id })}
            className="group rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-cyan-500/40 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-16/10 bg-slate-950 overflow-hidden border-b border-slate-800">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 rounded text-[11px] font-semibold text-cyan-300 border border-slate-800">
                {blog.category}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                  <span>{blog.date}</span>
                  <span>·</span>
                  <span>{blog.readTime}</span>
                </div>

                <h2 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug mb-2">
                  {blog.title}
                </h2>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs mt-4">
                <span className="text-slate-500 text-[11px]">By {blog.author}</span>
                <span className="text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
