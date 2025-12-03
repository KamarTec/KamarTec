"use client";
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { ArrowRight, Search, Facebook, Twitter, Linkedin, Github, Youtube, ChevronLeft, ChevronRight, Menu, X, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function KamarTecHomePage() {
  const [heroSlide, setHeroSlide] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Check system preference and localStorage for dark mode
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(savedMode === 'true');
    } else {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(systemPrefersDark);
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
    // Add intersection observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-animate').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

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
      role: "Developer",
      quote: "Whenever you feel stuck, push past your limits, and you’ll overcome any challenge.",
      image: "/images/team/Elvis.jpg"
    },
    {
      name: "Gerald Boakye",
      role: "Front-end Developer",
      quote: "There is no advice better than take this money. If you can't propose yourself to ladies, just get money and it will do the talking for you.",
      image: "/images/team/Gerald.jpg"
    }
  ];

  const teamMembers = [
    { id: "clement-obeng", name: "Clement Obeng", role: "Lead Developer", image: "/images/team/Clement.jpg" },
    { id: "emmanuel-frimpong", name: "Emmanuel Kofi Frimpong", role: "Lead Designer", image: "/images/team/Emmanuel.jpg" },
    { id: "gerald-boakye", name: "Gerald Boakye", role: "Front-end Developer", image: "/images/team/Gerald.jpg" },
    { id: "elvis-bonsu", name: "Elvis Osei Bonsu", role: "Developer", image: "/images/team/Elvis.jpg" },
    { id: "francis-mensah", name: "Francis Agyei Mensah", role: "Data Analyst", image: "/images/team/Francis.jpg" },
    { id: "albert-segu", name: "Albert Segu", role: "Data Analyst", image: "/images/team/Albert.jpg" }
  ];

  const services = [
    { id: "software-development", title: "Software Dev't", color: "from-purple-600 to-orange-400", image: "/images/services/software_dev.jpg" },
    { id: "mobile-apps", title: "Mobile Apps", color: "from-pink-500 to-orange-400", image: "/images/services/mobile_apps.jpg" },
    { id: "graphic-design", title: "Graphic Design", color: "from-pink-600 to-purple-600", image: "/images/services/graphic_design.jpg" },
    { id: "web-design", title: "Web Design", color: "from-orange-500 to-red-500", image: "/images/services/web_design.jpg" }
  ];

  const portfolioItems = [
    { id: "focuspal", title: "FocusPal", description: "Students Partner", image: "/images/portfolio/focuspal.png" },
    { id: "sellzan", title: "Sellzan", description: "Customers Aid", image: "/images/portfolio/sellzan.png" }
  ];

  const searchableItems = [
    ...services.map(service => ({ type: 'service', id: service.id, title: service.title, section: 'services' })),
    ...teamMembers.map(member => ({ type: 'team', id: member.id, title: member.name, section: 'team' })),
    ...portfolioItems.map(item => ({ type: 'portfolio', id: item.id, title: item.title, section: 'projects' })),
    { type: 'page', id: 'about', title: 'About Us', section: 'about' },
    { type: 'page', id: 'blog', title: 'Blog', section: 'blog' },
    { type: 'page', id: 'contact', title: 'Contact', section: 'contact' },
    { type: 'page', id: 'home', title: 'Home', section: 'home' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    
    // Safe search with proper error handling
    const results = searchableItems.filter(item => {
      try {
        const itemTitle = item.title || '';
        const query = searchQuery.toLowerCase();
        return itemTitle.toLowerCase().includes(query);
      } catch (error) {
        console.error('Search error:', error);
        return false;
      }
    });

    if (results.length > 0) {
      const firstResult = results[0];
      const element = document.getElementById(firstResult.section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If no results, show a subtle notification (you can enhance this)
      console.log('No results found for:', searchQuery);
    }
    
    setTimeout(() => setIsSearching(false), 1000);
  };

  const handlePortfolioClick = (id: string) => {
    router.push(`/portfolio/${id}`);
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTeamMemberClick = (id: string) => {
    router.push(`/team/${id}`);
    document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' });
  };

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-900 dark:text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden transition-colors duration-300">
        {/* Header */}
        <header 
          className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm z-50 transition-all duration-300" 
          style={{ 
            transform: scrollY > 50 ? 'translateY(0)' : 'translateY(0)', 
            boxShadow: scrollY > 50 ? '0 4px 20px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.05)',
            borderRadius: scrollY > 50 ? '0 0 24px 24px' : '0'
          }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 cursor-pointer transform hover:scale-105 transition-transform duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src="/images/logo/favicon.png" 
                    alt="KamarTec Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>                
                <div className="hidden sm:block">
                  <div className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">KamarTec</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 tracking-wider">SOLUTIONS</div>
                </div>
              </Link>

              {/* Desktop Search */}
              <div className="hidden lg:flex items-center gap-2 flex-1 max-w-md mx-8">
                <form onSubmit={handleSearch} className="relative flex-1 group">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors duration-300" size={18} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Looking for something?"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                  <button 
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors"
                  >
                    <ArrowRight size={18} />
                  </button>
                </form>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-4 lg:gap-6">
                <button onClick={() => scrollToSection('home')} className="text-sm lg:text-base text-red-500 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500">Home</button>
                <Link href="/about" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all">About</Link>
                <Link href="/services" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all">Services</Link>
                <Link href="/team" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all">Team</Link>
                <Link href="/portfolio" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all">Projects</Link>
                <Link href="/blog" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all">Blog</Link>
                <Link href="/contact" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all">Contact</Link>
              </nav>
              
              {/* Dark Mode Toggle & Mobile Menu */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-gray-700" />}
                </button>
                
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X size={24} className="text-gray-700 dark:text-gray-300" /> : <Menu size={24} className="text-gray-700 dark:text-gray-300" />}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <div className="py-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
                <form onSubmit={handleSearch} className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </form>
                <button onClick={() => scrollToSection('home')} className="block py-2 text-red-500 font-medium w-full text-left">Home</button>
                <Link href="/about" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 w-full text-left">About</Link>
                <Link href="/services" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 w-full text-left">Services</Link>
                <Link href="/portfolio" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 w-full text-left">Projects</Link>
                <Link href="/team" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 w-full text-left">Team</Link>
                <Link href="/blog" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 w-full text-left">Blog</Link>
                <Link href="/contact" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Contact</Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-purple-700 to-blue-700 dark:from-red-800 dark:via-purple-900 dark:to-blue-900"></div>
          
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-40 left-20 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 left-40 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>

          {/* Bottom Corner Decorations */}
          <div className={`absolute w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gradient-to-br from-orange-400 to-yellow-300 rounded-tl-full blur-2xl transition-all duration-1000 ease-in-out ${heroSlide === 0 ? 'bottom-0 left-0 opacity-40' : 'bottom-0 right-0 opacity-40'}`}></div>

          {/* Hero Image Frame */}
          <div className={`absolute top-20 right-0 w-1/2 h-2/3 hidden lg:block transition-all duration-700 ${heroSlide === 0 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 rounded-bl-full opacity-80"></div>
              <img 
                src="/images/hero/Hero_small.jpg" 
                alt="Team collaboration" 
                className="absolute top-10 right-10 w-4/5 h-4/5 object-cover rounded-3xl shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 w-full">
            {/* Slide 1 */}
            <div className={`transition-all duration-700 transform ${heroSlide === 0 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full absolute'}`}>
              <div className="max-w-2xl scroll-animate">
                <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-6 animate-fade-in">
                  <span className="bg-red-500 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium shadow-lg">KAMARTEC</span>
                  <span className="text-white font-medium text-xs sm:text-base">SOLUTIONS</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight animate-slide-up">
                  We Are KamarTec, Your Best Solution To All Your Tech Needs
                </h1>
                
                <p className="text-white text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed animate-slide-up animation-delay-200">
                  Our mission is provide the best and quality service to clients to meet their needs. 
                  From developing mobile apps to creating and hosting responsive websites for all your business. 
                  Advertising your products and services through catchy designs by our graphic designers to 
                  repairing any faulty computer device.
                </p>
                
                <button 
                  onClick={() => setHeroSlide(1)}
                  className="bg-yellow-400 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:bg-yellow-300 hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 group animate-slide-up animation-delay-400 text-sm sm:text-base">
                  LEARN MORE
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Slide 2 */}
            <div className={`transition-all duration-700 transform ${heroSlide === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute'}`}>
              <div className="max-w-2xl scroll-animate">
                <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-6">
                  <span className="bg-red-500 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium shadow-lg">KAMARTEC</span>
                  <span className="text-white font-medium text-xs sm:text-base">SOLUTIONS</span>
                </div>

                <p className="text-white text-base sm:text-lg lg:text-xl mb-4 sm:mb-6 animate-fade-in leading-relaxed">
                  What software application do you wish to have on your computer and mobile device? Kamartec have it all.
                </p>
                
                <p className="text-white text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 animate-fade-in animation-delay-200 leading-relaxed">
                  We also teach people with passion to learn anything in Tech. Graphic design, Mobile and web app development.
                </p>
                
                <p className="text-yellow-300 text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 animate-pulse">
                  Name your problem and the solution is already there.
                </p>
                
                <button 
                  onClick={() => setHeroSlide(0)}
                  className="bg-yellow-400 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:bg-yellow-300 hover:shadow-2xl hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                  HOME
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden scroll-animate">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-700 dark:from-blue-900 to-transparent opacity-20"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              {/* Image with decorative shapes */}
              <div className="relative order-2 lg:order-1">
                {/* Background decorative shapes */}
                <div className="absolute -inset-4 sm:-inset-6">
                  <div className="absolute top-0 left-0 w-32 sm:w-48 h-32 sm:h-48 bg-blue-500 rounded-tr-full opacity-20"></div>
                  <div className="absolute bottom-0 right-0 w-40 sm:w-56 h-40 sm:h-56 bg-yellow-400 rounded-tl-full opacity-20"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-purple-600 rounded-full opacity-10 rotate-45"></div>
                </div>
                
                <div className="relative rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500 overflow-hidden">
                  <img 
                    src="/images/about/about.jpg" 
                    alt="Team working" 
                    className="w-full rounded-3xl"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="order-1 lg:order-2">
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 px-4 py-2 rounded-full text-xs sm:text-sm font-medium inline-block mb-4">ABOUT US</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
                  Creative Design & Development
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                  From mobile app to web and graphic design. Our mission is provide the best and quality service to clients to meet their needs. From developing mobile apps to creating and hosting responsive websites for all your business.
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                  Advertising your products and services through catchy designs by our graphic designers to repairing any faulty computer device. We equip individuals with the skills in tech to make an impact in society.
                </p>
                <Link href="/about" className="bg-purple-600 text-white px-6 sm:px-4 py-3 sm:py-4 rounded-full font-medium hover:bg-purple-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 group text-sm sm:text-base">
  MORE ABOUT US
  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 sm:py-24 lg:py-32 bg-white dark:bg-gray-900 relative overflow-hidden scroll-animate">
          <div className="absolute top-20 right-0 w-96 h-96 bg-purple-100 dark:bg-purple-900 rounded-full filter blur-3xl opacity-30"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="mb-12 sm:mb-16 text-center">
              <span className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 px-4 py-2 rounded-full text-xs sm:text-sm font-medium inline-block mb-4">OUR SERVICES</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                Smart, Creative, And Reliable Tech Solutions
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
                Turning your ideas into powerful digital solutions
              </p>
            </div>

            {/* Services Grid - Matches wireframe layout */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {services.map((service, index) => (
                <div 
                  key={service.id}
                  className="group relative overflow-hidden rounded-3xl h-64 sm:h-80 lg:h-96 cursor-pointer transform hover:scale-105 transition-all duration-500"
                  style={{ 
                    transform: index % 2 === 0 ? 'rotate(-1deg)' : 'rotate(1deg)' 
                  }}
                >
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-80 group-hover:opacity-90 transition-opacity`}></div>
                  <div className="absolute inset-0 flex items-end p-4 sm:p-6">
                    <button className="bg-white text-gray-900 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium flex items-center gap-2 hover:shadow-xl transition-all group-hover:scale-110 text-sm sm:text-base">
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

        {/* Portfolio Section */}
        <section id="projects" className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-blue-700 via-blue-600 to-purple-700 dark:from-blue-900 dark:via-blue-800 dark:to-purple-900 relative overflow-hidden scroll-animate">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 sm:mb-16">
              <div>
                <span className="bg-blue-600 dark:bg-blue-800 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-medium inline-block mb-4">PORTFOLIO</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4">
                  Experienced in Software Development
                </h2>
                <p className="text-blue-200 text-base sm:text-lg">
                  Numerous accolades attached to our name for efficient dedication in meeting our customers' expectations
                </p>
              </div>
              <div className="flex gap-3">
                <button className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-full hover:bg-blue-50 dark:hover:bg-gray-700 hover:scale-110 transition-all duration-300 shadow-lg">
                  <ChevronLeft className="text-blue-700 dark:text-blue-400" />
                </button>
                <button className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-full hover:bg-blue-50 dark:hover:bg-gray-700 hover:scale-110 transition-all duration-300 shadow-lg">
                  <ChevronRight className="text-blue-700 dark:text-blue-400" />
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Portfolio Cards */}
              {portfolioItems.map((item, index) => (
                <div 
                  key={item.id}
                  onClick={() => handlePortfolioClick(item.id)}
                  className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 group cursor-pointer"
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="p-6 sm:p-8">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12 sm:mt-16">
              <Link href="/portfolio" className="border-2 border-white text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-medium hover:bg-white hover:text-blue-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto group text-sm sm:text-base">
                VIEW ALL PORTFOLIO <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-purple-700 via-purple-600 to-blue-600 dark:from-purple-900 dark:via-purple-800 dark:to-blue-800 relative overflow-hidden scroll-animate">
          {/* Background with lines image */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)',
            }}></div>
          </div>
          
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center mb-12 sm:mb-16">
              <span className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-xs sm:text-sm font-medium inline-block mb-6">MEET OUR TEAM MEMBERS</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                Committed To Team Excellence
              </h2>
              <p className="text-purple-200 text-base sm:text-lg max-w-2xl mx-auto">
                Meet the brave and hardworking people working tirelessly to meet the needs of people
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {teamMembers.map((member, index) => (
                <div 
                  key={member.id}
                  onClick={() => handleTeamMemberClick(member.id)}
                  className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 text-center hover:transform hover:scale-105 transition-all duration-500 shadow-2xl cursor-pointer"
                  style={{
                    transform: index % 3 === 0 ? 'rotate(-2deg)' : index % 3 === 1 ? 'rotate(0deg)' : 'rotate(2deg)'
                  }}
                >
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl mx-auto mb-6 object-cover shadow-lg" 
                    loading="lazy"
                  />
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-base sm:text-lg">{member.role}</p>
                  <div className="flex justify-center gap-4">
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:scale-125 transition-all">
                      <Facebook size={20} />
                    </a>
                    <a href="#" className="text-blue-400 dark:text-blue-300 hover:text-blue-500 dark:hover:text-blue-200 hover:scale-125 transition-all">
                      <Twitter size={20} />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12 sm:mt-16">
              <Link href="/team" className="bg-yellow-400 text-gray-900 px-8 sm:px-10 py-3 sm:py-4 rounded-full font-medium hover:bg-yellow-300 hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto group text-sm sm:text-base">
                VIEW ALL MEMBERS <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-orange-100 via-purple-100 to-purple-200 dark:from-gray-800 dark:via-gray-900 dark:to-purple-900 relative overflow-hidden scroll-animate">
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-purple-600 dark:from-purple-800 to-transparent opacity-10"></div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="relative">
              <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
                <img 
                  src={testimonials[testimonialIndex].image} 
                  alt={testimonials[testimonialIndex].name}
                  className="w-40 h-48 sm:w-48 sm:h-60 md:w-56 md:h-72 rounded-3xl object-cover shadow-2xl transform hover:scale-105 hover:rotate-3 transition-all duration-500"
                  loading="lazy"
                />
                
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 lg:p-10 flex-1 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full filter blur-3xl opacity-20"></div>
                  <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 leading-relaxed relative z-10">
                    {testimonials[testimonialIndex].quote}
                  </p>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-orange-400 to-pink-400 mb-3"></div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">{testimonials[testimonialIndex].name}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">{testimonials[testimonialIndex].role}</p>
                    </div>
                    <div className="text-6xl sm:text-7xl lg:text-8xl text-orange-400 font-serif opacity-30">"</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-8 sm:mt-12">
                <button 
                  onClick={prevTestimonial}
                  className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-110 hover:shadow-2xl transition-all duration-300">
                  <ChevronLeft className="text-gray-700 dark:text-gray-300" />
                </button>
                <button 
                  onClick={nextTestimonial}
                  className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-110 hover:shadow-2xl transition-all duration-300">
                  <ChevronRight className="text-gray-700 dark:text-gray-300" />
                </button>
              </div>
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section className="py-24 sm:py-32 lg:py-40 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 dark:from-purple-800 dark:via-purple-900 dark:to-gray-900 relative overflow-hidden scroll-animate">
          {/* CTA Bubbles Background Image */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(251, 191, 36, 0.3) 0%, transparent 50%)',
            }}></div>
          </div>
          
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <span className="bg-purple-500 dark:bg-purple-600 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-medium inline-block mb-6 sm:mb-8">WHAT'S YOUR PROBLEM?</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 sm:mb-10 leading-tight">
              Let's Find The Solution<br />To Your Project
            </h2>
            <Link href="/contact" className="bg-yellow-400 text-gray-900 px-10 sm:px-12 py-4 sm:py-5 rounded-full font-bold hover:bg-yellow-300 hover:shadow-2xl hover:scale-110 transition-all duration-300 text-lg sm:text-xl inline-block">
              START NOW
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="bg-white dark:bg-gray-900 py-16 sm:py-20 scroll-animate">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
              {/* Company Info */}
              <div>
                <div className="mb-6">
                    <img 
                      src="/images/logo/logo.png" 
                      alt="KamarTec Solutions" 
                      className="h-40 sm:h-40 md:h-40 lg:h-40 w-auto"
                    />
                  </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                  Making the world a better place through constructing elegant hierarchies. Not just about providing serve to humanity 
                  but also making impact on the soceity at large.
                </p>
                <div className="flex gap-3">
                  <a href="#" className="bg-pink-100 dark:bg-pink-900 p-3 rounded-full hover:bg-pink-200 dark:hover:bg-pink-800 hover:scale-110 transition-all">
                    <Facebook size={18} className="text-pink-600 dark:text-pink-400" />
                  </a>
                  <a href="#" className="bg-pink-100 dark:bg-pink-900 p-3 rounded-full hover:bg-pink-200 dark:hover:bg-pink-800 hover:scale-110 transition-all">
                    <Twitter size={18} className="text-pink-600 dark:text-pink-400" />
                  </a>
                  <a href="#" className="bg-pink-100 dark:bg-pink-900 p-3 rounded-full hover:bg-pink-200 dark:hover:bg-pink-800 hover:scale-110 transition-all">
                    <Linkedin size={18} className="text-pink-600 dark:text-pink-400" />
                  </a>
                  <a href="#" className="bg-pink-100 dark:bg-pink-900 p-3 rounded-full hover:bg-pink-200 dark:hover:bg-pink-800 hover:scale-110 transition-all">
                    <Github size={18} className="text-pink-600 dark:text-pink-400" />
                  </a>
                  <a href="#" className="bg-pink-100 dark:bg-pink-900 p-3 rounded-full hover:bg-pink-200 dark:hover:bg-pink-800 hover:scale-110 transition-all">
                    <Youtube size={18} className="text-pink-600 dark:text-pink-400" />
                  </a>
                </div>
              </div>

              {/* Company Links */}
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-6 text-lg">Company</h3>
                <ul className="space-y-4">
                  <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:translate-x-1 inline-block transition-all text-left">Home</Link>
                  <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:translate-x-1 inline-block transition-all text-left">About</Link>
                  <Link href="/services" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:translate-x-1 inline-block transition-all text-left">Services</Link>
                  <Link href="/portfolio" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:translate-x-1 inline-block transition-all text-left">Projects</Link>
                  <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:translate-x-1 inline-block transition-all text-left">Blogs</Link>
                </ul>
              </div>

              {/* Contact Us */}
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-6 text-lg">Contact Us</h3>
                <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                  <p className="leading-relaxed">Address: P.O Box 123 Kwapro,<br />University of Cape Coast.</p>
                  <p className="leading-relaxed">Phone: +233 (0) 592852555<br />+233 (0) 538118529</p>
                  <p>Email: kamartecsolutions@gmail.com</p>
                </div>
              </div>

              {/* Newsletter */}
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-6 text-lg">Newsletter</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                  Subscribe to our MailChimp newsletter and stay up to date with all events coming straight in your mailbox:
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email here"
                    className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  />
                  <button className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 hover:scale-110 transition-all shadow-lg">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
              <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
                © 2025 KamarTec Solutions. All rights reserved.
              </p>
            </div>
          </div>
        </footer>

        <style jsx>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fade-in 0.6s ease-out;
          }
          @keyframes slide-up {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slide-up {
            animation: slide-up 0.6s ease-out;
          }
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out;
          }
          .animation-delay-200 {
            animation-delay: 0.2s;
            animation-fill-mode: backwards;
          }
          .animation-delay-400 {
            animation-delay: 0.4s;
            animation-fill-mode: backwards;
          }
        `}</style>
      </div>
    </div>
  );
}