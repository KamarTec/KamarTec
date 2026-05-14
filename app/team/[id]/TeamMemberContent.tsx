"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Search, Facebook, Twitter, Linkedin, Github, Youtube,
  Menu, X, Moon, Sun, Mail, Phone, ExternalLink, ArrowLeft,
  Calendar, Briefcase, MapPin, Award, Shield, Users, Instagram, BookOpen
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  image: string;
  bio: string;
  email: string;
  phone?: string;
  location: string;
  experience: string;
  education: string;
  skills: string[];
  social: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
    substack?: string;
    behance?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: 'clement-obeng',
    name: "Clement Obeng",
    role: "Lead Full-Stack Developer",
    department: "Software Development",
    image: "/images/team/Clement.jpg",
    bio: "Passionate full-stack developer leading KamarTec's engineering vision. With deep expertise in React, Flutter, and cloud infrastructure, Clement has delivered 50+ projects ranging from student apps to enterprise platforms. He mentors the team and drives architectural decisions that keep KamarTec ahead of the curve.",
    email: "clement@kamartec.com",
    phone: "+233 53 811 8529",
    location: "Assin Fosu / Cape Coast, Ghana",
    experience: "4+ years",
    education: "BSc. Computer Science, UCC",
    skills: ["React", "Flutter", "Node.js", "Python", "AWS", "MongoDB", "Docker", "PostgreSQL", "TypeScript", "GraphQL"],
    social: { linkedin: "https://www.linkedin.com/in/clement-obeng-3b724b113/", github: "https://github.com/quirkydude" }
  },
  {
    id: 'elvis-bonsu',
    name: "Elvis Osei Bonsu",
    role: "Frontend Developer",
    department: "Software Development",
    image: "/images/team/Elvis.jpg",
    bio: "Frontend developer who believes great software lives at the intersection of clean code and delightful UX. Elvis crafts responsive, accessible interfaces with a meticulous eye for detail. He also writes about tech and design on his Substack publication, sharing knowledge with the African developer community.",
    email: "oseie0510@gmail.com",
    phone: "+233 25 716 3572",
    location: "Techiman, Ghana",
    experience: "3+ years",
    education: "BSc. Computer Science, UCC",
    skills: ["React", "JavaScript", "TypeScript", "Next.js", "Tailwind CSS", "HTML/CSS", "Responsive Design", "Figma (handoff)"],
    social: {
      github: "https://github.com/retrosmilyy",
      linkedin: "https://www.linkedin.com/in/elvisosei",
      instagram: "https://www.instagram.com/_r3vrs_",
      substack: "https://el0703.substack.com"
    }
  },
  {
    id: 'derry-bandoh',
    name: "Derry Atta Bandoh",
    role: "Backend Developer",
    department: "Software Development",
    image: "/images/team/Derry.jpg",
    bio: "Backend engineer with a passion for building powerful, fault-tolerant systems. Derry designs the APIs, databases, and cloud infrastructure that power KamarTec's products. He is committed to writing secure, performant server-side code and bringing strong DevOps practices to every project.",
    email: "derrybandoh100@gmail.com",
    phone: "+233 59 680 9347",
    location: "Ghana",
    experience: "3+ years",
    education: "BSc. Computer Science",
    skills: ["Node.js", "Python", "REST APIs", "MongoDB", "MySQL", "Docker", "Express.js", "PostgreSQL", "AWS", "Redis"],
    social: {
      github: "https://github.com/Derry-Bandoh",
      linkedin: "https://www.linkedin.com/in/derry-bandoh",
      instagram: "https://www.instagram.com/derrybandoh"
    }
  },
  {
    id: 'richard-essaw',
    name: "Richard Essaw",
    role: "Frontend Developer",
    department: "Software Development",
    image: "/images/team/Richard.jpg",
    bio: "Frontend developer who brings creative energy and technical precision to every project. Richard specialises in building responsive, cross-browser compatible interfaces that look great on every device. His attention to detail and commitment to quality make him a valued member of the KamarTec engineering team.",
    email: "ritchiedon267@gmail.com",
    phone: "+233 54 955 0538",
    location: "Kumasi, Ghana",
    experience: "2+ years",
    education: "BSc. Computer Science",
    skills: ["HTML", "CSS", "JavaScript", "React", "Responsive Design", "Bootstrap", "SASS", "UI Development", "Cross-browser Testing"],
    social: { github: "https://github.com/ritchie-don" }
  },
  {
    id: 'gerald-boakye',
    name: "Gerald Boakye",
    role: "Web Developer",
    department: "Software Development",
    image: "/images/team/Gerald.jpg",
    bio: "Full-spectrum web developer who bridges design and engineering with elegance. Gerald focuses on performance optimisation and clean architecture, ensuring the applications he builds are fast, maintainable, and a joy to use. He champions testing best practices across the development team.",
    email: "gerald@kamartec.com",
    location: "Kumasi, Ghana",
    experience: "4+ years",
    education: "BSc. Computer Science",
    skills: ["React", "Vue.js", "Tailwind CSS", "TypeScript", "Next.js", "SASS", "Webpack", "Jest", "Performance Optimisation"],
    social: { linkedin: "#", github: "#" }
  },
  {
    id: 'kanbros-antwi',
    name: "Kanbros Kojo Antwi",
    role: "Cybersecurity & AI Engineer",
    department: "Cybersecurity & AI",
    image: "/images/team/Kanbros.jpg",
    bio: "Cybersecurity expert and AI prompt engineer who protects digital assets and builds intelligent systems. Kanbros conducts penetration testing, security audits, and threat modelling for KamarTec's clients. His AI expertise helps the team integrate smart, culturally aware AI capabilities into products built for Africa.",
    email: "antwikanbro04@gmail.com",
    phone: "+233 54 161 8828",
    location: "Central Region, Ghana",
    experience: "3+ years",
    education: "BSc. Computer Science",
    skills: ["Cybersecurity", "AI Prompt Engineering", "Python", "Network Security", "Ethical Hacking", "Risk Assessment", "OSINT", "Penetration Testing", "Security Auditing"],
    social: {
      github: "https://github.com/Kanbros72",
      linkedin: "https://www.linkedin.com/in/antwi-kanbros-6a7971302"
    }
  },
  {
    id: 'albert-segu',
    name: "Albert Kofi Segu",
    role: "Data Scientist",
    department: "Data Science",
    image: "/images/team/Albert.jpg",
    bio: "Data scientist applying machine learning and statistical modelling to real-world business challenges. Albert helps KamarTec's clients move beyond gut-feel decisions to data-driven strategy. His work spans predictive modelling, deep learning, and business intelligence dashboards that actually get used.",
    email: "segualbert85@gmail.com",
    phone: "+233 20 350 1290",
    location: "Ghana",
    experience: "3+ years",
    education: "BSc. Data Science / Computer Science",
    skills: ["Python", "Machine Learning", "Data Science", "SQL", "Tableau", "Statistics", "Excel", "Deep Learning", "Scikit-learn", "TensorFlow"],
    social: { linkedin: "https://www.linkedin.com/in/albert-kofi-segu" }
  },
  {
    id: 'francis-mensah',
    name: "Francis Mensah Agyei",
    role: "Data Analyst",
    department: "Data Science",
    image: "/images/team/Francis.jpg",
    bio: "Data analyst who translates messy datasets into clear, compelling stories. Francis equips clients with the Power BI dashboards and Python pipelines they need to make fast, confident decisions. His blend of statistical rigour and business acumen makes him an invaluable partner across all industries.",
    email: "francismensahagyei@gmail.com",
    phone: "+233 59 578 7712",
    location: "Ghana",
    experience: "3+ years",
    education: "BSc. Data Science / Computer Science",
    skills: ["Python", "Power BI", "SQL", "Machine Learning", "Data Analysis", "Statistics", "Pandas", "NumPy", "Data Visualisation"],
    social: { github: "https://github.com/Francis" }
  },
  {
    id: 'emmanuel-frimpong',
    name: "Emmanuel Kofi Frimpong",
    role: "Lead Designer",
    department: "Design",
    image: "/images/team/Emmanuel.jpg",
    bio: "Creative lead who transforms complex problems into intuitive, beautiful products. Emmanuel is KamarTec's design voice — setting the visual language, building design systems, and ensuring every pixel tells the right story. His work spans mobile apps, web platforms, brand identities, and motion graphics.",
    email: "kfrimp060@gmail.com",
    phone: "+233 59 285 2555",
    location: "Cape Coast, Ghana",
    experience: "4+ years",
    education: "BSc. Computer Science, UCC",
    skills: ["Figma", "Adobe XD", "Illustrator", "Photoshop", "UI/UX Design", "Brand Identity", "Motion Graphics", "Prototyping", "Design Systems", "Wireframing"],
    social: {
      linkedin: "https://www.linkedin.com/in/emmanuel-kofi-frimpong-748b06364",
      instagram: "https://www.instagram.com/koffi_lamar.jr",
      twitter: "https://twitter.com/koffi_lamar"
    }
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

const deptColors: Record<string, string> = {
  'Software Development': 'from-blue-600 to-cyan-600',
  'Cybersecurity & AI': 'from-red-600 to-orange-600',
  'Data Science': 'from-green-600 to-teal-600',
  'Design': 'from-pink-600 to-purple-600',
};

export default function TeamMemberContent({ memberId }: { memberId: string }) {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

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

  const member = teamMembers.find(m => m.id === memberId);

  if (!isMounted) {
    return <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center"><div className="text-gray-900 dark:text-white">Loading…</div></div>;
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Team Member Not Found</h1>
          <Link href="/team" className="text-purple-600 dark:text-purple-400 hover:text-purple-700">← Back to Team</Link>
        </div>
      </div>
    );
  }

  const otherMembers = teamMembers.filter(m => m.id !== memberId).slice(0, 3);

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
                {[['/', 'Home'], ['/about', 'About'], ['/services', 'Services'], ['/portfolio', 'Projects'], ['/blog', 'Blog'], ['/contact', 'Contact']].map(([href, label]) => (
                  <Link key={href} href={href} className="text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all">{label}</Link>
                ))}
                <Link href="/team" className="text-sm text-purple-600 font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-purple-600">Team</Link>
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

        {/* ── Breadcrumb ──────────────────────────────────────── */}
        <div className="pt-24 pb-6 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/team" className="hover:text-purple-600 transition-colors">Team</Link>
              <span>/</span>
              <span className="text-gray-900 dark:text-white font-medium">{member.name}</span>
            </div>
            <Link href="/team" className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium hover:gap-3 transition-all">
              <ArrowLeft size={18} /> Back to Team
            </Link>
          </div>
        </div>

        {/* ── Hero Card ───────────────────────────────────────── */}
        <section className="pb-20 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className={`bg-gradient-to-br from-purple-600 to-blue-600 dark:from-purple-800 dark:to-blue-800 rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden relative`}>
              {/* bg decoration */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl" />

              <div className="grid lg:grid-cols-2 gap-10 items-center relative z-10">
                <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-40 animate-pulse" />
                    <button
                      onClick={() => setLightboxOpen(true)}
                      className="relative block w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 cursor-zoom-in hover:border-white/40 transition-all group focus:outline-none bg-gray-950"
                      aria-label="View full image"
                    >
                      <img src={member.image} alt={member.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        onError={e => { (e.target as HTMLImageElement).src = '/images/team/placeholder.jpg'; }} />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-medium bg-black/50 px-3 py-1 rounded-full">Tap to expand</span>
                      </div>
                    </button>
                    <div className={`absolute -bottom-3 -right-3 bg-gradient-to-r ${deptColors[member.department] || 'from-purple-600 to-blue-600'} text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-xl`}>
                      {member.department}
                    </div>
                  </div>
                </div>

                <div className="order-1 lg:order-2 text-center lg:text-left">
                  <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-4">{member.role}</span>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-3 leading-tight">{member.name}</h1>
                  <p className="text-white/80 text-base mb-6 leading-relaxed">{member.bio.split('. ')[0]}.</p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-3 justify-center lg:justify-start">
                      <Mail className="text-white/70 w-4 h-4 flex-shrink-0" />
                      <a href={`mailto:${member.email}`} className="text-white/90 text-sm hover:text-white transition-colors">{member.email}</a>
                    </div>
                    {member.phone && (
                      <div className="flex items-center gap-3 justify-center lg:justify-start">
                        <Phone className="text-white/70 w-4 h-4 flex-shrink-0" />
                        <span className="text-white/90 text-sm">{member.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 justify-center lg:justify-start">
                      <MapPin className="text-white/70 w-4 h-4 flex-shrink-0" />
                      <span className="text-white/90 text-sm">{member.location}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-center lg:justify-start flex-wrap">
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="bg-white/20 hover:bg-white/30 p-2.5 rounded-full hover:scale-110 transition-all" title="LinkedIn">
                        <Linkedin className="text-white w-5 h-5" />
                      </a>
                    )}
                    {member.social.github && (
                      <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="bg-white/20 hover:bg-white/30 p-2.5 rounded-full hover:scale-110 transition-all" title="GitHub">
                        <Github className="text-white w-5 h-5" />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="bg-white/20 hover:bg-white/30 p-2.5 rounded-full hover:scale-110 transition-all" title="Twitter/X">
                        <Twitter className="text-white w-5 h-5" />
                      </a>
                    )}
                    {member.social.instagram && (
                      <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="bg-white/20 hover:bg-white/30 p-2.5 rounded-full hover:scale-110 transition-all" title="Instagram">
                        <Instagram className="text-white w-5 h-5" />
                      </a>
                    )}
                    {member.social.substack && (
                      <a href={member.social.substack} target="_blank" rel="noopener noreferrer" className="bg-white/20 hover:bg-white/30 p-2.5 rounded-full hover:scale-110 transition-all" title="Substack">
                        <BookOpen className="text-white w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Bio & Skills ─────────────────────────────────────── */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">About {member.name.split(' ')[0]}</h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                  <p>{member.bio}</p>
                  <p>With {member.experience} of professional experience, {member.name.split(' ')[0]} continues to push boundaries and mentor the next generation of Ghanaian tech talent.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mt-10">
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <Calendar className="text-purple-600 dark:text-purple-400 w-6 h-6" />
                      <h3 className="font-bold text-gray-900 dark:text-white">Experience</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{member.experience}</p>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <Award className="text-pink-600 dark:text-pink-400 w-6 h-6" />
                      <h3 className="font-bold text-gray-900 dark:text-white">Education</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{member.education}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Skills</h2>
                <div className="flex flex-wrap gap-2.5 mb-8">
                  {member.skills.map((skill, idx) => (
                    <span key={idx} className={`${skillColors[idx % skillColors.length]} text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:scale-105 transition-transform shadow-sm`}>
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-2xl">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Work With {member.name.split(' ')[0]}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-5">Have a project in mind? Let's build something great together.</p>
                  <Link href="/contact"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 hover:shadow-xl transition-all">
                    <Mail size={16} /> Get in Touch
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Other Team Members ───────────────────────────────── */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">Meet Other Team Members</h2>
              <Link href="/team" className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold hover:gap-3 transition-all">
                View Full Team <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherMembers.map(other => (
                <Link key={other.id} href={`/team/${other.id}`}
                  className="group bg-white dark:bg-gray-800 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl flex-shrink-0 overflow-hidden bg-gray-900">
                      <img src={other.image} alt={other.name} className="w-full h-full object-contain"
                        onError={e => { (e.target as HTMLImageElement).src = '/images/team/placeholder.jpg'; }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors text-sm">{other.name}</h3>
                      <p className="text-purple-600 dark:text-purple-400 text-xs mt-0.5">{other.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mt-4 text-xs leading-relaxed line-clamp-2">{other.bio}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="py-28 bg-gradient-to-br from-purple-700 via-blue-700 to-pink-700 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-20 animate-blob" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000" />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">Ready to Work Together?</h2>
            <p className="text-white/90 text-lg mb-10">
              Let's discuss how {member.name.split(' ')[0]} and the KamarTec team can bring your project to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-white text-purple-700 px-8 py-4 rounded-full font-bold hover:bg-gray-100 hover:shadow-2xl hover:scale-110 transition-all duration-300">
                Start a Project <ArrowRight size={20} />
              </Link>
              <Link href="/team"
                className="inline-flex items-center gap-2 bg-white/10 border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 hover:scale-110 transition-all duration-300">
                Meet Full Team <Users size={20} />
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
                  {[['/', 'Home'], ['/about', 'About'], ['/team', 'Team'], ['/portfolio', 'Projects'], ['/blog', 'Blog'], ['/contact', 'Contact']].map(([href, label]) => (
                    <li key={href}><Link href={href} className="text-gray-400 hover:text-purple-400 hover:translate-x-1 inline-block transition-all text-sm">{label}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-white mb-5">Contact</h3>
                <div className="space-y-3 text-sm text-gray-400">
                  <p>University of Cape Coast, Ghana</p>
                  <p>+233 (0) 592852555</p>
                  <p>kamartecsolutions@gmail.com</p>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white mb-5">Newsletter</h3>
                <div className="flex gap-2 mt-3">
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

        {/* Lightbox */}
        {lightboxOpen && (
          <div
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <img
              src={member.image}
              alt={member.name}
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
              onClick={e => e.stopPropagation()}
            />
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">{member.name}</p>
          </div>
        )}
      </div>
    </div>
  );
}
