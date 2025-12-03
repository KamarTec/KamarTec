"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, Facebook, Twitter, Linkedin, Github, Youtube, Menu, X, Moon, Sun, Mail, Phone, ExternalLink, Users, Award, Zap } from 'lucide-react';

export default function TeamPage() {
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
      bio: "Passionate full-stack developer with 8+ years of experience building scalable web applications.",
      email: "clement@kamartec.com",
      phone: "+233 50 123 4567",
      skills: ["React", "Node.js", "Python", "AWS"],
      social: { linkedin: "#", github: "#", twitter: "#" }
    },
    { 
      id: 'emmanuel-frimpong',
      name: "Emmanuel Kofi Frimpong", 
      role: "Lead Designer", 
      image: "/images/team/Emmanuel.jpg",
      bio: "Creative designer specializing in UI/UX and brand identity with a keen eye for detail.",
      email: "emmanuel@kamartec.com",
      phone: "+233 50 234 5678",
      skills: ["Figma", "Adobe XD", "Illustrator", "Photoshop"],
      social: { linkedin: "#", behance: "#", dribbble: "#" }
    },
    { 
      id: 'gerald-boakye',
      name: "Gerald Boakye", 
      role: "Web Developer", 
      image: "/images/team/Gerald.jpg",
      bio: "Frontend specialist focused on creating beautiful, performant user interfaces.",
      email: "gerald@kamartec.com",
      phone: "+233 50 345 6789",
      skills: ["React", "Vue.js", "Tailwind CSS", "TypeScript"],
      social: { linkedin: "#", github: "#" }
    },
    { 
      id: 'elvis-bonsu',
      name: "Elvis Osei Bonsu", 
      role: "Web Developer", 
      image: "/images/team/Elvis.jpg",
      bio: "Backend developer passionate about building robust APIs and database architectures.",
      email: "elvis@kamartec.com",
      phone: "+233 50 456 7890",
      skills: ["PHP", "Laravel", "MySQL", "Docker"],
      social: { linkedin: "#", github: "#" }
    },
    { 
      id: 'francis-mensah',
      name: "Francis Agyei Mensah", 
      role: "Data Analyst", 
      image: "/images/team/Francis.jpg",
      bio: "Data scientist transforming complex data into actionable business insights.",
      email: "francis@kamartec.com",
      phone: "+233 50 567 8901",
      skills: ["Python", "Power BI", "SQL", "Machine Learning"],
      social: { linkedin: "#", twitter: "#" }
    },
    { 
      id: 'albert-segu',
      name: "Albert Segu", 
      role: "Data Analyst", 
      image: "/images/team/Albert.jpg",
      bio: "Analytics expert helping businesses make data-driven decisions.",
      email: "albert@kamartec.com",
      phone: "+233 50 678 9012",
      skills: ["Excel", "Tableau", "R", "Statistics"],
      social: { linkedin: "#", twitter: "#" }
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
                <Link href="/portfolio" className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all">Projects</Link>
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
                <Link href="/portfolio" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Projects</Link>
                <Link href="/team" className="block py-2 text-red-500 font-medium">Team</Link>
                <Link href="/blog" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Blog</Link>
                <Link href="/contact" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Contact</Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center pt-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 dark:from-purple-800 dark:via-blue-800 dark:to-pink-800"></div>
          
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-40 left-20 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 w-full text-center">
            <span className="bg-purple-500 dark:bg-purple-600 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-medium inline-block mb-6 animate-fade-in">OUR TEAM</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-slide-up">
              Meet Our Team
            </h1>
            <p className="text-white text-lg sm:text-xl max-w-3xl mx-auto animate-slide-up animation-delay-200 leading-relaxed">
              The brilliant minds behind KamarTec Solutions. Passionate professionals dedicated to delivering exceptional tech solutions.
            </p>
          </div>
        </section>

        {/* Team Introduction */}
        <section className="py-16 sm:py-24 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
              <Users className="w-16 h-16 text-purple-600 dark:text-purple-400 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Team Culture
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                At KamarTec Solutions, we believe that great results come from great teamwork. Our diverse team of experts collaborates seamlessly to bring innovative ideas to life. We foster an environment of continuous learning, creativity, and mutual respect.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Each team member brings unique skills and perspectives, creating a dynamic ecosystem where innovation thrives and excellence is the standard.
              </p>
            </div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <span className="bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 px-4 py-2 rounded-full text-sm font-medium inline-block mb-4">OUR EXPERTS</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Meet The Experts
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                Get to know the talented individuals who make KamarTec Solutions exceptional
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Link 
                  key={member.id}
                  href={`/team/${member.id}`}
                  className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-64">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {member.name}
                    </h3>
                    <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                      {member.role}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2">
                      {member.bio}
                    </p>
                    
                    {/* Skills Preview */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {member.skills.slice(0, 3).map((skill, idx) => (
                        <span 
                          key={idx}
                          className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                      {member.skills.length > 3 && (
                        <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full text-xs">
                          +{member.skills.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* View Profile Button */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium group-hover:gap-3 transition-all">
                        View Profile
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="flex gap-2">
                        {member.social.linkedin && (
                          <Linkedin className="text-blue-600 dark:text-blue-400 w-5 h-5" />
                        )}
                        {member.social.github && (
                          <Github className="text-gray-700 dark:text-gray-300 w-5 h-5" />
                        )}
                        {member.social.twitter && (
                          <Twitter className="text-blue-400 dark:text-blue-300 w-5 h-5" />
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Join Our Team CTA */}
        <section className="py-24 sm:py-32 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 dark:from-purple-800 dark:via-pink-800 dark:to-blue-800 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <Users className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Want to Join Our Team?
            </h2>
            <p className="text-white text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
              We're always looking for talented, passionate individuals who want to make a difference. Join us in building the future of technology.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-purple-700 px-8 py-4 rounded-full font-bold hover:bg-gray-100 hover:shadow-2xl hover:scale-110 transition-all duration-300"
              >
                <Mail size={20} />
                Send Your Resume
              </Link>
              <Link 
                href="#"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 hover:shadow-2xl hover:scale-110 transition-all duration-300"
              >
                View Open Positions
                <ExternalLink size={20} />
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
                  <li><Link href="/portfolio" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:translate-x-1 inline-block transition-all">Projects</Link></li>
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