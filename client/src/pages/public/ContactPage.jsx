import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Sparkles } from 'lucide-react';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import Button from '../../components/common/Button';
import { useToast } from '../../hooks/useToast';

const ContactPage = () => {
  const { success } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    success('Message sent! Our concierge team will get in touch within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Information */}
        <div className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-[11px] font-semibold uppercase tracking-[0.2em] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Direct Concierge</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mt-1 leading-tight">
              We're Here to Help You <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                Create Magic.
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed">
              Have questions about booking high-budget destination shoots, custom enterprise creative production, or creator partnerships?
            </p>
          </div>

          <div className="space-y-3.5 pt-2 text-xs text-slate-300">
            <div className="flex items-center gap-4 p-4 rounded-xl glass-card">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white block text-sm">Concierge Email</span>
                <span className="text-slate-400 font-mono text-[11px]">concierge@lenscraft.dev</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl glass-card">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-center text-indigo-400 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white block text-sm">Studio Hotline</span>
                <span className="text-slate-400 font-mono text-[11px]">+91 (022) 4988-2900</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl glass-card">
              <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-400/20 flex items-center justify-center text-violet-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white block text-sm">Studio HQ</span>
                <span className="text-slate-400 text-[11px]">Bandra West, Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="p-8 rounded-2xl glass-panel shadow-2xl border-cyan-500/20">
          <h3 className="text-xl font-serif font-bold text-white mb-6">Send Us a Direct Message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your name"
            />
            <Input
              label="Email Address"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@example.com"
            />
            <Input
              label="Subject"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="e.g. Destination Wedding Inquiry in Udaipur"
            />
            <Textarea
              label="Message / Requirements"
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="How can our creative concierge assist you?"
            />
            <Button type="submit" variant="primary" size="md" className="w-full justify-center">
              <Send className="w-4 h-4 mr-2" />
              <span>Send Message</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
