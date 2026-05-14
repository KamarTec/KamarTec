"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, Facebook, Twitter, Linkedin, Github, Youtube, Menu, X, Moon, Sun, ExternalLink, Code, Calendar, Users, CheckCircle, ArrowLeft, Smartphone, Zap, Shield, Star } from 'lucide-react';
import NewsletterForm from '../../components/NewsletterForm';

export default function FocusPalProjectDetail() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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

  const projectData = {
  title: 'FocusPal',
  tagline: 'Study Smarter. Stay Organized. Stay Consistent.',
  category: 'Mobile & Web Application',
  client: 'KamarTec',
  duration: 'Ongoing (2024 — Present)',
  team: '2 Developers + 1 Designer',
  technologies: [
    'Flutter',
    'Node.js',
    'PostgreSQL',
    'Prisma ORM',
    'JWT Authentication',
    'Cloud Storage'
  ],
  heroImage: '/images/portfolio/focuspal.png',

  overview:
    'FocusPal is an AI-powered study and productivity companion built for university students. It helps users plan courses, track tasks and assignments, manage study files, record notes, monitor focus time, and stay consistent with streaks and goals. With an integrated AI study assistant, FocusPal allows students to upload lecture slides, generate summaries and quizzes, and receive personalized academic support.',

  challenge:
    'Students often juggle multiple courses, deadlines, notes, files, and exams. Most productivity apps are generic and fail to understand academic workflows. Our challenge was to build a system specifically designed for students—something that combines task management, study planning, file organization, and AI assistance in one seamless experience.',

  solution:
    'FocusPal was built as a complete academic ecosystem. Students can add courses, create tasks and deadlines, upload slides, track focus time using a pomodoro timer, organize notes, create flashcards, monitor study streaks, and automatically generate AI summaries and quizzes. The backend uses Laravel and PostgreSQL, while the AI features run on a custom Node.js pipeline for real-time chat and file-aware responses.',

  features: [
    {
      icon: Calendar,
      title: 'Course & Task Manager',
      description:
        'Add courses, create assignments, set deadlines, manage tasks with priorities, reminders, and completion tracking.'
    },
    {
      icon: Smartphone,
      title: 'Focus Timer',
      description:
        'Built-in Pomodoro timer with custom focus/break durations, distraction blocking, ambient sounds, and focus statistics.'
    },
    {
      icon: Users,
      title: 'AI Study Assistant',
      description:
        'Upload lecture slides or notes and ask the AI to summarize, explain concepts, or generate quizzes from your documents.'
    },
    {
      icon: Zap,
      title: 'Flashcards & Notes',
      description:
        'Create flashcards or detailed notes for any course. Organize them by topic and quickly revise anytime.'
    },
    {
      icon: Star,
      title: 'Progress & Analytics',
      description:
        'Track focus minutes, streaks, task completion rate, and study patterns using clean charts and analytics.'
    },
    {
      icon: Shield,
      title: 'Cloud Storage & Sync',
      description:
        'All study files—including notes, flashcards, AI summaries, and uploaded slides—are securely stored and synced across devices.'
    }
  ],

  results: [
    { metric: '1,000+', label: 'Beta Users' },
    { metric: '120K+', label: 'Focus Minutes Logged' },
    { metric: '8,000+', label: 'Tasks Created' },
    { metric: '2,400+', label: 'AI Summaries Generated' }
  ],

  screenshots: [
    '/images/portfolio/focuspal/screenshot-1.png',
    '/images/portfolio/focuspal/screenshot-2.png',
    '/images/portfolio/focuspal/screenshot-3.png',
    '/images/portfolio/focuspal/screenshot-4.png',
    '/images/portfolio/focuspal/screenshot-5.png',
    '/images/portfolio/focuspal/screenshot-6.png'
  ],

  liveUrl: 'https://helper.kamartec.online',
  githubUrl: 'https://github.com/kamartec'
};

