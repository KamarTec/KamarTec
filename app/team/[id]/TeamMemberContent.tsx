"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, Facebook, Twitter, Linkedin, Github, Youtube, Menu, X, Moon, Sun, Mail, Phone, ExternalLink, ArrowLeft, Calendar, Briefcase, MapPin, Award, Code, Database, Palette, Cpu, Zap, Star, Users } from 'lucide-react';

export default function TeamMemberContent({ memberId }: { memberId: string }) {
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

  const teamMembers = [
    { 
      id: 'clement-obeng',
      name: "Clement Obeng", 
      role: "Lead Web Developer", 
      image: "/images/team/Clement.jpg",
      bio: "Passionate full-stack developer with 8+ years of experience building scalable web applications. Clement leads our development team with expertise in modern web technologies and architecture design. He has successfully delivered over 50 projects for clients ranging from startups to enterprise corporations.",
      email: "clement@kamartec.com",
      phone: "+233 50 123 4567",
      skills: ["React", "Node.js", "Python", "AWS", "MongoDB", "Docker", "GraphQL", "TypeScript"],
      social: { linkedin: "#", github: "#", twitter: "#" },
      location: "Accra, Ghana",
      experience: "8+ years",
      education: "BSc. Computer Science"
    },
    { 
      id: 'emmanuel-frimpong',
      name: "Emmanuel Kofi Frimpong", 
      role: "Lead Designer", 
      image: "/images/team/Emmanuel.jpg",
      bio: "Creative designer specializing in UI/UX and brand identity with a keen eye for detail. Emmanuel transforms complex ideas into intuitive, beautiful designs that users love. His design philosophy centers around user-centered design principles and accessibility.",
      email: "emmanuel@kamartec.com",
      phone: "+233 50 234 5678",
      skills: ["Figma", "Adobe XD", "Illustrator", "Photoshop", "UI/UX Design", "Prototyping", "Design Systems", "Wireframing"],
      social: { linkedin: "#", behance: "#", dribbble: "#" },
      location: "Cape Coast, Ghana",
      experience: "6+ years",
      education: "BA. Graphic Design"
    },
    { 
      id: 'gerald-boakye',
      name: "Gerald Boakye", 
      role: "Web Developer", 
      image: "/images/team/Gerald.jpg",
      bio: "Frontend specialist focused on creating beautiful, performant user interfaces. Gerald brings designs to life with clean, efficient code and attention to detail. He specializes in responsive design and performance optimization.",
      email: "gerald@kamartec.com",
      phone: "+233 50 345 6789",
      skills: ["React", "Vue.js", "Tailwind CSS", "TypeScript", "Next.js", "SASS", "Webpack", "Jest"],
      social: { linkedin: "#", github: "#" },
      location: "Kumasi, Ghana",
      experience: "4+ years",
      education: "BSc. Information Technology"
    },
    { 
      id: 'elvis-bonsu',
      name: "Elvis Osei Bonsu", 
      role: "Web Developer", 
      image: "/images/team/Elvis.jpg",
      bio: "Backend developer passionate about building robust APIs and database architectures. Elvis ensures our applications are secure, scalable, and performant. He has extensive experience with microservices architecture and cloud infrastructure.",
      email: "elvis@kamartec.com",
      phone: "+233 50 456 7890",
      skills: ["PHP", "Laravel", "MySQL", "Docker", "Redis", "API Development", "REST APIs", "Linux"],
      social: { linkedin: "#", github: "#" },
      location: "Accra, Ghana",
      experience: "5+ years",
      education: "BSc. Software Engineering"
    },
    { 
      id: 'francis-mensah',
      name: "Francis Agyei Mensah", 
      role: "Data Analyst", 
      image: "/images/team/Francis.jpg",
      bio: "Data scientist transforming complex data into actionable business insights. Francis helps our clients make data-driven decisions through advanced analytics and machine learning. His expertise includes predictive modeling and business intelligence.",
      email: "francis@kamartec.com",
      phone: "+233 50 567 8901",
      skills: ["Python", "Power BI", "SQL", "Machine Learning", "Pandas", "NumPy", "Data Visualization", "Statistical Analysis"],
      social: { linkedin: "#", twitter: "#" },
      location: "Accra, Ghana",
      experience: "4+ years",
      education: "MSc. Data Science"
    },
    { 
      id: 'albert-segu',
      name: "Albert Segu", 
      role: "Data Analyst", 
      image: "/images/team/Albert.jpg",
      bio: "Analytics expert helping businesses make data-driven decisions. Albert specializes in business intelligence and data visualization, turning raw data into meaningful insights. He works closely with clients to understand their data needs.",
      email: "albert@kamartec.com",
      phone: "+233 50 678 9012",
      skills: ["Excel", "Tableau", "R", "Statistics", "Data Cleaning", "Dashboard Design", "Google Analytics", "A/B Testing"],
      social: { linkedin: "#", twitter: "#" },
      location: "Takoradi, Ghana",
      experience: "3+ years",
      education: "BSc. Statistics"
    }
  ];

  const member = teamMembers.find(m => m.id === memberId);
  
  if (!member) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Team Member Not Found</h1>
          <Link href="/team" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
            ← Back to Team
          </Link>
        </div>
      </div>
    );
  }

  const otherMembers = teamMembers.filter(m => m.id !== memberId).slice(0, 3);

  const memberProjects = [
    {
      title: "FocusPal Mobile App",
      description: "Student productivity application with grade tracking",
      image: "/images/portfolio/focuspal.png",
      role: member.role.includes('Developer') ? "Lead Developer" : member.role.includes('Design') ? "UI/UX Designer" : "Data Analyst"
    },
    {
      title: "Sellzan E-commerce",
      description: "Complete e-commerce platform for small businesses",
      image: "/images/portfolio/sellzan.png",
      role: member.role.includes('Developer') ? "Backend Developer" : member.role.includes('Design') ? "Lead Designer" : "Analytics Lead"
    },
    {
      title: "Corporate Dashboard",
      description: "Business intelligence dashboard for enterprise clients",
      image: "/images/projects/dashboard.jpg",
      role: member.role.includes('Analyst') ? "Lead Analyst" : "Contributor"
    }
  ];

  const skillColors = [
    "bg-gradient-to-r from-purple-500 to-pink-500",
    "bg-gradient-to-r from-blue-500 to-cyan-500",
    "bg-gradient-to-r from-pink-500 to-red-500",
    "bg-gradient-to-r from-green-500 to-teal-500",
    "bg-gradient-to-r from-orange-500 to-yellow-500",
    "bg-gradient-to-r from-purple-500 to-indigo-500",
    "bg-gradient-to-r from-cyan-500 to-blue-500",
    "bg-gradient-to-r from-red-500 to-pink-500"
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
                <Link href="/projects" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all">Projects</Link>
                <Link href="/team" className="text-sm lg:text-base text-red-500 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500">Team</Link>
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
                <Link href="/services" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Services</Link>
                <Link href="/projects" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Projects</Link>
                <Link href="/team" className="block py-2 text-red-500 font-medium">Team</Link>
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
                <Link href="/team" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Team</Link>
                <span>/</span>
                <span className="text-gray-900 dark:text-white font-medium">{member.name}</span>
              </div>
              <Link 
                href="/team"
                className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-all hover:gap-3"
              >
                <ArrowLeft size={20} />
                Back to Team
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="pb-16 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 dark:from-purple-700 dark:to-blue-700 rounded-3xl p-8 sm:p-12 shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Left Column - Image */}
                <div className="order-2 lg:order-1">
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto lg:mx-0">
                    <div className="absolute -inset-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-30"></div>
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="relative w-full h-full rounded-3xl object-cover shadow-2xl"
                    />
                  </div>
                </div>

                {/* Right Column - Info */}
                <div className="order-1 lg:order-2 text-center lg:text-left">
                  <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium inline-block mb-4">
                    {member.role}
                  </span>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                    {member.name}
                  </h1>
                  <p className="text-white/90 text-lg mb-6">
                    {member.bio.split('. ')[0] + '.'}
                  </p>
                  
                  {/* Contact Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 justify-center lg:justify-start">
                      <Mail className="text-white w-5 h-5" />
                      <span className="text-white">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-3 justify-center lg:justify-start">
                      <Phone className="text-white w-5 h-5" />
                      <span className="text-white">{member.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 justify-center lg:justify-start">
                      <MapPin className="text-white w-5 h-5" />
                      <span className="text-white">{member.location}</span>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-3 justify-center lg:justify-start">
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} className="bg-white/20 p-3 rounded-full hover:bg-white/30 hover:scale-110 transition-all">
                        <Linkedin className="text-white w-5 h-5" />
                      </a>
                    )}
                    {member.social.github && (
                      <a href={member.social.github} className="bg-white/20 p-3 rounded-full hover:bg-white/30 hover:scale-110 transition-all">
                        <Github className="text-white w-5 h-5" />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a href={member.social.twitter} className="bg-white/20 p-3 rounded-full hover:bg-white/30 hover:scale-110 transition-all">
                        <Twitter className="text-white w-5 h-5" />
                      </a>
                    )}
                    {member.social.behance && (
                      <a href={member.social.behance} className="bg-white/20 p-3 rounded-full hover:bg-white/30 hover:scale-110 transition-all">
                        <Briefcase className="text-white w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Bio & Skills */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Bio Section */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">About {member.name.split(' ')[0]}</h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  <p>{member.bio}</p>
                  <p>With {member.experience} of professional experience, {member.name.split(' ')[0]} has developed expertise across multiple domains and continues to push boundaries in their field.</p>
                  <p>When not working, {member.name.split(' ')[0]} enjoys contributing to open-source projects, mentoring junior developers, and exploring new technologies.</p>
                </div>

                {/* Experience & Education */}
                <div className="grid sm:grid-cols-2 gap-6 mt-8">
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <Calendar className="text-purple-600 dark:text-purple-400 w-6 h-6" />
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">Experience</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{member.experience}</p>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <Award className="text-pink-600 dark:text-pink-400 w-6 h-6" />
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">Education</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{member.education}</p>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Skills & Expertise</h2>
                <div className="flex flex-wrap gap-3">
                  {member.skills.map((skill, idx) => (
                    <span 
                      key={idx}
                      className={`${skillColors[idx % skillColors.length]} text-white px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Contact Button */}
                <div className="mt-8 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-2xl">
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4">Work With {member.name.split(' ')[0]}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Interested in collaborating or have a project in mind?
                  </p>
                  <Link 
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-medium hover:from-purple-700 hover:to-blue-700 hover:shadow-xl transition-all"
                  >
                    <Mail size={18} />
                    Contact Me
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Projects */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Recent Projects
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg text-center mb-12 max-w-2xl mx-auto">
              Projects where {member.name.split(' ')[0]} played a key role
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {memberProjects.map((project, idx) => (
                <div 
                  key={idx}
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
                    <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {project.role}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet Other Team Members */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Meet Other Team Members
              </h2>
              <Link 
                href="/team"
                className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium hover:gap-3 transition-all"
              >
                View Full Team <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherMembers.map((otherMember, idx) => (
                <Link 
                  key={otherMember.id}
                  href={`/team/${otherMember.id}`}
                  className="group bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center gap-4">
                    <img 
                      src={otherMember.image} 
                      alt={otherMember.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {otherMember.name}
                      </h3>
                      <p className="text-purple-600 dark:text-purple-400 text-sm">
                        {otherMember.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mt-4 text-sm line-clamp-2">
                    {otherMember.bio}
                  </p>
                </Link>
              ))}
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
              Ready to Work Together?
            </h2>
            <p className="text-white text-lg sm:text-xl mb-8">
              Let's discuss how {member.name.split(' ')[0]} and the KamarTec team can help bring your project to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-purple-700 px-8 py-4 rounded-full font-bold hover:bg-gray-100 hover:shadow-2xl hover:scale-110 transition-all duration-300"
              >
                Start a Project
                <ArrowRight size={20} />
              </Link>
              <Link 
                href="/team"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 hover:shadow-2xl hover:scale-110 transition-all duration-300"
              >
                Meet Full Team
                <Users size={20} />
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
                  <li><Link href="/team" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:translate-x-1 inline-block transition-all">Team</Link></li>
                  <li><Link href="/projects" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:translate-x-1 inline-block transition-all">Projects</Link></li>
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