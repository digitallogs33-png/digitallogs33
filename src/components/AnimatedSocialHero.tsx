import React from 'react';
import { Sparkles, Zap, TrendingUp, Volume2 } from 'lucide-react';

interface AnimatedSocialHeroProps {
  onExploreServices?: () => void;
}

export const AnimatedSocialHero: React.FC<AnimatedSocialHeroProps> = ({ onExploreServices }) => {
  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none select-none">
      {/* Background Ambient Spotlights (Glow effects) */}
      <div
        className="absolute -top-10 -left-10 w-48 sm:w-64 h-48 sm:h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none animate-pulse"
        style={{ animationDuration: '4s' }}
      />
      <div
        className="absolute -bottom-10 -right-10 w-48 sm:w-64 h-48 sm:h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse"
        style={{ animationDuration: '6s', animationDelay: '1s' }}
      />

      {/* Main Illustration Container with border and backdrop */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 shadow-[0_0_50px_rgba(0,210,255,0.12)]">
        {/* Aspect Ratio Box */}
        <div className="relative aspect-4/3 sm:aspect-16/11 w-full overflow-hidden">
          {/* Base 3D Megaphone & Social Galaxy Art with continuous gentle float */}
          <div className="absolute inset-0 flex items-center justify-center dl-hero-float">
            <img
              src="/src/assets/images/social_media_hero_art_1792835710817.jpg"
              alt="Digital Logs Social Media Marketing Megaphone with YouTube, Facebook, Instagram, WhatsApp, Pinterest"
              className="w-full h-full object-cover transform scale-102 hover:scale-104 transition-transform duration-700"
              loading="eager"
            />
            {/* Soft dark vignette gradient to blend seamlessly into Digital Logs theme */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20 pointer-events-none" />
          </div>

          {/* Soundwave Energy Pulse emanating from megaphone horn */}
          <div
            className="absolute top-[38%] left-[45%] w-24 h-24 sm:w-32 sm:h-32 -translate-x-1/2 -translate-y-1/2 pointer-events-none dl-soundwave-pulse"
            aria-hidden="true"
          >
            <div className="w-full h-full rounded-full border border-cyan-400/40 shadow-[0_0_20px_rgba(0,210,255,0.4)]" />
          </div>
          <div
            className="absolute top-[38%] left-[45%] w-36 h-36 sm:w-48 sm:h-48 -translate-x-1/2 -translate-y-1/2 pointer-events-none dl-soundwave-pulse-delayed"
            aria-hidden="true"
          >
            <div className="w-full h-full rounded-full border border-purple-400/30 shadow-[0_0_25px_rgba(127,0,255,0.3)]" />
          </div>

          {/* Interactive Floating 3D Social Media Badges */}

          {/* 1. YouTube 3D Badge (Top-Left) */}
          <div
            className="absolute top-[8%] left-[10%] sm:left-[12%] dl-float-youtube z-20 cursor-pointer group"
            title="YouTube Marketing & Video Reach"
            onClick={onExploreServices}
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-red-500/40 shadow-lg shadow-red-500/20 group-hover:scale-110 group-hover:border-red-400 transition-all duration-300">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white shadow-sm">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <span className="hidden xs:inline text-[10px] font-bold text-white tracking-wide">
                YouTube
              </span>
            </div>
          </div>

          {/* 2. Facebook 3D Badge (Mid-Left) */}
          <div
            className="absolute top-[48%] left-[4%] sm:left-[6%] dl-float-facebook z-20 cursor-pointer group"
            title="Facebook Page Strategy & Meta Ads"
            onClick={onExploreServices}
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-blue-500/40 shadow-lg shadow-blue-500/20 group-hover:scale-110 group-hover:border-blue-400 transition-all duration-300">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-sm font-black text-xs">
                f
              </div>
              <span className="hidden xs:inline text-[10px] font-bold text-white tracking-wide">
                Facebook
              </span>
            </div>
          </div>

          {/* 3. Instagram 3D Badge (Bottom-Left) */}
          <div
            className="absolute bottom-[16%] left-[24%] sm:left-[26%] dl-float-instagram z-20 cursor-pointer group"
            title="Instagram Aesthetic & Organic Growth"
            onClick={onExploreServices}
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-fuchsia-500/40 shadow-lg shadow-fuchsia-500/20 group-hover:scale-110 group-hover:border-fuchsia-400 transition-all duration-300">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-400 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-sm">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <span className="hidden xs:inline text-[10px] font-bold text-white tracking-wide">
                Instagram
              </span>
            </div>
          </div>

          {/* 4. WhatsApp 3D Badge (Mid-Right) */}
          <div
            className="absolute top-[44%] right-[4%] sm:right-[6%] dl-float-whatsapp z-20 cursor-pointer group"
            title="WhatsApp Business & Customer Desk"
            onClick={onExploreServices}
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-emerald-500/40 shadow-lg shadow-emerald-500/20 group-hover:scale-110 group-hover:border-emerald-400 transition-all duration-300">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-white shadow-sm">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </div>
              <span className="hidden xs:inline text-[10px] font-bold text-white tracking-wide">
                WhatsApp
              </span>
            </div>
          </div>

          {/* 5. Pinterest 3D Badge (Bottom-Right) */}
          <div
            className="absolute bottom-[16%] right-[22%] sm:right-[24%] dl-float-pinterest z-20 cursor-pointer group"
            title="Pinterest Visual Traffic & Pin Rank"
            onClick={onExploreServices}
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-rose-600/40 shadow-lg shadow-rose-600/20 group-hover:scale-110 group-hover:border-rose-400 transition-all duration-300">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center text-white shadow-sm font-black text-xs">
                P
              </div>
              <span className="hidden xs:inline text-[10px] font-bold text-white tracking-wide">
                Pinterest
              </span>
            </div>
          </div>

          {/* Twinkling Sparkles (Ambient Star bursts) */}
          <div className="absolute top-[22%] left-[32%] dl-twinkle-sparkle-1 pointer-events-none" aria-hidden="true">
            <Sparkles className="w-4 h-4 text-cyan-300 drop-shadow-[0_0_8px_rgba(0,210,255,0.8)]" />
          </div>
          <div className="absolute top-[20%] right-[30%] dl-twinkle-sparkle-2 pointer-events-none" aria-hidden="true">
            <Sparkles className="w-5 h-5 text-purple-300 drop-shadow-[0_0_10px_rgba(127,0,255,0.8)]" />
          </div>
          <div className="absolute bottom-[30%] right-[10%] dl-twinkle-sparkle-3 pointer-events-none" aria-hidden="true">
            <Zap className="w-3.5 h-3.5 text-cyan-400 drop-shadow-[0_0_8px_rgba(0,210,255,0.9)]" />
          </div>
          <div className="absolute bottom-[28%] left-[16%] dl-twinkle-sparkle-1 pointer-events-none" aria-hidden="true">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
          </div>

          {/* Bottom Overlay Info Tag */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 p-2.5 sm:p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-xs z-30 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-slate-300 font-semibold mb-0.5 gap-1">
              <span className="flex items-center gap-1.5 text-white">
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Audience Reach & Legitimate Engagement</span>
              </span>
              <span className="text-cyan-400 text-[11px] font-bold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>Verified Organic Growth</span>
              </span>
            </div>
            <p className="text-[10px] text-slate-400 line-clamp-1">
              YouTube · Facebook · Instagram · WhatsApp · Pinterest · Meta CAPI
            </p>
          </div>
        </div>
      </div>

      {/* Embedded Scoped CSS Keyframes for GPU-accelerated smooth continuous looping */}
      <style>{`
        /* Continuous gentle floating for central megaphone art */
        @keyframes dlHeroFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -9px, 0);
          }
        }

        .dl-hero-float {
          animation: dlHeroFloat 5.2s ease-in-out infinite;
          will-change: transform;
        }

        /* Soundwave aura pulses from megaphone horn */
        @keyframes dlSoundwavePulse {
          0% {
            transform: translate3d(-50%, -50%, 0) scale(0.85);
            opacity: 0.8;
          }
          50% {
            transform: translate3d(-50%, -50%, 0) scale(1.12);
            opacity: 0.35;
          }
          100% {
            transform: translate3d(-50%, -50%, 0) scale(0.85);
            opacity: 0.8;
          }
        }

        .dl-soundwave-pulse {
          animation: dlSoundwavePulse 3.4s ease-in-out infinite;
          will-change: transform, opacity;
        }

        .dl-soundwave-pulse-delayed {
          animation: dlSoundwavePulse 3.4s ease-in-out infinite;
          animation-delay: 1.2s;
          will-change: transform, opacity;
        }

        /* YouTube float & subtle rotate */
        @keyframes dlFloatYoutube {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(-4deg);
          }
          50% {
            transform: translate3d(0, -13px, 0) rotate(2deg);
          }
        }
        .dl-float-youtube {
          animation: dlFloatYoutube 4.2s ease-in-out infinite;
          will-change: transform;
        }

        /* Facebook float & subtle rotate */
        @keyframes dlFloatFacebook {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(3deg);
          }
          50% {
            transform: translate3d(0, -15px, 0) rotate(-3deg);
          }
        }
        .dl-float-facebook {
          animation: dlFloatFacebook 4.8s ease-in-out infinite;
          will-change: transform;
        }

        /* Instagram float & subtle rotate */
        @keyframes dlFloatInstagram {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(-2deg);
          }
          50% {
            transform: translate3d(0, -11px, 0) rotate(4deg);
          }
        }
        .dl-float-instagram {
          animation: dlFloatInstagram 3.6s ease-in-out infinite;
          will-change: transform;
        }

        /* WhatsApp float & subtle rotate */
        @keyframes dlFloatWhatsapp {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(4deg);
          }
          50% {
            transform: translate3d(0, -14px, 0) rotate(-2deg);
          }
        }
        .dl-float-whatsapp {
          animation: dlFloatWhatsapp 4.0s ease-in-out infinite;
          will-change: transform;
        }

        /* Pinterest float & subtle rotate */
        @keyframes dlFloatPinterest {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(-5deg);
          }
          50% {
            transform: translate3d(0, -12px, 0) rotate(3deg);
          }
        }
        .dl-float-pinterest {
          animation: dlFloatPinterest 5.1s ease-in-out infinite;
          will-change: transform;
        }

        /* Sparkle twinkle keyframes */
        @keyframes dlTwinkle {
          0%, 100% {
            transform: scale(0.9) rotate(0deg);
            opacity: 0.35;
          }
          50% {
            transform: scale(1.25) rotate(45deg);
            opacity: 0.95;
          }
        }
        .dl-twinkle-sparkle-1 {
          animation: dlTwinkle 2.8s ease-in-out infinite;
          will-change: transform, opacity;
        }
        .dl-twinkle-sparkle-2 {
          animation: dlTwinkle 3.5s ease-in-out infinite;
          animation-delay: 0.8s;
          will-change: transform, opacity;
        }
        .dl-twinkle-sparkle-3 {
          animation: dlTwinkle 2.2s ease-in-out infinite;
          animation-delay: 1.4s;
          will-change: transform, opacity;
        }

        /* Respect prefers-reduced-motion: clean fallbacks without motion */
        @media (prefers-reduced-motion: reduce) {
          .dl-hero-float,
          .dl-soundwave-pulse,
          .dl-soundwave-pulse-delayed,
          .dl-float-youtube,
          .dl-float-facebook,
          .dl-float-instagram,
          .dl-float-whatsapp,
          .dl-float-pinterest,
          .dl-twinkle-sparkle-1,
          .dl-twinkle-sparkle-2,
          .dl-twinkle-sparkle-3 {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};
