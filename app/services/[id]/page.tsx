"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Search, Facebook, Twitter, Linkedin, Github, Youtube, Menu, X, Moon, Sun, Mail, Phone, ArrowLeft, CheckCircle, Code, Smartphone, Globe, Palette, BarChart3, GraduationCap, Zap, Users, Calendar, Award, Shield, Star, FileText } from "lucide-react";

export default function ServiceDetailPage() {
  const params = useParams();
  const id = params.id as string;
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

  const services = [
    {
      id: 'software-development',
      title: "Software Development",
      shortDesc: "Custom software solutions tailored to your business needs",
      fullDesc: "We build scalable, secure, and high-performance software applications using cutting-edge technologies. Our team follows agile methodologies to ensure timely delivery and continuous improvement. We specialize in creating custom solutions that address specific business challenges and drive growth.",
      image: "/images/services/software_dev.jpg",
      icon: "Code",
      color: "from-purple-600 to-orange-400",
      features: ["Custom Web Applications", "Enterprise Software", "API Development", "System Integration", "Database Design", "Cloud Solutions"],
      technologies: ["React", "Node.js", "Python", "Java", "AWS", "MongoDB", "PostgreSQL", "Docker"],
      pricing: "Starting from ₵5,000"
    },
    {
      id: 'mobile-apps',
      title: "Mobile App Development",
      shortDesc: "Native and cross-platform mobile applications",
      fullDesc: "Create stunning mobile experiences for iOS and Android that engage users and drive business growth. We develop both native and cross-platform applications with focus on performance, security, and user experience. Our apps are designed to work seamlessly across all devices and screen sizes.",
      image: "/images/services/mobile_apps.jpg",
      icon: "Smartphone",
      color: "from-pink-500 to-orange-400",
      features: ["iOS Development", "Android Development", "Cross-Platform Apps", "App Maintenance", "App Store Optimization", "Push Notifications"],
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Xcode", "Android Studio"],
      pricing: "Starting from ₵8,000"
    },
    {
      id: 'web-design',
      title: "Web Design & Development",
      shortDesc: "Beautiful, responsive websites that convert",
      fullDesc: "Modern, user-friendly websites optimized for performance, SEO, and conversions. We create websites that not only look great but also perform exceptionally well. From simple landing pages to complex e-commerce platforms, we build solutions that help you achieve your business goals.",
      image: "/images/services/web_design.jpg",
      icon: "Globe",
      color: "from-orange-500 to-red-500",
      features: ["Responsive Design", "E-commerce Sites", "CMS Development", "Website Redesign", "SEO Optimization", "Performance Tuning"],
      technologies: ["Next.js", "WordPress", "Shopify", "Webflow", "Tailwind CSS", "GraphQL", "Vercel"],
      pricing: "Starting from ₵3,000"
    },
    {
      id: 'graphic-design',
      title: "Graphic Design",
      shortDesc: "Visual identity that makes your brand stand out",
      fullDesc: "Creative designs that capture attention and communicate your brand message effectively. Our designers create compelling visual identities that resonate with your target audience. We ensure consistency across all brand touchpoints to build strong brand recognition.",
      image: "/images/services/graphic_design.jpg",
      icon: "Palette",
      color: "from-pink-600 to-purple-600",
      features: ["Logo Design", "Brand Identity", "Marketing Materials", "Social Media Graphics", "Print Design", "Packaging Design"],
      technologies: ["Adobe Illustrator", "Photoshop", "Figma", "InDesign", "After Effects", "Procreate"],
      pricing: "Starting from ₵500"
    },
    {
      id: 'data-analytics',
      title: "Data Analytics",
      shortDesc: "Transform data into actionable business insights",
      fullDesc: "Comprehensive data analysis and visualization services to help you make informed decisions. We help businesses uncover patterns, trends, and insights hidden in their data. Our analytics solutions enable data-driven decision making and strategic planning.",
      image: "/images/services/data_analytics.jpg",
      icon: "BarChart3",
      color: "from-blue-600 to-cyan-500",
      features: ["Business Intelligence", "Data Visualization", "Predictive Analytics", "Reporting Dashboards", "Data Cleaning", "Statistical Analysis"],
      technologies: ["Power BI", "Tableau", "Python", "SQL", "R", "Google Analytics", "Excel"],
      pricing: "Starting from ₵2,500"
    },
    {
      id: 'tech-training',
      title: "Tech Training & Workshops",
      shortDesc: "Empower your team with cutting-edge tech skills",
      fullDesc: "Hands-on training programs in web development, design, and data analysis for individuals and teams. We provide practical, industry-relevant training that equips participants with skills they can immediately apply. Our workshops are designed to foster learning and skill development.",
      image: "/images/services/training.jpg",
      icon: "GraduationCap",
      color: "from-green-500 to-teal-500",
      features: ["Web Development Bootcamp", "Design Fundamentals", "Data Science Training", "Corporate Workshops", "One-on-One Coaching", "Certification Programs"],
      technologies: ["HTML/CSS", "JavaScript", "React", "Python", "Figma", "SQL", "Git"],
      pricing: "Free"
    }
  ];

  const service = services.find(s => s.id === id);  
  
  if (!service) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Service Not Found</h1>
          <Link href="/services" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
            ← Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const relatedServices = services.filter(s => s.id !== id).slice(0, 3);
  
  const processSteps = [
    { title: "Discovery", desc: "We analyze your requirements and goals", icon: Users },
    { title: "Design", desc: "Creating wireframes and prototypes", icon: Palette },
    { title: "Development", desc: "Building the solution with best practices", icon: Code },
    { title: "Delivery", desc: "Testing, deployment, and handover", icon: CheckCircle }
  ];

  const benefits = [
    { icon: Award, title: "Expert Team", desc: "Certified professionals with specialized skills" },
    { icon: Shield, title: "Quality Guaranteed", desc: "Rigorous testing and quality assurance" },
    { icon: Zap, title: "Fast Turnaround", desc: "Efficient processes for timely delivery" }
  ];

  const iconComponents = {
    Code: Code,
    Smartphone: Smartphone,
    Globe: Globe,
    Palette: Palette,
    BarChart3: BarChart3,
    GraduationCap: GraduationCap
  };

  const ServiceIcon = iconComponents[service.icon as keyof typeof iconComponents];

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
                <Link href="/services" className="text-sm lg:text-base text-red-500 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500">Services</Link>
                <Link href="/portfolio" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all">Projects</Link>
                <Link href="/team" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all">Team</Link>
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
                <Link href="/services" className="block py-2 text-red-500 font-medium">Services</Link>
                <Link href="/portfolio" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Projects</Link>
                <Link href="/team" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Team</Link>
                <Link href="/blog" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Blog</Link>
                <Link href="/contact" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Contact</Link>
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumb & Back Button */}
        <div className="pt-24 pb-8 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Link href="/" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Home</Link>
                <span>/</span>
                <Link href="/services" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Services</Link>
                <span>/</span>
                <span className="text-gray-900 dark:text-white font-medium">{service.title}</span>
              </div>
              <Link 
                href="/services"
                className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-all hover:gap-3"
              >
                <ArrowLeft size={20} />
                Back to Services
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={service.image} 
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-90`}></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 w-full">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                  <ServiceIcon className="text-white w-8 h-8" />
                </div>
                <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {service.pricing}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                {service.title}
              </h1>
              <p className="text-white text-lg sm:text-xl mb-8">
                {service.shortDesc}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-purple-700 px-6 py-3 rounded-full font-bold hover:bg-gray-100 hover:shadow-xl transition-all"
                >
                  Get a Quote
                  <ArrowRight size={20} />
                </Link>
                <div className="flex items-center gap-2 text-white">
                  <Phone size={20} />
                  <span>+233 (0) 592852555</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Overview */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Service Overview</h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                  <p>{service.fullDesc}</p>
                  <p>Our approach combines technical expertise with industry best practices to deliver solutions that exceed expectations. We work closely with clients throughout the development process to ensure alignment with business objectives.</p>
                </div>

                {/* What's Included */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What's Included</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="text-green-500 dark:text-green-400 w-6 h-6 flex-shrink-0 mt-1" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sticky Sidebar */}
              <div className="lg:sticky lg:top-24 h-fit">
                <div className={`bg-gradient-to-br ${service.color} rounded-3xl p-8 shadow-2xl`}>
                  <h3 className="text-2xl font-bold text-white mb-4">Get Started</h3>
                  <div className="text-white mb-6">
                    <div className="text-4xl font-bold mb-2">{service.pricing}</div>
                    <p className="text-white/80 text-sm">Custom packages available based on your requirements</p>
                  </div>
                  
                  <Link 
                    href="/contact"
                    className="block w-full bg-white text-purple-700 text-center py-4 rounded-xl font-bold hover:bg-gray-100 hover:scale-105 transition-all mb-6"
                  >
                    Get a Quote
                  </Link>
                  
                  <div className="space-y-4 text-white/80 text-sm">
                    <div className="flex items-center gap-3">
                      <CheckCircle size={18} className="text-white" />
                      <span>Free Consultation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-white" />
                      <span>Detailed Proposal</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar size={18} className="text-white" />
                      <span>Flexible Timelines</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield size={18} className="text-white" />
                      <span>Quality Guarantee</span>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/20">
                    <div className="flex items-center gap-3 mb-3">
                      <Phone size={18} className="text-white" />
                      <span className="text-white font-medium">Have questions?</span>
                    </div>
                    <div className="text-white text-lg font-bold">+233 (0) 592852555</div>
                    <div className="text-white/80 text-sm mt-1">Available 24/7 for urgent inquiries</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies We Use */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Technologies We Use
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg text-center mb-12 max-w-2xl mx-auto">
              We leverage cutting-edge technologies to build robust and scalable solutions
            </p>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {service.technologies.map((tech, index) => {
                const bgGradients = [
                  "bg-gradient-to-br from-purple-500 to-pink-500",
                  "bg-gradient-to-br from-blue-500 to-cyan-500",
                  "bg-gradient-to-br from-orange-500 to-red-500",
                  "bg-gradient-to-br from-green-500 to-teal-500",
                  "bg-gradient-to-br from-pink-500 to-purple-500",
                  "bg-gradient-to-br from-indigo-500 to-blue-500",
                  "bg-gradient-to-br from-cyan-500 to-blue-500",
                  "bg-gradient-to-br from-red-500 to-orange-500"
                ];
                
                return (
                  <div 
                    key={index}
                    className={`${bgGradients[index % bgGradients.length]} text-white rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300 shadow-lg`}
                  >
                    <Code className="w-8 h-8 mx-auto mb-3" />
                    <div className="font-bold text-lg">{tech}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Our Process
            </h2>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 hidden md:block"></div>

              <div className="space-y-12 md:space-y-0">
                {processSteps.map((step, index) => {
                  const StepIcon = step.icon;
                  return (
                    <div 
                      key={index}
                      className={`relative flex flex-col md:flex-row items-center ${
                        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                      } gap-8`}
                    >
                      {/* Content */}
                      <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                        <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-xl">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            {step.desc}
                          </p>
                        </div>
                      </div>

                      {/* Timeline Dot */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center z-10">
                        <StepIcon className="text-white w-6 h-6" />
                      </div>

                      {/* Step Number */}
                      <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-left md:pl-12' : 'md:text-right md:pr-12'}`}>
                        <div className="text-4xl font-bold text-gray-300 dark:text-gray-700">
                          Step {index + 1}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Why Choose Us for {service.title}
            </h2>

            <div className="grid sm:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const BenefitIcon = benefit.icon;
                return (
                  <div 
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-shadow"
                  >
                    <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <BenefitIcon className="text-white w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {benefit.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">50+</div>
                <div className="text-gray-600 dark:text-gray-400">Projects Completed</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">95%</div>
                <div className="text-gray-600 dark:text-gray-400">Client Satisfaction</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">24/7</div>
                <div className="text-gray-600 dark:text-gray-400">Support Available</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">100%</div>
                <div className="text-gray-600 dark:text-gray-400">On-Time Delivery</div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Other Services You Might Like
              </h2>
              <Link 
                href="/services"
                className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium hover:gap-3 transition-all"
              >
                View All Services <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((relatedService, index) => {
                const RelatedIcon = iconComponents[relatedService.icon as keyof typeof iconComponents];
                return (
                  <Link 
                    key={relatedService.id}
                    href={`/services/${relatedService.id}`}
                    className="group bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="relative h-40">
                      <img 
                        src={relatedService.image} 
                        alt={relatedService.title}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${relatedService.color} opacity-80 group-hover:opacity-90 transition-opacity`}></div>
                      <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm p-3 rounded-full">
                        <RelatedIcon className="text-white w-6 h-6" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {relatedService.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-2">
                        {relatedService.shortDesc}
                      </p>
                      <span className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 text-sm font-medium">
                        Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  How long does it take to complete a project?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Project timelines vary based on complexity and scope. Typically, small projects take 2-4 weeks, medium projects 4-8 weeks, and large projects 8+ weeks. We provide detailed timelines during the consultation phase.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  What is included in the pricing?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our pricing includes design, development, testing, deployment, and 30 days of post-launch support. Additional services like hosting, maintenance, and training can be added as optional packages.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  Do you provide ongoing support?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Yes, we offer various support packages including maintenance, updates, security monitoring, and technical support. We also provide training to help your team manage the solution independently.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  Can you work with my existing team?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Absolutely! We often collaborate with in-house teams. We can provide guidance, technical leadership, or work alongside your team to accelerate development and knowledge transfer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 sm:py-32 bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 dark:from-purple-800 dark:via-blue-800 dark:to-pink-800 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-white text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help bring your vision to life with our {service.title} services.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-purple-700 px-8 py-4 rounded-full font-bold hover:bg-gray-100 hover:shadow-2xl hover:scale-110 transition-all duration-300"
              >
                Get Started
                <ArrowRight size={20} />
              </Link>
              <Link 
                href="/services"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 hover:shadow-2xl hover:scale-110 transition-all duration-300"
              >
                View All Services
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
                  Making the world a better place through constructing elegant hierarchies. Not just about providing serve to humanity 
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
                  <li><Link href="/portfolio" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:translate-x-1 inline-block transition-all">Projects</Link></li>
                  <li><Link href="/team" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:translate-x-1 inline-block transition-all">Team</Link></li>
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