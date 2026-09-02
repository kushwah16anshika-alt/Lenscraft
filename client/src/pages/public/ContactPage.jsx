import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
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
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B88A5A]">
              Direct Concierge
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#171717] mt-1">
              We're Here to Help You Create Magic.
            </h1>
            <p className="text-xs text-[#6B6258] mt-2 leading-relaxed">
              Have questions about booking high-budget destination shoots, custom enterprise creative production, or creator partnerships?
            </p>
          </div>

          <div className="space-y-3 pt-2 text-xs text-[#6B6258]">
            <div className="flex items-center gap-3.5 p-4 rounded-md bg-white border border-[#E5E0D8] shadow-2xs">
              <Mail className="w-4.5 h-4.5 text-[#B88A5A]" />
              <div>
                <span className="font-bold text-[#171717] block">Concierge Email</span>
                <span className="text-[#6B6258]">concierge@lenscraft.dev</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-md bg-white border border-[#E5E0D8] shadow-2xs">
              <Phone className="w-4.5 h-4.5 text-[#B88A5A]" />
              <div>
                <span className="font-bold text-[#171717] block">Studio Hotline</span>
                <span className="text-[#6B6258]">+91 (022) 4988-2900</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-md bg-white border border-[#E5E0D8] shadow-2xs">
              <MapPin className="w-4.5 h-4.5 text-[#B88A5A]" />
              <div>
                <span className="font-bold text-[#171717] block">Studio HQ</span>
                <span className="text-[#6B6258]">Bandra West, Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="p-8 rounded-md bg-white border border-[#E5E0D8] shadow-sm">
          <h3 className="text-lg font-serif font-bold text-[#171717] mb-6">Send Us a Direct Message</h3>
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
