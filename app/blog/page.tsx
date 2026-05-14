"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, Facebook, Twitter, Linkedin, Github, Youtube, Menu, X, Moon, Sun, Calendar, Clock, User, Tag, Mail, ChevronRight } from 'lucide-react';
import NewsletterForm from '../components/NewsletterForm';

export default function BlogPage() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
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

  const blogPosts = [
    {
      id: 'future-of-web-development-2025',
      title: "The Future of Web Development in 2025: Trends You Can't Ignore",
      excerpt: "Discover the emerging technologies and frameworks that are reshaping how we build web applications in 2025.",
      content: `Full article content here - about 800-1000 words discussing AI integration, serverless architecture, Web3, progressive web apps, etc.`,
      author: "Clement Obeng",
      authorRole: "Lead Web Developer",
      authorImage: "/images/team/Clement.jpg",
      date: "2025-01-15",
      readTime: "8 min read",
      category: "Web Development",
      tags: ["React", "Next.js", "AI", "Trends"],
      image: "/images/blog/futuredev.jpg",
      featured: true
    },
    {
      id: 'ui-ux-design-principles-2025',
      title: "10 UI/UX Design Principles Every Designer Should Know",
      excerpt: "Master these fundamental design principles to create intuitive and beautiful user experiences.",
      content: `Full article about design principles, user psychology, accessibility, color theory, etc.`,
      author: "Emmanuel Kofi Frimpong",
      authorRole: "Lead Designer",
      authorImage: "/images/team/Emmanuel.jpg",
      date: "2025-01-10",
      readTime: "6 min read",
      category: "Design",
      tags: ["UI/UX", "Design", "Best Practices"],
      image: "/images/blog/design.jpg",
      featured: true
    },
    {
      id: 'data-analytics-business-growth',
      title: "How Data Analytics Can Transform Your Business Growth",
      excerpt: "Learn how to leverage data analytics to make informed decisions and drive business success.",
      content: `Article about data-driven decision making, analytics tools, case studies, ROI of data analytics.`,
      author: "Francis Agyei Mensah",
      authorRole: "Data Analyst",
      authorImage: "/images/team/Francis.jpg",
      date: "2025-01-05",
      readTime: "7 min read",
      category: "Data Analytics",
      tags: ["Analytics", "Business", "Growth"],
      image: "/images/blog/data.jpg",
      featured: false
    },
    {
      id: 'react-vs-vue-2025',
      title: "React vs Vue in 2025: Which Framework Should You Choose?",
      excerpt: "An unbiased comparison of React and Vue to help you make the right choice for your next project.",
      content: `Detailed comparison covering performance, learning curve, community, ecosystem, use cases.`,
      author: "Gerald Boakye",
      authorRole: "Web Developer",
      authorImage: "/images/team/Gerald.jpg",
      date: "2024-12-28",
      readTime: "10 min read",
      category: "Web Development",
      tags: ["React", "Vue", "JavaScript", "Frameworks"],
      image: "/images/blog/react-vs-vue.png",
      featured: true
    },
    {
      id: 'mobile-app-development-trends',
      title: "Mobile App Development Trends Dominating 2025",
      excerpt: "Stay ahead of the curve with these mobile development trends shaping the industry.",
      content: `Article about Flutter, React Native, AI integration in mobile apps, 5G impact, etc.`,
      author: "Elvis Osei Bonsu",
      authorRole: "Web Developer",
      authorImage: "/images/team/Elvis.jpg",
      date: "2024-12-20",
      readTime: "9 min read",
      category: "Mobile Development",
      tags: ["Mobile", "Apps", "Trends", "Flutter"],
      image: "/images/blog/mobile-trends.png",
      featured: false
    },
    {
      id: 'importance-of-responsive-design',
      title: "Why Responsive Design is Non-Negotiable in 2025",
      excerpt: "Understanding the critical importance of responsive design in today's multi-device world.",
      content: `Article about mobile-first design, responsive frameworks, testing across devices, performance.`,
      author: "Emmanuel Kofi Frimpong",
      authorRole: "Lead Designer",
      authorImage: "/images/team/Emmanuel.jpg",
      date: "2024-12-15",
      readTime: "5 min read",
      category: "Design",
      tags: ["Responsive", "Mobile-First", "Web Design"],
      image: "/images/blog/responsive-design.png",
      featured: false
    },
    {
      id: 'cybersecurity-best-practices',
      title: "Cybersecurity Best Practices for Small Businesses",
      excerpt: "Protect your business from cyber threats with these essential security measures.",
      content: `Article about common threats, password management, 2FA, backups, employee training.`,
      author: "Clement Obeng",
      authorRole: "Lead Web Developer",
      authorImage: "/images/team/Clement.jpg",
      date: "2024-12-10",
      readTime: "8 min read",
      category: "Security",
      tags: ["Cybersecurity", "Security", "Best Practices"],
      image: "/images/blog/cybersecurity.jpg",
      featured: false
    },
    {
      id: 'power-of-data-visualization',
      title: "The Power of Data Visualization: Turning Numbers into Stories",
      excerpt: "Learn how effective data visualization can communicate complex information clearly.",
      content: `Article about visualization principles, tools (Tableau, Power BI), best practices, examples.`,
      author: "Albert Kofi Segu",
      authorRole: "Data Scientist",
      authorImage: "/images/team/Albert.jpg",
      date: "2024-12-05",
      readTime: "6 min read",
      category: "Data Analytics",
      tags: ["Visualization", "Data", "Analytics"],
      image: "/images/blog/data-viz.png",
      featured: false
    },
    {
      id: 'building-ghanas-digital-future-2026',
      title: "Building Ghana's Digital Future: KamarTec's Vision for 2026",
      excerpt: "How a team of young Ghanaian technologists are building world-class digital products from Cape Coast to the world.",
      content: `KamarTec Solutions was born at the University of Cape Coast with a simple but powerful belief: that Africa deserves world-class technology built by Africans who understand the continent. In 2026, we're doubling down on that mission with expanded teams, new product lines, and deeper roots in the Ghanaian tech ecosystem.`,
      author: "Clement Obeng",
      authorRole: "Lead Full-Stack Developer",
      authorImage: "/images/team/Clement.jpg",
      date: "2026-01-10",
      readTime: "7 min read",
      category: "Company",
      tags: ["Ghana", "Tech", "Africa", "KamarTec"],
      image: "/images/blog/futuredev.jpg",
      featured: true
    },
    {
      id: 'how-we-built-nova-african-ai',
      title: "How We Built NOVA — Africa's First Culturally-Aware AI Assistant",
      excerpt: "The story behind building an AI that understands African languages, culture, and context from the ground up.",
      content: `When we started building NOVA, we faced a challenge that most AI teams never encounter: building an assistant that doesn't just translate African languages, but truly understands the cultural nuance behind them. Here's our journey building the African AI assistant.`,
      author: "Kanbros Kojo Antwi",
      authorRole: "Cybersecurity & AI Engineer",
      authorImage: "/images/team/Kanbros.jpg",
      date: "2025-11-20",
      readTime: "9 min read",
      category: "AI & Machine Learning",
      tags: ["AI", "NOVA", "Africa", "NLP", "Machine Learning"],
      image: "/images/blog/cybersecurity.jpg",
      featured: true
    },
    {
      id: 'cybersecurity-tips-ghanaian-businesses',
      title: "Cybersecurity Tips Every Ghanaian Business Should Know in 2026",
      excerpt: "Practical, affordable cybersecurity measures that any small or medium Ghanaian business can implement today.",
      content: `Ghana's digital economy is growing fast — and so are the threats targeting it. Mobile money fraud, phishing attacks, and data breaches affect thousands of Ghanaian businesses every year. Here are the most important cybersecurity practices you can implement right now, without breaking the bank.`,
      author: "Kanbros Kojo Antwi",
      authorRole: "Cybersecurity & AI Engineer",
      authorImage: "/images/team/Kanbros.jpg",
      date: "2025-10-05",
      readTime: "8 min read",
      category: "Security",
      tags: ["Cybersecurity", "Ghana", "Small Business", "Security"],
      image: "/images/blog/cybersecurity.jpg",
      featured: false
    },
    {
      id: 'from-idea-to-app-mahyp-story',
      title: "From Idea to App: The MaHyp Development Story",
      excerpt: "How KamarTec built a health platform connecting Ghanaians to healthcare providers — the challenges, lessons, and wins.",
      content: `Healthcare access in Ghana remains a challenge, especially in rural areas. The MaHyp App was born from a simple question: what if booking a doctor's appointment was as easy as ordering food? Here's how we built it, what we got wrong, and what we learned along the way.`,
      author: "Derry Atta Bandoh",
      authorRole: "Backend Developer",
      authorImage: "/images/team/Derry.jpg",
      date: "2025-09-15",
      readTime: "10 min read",
      category: "Mobile Development",
      tags: ["MaHyp", "Health Tech", "Flutter", "Ghana", "Hypertension"],
      image: "/images/blog/mobile-trends.png",
      featured: false
    },
    {
      id: 'kamarpay-building-payment-infrastructure',
      title: "KamarPay: Why We Built Our Own Payment Platform",
      excerpt: "The engineering story behind building payment infrastructure for the Ghanaian market — MoMo, reliability, and lessons learned.",
      author: "Derry Atta Bandoh",
      authorRole: "Backend Developer",
      authorImage: "/images/team/Derry.jpg",
      date: "2025-08-10",
      readTime: "9 min read",
      category: "Web Development",
      tags: ["KamarPay", "Payments", "FinTech", "Ghana", "MoMo", "API"],
      image: "/images/blog/futuredev.jpg",
      featured: true
    },
    {
      id: 'getting-started-with-machine-learning',
      title: "Getting Started with Machine Learning: A Beginner's Guide",
      excerpt: "Demystifying machine learning for beginners — what it is, where to start, and how to build your first model in Python.",
      author: "Albert Kofi Segu",
      authorRole: "Data Scientist",
      authorImage: "/images/team/Albert.jpg",
      date: "2025-07-20",
      readTime: "8 min read",
      category: "AI & Machine Learning",
      tags: ["Machine Learning", "Python", "Data Science", "Beginners", "AI"],
      image: "/images/blog/data.jpg",
      featured: false
    },
    {
      id: 'earlaw-horizon-building-international-projects',
      title: "Going Global: Lessons from Building for UK and International Clients",
      excerpt: "What KamarTec learned from delivering projects for EarlLaw Firm (UK) and Horizon Path Travels — timezone, trust, and technical quality.",
      author: "Clement Obeng",
      authorRole: "Lead Developer",
      authorImage: "/images/team/Clement.jpg",
      date: "2025-06-12",
      readTime: "6 min read",
      category: "Company",
      tags: ["International", "Client Work", "UK", "Remote", "KamarTec"],
      image: "/images/blog/futuredev.jpg",
      featured: false
    }
  ];

  const categories = ['All', 'Web Development', 'Design', 'Data Analytics', 'Mobile Development', 'Security', 'AI & Machine Learning', 'Company'];
  
  // Get all unique tags from all posts
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Web Development': return 'bg-gradient-to-r from-purple-600 to-pink-600';
      case 'Design': return 'bg-gradient-to-r from-pink-600 to-orange-600';
      case 'Data Analytics': return 'bg-gradient-to-r from-blue-600 to-cyan-600';
      case 'Mobile Development': return 'bg-gradient-to-r from-green-600 to-teal-600';
      case 'Security': return 'bg-gradient-to-r from-red-600 to-orange-600';
      case 'AI & Machine Learning': return 'bg-gradient-to-r from-violet-600 to-blue-600';
      case 'Company': return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      default: return 'bg-gradient-to-r from-purple-600 to-blue-600';
    }
  };

  const getTagSize = (tag: string) => {
    const count = blogPosts.filter(post => post.tags.includes(tag)).length;
    if (count >= 3) return 'text-lg px-4 py-2';
    if (count >= 2) return 'text-base px-3 py-1.5';
    return 'text-sm px-2.5 py-1';
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
                <div className="relative flex-1 group">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors duration-300" size={18} />
                  <input
                    type="text"
                    placeholder="Search articles..."
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
                <Link href="/portfolio" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all">Projects</Link>
                <Link href="/team" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all">Team</Link>
                <Link href="/blog" className="text-sm lg:text-base text-red-500 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500">Blog</Link>
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
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <Link href="/" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Home</Link>
                <Link href="/about" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">About</Link>
                <Link href="/services" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Services</Link>
                <Link href="/portfolio" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Projects</Link>
                <Link href="/team" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Team</Link>
                <Link href="/blog" className="block py-2 text-red-500 font-medium">Blog</Link>
                <Link href="/contact" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Contact</Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center pt-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 dark:from-purple-800 dark:via-blue-800 dark:to-pink-800"></div>
          
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-40 left-20 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 w-full text-center">
            <span className="bg-purple-500 dark:bg-purple-600 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-medium inline-block mb-6 animate-fade-in">OUR BLOG</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-slide-up">
              KamarTec Blog
            </h1>
            <p className="text-white text-lg sm:text-xl max-w-3xl mx-auto animate-slide-up animation-delay-200 leading-relaxed">
              Insights, tutorials, and industry news from our tech experts. Stay updated with the latest trends in web development, design, data analytics, and more.
            </p>
          </div>
        </section>

        {/* Search & Filter Section */}
        <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Mobile Search */}
              <div className="lg:hidden w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Categories Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? `${getCategoryColor(category)} text-white shadow-lg`
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Results Count */}
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="py-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  Featured Articles
                </h2>
                <div className="text-purple-600 dark:text-purple-400 font-medium">
                  🔥 Trending
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {featuredPosts.map((post, index) => (
                  <Link 
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent"></div>
                      <div className={`absolute top-4 left-4 ${getCategoryColor(post.category)} text-white px-4 py-1 rounded-full text-sm font-medium`}>
                        {post.category}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2">
                        {post.excerpt}
                      </p>

                      {/* Author & Meta Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img 
                            src={post.authorImage} 
                            alt={post.author}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {post.author}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {post.authorRole}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            {post.readTime}
                          </div>
                        </div>
                      </div>

                      {/* Read More */}
                      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium group-hover:gap-3 transition-all">
                          Read Article
                          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Blog Grid */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {regularPosts.length > 0 ? (
              <>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
                </h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularPosts.map((post, index) => (
                    <Link 
                      key={post.id}
                      href={`/blog/${post.id}`}
                      className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform animate-slide-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent"></div>
                        <div className={`absolute top-4 left-4 ${getCategoryColor(post.category)} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                          {post.category}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-sm">
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span 
                              key={tag}
                              className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-1 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="text-gray-500 dark:text-gray-400 text-xs">
                              +{post.tags.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center gap-3">
                            <img 
                              src={post.authorImage} 
                              alt={post.author}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div className="text-sm">
                              <div className="font-medium text-gray-900 dark:text-white">
                                {post.author}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">
                                {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                            <Clock size={14} />
                            {post.readTime}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  No articles found
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Try a different search term or category
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="bg-purple-600 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors"
                >
                  View All Articles
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Popular Tags */}
        <section className="py-12 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Popular Topics
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className={`${getTagSize(tag)} rounded-full font-medium transition-all duration-300 hover:scale-105 ${getCategoryColor(tag.split(' ')[0])} text-white`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-24 sm:py-32 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 dark:from-purple-800 dark:via-pink-800 dark:to-blue-800 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          </div>
          
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <Mail className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Stay Updated
            </h2>
            <p className="text-white text-lg sm:text-xl mb-8">
              Subscribe to our newsletter for the latest tech insights, tutorials, and industry news delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="bg-white text-purple-700 px-8 py-4 rounded-full font-bold hover:bg-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
            <p className="text-white/70 text-sm mt-4">
              No spam, unsubscribe at any time
            </p>
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
                  <li><Link href="/services" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:translate-x-1 inline-block transition-all">Services</Link></li>
                  <li><Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:translate-x-1 inline-block transition-all">Blog</Link></li>
                  <li><Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:translate-x-1 inline-block transition-all">Contact</Link></li>
                </ul>
              </div>

              {/* Blog Categories */}
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-6 text-lg">Categories</h3>
                <ul className="space-y-4">
                  {categories.filter(c => c !== 'All').map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => setSelectedCategory(category)}
                        className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:translate-x-1 inline-block transition-all text-left flex items-center gap-2"
                      >
                        <ChevronRight size={14} />
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-6 text-lg">Stay Connected</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                  Join our community and get the latest updates directly in your inbox.
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
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </div>
  );
}