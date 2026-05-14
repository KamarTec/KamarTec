"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import NewsletterForm from '../components/NewsletterForm';
import {
  ArrowRight, Search, Facebook, Twitter, Linkedin, Github, Youtube,
  Menu, X, Moon, Sun, Mail, Phone, ExternalLink, Users, Instagram,
  BookOpen, Shield, ChevronDown
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  image: string;
  bio: string;
  email: string;
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

export default function TeamPage() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [activeDept, setActiveDept] = useState('All');
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const saved = localStorage.getItem('darkMode');
    if (saved) {
      setDarkMode(saved === 'true');
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
    if (!isMounted) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLDivElement).dataset.memberId;
            if (id) setVisibleCards(prev => new Set([...prev, id]));
          }
        });
      },
      { threshold: 0.12 }
    );
    cardRefs.current.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [isMounted, activeDept]);

  const teamMembers: TeamMember[] = [
    {
      id: 'clement-obeng',
      name: "Clement Obeng",
      role: "Lead Full-Stack Developer",
      department: "Software Development",
      image: "/images/team/Clement.jpg",
      bio: "Passionate full-stack developer leading KamarTec's engineering vision. Experienced in building scalable web and mobile applications from concept to deployment.",
      email: "clement@kamartec.com",
      skills: ["React", "Flutter", "Node.js", "Python", "AWS", "MongoDB", "Docker", "TypeScript"],
      social: { linkedin: "https://www.linkedin.com/in/clement-obeng-3b724b113/", github: "https://github.com/quirkydude" }
    },
    {
      id: 'elvis-bonsu',
      name: "Elvis Osei Bonsu",
      role: "Frontend Developer",
      department: "Software Development",
      image: "/images/team/Elvis.jpg",
      bio: "Frontend developer crafting beautiful, performant user interfaces. Elvis turns complex designs into pixel-perfect, accessible experiences with clean code.",
      email: "oseie0510@gmail.com",
      skills: ["React", "JavaScript", "TypeScript", "Next.js", "Tailwind CSS", "HTML/CSS", "Responsive Design"],
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
      bio: "Backend engineer building the powerful infrastructure behind KamarTec's products. Derry specialises in scalable APIs, databases, and cloud architecture.",
      email: "derrybandoh100@gmail.com",
      skills: ["Node.js", "Python", "REST APIs", "MongoDB", "MySQL", "Docker", "Express.js", "PostgreSQL", "AWS"],
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
      bio: "Frontend developer focused on responsive, accessible web experiences. Richard brings creative problem-solving and attention to detail to every interface he builds.",
      email: "ritchiedon267@gmail.com",
      skills: ["HTML", "CSS", "JavaScript", "React", "Responsive Design", "Bootstrap", "SASS", "UI Development"],
      social: { github: "https://github.com/ritchie-don" }
    },
    {
      id: 'gerald-boakye',
      name: "Gerald Boakye",
      role: "Web Developer",
      department: "Software Development",
      image: "/images/team/Gerald.jpg",
      bio: "Full-spectrum web developer with a passion for performance and clean architecture. Gerald bridges the gap between design and engineering.",
      email: "gerald@kamartec.com",
      skills: ["React", "Vue.js", "Tailwind CSS", "TypeScript", "Next.js", "SASS", "Webpack", "Jest"],
      social: { linkedin: "#", github: "#" }
    },
    {
      id: 'kanbros-antwi',
      name: "Kanbros Kojo Antwi",
      role: "Cybersecurity & AI Engineer",
      department: "Cybersecurity & AI",
      image: "/images/team/Kanbros.jpg",
      bio: "Cybersecurity expert and AI prompt engineer protecting digital assets and building intelligent systems. Kanbros brings cutting-edge security practices to every project.",
      email: "antwikanbro04@gmail.com",
      skills: ["Cybersecurity", "AI Prompt Engineering", "Python", "Network Security", "Ethical Hacking", "Risk Assessment", "OSINT", "Penetration Testing"],
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
      bio: "Data scientist transforming raw data into strategic intelligence. Albert applies machine learning and statistical modelling to solve real-world business challenges.",
      email: "segualbert85@gmail.com",
      skills: ["Python", "Machine Learning", "Data Science", "SQL", "Tableau", "Statistics", "Excel", "Deep Learning"],
      social: { linkedin: "https://www.linkedin.com/in/albert-kofi-segu" }
    },
    {
      id: 'francis-mensah',
      name: "Francis Mensah Agyei",
      role: "Data Analyst",
      department: "Data Science",
      image: "/images/team/Francis.jpg",
      bio: "Data analyst turning complex datasets into clear, actionable insights. Francis helps clients make confident, data-driven decisions through advanced analytics.",
      email: "francismensahagyei@gmail.com",
      skills: ["Python", "Power BI", "SQL", "Machine Learning", "Data Analysis", "Statistics", "Pandas", "NumPy"],
      social: { github: "https://github.com/Francis" }
    },
    {
      id: 'emmanuel-frimpong',
      name: "Emmanuel Kofi Frimpong",
      role: "Lead Designer",
      department: "Design",
      image: "/images/team/Emmanuel.jpg",
      bio: "Creative lead specialising in UI/UX and brand identity. Emmanuel transforms complex ideas into intuitive, beautiful designs that users love and businesses trust.",
      email: "kfrimp060@gmail.com",
      skills: ["Figma", "Adobe XD", "Illustrator", "Photoshop", "UI/UX Design", "Brand Identity", "Motion Graphics", "Prototyping"],
      social: {
        linkedin: "https://www.linkedin.com/in/emmanuel-kofi-frimpong-748b06364",
        instagram: "https://www.instagram.com/koffi_lamar.jr",
        twitter: "https://twitter.com/koffi_lamar"
      }
    }
  ];

  const departments = ['All', 'Software Development', 'Cybersecurity & AI', 'Data Science', 'Design'];

  const deptColors: Record<string, string> = {
    'All': 'from-purple-600 to-blue-600',
    'Software Development': 'from-blue-600 to-cyan-600',
    'Cybersecurity & AI': 'from-red-600 to-orange-600',
    'Data Science': 'from-green-600 to-teal-600',
    'Design': 'from-pink-600 to-purple-600',
  };

  const filteredMembers = activeDept === 'All'
    ? teamMembers
    : teamMembers.filter(m => m.department === activeDept);

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

        {/* ── Header ─────────────────────────────────────────── */}
        <header
          className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md z-50 transition-all duration-300"
          style={{
            boxShadow: scrollY > 50 ? '0 4px 20px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.05)',
            borderRadius: scrollY > 50 ? '0 0 24px 24px' : '0'
          }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shadow-lg">
                  <img src="/images/logo/favicon.png" alt="KamarTec Logo" className="w-full h-full object-cover" />
                </div>
                <div className="hidden sm:block">
                  <div className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">KamarTec</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 tracking-wider">SOLUTIONS</div>
                </div>
              </Link>

              <div className="hidden lg:flex items-center gap-2 flex-1 max-w-md mx-8">
                <div className="relative flex-1 group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors" size={18} />
                  <input type="text" placeholder="Looking for something?" value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" />
                </div>
              </div>

              <nav className="hidden md:flex items-center gap-4 lg:gap-6">
                {[['/', 'Home'], ['/about', 'About'], ['/services', 'Services'], ['/portfolio', 'Projects'], ['/blog', 'Blog'], ['/contact', 'Contact']].map(([href, label]) => (
                  <Link key={href} href={href} className="text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all">{label}</Link>
                ))}
                <Link href="/team" className="text-sm lg:text-base text-purple-600 font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-purple-600">Team</Link>
              </nav>

              <div className="flex items-center gap-2 sm:gap-3">
                <button onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:scale-110">
                  {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-gray-700" />}
                </button>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  {mobileMenuOpen ? <X size={24} className="text-gray-700 dark:text-gray-300" /> : <Menu size={24} className="text-gray-700 dark:text-gray-300" />}
                </button>
              </div>
            </div>

            <div className={`md:hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-[520px] opacity-100 mt-4 overflow-y-auto' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <div className="py-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="text" placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                {[['/', 'Home'], ['/about', 'About'], ['/services', 'Services'], ['/portfolio', 'Projects'], ['/team', 'Team'], ['/blog', 'Blog'], ['/contact', 'Contact']].map(([href, label]) => (
                  <Link key={href} href={href} className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600">{label}</Link>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* ── Hero ────────────────────────────────────────────── */}
        <section className="relative min-h-[65vh] flex items-center pt-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-blue-700 to-pink-700 dark:from-purple-900 dark:via-blue-900 dark:to-pink-900" />

          {/* Animated blobs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-16 right-16 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
            <div className="absolute top-40 left-16 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000" />
            <div className="absolute bottom-16 left-1/2 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-4000" />
            {/* Floating rings */}
            <div className="absolute top-1/4 right-1/4 w-24 h-24 border-2 border-white/20 rounded-full animate-rotate-slow" />
            <div className="absolute bottom-1/3 left-1/4 w-16 h-16 border-2 border-pink-300/30 rounded-full animate-float" />
            <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-white/20 rounded-full animate-float-slow animation-delay-1000" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 w-full text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <Users size={16} />
              <span>{teamMembers.length} TALENTED PROFESSIONALS</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight animate-slide-up">
              Meet Our{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">Dream Team</span>
              </span>
            </h1>
            <p className="text-white/90 text-lg sm:text-xl max-w-3xl mx-auto animate-slide-up animation-delay-200 leading-relaxed">
              The brilliant minds behind KamarTec Solutions — passionate professionals spanning software, cybersecurity, data science, and design.
            </p>

            {/* Dept quick-nav */}
            <div className="flex flex-wrap justify-center gap-3 mt-10 animate-fade-in animation-delay-400">
              {departments.map(dept => (
                <button key={dept} onClick={() => setActiveDept(dept)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeDept === dept ? 'bg-white text-purple-700 shadow-lg scale-105' : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'}`}>
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-gentle">
            <ChevronDown size={28} className="text-white/70" />
          </div>
        </section>

        {/* ── Department Filter (sticky) ──────────────────────── */}
        <section className="sticky top-[72px] z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 py-4 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
              {departments.map(dept => (
                <button key={dept} onClick={() => setActiveDept(dept)}
                  className={`flex-shrink-0 px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                    activeDept === dept
                      ? `bg-gradient-to-r ${deptColors[dept]} text-white shadow-lg scale-105`
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}>
                  {dept === 'All' ? `All (${teamMembers.length})` : dept}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team Grid ────────────────────────────────────────── */}
        <section className="py-20 sm:py-28 bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <span className="inline-block bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">OUR EXPERTS</span>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4">The People Behind the Magic</h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                {filteredMembers.length} expert{filteredMembers.length !== 1 ? 's' : ''} {activeDept !== 'All' ? `in ${activeDept}` : 'across all departments'}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMembers.map((member, index) => (
                <div
                  key={member.id}
                  ref={el => { if (el) cardRefs.current.set(member.id, el); }}
                  data-member-id={member.id}
                  style={{ transitionDelay: `${(index % 6) * 80}ms` }}
                  className={`transition-all duration-700 ${visibleCards.has(member.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  <Link
                    href={`/team/${member.id}`}
                    className="group block bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-400 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-700"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden h-64 bg-gray-950">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        onError={e => { (e.target as HTMLImageElement).src = '/images/team/placeholder.jpg'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      {/* Department badge */}
                      <div className={`absolute top-4 left-4 bg-gradient-to-r ${deptColors[member.department]} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg`}>
                        {member.department}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{member.name}</h3>
                      <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-0.5 rounded-full text-xs font-semibold mb-3">{member.role}</div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">{member.bio}</p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {member.skills.slice(0, 3).map((skill, idx) => (
                          <span key={idx} className="bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2.5 py-0.5 rounded-full text-xs font-medium">{skill}</span>
                        ))}
                        {member.skills.length > 3 && (
                          <span className="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2.5 py-0.5 rounded-full text-xs">+{member.skills.length - 3}</span>
                        )}
                      </div>

                      {/* Footer row */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                        <span className="inline-flex items-center gap-1.5 text-purple-600 dark:text-purple-400 text-sm font-semibold group-hover:gap-2.5 transition-all">
                          View Profile <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="flex gap-2">
                          {member.social.linkedin && <Linkedin className="text-blue-500 w-4 h-4 hover:scale-125 transition-transform" />}
                          {member.social.github && <Github className="text-gray-700 dark:text-gray-300 w-4 h-4 hover:scale-125 transition-transform" />}
                          {member.social.instagram && <Instagram className="text-pink-500 w-4 h-4 hover:scale-125 transition-transform" />}
                          {member.social.substack && <BookOpen className="text-orange-500 w-4 h-4 hover:scale-125 transition-transform" />}
                          {member.social.twitter && <Twitter className="text-sky-400 w-4 h-4 hover:scale-125 transition-transform" />}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team Culture ─────────────────────────────────────── */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: '🚀', title: 'Innovation First', desc: 'We embrace emerging technologies and creative thinking to solve problems no one else can.' },
                { icon: '🤝', title: 'Collaborative Spirit', desc: 'Cross-discipline collaboration across dev, design, data, and security produces results greater than the sum of parts.' },
                { icon: '🌍', title: 'African by Design', desc: 'We build with Ghana and Africa in mind — culturally aware, locally grounded, globally competitive.' },
              ].map((v, i) => (
                <div key={i} className="text-center p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="text-5xl mb-4">{v.icon}</div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3">{v.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Join Our Team CTA ─────────────────────────────────── */}
        <section className="py-28 sm:py-36 bg-gradient-to-br from-purple-700 via-pink-700 to-blue-700 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-20 animate-blob" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/10 rounded-full animate-rotate-slow" />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield size={16} /> Legally Registered Business
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">Want to Join Our Team?</h2>
            <p className="text-white/90 text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
              We're always looking for talented, passionate people who want to build the future of African technology.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-white text-purple-700 px-8 py-4 rounded-full font-bold hover:bg-gray-100 hover:shadow-2xl hover:scale-110 transition-all duration-300">
                <Mail size={20} /> Send Your CV
              </Link>
              <Link href="/about"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 hover:scale-110 transition-all duration-300">
                Learn About Us <ExternalLink size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────────── */}
        <footer className="bg-gray-950 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
              <div>
                <img src="/images/logo/logo.png" alt="KamarTec Solutions" className="h-36 w-auto mb-5" />
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">Making the world a better place through elegant technology solutions — not just service, but societal impact.</p>
                <div className="flex items-center gap-2 text-green-400 text-xs font-medium mb-5">
                  <Shield size={14} /> Legally Registered in Ghana
                </div>
                <div className="flex gap-3">
                  {[Facebook, Twitter, Linkedin, Github, Youtube].map((Icon, i) => (
                    <a key={i} href="#" className="bg-gray-800 p-2.5 rounded-full hover:bg-purple-600 hover:scale-110 transition-all">
                      <Icon size={16} className="text-gray-400 hover:text-white" />
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white mb-5 text-base">Quick Links</h3>
                <ul className="space-y-3">
                  {[['/', 'Home'], ['/about', 'About'], ['/team', 'Team'], ['/portfolio', 'Projects'], ['/blog', 'Blog'], ['/contact', 'Contact']].map(([href, label]) => (
                    <li key={href}><Link href={href} className="text-gray-400 hover:text-purple-400 hover:translate-x-1 inline-block transition-all text-sm">{label}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-white mb-5 text-base">Contact Us</h3>
                <div className="space-y-3 text-sm text-gray-400">
                  <p>University of Cape Coast,<br />Cape Coast, Ghana</p>
                  <p>+233 (0) 592852555<br />+233 (0) 538118529</p>
                  <p>kamartecsolutions@gmail.com</p>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white mb-5 text-base">Newsletter</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">Stay up to date with our latest projects, insights, and news.</p>
                <NewsletterForm />
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
