"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Search, Facebook, Twitter, Linkedin, Github, Youtube,
  Menu, X, Moon, Sun, Target, Users, Award, TrendingUp, Lightbulb,
  Heart, Zap, Shield, CheckCircle, Globe
} from 'lucide-react';

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

export default function KamarTecAboutPage() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [timelineVisible, setTimelineVisible] = useState<Set<number>>(new Set());
  const statsRef = useRef<HTMLDivElement>(null);
  const timelineRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const projectsCount = useCountUp(50, 1800, statsVisible);
  const clientsCount = useCountUp(30, 1800, statsVisible);
  const teamCount = useCountUp(9, 1200, statsVisible);
  const yearsCount = useCountUp(3, 1000, statsVisible);

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const saved = localStorage.getItem('darkMode');
    if (saved) setDarkMode(saved === 'true');
    else setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    const statsObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) setStatsVisible(true);
    }, { threshold: 0.3 });
    if (statsRef.current) statsObs.observe(statsRef.current);

    const timelineObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = Number((e.target as HTMLDivElement).dataset.timelineIdx);
          setTimelineVisible(prev => new Set([...prev, idx]));
        }
      });
    }, { threshold: 0.2 });
    timelineRefs.current.forEach(el => timelineObs.observe(el));

    return () => { statsObs.disconnect(); timelineObs.disconnect(); };
  }, [isMounted]);

  const values = [
    { icon: <Lightbulb size={28} />, title: "Innovation", description: "We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions.", color: "from-yellow-500 to-orange-500" },
    { icon: <Heart size={28} />, title: "Customer Focus", description: "Your success is our success. We prioritize understanding and exceeding client expectations.", color: "from-pink-500 to-red-500" },
    { icon: <Users size={28} />, title: "Collaboration", description: "We believe in the power of teamwork, both within our team and with our clients.", color: "from-blue-500 to-purple-500" },
    { icon: <Shield size={28} />, title: "Quality", description: "We never compromise on quality, ensuring every project meets the highest standards.", color: "from-green-500 to-teal-500" },
  ];

  const milestones = [
    { year: "2022", title: "The Beginning", description: "KamarTec Solutions was founded at the University of Cape Coast with a vision to revolutionize tech solutions in Ghana.", icon: "🚀" },
    { year: "2023", title: "Legal Registration", description: "Officially registered as a legal business entity in Ghana, cementing our commitment to professional excellence and accountability.", icon: "🏛️" },
    { year: "2024", title: "Recognition & Growth", description: "Expanded to 9 team members, serving 30+ clients across multiple industries including health, legal, education, and fintech.", icon: "📈" },
    { year: "2025", title: "Innovation Hub", description: "Launched our AI assistant NOVA, tech training programs, and expanded our cybersecurity practice — building the future of Africa's digital landscape.", icon: "💡" },
    { year: "2026", title: "Scaling Up", description: "Continuing to grow our team, deepen our impact across Ghana and West Africa, and deliver world-class digital products.", icon: "🌍" },
  ];

  if (!isMounted) {
    return <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center"><div className="text-gray-900 dark:text-white">Loading…</div></div>;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden transition-colors duration-300">

        {/* ── Header ─────────────────────────────────────────── */}
        <header
          className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md z-50 transition-all duration-300"
          style={{ boxShadow: scrollY > 50 ? '0 4px 20px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.05)', borderRadius: scrollY > 50 ? '0 0 24px 24px' : '0' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shadow-lg">
                  <img src="/images/logo/favicon.png" alt="KamarTec" className="w-full h-full object-cover" />
                </div>
                <div className="hidden sm:block">
                  <div className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">KamarTec</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 tracking-wider">SOLUTIONS</div>
                </div>
              </Link>

              <div className="hidden lg:flex items-center gap-2 flex-1 max-w-md mx-8">
                <div className="relative flex-1 group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors" size={18} />
                  <input type="text" placeholder="Looking for something?" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
                </div>
              </div>

              <nav className="hidden md:flex items-center gap-4 lg:gap-6">
                {[['/', 'Home'], ['/services', 'Services'], ['/portfolio', 'Projects'], ['/team', 'Team'], ['/blog', 'Blog'], ['/contact', 'Contact']].map(([href, label]) => (
                  <Link key={href} href={href} className="text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all">{label}</Link>
                ))}
                <Link href="/about" className="text-sm text-purple-600 font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-purple-600">About</Link>
              </nav>

              <div className="flex items-center gap-2 sm:gap-3">
                <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:scale-110">
                  {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-gray-700" />}
                </button>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  {mobileMenuOpen ? <X size={24} className="text-gray-700 dark:text-gray-300" /> : <Menu size={24} className="text-gray-700 dark:text-gray-300" />}
                </button>
              </div>
            </div>

            <div className={`md:hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-[520px] opacity-100 mt-4 overflow-y-auto' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <div className="py-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
                {[['/', 'Home'], ['/about', 'About'], ['/services', 'Services'], ['/portfolio', 'Projects'], ['/team', 'Team'], ['/blog', 'Blog'], ['/contact', 'Contact']].map(([href, label]) => (
                  <Link key={href} href={href} className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600">{label}</Link>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* ── Legal Registration Banner ────────────────────────── */}
        <div className="fixed top-[72px] w-full z-40 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center py-2 text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2">
          <Shield size={14} />
          Legally Registered Business in Ghana · Registered with the Registrar General's Department
          <Shield size={14} />
        </div>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative min-h-[65vh] flex items-center pt-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-purple-700 to-pink-700 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
            <div className="absolute top-40 left-20 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000" />
            <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-4000" />
            <div className="absolute top-1/3 right-1/4 w-28 h-28 border border-white/15 rounded-full animate-rotate-slow" />
            <div className="absolute bottom-1/3 left-1/3 w-16 h-16 bg-white/10 rounded-full animate-float" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 w-full text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <Globe size={16} /> ABOUT US
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight animate-slide-up">
              Transforming Ideas<br />Into{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">Digital Reality</span>
            </h1>
            <p className="text-white/90 text-lg sm:text-xl max-w-3xl mx-auto animate-slide-up animation-delay-200 leading-relaxed">
              A legally registered Ghanaian tech company passionate about building products that matter — for Africa and the world.
            </p>
          </div>
        </section>

        {/* ── Our Story ────────────────────────────────────────── */}
        <section className="py-24 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="absolute -inset-6 bg-gradient-to-br from-purple-200 to-blue-200 dark:from-purple-900/30 dark:to-blue-900/30 rounded-3xl blur-2xl opacity-60" />
                <div className="relative rounded-3xl shadow-2xl overflow-hidden hover:scale-105 transition-transform duration-500">
                  <img src="/images/about/about.jpg" alt="Our team at work" className="w-full rounded-3xl" loading="lazy" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Shield size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white">Legally Registered</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Registrar General's Department, Ghana</div>
                      </div>
                      <CheckCircle size={20} className="text-green-500 ml-auto flex-shrink-0" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <span className="inline-block bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-5">OUR STORY</span>
                <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
                  Building the Future, One Solution at a Time
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-5 leading-relaxed">
                  Founded at the University of Cape Coast, KamarTec Solutions grew from a group of passionate students into a legally registered tech company delivering world-class digital products.
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
                  Our belief is simple: technology should empower, not complicate. We build products that are innovative, practical, and deeply human — whether that's an AI assistant for Africa, a health app, a law firm site, or a payment platform.
                </p>
                <div className="flex flex-wrap gap-5">
                  {[['⚡', 'Fast Delivery', 'text-purple-600'], ['🛡️', 'Quality Assured', 'text-blue-600'], ['❤️', 'Client Focused', 'text-pink-600']].map(([emoji, label, color]) => (
                    <div key={label} className={`flex items-center gap-2 ${color} font-semibold`}>
                      <span>{emoji}</span> {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Animated Stats ───────────────────────────────────── */}
        <section
          ref={statsRef}
          className="py-20 bg-gradient-to-br from-purple-700 via-blue-700 to-indigo-700 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-400/20 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
              {[
                { num: projectsCount, suffix: '+', label: 'Projects Completed', icon: '🚀' },
                { num: clientsCount, suffix: '+', label: 'Happy Clients', icon: '😊' },
                { num: teamCount, suffix: '', label: 'Team Members', icon: '👥' },
                { num: yearsCount, suffix: '+', label: 'Years Experience', icon: '📅' },
                { num: null, suffix: '', label: 'Legally Registered', icon: '🏛️', text: '✓' },
              ].map((stat, i) => (
                <div key={i} className="text-center hover:scale-110 transition-transform duration-300">
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-4xl sm:text-5xl font-black text-white mb-1">
                    {stat.text ?? `${stat.num}${stat.suffix}`}
                  </div>
                  <div className="text-purple-200 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Mission & Vision ─────────────────────────────────── */}
        <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <span className="inline-block bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">WHAT DRIVES US</span>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white">Our Mission & Vision</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">Our Mission</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  To provide the best and quality tech services to clients, meeting their needs through innovative solutions. We're committed to developing mobile apps, responsive websites, captivating graphics, and empowering individuals with tech skills to make a lasting impact in society.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">Our Vision</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  To become the leading tech solutions provider in Ghana and across Africa — recognized for excellence, innovation, and commitment to client success. We envision a future where technology is accessible to all, empowering businesses and individuals to reach their full potential.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Core Values ──────────────────────────────────────── */}
        <section className="py-24 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <span className="inline-block bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">CORE VALUES</span>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4">What We Stand For</h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">Our values guide everything we do, from how we build products to how we grow our team.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v, i) => (
                <div key={i} className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group">
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${v.color}`} />
                  <div className={`w-14 h-14 bg-gradient-to-br ${v.color} rounded-2xl flex items-center justify-center mb-5 text-white group-hover:scale-110 transition-transform`}>
                    {v.icon}
                  </div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3">{v.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Timeline ─────────────────────────────────────────── */}
        <section className="py-24 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <span className="inline-block bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">OUR JOURNEY</span>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white">Milestones That Define Us</h2>
            </div>

            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-pink-500 hidden sm:block" />
              <div className="space-y-10">
                {milestones.map((m, i) => (
                  <div
                    key={i}
                    ref={el => { if (el) timelineRefs.current.set(i, el); }}
                    data-timeline-idx={i}
                    style={{ transitionDelay: `${i * 100}ms` }}
                    className={`relative pl-0 sm:pl-20 transition-all duration-700 ${timelineVisible.has(i) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                    <div className="absolute left-5 top-4 w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full border-4 border-white dark:border-gray-800 hidden sm:flex items-center justify-center shadow-lg">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-7 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-3xl">{m.icon}</span>
                        <span className="text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{m.year}</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-purple-200 to-blue-200 dark:from-purple-800 dark:to-blue-800" />
                      </div>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">{m.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{m.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ────────────────────────────────────── */}
        <section className="py-24 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-5">WHY CHOOSE US</span>
                <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight">Your Success Is Our Priority</h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-10 leading-relaxed">
                  When you work with KamarTec, you're not just hiring a vendor — you're gaining a partner invested in your long-term success.
                </p>
                <div className="space-y-7">
                  {[
                    { icon: <Award size={24} className="text-white" />, color: 'from-purple-500 to-blue-500', title: 'Legally Registered & Accountable', desc: 'We are a formally registered Ghanaian business — professional, trustworthy, and here for the long run.' },
                    { icon: <Users size={24} className="text-white" />, color: 'from-pink-500 to-orange-500', title: 'Multi-Disciplinary Team', desc: 'Software dev, design, data science, and cybersecurity expertise under one roof — everything your project needs.' },
                    { icon: <Lightbulb size={24} className="text-white" />, color: 'from-blue-500 to-teal-500', title: 'Innovative, African-Led', desc: 'Built in Ghana, thinking globally. We understand the African market deeply and build for it intentionally.' },
                    { icon: <Shield size={24} className="text-white" />, color: 'from-green-500 to-emerald-500', title: 'Security & Quality First', desc: 'Every product is built with security, performance, and quality in mind — no shortcuts, no compromises.' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-5 group">
                      <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-black text-gray-900 dark:text-white mb-1">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-br from-pink-200 to-purple-200 dark:from-pink-900/20 dark:to-purple-900/20 rounded-3xl blur-2xl opacity-60" />
                <div className="relative rounded-3xl shadow-2xl overflow-hidden hover:scale-105 transition-transform duration-500">
                  <img src="/images/hero/Hero_small.jpg" alt="Team collaboration" className="w-full rounded-3xl" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="py-28 bg-gradient-to-br from-purple-700 to-blue-700 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-80 h-80 bg-purple-400 rounded-full blur-3xl opacity-20 animate-blob" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-400 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000" />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">Ready to Transform Your Ideas?</h2>
            <p className="text-white/90 text-xl mb-10">Let's work together to create something amazing. Contact us today to discuss your project.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-white text-purple-700 px-10 py-4 rounded-full font-black hover:bg-gray-100 hover:shadow-2xl hover:scale-110 transition-all duration-300 text-lg">
                Get In Touch <ArrowRight size={20} />
              </Link>
              <Link href="/portfolio"
                className="inline-flex items-center gap-2 bg-white/15 border-2 border-white/30 text-white px-10 py-4 rounded-full font-bold hover:bg-white/25 hover:scale-110 transition-all duration-300">
                See Our Work
              </Link>
            </div>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────────── */}
        <footer className="bg-gray-950 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div>
                <img src="/images/logo/logo.png" alt="KamarTec Solutions" className="h-36 w-auto mb-5" />
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">Making the world a better place through elegant technology solutions.</p>
                <div className="flex items-center gap-2 text-green-400 text-xs font-medium mb-4">
                  <Shield size={14} /> Legally Registered in Ghana
                </div>
                <div className="flex gap-3">
                  {[Facebook, Twitter, Linkedin, Github, Youtube].map((Icon, i) => (
                    <a key={i} href="#" className="bg-gray-800 p-2.5 rounded-full hover:bg-purple-600 hover:scale-110 transition-all">
                      <Icon size={16} className="text-gray-400" />
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white mb-5">Quick Links</h3>
                <ul className="space-y-3">
                  {[['/', 'Home'], ['/about', 'About'], ['/services', 'Services'], ['/portfolio', 'Projects'], ['/team', 'Team'], ['/blog', 'Blog'], ['/contact', 'Contact']].map(([href, label]) => (
                    <li key={href}><Link href={href} className="text-gray-400 hover:text-purple-400 hover:translate-x-1 inline-block transition-all text-sm">{label}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-white mb-5">Contact</h3>
                <div className="space-y-3 text-sm text-gray-400">
                  <p>University of Cape Coast, Ghana</p>
                  <p>+233 (0) 592852555<br />+233 (0) 538118529</p>
                  <p>kamartecsolutions@gmail.com</p>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white mb-5">Newsletter</h3>
                <p className="text-gray-400 text-sm mb-4">Stay up to date with our latest news and projects.</p>
                <div className="flex gap-2">
                  <input type="email" placeholder="Your email"
                    className="flex-1 px-4 py-2.5 border border-gray-700 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" />
                  <button className="bg-purple-600 text-white p-2.5 rounded-full hover:bg-purple-700 hover:scale-110 transition-all">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 text-sm">© 2026 KamarTec Solutions. All rights reserved.</p>
              <p className="text-gray-600 text-xs">Proudly built in Ghana 🇬🇭</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
