"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, Facebook, Twitter, Linkedin, Github, Youtube, Menu, X, Moon, Sun, Target, Users, Award, TrendingUp, Lightbulb, Heart, Zap, Shield } from 'lucide-react';

export default function KamarTecAboutPage() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMounted, setIsMounted] = useState(false);

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
    
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(savedMode === 'true');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const values = [
    {
      icon: <Lightbulb size={32} />,
      title: "Innovation",
      description: "We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Heart size={32} />,
      title: "Customer Focus",
      description: "Your success is our success. We prioritize understanding and exceeding client expectations.",
      color: "from-pink-500 to-red-500"
    },
    {
      icon: <Users size={32} />,
      title: "Collaboration",
      description: "We believe in the power of teamwork, both within our team and with our clients.",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: <Shield size={32} />,
      title: "Quality",
      description: "We never compromise on quality, ensuring every project meets the highest standards.",
      color: "from-green-500 to-teal-500"
    }
  ];

  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "30+", label: "Happy Clients" },
    { number: "6", label: "Team Members" },
    { number: "3+", label: "Years Experience" }
  ];

  const milestones = [
    {
      year: "2022",
      title: "The Beginning",
      description: "KamarTec Solutions was founded with a vision to revolutionize tech solutions in Ghana."
    },
    {
      year: "2023",
      title: "Growth & Expansion",
      description: "Expanded our team and services, launching our mobile app development division."
    },
    {
      year: "2024",
      title: "Recognition",
      description: "Recognized as one of the leading tech companies, serving 30+ clients across various industries."
    },
    {
      year: "2025",
      title: "Innovation Hub",
      description: "Launched our tech training programs, empowering the next generation of tech professionals."
    }
  ];

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
                <div className="relative flex-1 group">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors duration-300" size={18} />
                  <input
                    type="text"
                    placeholder="Looking for something?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-4 lg:gap-6">
                <Link href="/" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all">Home</Link>
                <Link href="/about" className="text-sm lg:text-base text-red-500 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500">About</Link>
                <Link href="/#services" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all">Services</Link>
                <Link href="/#projects" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all">Projects</Link>
                <Link href="/#blog" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all">Blog</Link>
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
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <Link href="/" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Home</Link>
                <Link href="/about" className="block py-2 text-red-500 font-medium">About</Link>
                <Link href="/#services" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Services</Link>
                <Link href="/#projects" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Projects</Link>
                <Link href="/#blog" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Blog</Link>
                <Link href="/contact" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Contact</Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center pt-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-700 to-pink-600 dark:from-blue-800 dark:via-purple-900 dark:to-pink-800"></div>
          
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-40 left-20 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 w-full text-center">
            <span className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-medium inline-block mb-6 animate-fade-in">ABOUT US</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-slide-up">
              Transforming Ideas Into<br />Digital Reality
            </h1>
            <p className="text-white text-lg sm:text-xl max-w-3xl mx-auto animate-slide-up animation-delay-200 leading-relaxed">
              We're a passionate team of tech innovators dedicated to creating solutions that make a difference. Learn more about our journey, values, and what drives us forward.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="relative order-2 lg:order-1">
                <div className="absolute -inset-4">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
                </div>
                <div className="relative rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500 overflow-hidden">
                  <img 
                    src="/images/about/about.jpg" 
                    alt="Our team at work" 
                    className="w-full rounded-3xl"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="order-1 lg:order-2">
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium inline-block mb-4">OUR STORY</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  Building The Future, One Solution At A Time
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-4 leading-relaxed">
                  Founded with a vision to bridge the gap between technology and business needs, KamarTec Solutions has grown from a small startup to a trusted partner for businesses across Ghana and beyond.
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
                  Our journey began with a simple belief: that technology should empower, not complicate. Today, we continue to uphold this principle in every project we undertake, delivering solutions that are not only innovative but also practical and user-friendly.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                    <Zap size={24} />
                    <span className="font-medium">Fast Delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <Shield size={24} />
                    <span className="font-medium">Quality Assured</span>
                  </div>
                  <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400">
                    <Heart size={24} />
                    <span className="font-medium">Client Focused</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 dark:from-purple-800 dark:via-blue-800 dark:to-purple-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center transform hover:scale-110 transition-transform duration-300">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-purple-200 text-sm sm:text-base lg:text-lg font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 sm:py-24 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium inline-block mb-4">WHAT DRIVES US</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Our Mission & Vision
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Mission */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 sm:p-12 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="text-white" size={32} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  To provide the best and quality tech services to clients, meeting their needs through innovative solutions. We're committed to developing mobile apps, creating responsive websites, designing captivating graphics, and empowering individuals with tech skills to make a lasting impact in society.
                </p>
              </div>

              {/* Vision */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 sm:p-12 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="text-white" size={32} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  To become the leading tech solutions provider in Ghana and beyond, recognized for excellence, innovation, and our commitment to client success. We envision a future where technology is accessible to all, empowering businesses and individuals to reach their full potential.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <span className="bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 px-4 py-2 rounded-full text-sm font-medium inline-block mb-4">CORE VALUES</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                What We Stand For
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                Our values guide everything we do, from how we work with clients to how we build our team.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-t-4 border-gradient"
                  style={{ 
                    borderImage: `linear-gradient(to right, ${value.color.includes('from-yellow-500') ? '#eab308, #f97316' : 
                              value.color.includes('from-pink-500') ? '#ec4899, #ef4444' : 
                              value.color.includes('from-blue-500') ? '#3b82f6, #8b5cf6' : 
                              '#22c55e, #14b8a6'}) 1` 
                  }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-6 text-white`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey/Timeline */}
        <section className="py-16 sm:py-24 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium inline-block mb-4">OUR JOURNEY</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Milestones That Define Us
              </h2>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-pink-500 hidden sm:block"></div>

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative pl-0 sm:pl-20">
                    {/* Timeline dot */}
                    <div className="absolute left-6 top-2 w-5 h-5 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full border-4 border-white dark:border-gray-900 hidden sm:block"></div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-shadow">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                          {milestone.year}
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-purple-200 to-blue-200 dark:from-purple-800 dark:to-blue-800"></div>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <span className="bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 px-4 py-2 rounded-full text-sm font-medium inline-block mb-4">WHY CHOOSE US</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  Your Success Is Our Priority
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
                  When you work with KamarTec, you're not just getting a service provider – you're gaining a partner invested in your success. Here's what sets us apart:
                </p>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Award className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Proven Expertise</h3>
                      <p className="text-gray-600 dark:text-gray-300">Years of experience delivering successful projects across various industries.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Users className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Dedicated Team</h3>
                      <p className="text-gray-600 dark:text-gray-300">A passionate team of professionals committed to your project's success.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Innovative Solutions</h3>
                      <p className="text-gray-600 dark:text-gray-300">We stay ahead of tech trends to deliver cutting-edge solutions.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative">
                <div className="absolute -inset-4">
                  <div className="absolute top-0 left-0 w-48 h-48 bg-pink-500 rounded-full opacity-20 blur-3xl"></div>
                  <div className="absolute bottom-0 right-0 w-56 h-56 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
                </div>
                <div className="relative rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500 overflow-hidden">
                  <img 
                    src="/images/hero/Hero_small.jpg" 
                    alt="Team collaboration" 
                    className="w-full rounded-3xl"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 bg-gradient-to-br from-purple-600 to-blue-600 dark:from-purple-800 dark:to-blue-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready To Transform Your Ideas?
            </h2>
            <p className="text-white text-lg sm:text-xl mb-8">
              Let's work together to create something amazing. Contact us today to discuss your project!
            </p>
            <Link href="/contact" className="inline-block bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-300 px-6 py-3 rounded-full text-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              Get In Touch
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-100 dark:bg-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="text-gray-600 dark:text-gray-300 text-sm mb-4 sm:mb-0">
                &copy; {new Date().getFullYear()} KamarTec Solutions. All rights reserved.
              </div>
              <div className="flex items-center gap-4">
                <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  <Facebook size={20} />
                </Link>
                <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  <Twitter size={20} />
                </Link>
                <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  <Linkedin size={20} />
                </Link>
                <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  <Github size={20} />
                </Link>
                <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  <Youtube size={20} />
                </Link>
              </div>
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
          .animation-delay-200 {
            animation-delay: 0.2s;
            animation-fill-mode: backwards;
          }
        `}</style>
      </div>
    </div>
  );
}