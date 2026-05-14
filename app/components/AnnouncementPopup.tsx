"use client";
import { useState, useEffect } from 'react';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

// ─── Edit this object to update the announcement ──────────────────────────────
const ANNOUNCEMENT = {
  // Change this key whenever you want the popup to re-show to returning visitors
  id: 'launch-2026-v1',
  badge: '🚀 Just Launched',
  headline: 'KamarTec Solutions is officially live!',
  body: "We're Ghana's newest tech agency — and we're ready to bring your ideas to life. From web apps to mobile, AI to cybersecurity, our team is here for you.",
  image: '/images/logo/logo.png',
  imageBg: 'from-violet-600 via-purple-600 to-blue-600',
  cta: { label: 'Explore What We Do', href: '/services' },
  dismissLabel: 'Maybe later',
  // How many days before it shows again after dismissal (0 = once per session only)
  dismissDays: 0,
};
// ─────────────────────────────────────────────────────────────────────────────

export default function AnnouncementPopup() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const key = `announcement_dismissed_${ANNOUNCEMENT.id}`;
    const dismissed = localStorage.getItem(key);
    if (dismissed) {
      const dismissedAt = parseInt(dismissed, 10);
      const daysSince = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
      if (ANNOUNCEMENT.dismissDays === 0 || daysSince < ANNOUNCEMENT.dismissDays) return;
    }
    const timer = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [visible]);

  const close = () => {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
      const key = `announcement_dismissed_${ANNOUNCEMENT.id}`;
      localStorage.setItem(key, String(Date.now()));
    }, 320);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-300 ${closing ? 'opacity-0' : 'opacity-100'}`}
      style={{ backdropFilter: 'blur(6px)', background: 'rgba(0,0,0,0.55)' }}
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-labelledby="announcement-headline"
    >
      <div
        className={`relative w-full sm:max-w-md bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden transition-all duration-320 ${
          closing
            ? 'translate-y-4 opacity-0 scale-95'
            : 'translate-y-0 opacity-100 scale-100'
        }`}
        style={{ animation: closing ? undefined : 'announcementIn 0.36s cubic-bezier(0.34,1.56,0.64,1) both' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={close}
          aria-label="Close announcement"
          className="absolute top-3 right-3 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full p-1.5 transition-colors backdrop-blur-sm"
        >
          <X size={16} />
        </button>

        {/* Image / hero area */}
        <div className={`relative h-52 bg-gradient-to-br ${ANNOUNCEMENT.imageBg} flex items-center justify-center overflow-hidden`}>
          {/* Decorative rings */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-white/40 animate-ping-slow" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-white/30" />
          </div>
          {/* Floating blobs */}
          <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10 animate-float" />
          <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/10 animate-float animation-delay-2000" />
          {/* Image — fills the hero area, full content always visible */}
          <img
            src={ANNOUNCEMENT.image}
            alt="KamarTec"
            className="absolute inset-0 w-full h-full object-contain z-10 p-8 drop-shadow-2xl"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          {/* Bottom gradient fade into card body */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
        </div>

        {/* Content */}
        <div className="px-6 pb-7 pt-2">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-xs font-semibold px-3 py-1 rounded-full">
              <Sparkles size={11} />
              {ANNOUNCEMENT.badge}
            </span>
          </div>

          {/* Headline */}
          <h2
            id="announcement-headline"
            className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-snug"
          >
            {ANNOUNCEMENT.headline}
          </h2>

          {/* Body */}
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
            {ANNOUNCEMENT.body}
          </p>

          {/* CTA */}
          <div className="space-y-2">
            <Link
              href={ANNOUNCEMENT.cta.href}
              onClick={close}
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold py-3.5 px-6 rounded-2xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 active:scale-[0.98] text-sm"
            >
              {ANNOUNCEMENT.cta.label}
              <ArrowRight size={16} />
            </Link>
            <button
              onClick={close}
              className="w-full text-center text-gray-400 dark:text-gray-500 text-xs py-2 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {ANNOUNCEMENT.dismissLabel}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes announcementIn {
          from { opacity: 0; transform: translateY(40px) scale(0.94); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
      `}</style>
    </div>
  );
}
