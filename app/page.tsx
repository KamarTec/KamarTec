"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowRight, Search, Facebook, Twitter, Linkedin, Github, Youtube,
  ChevronLeft, ChevronRight, Menu, X, Moon, Sun, Shield, CheckCircle,
  Star, MessageCircle, Users, Briefcase, Clock, TrendingUp, Instagram,
  Code2, Smartphone, Palette, BarChart3
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import NewsletterForm from './components/NewsletterForm';

function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);

  return { count, activate: () => setActive(true) };
}

export default function KamarTecHomePage() {
  const [heroSlide, setHeroSlide] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [testimonialTransition, setTestimonialTransition] = useState(true);
  const statsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const projects = useCountUp(50);
  const clients = useCountUp(30);
  const members = useCountUp(9);
  const years = useCountUp(3);

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(savedMode === 'true');
    } else {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [isMounted]);

  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          projects.activate();
          clients.activate();
          members.activate();
          years.activate();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [isMounted]);

  const testimonials = [
    {
      name: "Clement Obeng",
      role: "Lead Developer",
      quote: "Innovation distinguishes between a leader and a follower. Always push boundaries.",
      image: "/images/team/Clement.jpg"
    },
    {
      name: "Emmanuel Kofi Frimpong",
      role: "Lead Designer",
      quote: "Design is not just what it looks like. Design is how it works and feels.",
      image: "/images/team/Emmanuel.jpg"
    },
    {
      name: "Elvis Osei Bonsu",
      role: "Frontend Developer",
      quote: "Whenever you feel stuck, push past your limits, and you'll overcome any challenge.",
      image: "/images/team/Elvis.jpg"
    },
    {
      name: "Gerald Boakye",
      role: "Frontend Developer",
      quote: "Great code is written once, maintained forever. Write it right the first time.",
      image: "/images/team/Gerald.jpg"
    }
  ];

  const teamMembers = [
    { id: "clement-obeng", name: "Clement Obeng", role: "Lead Developer", image: "/images/team/Clement.jpg", dept: "Software Development" },
    { id: "emmanuel-frimpong", name: "Emmanuel Kofi Frimpong", role: "Lead Designer", image: "/images/team/Emmanuel.jpg", dept: "Design" },
    { id: "gerald-boakye", name: "Gerald Boakye", role: "Frontend Developer", image: "/images/team/Gerald.jpg", dept: "Software Development" },
    { id: "elvis-bonsu", name: "Elvis Osei Bonsu", role: "Frontend Developer", image: "/images/team/Elvis.jpg", dept: "Software Development" },
    { id: "francis-mensah", name: "Francis Mensah Agyei", role: "Data Analyst", image: "/images/team/Francis.jpg", dept: "Data Science" },
    { id: "albert-segu", name: "Albert Kofi Segu", role: "Data Scientist", image: "/images/team/Albert.jpg", dept: "Data Science" },
    { id: "derry-bandoh", name: "Derry Atta Bandoh", role: "Backend Developer", image: "/images/team/Derry.jpg", dept: "Software Development" },
    { id: "kanbros-antwi", name: "Kanbros Kojo Antwi", role: "Cybersecurity & AI Engineer", image: "/images/team/Kanbros.jpg", dept: "Cybersecurity & AI" },
    { id: "richard-essaw", name: "Richard Essaw", role: "Frontend Developer", image: "/images/team/Richard.jpg", dept: "Software Development" },
  ];

  const deptColors: Record<string, string> = {
    "Software Development": "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    "Design": "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
    "Data Science": "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    "Cybersecurity & AI": "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  };

  const services = [
    { id: "software-development", title: "Software Dev't", color: "from-purple-600 to-orange-400", image: "/images/services/software_dev.jpg", icon: <Code2 size={20} /> },
    { id: "mobile-apps", title: "Mobile Apps", color: "from-pink-500 to-orange-400", image: "/images/services/mobile_apps.jpg", icon: <Smartphone size={20} /> },
    { id: "graphic-design", title: "Graphic Design", color: "from-pink-600 to-purple-600", image: "/images/services/graphic_design.jpg", icon: <Palette size={20} /> },
    { id: "web-design", title: "Web Design", color: "from-orange-500 to-red-500", image: "/images/services/web_design.jpg", icon: <BarChart3 size={20} /> }
  ];

  const portfolioItems = [
    { id: "focuspal", title: "FocusPal", description: "AI-powered student productivity companion", image: "/images/portfolio/focuspal.png", tags: ["Flutter", "AI", "Education"], featured: true },
    { id: "nova", title: "NOVA", description: "Africa's first culturally-aware AI assistant", image: "/images/portfolio/nova.jpg", tags: ["AI", "NLP", "Python"], featured: true },
    { id: "earlaw-firm", title: "EarlLaw Firm", description: "UK law firm website — earllawfirm.co", image: "/images/portfolio/unavailable.png", tags: ["Next.js", "Legal", "UK"] },
    { id: "horizon-path-travel", title: "Horizon Path Travel", description: "Travel agency & booking platform", image: "/images/portfolio/unavailable.png", tags: ["React", "Travel"] },
    { id: "mahyp-app", title: "MaHyp App", description: "Hypertension monitoring & management app", image: "/images/portfolio/unavailable.png", tags: ["React Native", "Health"] },
    { id: "kamarpay", title: "KamarPay", description: "Our own payment & MoMo infrastructure", image: "/images/portfolio/unavailable.png", tags: ["Node.js", "FinTech"] },
  ];

  const searchableItems = [
    ...services.map(s => ({ type: 'service', id: s.id, title: s.title, section: 'services' })),
    ...teamMembers.map(m => ({ type: 'team', id: m.id, title: m.name, section: 'team' })),
    ...portfolioItems.map(p => ({ type: 'portfolio', id: p.id, title: p.title, section: 'projects' })),
    { type: 'page', id: 'about', title: 'About Us', section: 'about' },
    { type: 'page', id: 'blog', title: 'Blog', section: 'blog' },
    { type: 'page', id: 'contact', title: 'Contact', section: 'contact' },
    { type: 'page', id: 'home', title: 'Home', section: 'home' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    const results = searchableItems.filter(item =>
      (item.title || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (results.length > 0) {
      document.getElementById(results[0].section)?.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => setIsSearching(false), 1000);
  };

  const changeTestimonial = (next: number) => {
    setTestimonialTransition(false);
    setTimeout(() => {
      setTestimonialIndex(next);
      setTestimonialTransition(true);
    }, 200);
  };

  const nextTestimonial = () => changeTestimonial((testimonialIndex + 1) % testimonials.length);
  const prevTestimonial = () => changeTestimonial((testimonialIndex - 1 + testimonials.length) % testimonials.length);
  const toggleDarkMode = () => setDarkMode(d => !d);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden transition-colors duration-300">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <header
          className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md z-50 transition-all duration-300"
          style={{
            boxShadow: scrollY > 50 ? '0 4px 20px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.05)',
            borderRadius: scrollY > 50 ? '0 0 24px 24px' : '0'
          }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 transform hover:scale-105 transition-transform duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shadow-lg">
                  <img src="/images/logo/favicon.png" alt="KamarTec Logo" className="w-full h-full object-cover" />
                </div>
                <div className="hidden sm:block">
                  <div className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">KamarTec</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 tracking-wider">SOLUTIONS</div>
                </div>
              </Link>

              <div className="hidden lg:flex items-center gap-2 flex-1 max-w-md mx-8">
                <form onSubmit={handleSearch} className="relative flex-1 group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors duration-300" size={18} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Looking for something?"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                  />
                  <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors">
                    <ArrowRight size={18} />
                  </button>
                </form>
              </div>

              <nav className="hidden md:flex items-center gap-4 lg:gap-6">
                {[
                  { label: 'Home', action: () => scrollToSection('home'), active: true },
                ].map(item => (
                  <button key={item.label} onClick={item.action} className="text-sm lg:text-base text-red-500 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500">
                    {item.label}
                  </button>
                ))}
                {['About', 'Services', 'Team', 'Projects', 'Blog', 'Contact'].map(label => (
                  <Link
                    key={label}
                    href={`/${label === 'Projects' ? 'portfolio' : label.toLowerCase()}`}
                    className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all"
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-2 sm:gap-3">
                <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110" aria-label="Toggle dark mode">
                  {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-gray-700" />}
                </button>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Toggle menu">
                  {mobileMenuOpen ? <X size={24} className="text-gray-700 dark:text-gray-300" /> : <Menu size={24} className="text-gray-700 dark:text-gray-300" />}
                </button>
              </div>
            </div>

            <div className={`md:hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-[520px] opacity-100 mt-4 overflow-y-auto' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <div className="py-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
                <form onSubmit={handleSearch} className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search..." className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </form>
                <button onClick={() => scrollToSection('home')} className="block py-2 text-red-500 font-medium w-full text-left">Home</button>
                {['About', 'Services', 'Portfolio', 'Team', 'Blog', 'Contact'].map(label => (
                  <Link key={label} href={`/${label.toLowerCase()}`} className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">{label}</Link>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* ── Hero Section ───────────────────────────────────────────────── */}
        <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-purple-700 to-blue-700 dark:from-red-800 dark:via-purple-900 dark:to-blue-900"></div>

          {/* Animated blobs */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-40 left-20 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 left-40 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>

          {/* Floating geometric rings */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 right-1/4 w-32 h-32 border-2 border-white/20 rounded-full animate-float"></div>
            <div className="absolute top-1/3 right-1/3 w-16 h-16 border-2 border-yellow-300/30 rounded-full animate-float animation-delay-1000"></div>
            <div className="absolute bottom-1/4 left-1/5 w-24 h-24 border-2 border-pink-300/20 rounded-full animate-float animation-delay-2000"></div>
            <div className="absolute top-2/3 right-1/5 w-48 h-48 border border-white/10 rounded-full animate-rotate-slow"></div>
            <div className="absolute top-1/2 left-1/3 w-8 h-8 bg-yellow-400/40 rounded-full animate-float animation-delay-3000"></div>
            <div className="absolute bottom-1/3 right-1/2 w-6 h-6 bg-pink-400/40 rounded-full animate-float animation-delay-500"></div>
          </div>

          {/* Bottom corner decoration */}
          <div className={`absolute w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gradient-to-br from-orange-400 to-yellow-300 rounded-tl-full blur-2xl transition-all duration-1000 ${heroSlide === 0 ? 'bottom-0 left-0 opacity-40' : 'bottom-0 right-0 opacity-40'}`}></div>

          {/* Hero image */}
          <div className={`absolute top-20 right-0 w-1/2 h-2/3 hidden lg:block transition-all duration-700 ${heroSlide === 0 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 rounded-bl-full opacity-80"></div>
              <img src="/images/hero/Hero_small.jpg" alt="Team collaboration" className="absolute top-10 right-10 w-4/5 h-4/5 object-cover rounded-3xl shadow-2xl" loading="lazy" />
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 w-full">
            {/* Slide 1 */}
            <div className={`transition-all duration-700 transform ${heroSlide === 0 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full absolute'}`}>
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-6 animate-fade-in">
                  <span className="bg-red-500 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium shadow-lg">KAMARTEC</span>
                  <span className="text-white font-medium text-xs sm:text-base">SOLUTIONS</span>
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 backdrop-blur-sm">
                    <Shield size={12} /> Legally Registered
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight animate-slide-up">
                  We Are KamarTec, Your Best Solution To All Your Tech Needs
                </h1>
                <p className="text-white/90 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed animate-slide-up animation-delay-200">
                  Ghana's premier tech agency — building world-class apps, websites, and digital solutions.
                  From mobile development to AI-powered platforms, we turn your vision into reality.
                </p>
                <div className="flex flex-wrap gap-4 animate-slide-up animation-delay-400">
                  <button
                    onClick={() => setHeroSlide(1)}
                    className="bg-yellow-400 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:bg-yellow-300 hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 group text-sm sm:text-base">
                    LEARN MORE <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <Link href="/contact" className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:bg-white hover:text-purple-700 transition-all duration-300 text-sm sm:text-base">
                    GET A QUOTE
                  </Link>
                </div>
              </div>
            </div>

            {/* Slide 2 */}
            <div className={`transition-all duration-700 transform ${heroSlide === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute'}`}>
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-6">
                  <span className="bg-red-500 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium shadow-lg">KAMARTEC</span>
                  <span className="text-white font-medium text-xs sm:text-base">SOLUTIONS</span>
                </div>
                <p className="text-white text-base sm:text-lg lg:text-xl mb-4 sm:mb-6 animate-fade-in leading-relaxed">
                  What software application do you wish to have on your computer and mobile device? KamarTec has it all.
                </p>
                <p className="text-white text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 animate-fade-in animation-delay-200 leading-relaxed">
                  We also teach people with passion to learn anything in Tech — Graphic design, Mobile and web app development, Data Science, Cybersecurity, and more.
                </p>
                <p className="text-yellow-300 text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 animate-pulse">
                  Name your problem and the solution is already there.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button onClick={() => setHeroSlide(0)} className="bg-yellow-400 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:bg-yellow-300 hover:shadow-2xl hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                    BACK HOME
                  </button>
                  <Link href="/portfolio" className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:bg-white hover:text-purple-700 transition-all duration-300 text-sm sm:text-base">
                    VIEW WORK
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Slide dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {[0, 1].map(i => (
              <button key={i} onClick={() => setHeroSlide(i)} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${heroSlide === i ? 'bg-yellow-400 w-8' : 'bg-white/50'}`} aria-label={`Slide ${i + 1}`} />
            ))}
          </div>
        </section>

        {/* ── Stats Bar ──────────────────────────────────────────────────── */}
        <div ref={statsRef} className="bg-gray-950 py-8 sm:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                { icon: <Briefcase size={24} className="text-purple-400" />, value: projects.count, suffix: '+', label: 'Projects Delivered' },
                { icon: <Users size={24} className="text-blue-400" />, value: members.count, suffix: '', label: 'Team Experts' },
                { icon: <TrendingUp size={24} className="text-green-400" />, value: clients.count, suffix: '+', label: 'Happy Clients' },
                { icon: <Clock size={24} className="text-yellow-400" />, value: years.count, suffix: '+', label: 'Years Experience' },
              ].map((stat, i) => (
                <div key={i} className="text-center group">
                  <div className="flex justify-center mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── About Section ──────────────────────────────────────────────── */}
        <section id="about" className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden scroll-animate">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-700 dark:from-blue-900 to-transparent opacity-20"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="absolute -inset-4 sm:-inset-6">
                  <div className="absolute top-0 left-0 w-32 sm:w-48 h-32 sm:h-48 bg-blue-500 rounded-tr-full opacity-20"></div>
                  <div className="absolute bottom-0 right-0 w-40 sm:w-56 h-40 sm:h-56 bg-yellow-400 rounded-tl-full opacity-20"></div>
                </div>
                <div className="relative rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500 overflow-hidden">
                  <img src="/images/about/about.jpg" alt="Team working" className="w-full rounded-3xl" loading="lazy" />
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 px-4 py-2 rounded-full text-xs sm:text-sm font-medium inline-block mb-4">ABOUT US</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
                  Creative Design &amp; Development
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                  From mobile apps to web and graphic design — our mission is to deliver quality digital solutions that move businesses forward. We've shipped 50+ projects across Ghana and beyond.
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-6 leading-relaxed">
                  We equip individuals with in-demand tech skills and help businesses thrive in the digital age. Every project we build reflects our commitment to excellence.
                </p>

                {/* Legally Registered badge */}
                <div className="flex items-center gap-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-2xl p-4 mb-6">
                  <CheckCircle size={24} className="text-green-600 dark:text-green-400 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-800 dark:text-green-300 text-sm">Legally Registered Business</p>
                    <p className="text-green-700 dark:text-green-400 text-xs">Registered & operating under Ghanaian law</p>
                  </div>
                </div>

                <Link href="/about" className="bg-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:bg-purple-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 group text-sm sm:text-base">
                  MORE ABOUT US <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Services Section ───────────────────────────────────────────── */}
        <section id="services" className="py-16 sm:py-24 lg:py-32 bg-white dark:bg-gray-900 relative overflow-hidden scroll-animate">
          <div className="absolute top-20 right-0 w-96 h-96 bg-purple-100 dark:bg-purple-900 rounded-full filter blur-3xl opacity-30"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="mb-12 sm:mb-16 text-center">
              <span className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 px-4 py-2 rounded-full text-xs sm:text-sm font-medium inline-block mb-4">OUR SERVICES</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                Smart, Creative, And Reliable Tech Solutions
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
                Turning your ideas into powerful digital experiences
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="group relative overflow-hidden rounded-3xl h-64 sm:h-80 lg:h-96 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                  style={{ transform: index % 2 === 0 ? 'rotate(-1deg)' : 'rotate(1deg)' }}
                >
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-80 group-hover:opacity-90 transition-opacity`}></div>
                  <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6">
                    <div className="flex justify-end">
                      <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {service.icon}
                      </div>
                    </div>
                    <button className="bg-white text-gray-900 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium flex items-center gap-2 hover:shadow-xl transition-all group-hover:scale-110 text-sm sm:text-base w-fit">
                      {service.title} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/services" className="bg-red-500 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-medium hover:bg-red-600 hover:shadow-2xl hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                ALL SERVICES
              </Link>
            </div>
          </div>
        </section>

        {/* ── Portfolio Section ──────────────────────────────────────────── */}
        <section id="projects" className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-blue-700 via-blue-600 to-purple-700 dark:from-blue-900 dark:via-blue-800 dark:to-purple-900 relative overflow-hidden scroll-animate">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12 sm:mb-16">
              <div>
                <span className="bg-blue-600 dark:bg-blue-800 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-medium inline-block mb-4">PORTFOLIO</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4">
                  Experienced in Software Development
                </h2>
                <p className="text-blue-200 text-base sm:text-lg max-w-xl">
                  50+ projects shipped across education, FinTech, health, travel, and more.
                </p>
              </div>
              <Link href="/portfolio" className="text-white/80 hover:text-white text-sm flex items-center gap-1 transition-colors whitespace-nowrap">
                View all 10+ projects <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {portfolioItems.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => router.push(`/portfolio`)}
                  className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 group cursor-pointer relative"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {item.featured && (
                    <div className="absolute top-4 left-4 z-10 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Star size={12} fill="currentColor" /> Featured
                    </div>
                  )}
                  <div className="relative overflow-hidden h-48 sm:h-56">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full text-xs">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12 sm:mt-16">
              <Link href="/portfolio" className="border-2 border-white text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-medium hover:bg-white hover:text-blue-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 group text-sm sm:text-base">
                VIEW ALL PROJECTS <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Team Section ───────────────────────────────────────────────── */}
        <section id="team" className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-purple-700 via-purple-600 to-blue-600 dark:from-purple-900 dark:via-purple-800 dark:to-blue-800 relative overflow-hidden scroll-animate">
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)' }}></div>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center mb-12 sm:mb-16">
              <span className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-xs sm:text-sm font-bold inline-block mb-6">
                MEET OUR {teamMembers.length} TEAM MEMBERS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                Committed To Team Excellence
              </h2>
              <p className="text-purple-200 text-base sm:text-lg max-w-2xl mx-auto">
                A diverse team of engineers, designers, data scientists, and cybersecurity experts building Ghana's digital future
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  onClick={() => router.push(`/team/${member.id}`)}
                  className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 text-center hover:-translate-y-2 transition-all duration-500 shadow-2xl cursor-pointer group"
                  style={{
                    transitionDelay: `${(index % 6) * 60}ms`,
                    transform: index % 3 === 0 ? 'rotate(-1deg)' : index % 3 === 2 ? 'rotate(1deg)' : 'rotate(0deg)'
                  }}
                >
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl mx-auto mb-4 overflow-hidden bg-gray-900 shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      onError={e => { (e.target as HTMLImageElement).src = '/images/team/placeholder.jpg'; }}
                    />
                  </div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${deptColors[member.dept] || 'bg-gray-100 text-gray-600'} mb-3 inline-block`}>
                    {member.dept}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{member.role}</p>
                  <span className="text-purple-600 dark:text-purple-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    View Profile →
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center mt-12 sm:mt-16">
              <Link href="/team" className="bg-yellow-400 text-gray-900 px-8 sm:px-10 py-3 sm:py-4 rounded-full font-medium hover:bg-yellow-300 hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 group text-sm sm:text-base">
                VIEW FULL TEAM <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Testimonials Section ───────────────────────────────────────── */}
        <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-orange-100 via-purple-100 to-purple-200 dark:from-gray-800 dark:via-gray-900 dark:to-purple-900 relative overflow-hidden scroll-animate">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center mb-10 sm:mb-14">
              <span className="bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 px-4 py-2 rounded-full text-xs sm:text-sm font-medium inline-block mb-4">WHAT OUR TEAM SAYS</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Words From The Team</h2>
            </div>

            <div className="relative">
              <div className={`flex flex-col md:flex-row items-center gap-6 sm:gap-8 transition-all duration-300 ${testimonialTransition ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <img
                  src={testimonials[testimonialIndex].image}
                  alt={testimonials[testimonialIndex].name}
                  className="w-40 h-48 sm:w-48 sm:h-60 md:w-56 md:h-72 rounded-3xl object-cover shadow-2xl hover:scale-105 hover:rotate-3 transition-all duration-500"
                  loading="lazy"
                />
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 lg:p-10 flex-1 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full filter blur-3xl opacity-20"></div>
                  <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 leading-relaxed relative z-10">
                    "{testimonials[testimonialIndex].quote}"
                  </p>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-orange-400 to-pink-400 mb-3 rounded-full"></div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">{testimonials[testimonialIndex].name}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonials[testimonialIndex].role}</p>
                    </div>
                    <div className="text-6xl sm:text-7xl lg:text-8xl text-orange-400 font-serif opacity-20">"</div>
                  </div>
                </div>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => changeTestimonial(i)} className={`h-2 rounded-full transition-all duration-300 ${testimonialIndex === i ? 'bg-orange-500 w-8' : 'bg-gray-300 dark:bg-gray-600 w-2'}`} aria-label={`Testimonial ${i + 1}`} />
                ))}
              </div>

              <div className="flex justify-center gap-4 mt-4">
                <button onClick={prevTestimonial} className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-110 transition-all">
                  <ChevronLeft className="text-gray-700 dark:text-gray-300" />
                </button>
                <button onClick={nextTestimonial} className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-110 transition-all">
                  <ChevronRight className="text-gray-700 dark:text-gray-300" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA Section ────────────────────────────────────────────────── */}
        <section className="py-24 sm:py-32 lg:py-40 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 dark:from-purple-800 dark:via-purple-900 dark:to-gray-900 relative overflow-hidden scroll-animate">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <span className="bg-purple-500 dark:bg-purple-600 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-medium inline-block mb-6 sm:mb-8">WHAT'S YOUR PROBLEM?</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight">
              Let's Find The Solution<br />To Your Project
            </h2>
            <p className="text-purple-200 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
              Whether it's a web app, mobile app, data pipeline, or a rebrand — KamarTec delivers. Legally registered and ready to work.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="bg-yellow-400 text-gray-900 px-10 sm:px-12 py-4 sm:py-5 rounded-full font-bold hover:bg-yellow-300 hover:shadow-2xl hover:scale-110 transition-all duration-300 text-lg sm:text-xl">
                START NOW
              </Link>
              <Link href="/portfolio" className="border-2 border-white text-white px-10 sm:px-12 py-4 sm:py-5 rounded-full font-bold hover:bg-white hover:text-purple-700 transition-all duration-300 text-lg sm:text-xl">
                SEE OUR WORK
              </Link>
            </div>
          </div>
        </section>

        {/* ── Footer ─────────────────────────────────────────────────────── */}
        <footer id="contact" className="bg-gray-950 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
              <div>
                <div className="mb-6">
                  <img src="/images/logo/logo.png" alt="KamarTec Solutions" className="h-32 sm:h-36 w-auto" />
                </div>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  Ghana's premier tech agency — building world-class software, training the next generation, and making an impact on society.
                </p>
                <div className="flex items-center gap-2 text-green-400 text-xs mb-6">
                  <Shield size={14} />
                  <span>Legally Registered in Ghana</span>
                </div>
                <div className="flex gap-3">
                  {[
                    { icon: <Facebook size={18} />, href: 'https://facebook.com/kamartecsolutions' },
                    { icon: <Twitter size={18} />, href: 'https://twitter.com/kamartecsolutions' },
                    { icon: <Linkedin size={18} />, href: 'https://linkedin.com/company/kamartec' },
                    { icon: <Github size={18} />, href: 'https://github.com/kamartec' },
                    { icon: <Instagram size={18} />, href: 'https://instagram.com/kamartecsolutions' },
                  ].map((social, i) => (
                    <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2.5 rounded-full hover:bg-purple-600 hover:scale-110 transition-all text-gray-400 hover:text-white">
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-white mb-6 text-lg">Company</h3>
                <ul className="space-y-3 list-none">
                  {[['/', 'Home'], ['/about', 'About'], ['/services', 'Services'], ['/portfolio', 'Projects'], ['/blog', 'Blog'], ['/team', 'Team'], ['/contact', 'Contact']].map(([href, label]) => (
                    <li key={href}><Link href={href} className="text-gray-400 hover:text-purple-400 hover:translate-x-1 inline-block transition-all text-sm">{label}</Link></li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-white mb-6 text-lg">Contact Us</h3>
                <div className="space-y-4 text-sm text-gray-400">
                  <p className="leading-relaxed">P.O Box 123 Kwapro,<br />University of Cape Coast.</p>
                  <p className="leading-relaxed">
                    <a href="tel:+233592852555" className="hover:text-purple-400 transition-colors">+233 (0) 592 852 555</a><br />
                    <a href="tel:+233538118529" className="hover:text-purple-400 transition-colors">+233 (0) 538 118 529</a>
                  </p>
                  <a href="mailto:kamartecsolutions@gmail.com" className="hover:text-purple-400 transition-colors block">kamartecsolutions@gmail.com</a>
                  <a href="https://wa.me/233592852555" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors">
                    <MessageCircle size={16} /> Chat on WhatsApp
                  </a>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-white mb-6 text-lg">Newsletter</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  Stay up to date with our latest projects, tech tips, and company news:
                </p>
                <NewsletterForm />
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                © 2026 KamarTec Solutions. All rights reserved.
              </p>
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <Shield size={14} className="text-green-500" />
                <span>Legally Registered Business · Ghana</span>
              </div>
            </div>
          </div>
        </footer>

        {/* Back to Top */}
        {scrollY > 400 && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 right-6 z-50 bg-purple-600 text-white p-3 rounded-full shadow-2xl hover:bg-purple-700 hover:scale-110 transition-all duration-300"
            aria-label="Back to top"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </button>
        )}

        {/* WhatsApp floating button */}
        <a
          href="https://wa.me/233592852555?text=Hi%20KamarTec!%20I'd%20like%20to%20discuss%20a%20project."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 hover:scale-110 transition-all duration-300 animate-bounce-gentle"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={24} />
        </a>
      </div>
    </div>
  );
}
