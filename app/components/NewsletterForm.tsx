"use client";
import { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === 'loading') return;
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) setEmail('');
    } catch {
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Your email here"
          disabled={status === 'loading' || status === 'success'}
          className="flex-1 px-4 py-3 border border-gray-700 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm placeholder-gray-500 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="bg-purple-600 text-white p-3 rounded-full hover:bg-purple-500 hover:scale-110 transition-all shadow-lg disabled:opacity-60 disabled:scale-100"
        >
          {status === 'loading' ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <ArrowRight size={20} />
          )}
        </button>
      </form>
      {status === 'success' && (
        <p className="mt-2 text-emerald-400 text-xs flex items-center gap-1">
          <CheckCircle size={13} /> Subscribed! Check your inbox.
        </p>
      )}
      {status === 'error' && (
        <p className="mt-2 text-red-400 text-xs">Something went wrong. Please try again.</p>
      )}
    </div>
  );
}
