"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Search, Facebook, Twitter, Linkedin, Github, Youtube,
  Menu, X, Moon, Sun, MapPin, Phone, Mail, Clock, Send,
  CheckCircle, AlertCircle, Shield, MessageCircle
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: 'success' | 'error' | '';
  message: string;
}

export default function KamarTecContactPage() {
  const [scrollY, setScrollY] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<string>('');

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setFormStatus({ type: 'success', message: "Thank you! Your message has been sent successfully. We'll get back to you within 24 hours!" });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      setFormStatus({ type: 'error', message: 'Oops! Something went wrong. Please try again or contact us directly via email or WhatsApp.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = (field: string) =>
    `w-full px-4 py-3.5 border-2 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none transition-all duration-200 ${
      focusedField === field
        ? 'border-purple-500 shadow-[0_0_0_4px_rgba(124,58,237,0.1)]'
        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
    }`;

  const subjects = ['Web Development', 'Mobile App Development', 'UI/UX Design', 'Data Analytics', 'Cybersecurity', 'Tech Training', 'Consultation', 'Other'];

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden transition-colors duration-300">

        {/* ── WhatsApp Floating Button ─────────────────────────── */}
        <a
          href="https://wa.me/233592852555?text=Hi%20KamarTec!%20I'd%20like%20to%20discuss%20a%20project."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-green-500/40 hover:scale-110 transition-all duration-300 animate-bounce-gentle"
          title="Chat on WhatsApp"
        >
          <MessageCircle size={22} fill="white" />
          <span className="text-sm font-semibold hidden sm:block">WhatsApp Us</span>
        </a>

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
                {[['/', 'Home'], ['/about', 'About'], ['/services', 'Services'], ['/portfolio', 'Projects'], ['/team', 'Team'], ['/blog', 'Blog']].map(([href, label]) => (
                  <Link key={href} href={href} className="text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-600 hover:after:w-full after:transition-all">{label}</Link>
                ))}
                <Link href="/contact" className="text-sm text-purple-600 font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-purple-600">Contact</Link>
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

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative min-h-[55vh] flex items-center pt-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-blue-700 to-pink-700 dark:from-purple-900 dark:via-blue-900 dark:to-pink-900" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
            <div className="absolute top-40 left-20 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000" />
            <div className="absolute top-1/2 right-1/3 w-20 h-20 border border-white/15 rounded-full animate-rotate-slow" />
            <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-float" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 w-full text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <MessageCircle size={16} /> GET IN TOUCH
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 animate-slide-up">
              Let's Build{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">Something Great</span>
            </h1>
            <p className="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto animate-slide-up animation-delay-200">
              Have a project in mind? We're ready to turn your vision into reality. Drop us a message or chat on WhatsApp.
            </p>

            {/* Quick contact chips */}
            <div className="flex flex-wrap justify-center gap-3 mt-8 animate-fade-in animation-delay-400">
              <a href="tel:+233592852555" className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105">
                <Phone size={14} /> +233 592 852 555
              </a>
              <a href="mailto:kamartecsolutions@gmail.com" className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105">
                <Mail size={14} /> kamartecsolutions@gmail.com
              </a>
              <a href="https://wa.me/233592852555" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500/80 hover:bg-green-500 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105">
                <MessageCircle size={14} /> WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* ── Contact Cards + Map ──────────────────────────────── */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-8">Our Contact Details</h2>
                <div className="space-y-5">
                  {[
                    {
                      icon: <MapPin size={22} className="text-white" />,
                      color: 'bg-purple-600',
                      bg: 'from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20',
                      title: 'Office Address',
                      content: 'P.O Box 123 Kwapro, University of Cape Coast, Cape Coast, Ghana'
                    },
                    {
                      icon: <Phone size={22} className="text-white" />,
                      color: 'bg-pink-600',
                      bg: 'from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20',
                      title: 'Phone Numbers',
                      content: '+233 (0) 592852555 · +233 (0) 538118529'
                    },
                    {
                      icon: <Mail size={22} className="text-white" />,
                      color: 'bg-blue-600',
                      bg: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
                      title: 'Email Address',
                      content: 'kamartecsolutions@gmail.com'
                    },
                    {
                      icon: <Clock size={22} className="text-white" />,
                      color: 'bg-orange-600',
                      bg: 'from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20',
                      title: 'Working Hours',
                      content: 'Mon – Fri: 9:00 AM – 6:00 PM · Sat: 10:00 AM – 4:00 PM'
                    },
                    {
                      icon: <Shield size={22} className="text-white" />,
                      color: 'bg-green-600',
                      bg: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
                      title: 'Legal Registration',
                      content: 'Registered with the Registrar General\'s Department, Ghana'
                    },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-start gap-4 p-5 bg-gradient-to-br ${item.bg} rounded-2xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300`}>
                      <div className={`p-2.5 ${item.color} rounded-xl flex-shrink-0`}>{item.icon}</div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-sm">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.2089842415447!2d-1.2915738!3d5.1066896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfddf9085b4c66cd%3A0x7d1f1b6e5c6e3c6d!2sUniversity%20of%20Cape%20Coast!5e0!3m2!1sen!2sgh!4v1234567890"
                  width="100%" height="100%"
                  style={{ border: 0 }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="dark:grayscale hover:grayscale-0 transition-all duration-300"
                  title="KamarTec Location Map"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact Form ─────────────────────────────────────── */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <span className="inline-block bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">SEND US A MESSAGE</span>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Let's Start a Conversation</h2>
              <p className="text-gray-500 dark:text-gray-400">Fill out the form and we'll get back to you within 24 hours.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 sm:p-12 border border-gray-100 dark:border-gray-700">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm">Full Name *</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required
                    onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField('')}
                    className={fieldClass('name')} placeholder="John Doe" />
                </div>

                {/* Email & Phone */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm">Email Address *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required
                      onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField('')}
                      className={fieldClass('email')} placeholder="john@example.com" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm">Phone Number</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange}
                      onFocus={() => setFocusedField('phone')} onBlur={() => setFocusedField('')}
                      className={fieldClass('phone')} placeholder="+233 XX XXX XXXX" />
                  </div>
                </div>

                {/* Subject — dropdown */}
                <div>
                  <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm">Subject *</label>
                  <select id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required
                    onFocus={() => setFocusedField('subject')} onBlur={() => setFocusedField('')}
                    className={fieldClass('subject')}>
                    <option value="">Select a subject…</option>
                    {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm">Message *</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={6}
                    onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField('')}
                    className={`${fieldClass('message')} resize-none`}
                    placeholder="Tell us about your project, timeline, and budget…" />
                  <p className="text-xs text-gray-400 mt-1 text-right">{formData.message.length} characters</p>
                </div>

                {/* Status */}
                {formStatus.message && (
                  <div className={`p-4 rounded-2xl flex items-start gap-3 animate-scale-in ${formStatus.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}`}>
                    {formStatus.type === 'success'
                      ? <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                      : <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />}
                    <p className={`text-sm leading-relaxed ${formStatus.type === 'success' ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
                      {formStatus.message}
                    </p>
                  </div>
                )}

                {/* Submit */}
                <button type="submit" disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-purple-700 hover:to-blue-700 hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-base">
                  {isSubmitting ? (
                    <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending…</>
                  ) : (
                    <><Send size={18} /> Send Message</>
                  )}
                </button>

                <p className="text-center text-xs text-gray-400 mt-2">
                  Or reach us directly via{' '}
                  <a href="https://wa.me/233592852555" target="_blank" rel="noopener noreferrer" className="text-green-500 font-semibold hover:underline">WhatsApp</a>
                  {' '}for faster response.
                </p>
              </form>
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
                  {[['/', 'Home'], ['/about', 'About'], ['/services', 'Services'], ['/portfolio', 'Projects'], ['/team', 'Team'], ['/blog', 'Blog']].map(([href, label]) => (
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
                  <a href="https://wa.me/233592852555" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-green-400 hover:text-green-300 transition-colors text-xs font-medium">
                    <MessageCircle size={13} /> WhatsApp Chat
                  </a>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white mb-5">Newsletter</h3>
                <p className="text-gray-400 text-sm mb-4">Stay up to date with our latest news and projects.</p>
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
