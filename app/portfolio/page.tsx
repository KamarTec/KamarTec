"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Search, Facebook, Twitter, Linkedin, Github, Youtube,
  Menu, X, Moon, Sun, ExternalLink, Code, Filter, Shield, Zap, Star
} from 'lucide-react';

interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  color: string;
  featured?: boolean;
  year?: string;
  client?: string;
  website?: string;
}

export default function KamarTecProjectsPage() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState<Set<number>>(new Set());
  const [isMounted, setIsMounted] = useState(false);
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

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
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          const id = Number((e.target as HTMLDivElement).dataset.projectId);
          setVisibleProjects(prev => new Set([...prev, id]));
        }
      }),
      { threshold: 0.1 }
    );
    cardRefs.current.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [isMounted, selectedCategory]);

  const projects: Project[] = [
    {
      id: 1, slug: 'focuspal',
      title: 'FocusPal',
      description: 'A comprehensive student companion app designed to help students manage academic life, track assignments, stay focused on goals, and build productive habits.',
      category: 'Mobile App',
      tags: ['Flutter', 'Firebase', 'Education', 'Productivity'],
      image: '/images/portfolio/focuspal.png',
      color: 'from-purple-500 to-pink-500',
      featured: true, year: '2024', client: 'UCC Students'
    },
    {
      id: 2, slug: 'nova',
      title: 'NOVA — The African AI Assistant',
      description: 'NOVA is a multilingual, culturally-aware AI assistant built for Africa. It offers personalised assistance, local insights, and supports African languages to enhance everyday experience.',
      category: 'AI',
      tags: ['Python', 'Flutter', 'AI', 'NLP', 'Africa'],
      image: '/images/portfolio/nova.jpg',
      color: 'from-orange-500 to-red-600',
      featured: true, year: '2024'
    },
    {
      id: 3, slug: 'sellzan',
      title: 'SellZan',
      description: 'An innovative e-commerce platform connecting customers with local Ghanaian businesses, providing seamless shopping experience and comprehensive business management tools.',
      category: 'Mobile App',
      tags: ['React Native', 'Node.js', 'E-commerce', 'Ghana'],
      image: '/images/portfolio/sellzan.png',
      color: 'from-blue-500 to-cyan-500',
      year: '2023'
    },
    {
      id: 4, slug: 'swapmate',
      title: 'SwapMate',
      description: 'A user-friendly platform facilitating item swapping among users, promoting sustainability and community engagement through intuitive, easy-to-use features.',
      category: 'Web App',
      tags: ['React', 'Node.js', 'Sustainability', 'Community'],
      image: '/images/portfolio/unavailable.png',
      color: 'from-green-500 to-teal-500',
      year: '2023'
    },
    {
      id: 5, slug: 'earlaw-firm',
      title: 'EarlLaw Firm',
      description: 'Professional law firm website for a UK-based legal practice — clean, authoritative design with practice areas, attorney profiles, case inquiry system, and client portal.',
      category: 'Web App',
      tags: ['Next.js', 'Legal Tech', 'UK', 'CMS'],
      image: '/images/portfolio/unavailable.png',
      color: 'from-slate-600 to-gray-700',
      year: '2024', client: 'EarlLaw Firm', website: 'https://earllawfirm.co'
    },
    {
      id: 6, slug: 'horizon-path-travel',
      title: 'Horizon Path Travel',
      description: 'Full-featured travel agency website with destination showcases, real-time booking, itinerary planning, and curated travel package management.',
      category: 'Web App',
      tags: ['React', 'Travel', 'Booking', 'Tourism'],
      image: '/images/portfolio/unavailable.png',
      color: 'from-emerald-500 to-teal-600',
      year: '2024', client: 'Horizon Path Travels', website: 'https://horizonpathtravels.co'
    },
    {
      id: 7, slug: 'ucc-src-app',
      title: 'UCC SRC App',
      description: 'Official mobile application for the University of Cape Coast Student Representative Council — event management, news, voting system, and student services in one place.',
      category: 'Mobile App',
      tags: ['Flutter', 'Firebase', 'Education', 'UCC', 'Student Gov'],
      image: '/images/portfolio/focuspal.png',
      color: 'from-blue-600 to-indigo-600',
      year: '2024', client: 'UCC SRC'
    },
    {
      id: 8, slug: 'mahyp-app',
      title: 'MaHyp App',
      description: 'A hypertension management and monitoring app. Patients log blood pressure readings, track medication, receive lifestyle tips, and share health data securely with their doctors.',
      category: 'Mobile App',
      tags: ['React Native', 'Health', 'Firebase', 'Hypertension'],
      image: '/images/portfolio/unavailable.png',
      color: 'from-green-500 to-emerald-600',
      year: '2024', client: 'Healthcare'
    },
    {
      id: 9, slug: 'kamarpay',
      title: 'KamarPay',
      description: 'KamarTec\'s own payment infrastructure — a secure platform enabling seamless digital transactions, mobile money (MoMo) integration, and instant payment tracking for businesses.',
      category: 'Web App',
      tags: ['Node.js', 'FinTech', 'Payments', 'MoMo', 'Ghana'],
      image: '/images/portfolio/unavailable.png',
      color: 'from-yellow-500 to-orange-500',
      year: '2025', client: 'KamarTec'
    },
    {
      id: 10, slug: 'securevault',
      title: 'SecureVault Docs',
      description: 'Enterprise document management and e-vault system with end-to-end encryption, role-based access, digital signatures, and compliance-ready audit trails.',
      category: 'Web App',
      tags: ['React', 'Security', 'Cloud', 'Encryption', 'Enterprise'],
      image: '/images/portfolio/unavailable.png',
      color: 'from-purple-600 to-violet-700',
      year: '2025', client: 'Enterprise'
    },
    {
      id: 11, slug: 'databundles',
      title: 'DataConnect',
      description: 'Instant data bundle and airtime top-up platform for all major Ghanaian networks — MTN, Vodafone, AirtelTigo. Fast checkout, auto-delivery, and reseller dashboard.',
      category: 'Web App',
      tags: ['React', 'Telecom', 'E-commerce', 'Ghana', 'Bundles'],
      image: '/images/portfolio/unavailable.png',
      color: 'from-cyan-500 to-blue-600',
      year: '2025', client: 'Telecom'
    }
  ];

  const categories = ['all', 'Web App', 'Mobile App', 'AI', 'Graphic Design'];

  const filteredProjects = projects.filter(p => {
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchSearch = !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

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
                  <input type="text" placeholder="Search projects…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
                </div>
              </div>

              <nav className="hidden md:flex items-center gap-4 lg:gap-6">
                {[['/', 'Home'], ['/about', 'About'], ['/services', 'Services'], ['/team', 'Team'], ['/blog', 'Blog'], ['/contact', 'Contact']].map(([href, label]) => (
                  <Link key={href} href={href} className="text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all">{label}</Link>
                ))}
                <Link href="/portfolio" className="text-sm text-purple-600 font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-purple-600">Projects</Link>
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

        {/* ── Hero ────────────────────────────────────────────── */}
        <section className="relative min-h-[65vh] flex items-center pt-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-purple-700 to-pink-700 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
            <div className="absolute top-40 left-20 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000" />
            <div className="absolute bottom-20 right-40 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-4000" />
            <div className="absolute top-1/3 right-1/3 w-32 h-32 border border-white/15 rounded-full animate-rotate-slow" />
            <div className="absolute bottom-1/4 left-1/4 w-20 h-20 border border-pink-300/20 rounded-full animate-float animation-delay-1000" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 w-full text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <Zap size={16} /> {projects.length} COMPLETED PROJECTS
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight animate-slide-up">
              Our Work Speaks{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">For Itself</span>
            </h1>
            <p className="text-white/90 text-lg sm:text-xl max-w-3xl mx-auto animate-slide-up animation-delay-200">
              From AI assistants to law firm sites, travel platforms to health apps — we build digital products that make a real difference.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap justify-center gap-8 mt-12 animate-fade-in animation-delay-400">
              {[['10+', 'Projects'], ['5+', 'Industries'], ['3+', 'Years'], ['100%', 'Satisfaction']].map(([val, label]) => (
                <div key={label} className="text-center">
                  <div className="text-3xl font-black text-white">{val}</div>
                  <div className="text-white/70 text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Filter ──────────────────────────────────────────── */}
        <section className="py-6 bg-white dark:bg-gray-900 sticky top-[72px] z-40 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">Filter:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button key={cat} onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-1.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                      selectedCategory === cat
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}>
                    {cat === 'all' ? 'All Projects' : cat}
                    {cat === 'all' && <span className="ml-1.5 bg-white/30 text-xs px-1.5 py-0.5 rounded-full">{projects.length}</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Projects Grid ───────────────────────────────────── */}
        <section className="py-20 sm:py-28 bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-24">
                <Code size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No projects found</h3>
                <p className="text-gray-500">Try a different category or search term</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    ref={el => { if (el) cardRefs.current.set(project.id, el); }}
                    data-project-id={project.id}
                    style={{ transitionDelay: `${(index % 6) * 70}ms` }}
                    className={`transition-all duration-700 ${visibleProjects.has(project.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  >
                    <Link href={`/portfolio/${project.slug}`}
                      className="group block bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-400 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">

                      {/* Image */}
                      <div className="relative h-52 overflow-hidden">
                        <img src={project.image} alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600"
                          onError={e => {
                            const el = e.target as HTMLImageElement;
                            el.style.display = 'none';
                            el.parentElement!.style.background = `linear-gradient(135deg, var(--tw-gradient-stops))`;
                          }} />
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-60 group-hover:opacity-40 transition-opacity duration-300`} />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex gap-2">
                          {project.featured && (
                            <div className="flex items-center gap-1 bg-yellow-400 text-yellow-900 px-2.5 py-1 rounded-full text-xs font-bold shadow-lg">
                              <Star size={10} fill="currentColor" /> Featured
                            </div>
                          )}
                          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-gray-700 dark:text-gray-300">
                            {project.category}
                          </div>
                        </div>
                        {project.year && (
                          <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-medium">
                            {project.year}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {project.tags.slice(0, 3).map((tag, idx) => (
                            <span key={idx} className="bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2.5 py-0.5 rounded-full text-xs font-medium">{tag}</span>
                          ))}
                          {project.tags.length > 3 && (
                            <span className="bg-gray-100 dark:bg-gray-700 text-gray-500 px-2.5 py-0.5 rounded-full text-xs">+{project.tags.length - 3}</span>
                          )}
                        </div>

                        {/* CTA row */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                          <span className="inline-flex items-center gap-1.5 text-purple-600 dark:text-purple-400 text-sm font-semibold group-hover:gap-2.5 transition-all">
                            View Details <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                          </span>
                          {project.website ? (
                            <a href={project.website} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                              className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
                              <ExternalLink size={13} /> Live Site
                            </a>
                          ) : (
                            <ExternalLink size={16} className="text-gray-400 group-hover:text-purple-500 transition-colors" />
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Industries we've served ─────────────────────────── */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-4">Industries We've Served</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">KamarTec delivers digital solutions across diverse sectors — all with the same standard of excellence.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { icon: '⚖️', label: 'Legal' },
                { icon: '✈️', label: 'Travel' },
                { icon: '🎓', label: 'Education' },
                { icon: '🏥', label: 'Health' },
                { icon: '💳', label: 'FinTech' },
                { icon: '🛡️', label: 'Security' },
                { icon: '📡', label: 'Telecom' },
              ].map(({ icon, label }) => (
                <div key={label} className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="text-4xl mb-3">{icon}</div>
                  <div className="text-sm font-bold text-gray-700 dark:text-gray-300">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="py-28 sm:py-36 bg-gradient-to-br from-purple-700 via-blue-700 to-indigo-700 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-20 animate-blob" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000" />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield size={16} /> Legally Registered Business
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">Ready to Start Your Project?</h2>
            <p className="text-white/90 text-lg sm:text-xl mb-10">
              Let's bring your idea to life. Join the growing family of KamarTec clients who've transformed their digital presence.
            </p>
            <Link href="/contact"
              className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-10 py-4 rounded-full font-black hover:bg-yellow-300 hover:shadow-2xl hover:scale-110 transition-all duration-300 text-lg">
              Start Your Project <ArrowRight size={22} />
            </Link>
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
                <h3 className="font-bold text-white mb-5">Company</h3>
                <ul className="space-y-3">
                  {[['/', 'Home'], ['/about', 'About'], ['/services', 'Services'], ['/portfolio', 'Projects'], ['/blog', 'Blog']].map(([href, label]) => (
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
                <p className="text-gray-400 text-sm mb-4">Stay up to date with our latest projects and news.</p>
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