const relatedProjects = [
  {
    title: 'SellZan',
    description: 'University-Focused Social Commerce App',
    image: '/images/portfolio/sellzan.png',
    link: '/portfolio/sellzan'
  },
  {
    title: 'SwapMate',
    description: 'Peer-to-Peer Learning & Resource Sharing Platform',
    image: '/images/portfolio/swapmate.jpg',
    link: '/portfolio/swapmate'
  },
  {
    title: 'Nova',
    description: 'AI-Powered African Personal Assistant',
    image: '/images/portfolio/nova.jpg',
    link: '/portfolio/nova'
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
                <Link href="/about" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all">About</Link>
                <Link href="/services" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all">Services</Link>
                <Link href="/portfolio" className="text-sm lg:text-base text-red-500 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500">Projects</Link>
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
            <div className={`md:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-[520px] opacity-100 mt-4 overflow-y-auto' : 'max-h-0 opacity-0 overflow-hidden'}`}>
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
                <Link href="/about" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">About</Link>
                <Link href="/services" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Services</Link>
                <Link href="/portfolio" className="block py-2 text-red-500 font-medium">Projects</Link>
                <Link href="/blog" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Blog</Link>
                <Link href="/contact" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Contact</Link>
              </div>
            </div>
          </div>
        </header>

        {/* Back Button */}
        <div className="pt-24 pb-8 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Link 
              href="/portfolio"
              className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-all hover:gap-3"
            >
              <ArrowLeft size={20} />
              Back to Projects
            </Link>
          </div>
        </div>

        {/* Hero Title Section */}
        <section className="pb-12 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium inline-block mb-4">
                  {projectData.category}
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                  {projectData.title}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  {projectData.tagline}
                </p>
              </div>
            </div>

            {/* Project Meta */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-2xl">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Client</div>
                <div className="font-bold text-gray-900 dark:text-white">{projectData.client}</div>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 p-6 rounded-2xl">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Duration</div>
                <div className="font-bold text-gray-900 dark:text-white">{projectData.duration}</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-2xl">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Team Size</div>
                <div className="font-bold text-gray-900 dark:text-white">{projectData.team}</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 p-6 rounded-2xl">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Status</div>
                <div className="font-bold text-green-600 dark:text-green-400 flex items-center gap-2">
                  <CheckCircle size={20} /> Live & Active
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Image + Description Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Hero Image */}
              <div className="relative order-2 lg:order-1">
                <div className="absolute -inset-4">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-56 h-56 bg-pink-400 rounded-full opacity-20 blur-3xl"></div>
                </div>
                <div className="relative rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500 overflow-hidden">
                  <img 
                    src={projectData.heroImage} 
                    alt={projectData.title}
                    className="w-full rounded-3xl"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Project Overview
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  {projectData.overview}
                </p>
                
                {/* Technologies */}
                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {projectData.technologies.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {projectData.results.map((result, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                      <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                        {result.metric}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {result.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Full Information Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Challenge */}
            <div className="mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                The Challenge
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                {projectData.challenge}
              </p>
            </div>

            {/* Solution */}
            <div className="mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Solution
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                {projectData.solution}
              </p>
            </div>

            {/* Key Features */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Key Features
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectData.features.map((feature, idx) => (
                  <div 
                    key={idx}
                    className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-2xl hover:shadow-xl transition-shadow"
                  >
                    <div className="bg-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                      <feature.icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Screenshots Gallery Section */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Project Screenshots
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg text-center mb-12">
              Take a closer look at the app interface and user experience
            </p>

            {/* Screenshots Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectData.screenshots.map((screenshot, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(screenshot)}
                  className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <img 
                    src={screenshot} 
                    alt={`Screenshot ${idx + 1}`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-white font-medium flex items-center gap-2">
                      <ExternalLink size={20} />
                      View Full Size
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Image Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>
            <img 
              src={selectedImage} 
              alt="Full size screenshot"
              className="max-w-full max-h-full rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        {/* Related Projects */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Related Projects
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((project, idx) => (
                <Link 
                  key={idx}
                  href={project.link}
                  className="group bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <div className="relative overflow-hidden h-48">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {project.description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium">
                      View Project <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 sm:py-32 bg-gradient-to-br from-purple-600 via-purple-700 to-blue-700 dark:from-purple-800 dark:via-purple-900 dark:to-blue-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Interested in This Project?
            </h2>
            <p className="text-white text-lg sm:text-xl mb-8">
              Check out the live application or start your own project with us today!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href={projectData.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-purple-700 px-8 py-4 rounded-full font-bold hover:bg-gray-100 hover:shadow-2xl hover:scale-110 transition-all duration-300"
              >
                <ExternalLink size={20} />
                View Live Project
              </a>
              <a 
                href={projectData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 hover:shadow-2xl hover:scale-110 transition-all duration-300"
              >
                <Github size={20} />
                View on GitHub
              </a>
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-yellow-300 hover:shadow-2xl hover:scale-110 transition-all duration-300"
              >
                Start Your Project
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-900 py-16 sm:py-20 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
              {/* Company Info */}
              <div>
                <div className="mb-6">
                  <img 
                    src="/images/logo/logo.png" 
                    alt="KamarTec Solutions" 
                    className="h-40 w-auto"
                  />
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                  Making the world a better place through constructing elegant hierarchies. Not just about providing service to humanity 
                  but also making impact on the society at large.
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

              {/* Quick Links */}
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-6 text-lg">Quick Links</h3>
                <ul className="space-y-4">
                  <li><Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:translate-x-1 inline-block transition-all">Home</Link></li>
                  <li><Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:translate-x-1 inline-block transition-all">About</Link></li>
                  <li><Link href="/portfolio" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:translate-x-1 inline-block transition-all">Projects</Link></li>
                  <li><Link href="/services" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:translate-x-1 inline-block transition-all">Services</Link></li>
                  <li><Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:translate-x-1 inline-block transition-all">Blog</Link></li>
                </ul>
              </div>

              {/* Contact Info */}
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
                  Subscribe to our newsletter and stay up to date with all events coming straight in your mailbox:
                </p>
                <NewsletterForm />
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
        `}</style>
      </div>
    </div>
  );
}