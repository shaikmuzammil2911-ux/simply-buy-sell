import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  ShieldCheck,
  Building,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Contact() {
  const { siteSettings, submitEnquiry, triggerSuccessModal, getWhatsAppLink } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    subject: 'General Property Enquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) return;
    setIsSubmitting(true);

    setTimeout(() => {
      submitEnquiry({
        name: formData.name,
        phone: formData.mobile,
        email: formData.email,
        requirement: formData.subject,
        message: formData.message,
        propertyTitle: 'Contact Page Inquiry',
        preferredContact: 'Phone Call'
      });
      setIsSubmitting(false);
      setFormData({ name: '', mobile: '', email: '', subject: 'General Property Enquiry', message: '' });
    }, 500);
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-brand-orange border border-orange-200 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>We Are Here to Help</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 tracking-tight">
            Contact SimplyBuySell
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Reach out to our Amaravati regional property advisory desk for verified property recommendations, site visit bookings, or seller onboarding.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Phone */}
          <div className="bg-white p-6 rounded-2xl shadow-card border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-navy-900 uppercase">Call Directly</h3>
                <p className="text-xs text-slate-500">Mon–Sat 9AM – 7:30PM</p>
              </div>
            </div>
            <div>
              <a
                href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`}
                className="text-lg font-extrabold text-navy-900 hover:text-brand-orange transition-colors block"
              >
                {siteSettings.phone}
              </a>
              <div className="text-xs text-slate-400 mt-1">Direct Consultant Helpline</div>
            </div>
          </div>

          {/* Card 2: Email */}
          <div className="bg-white p-6 rounded-2xl shadow-card border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-navy-900 uppercase">Email Enquiries</h3>
                <p className="text-xs text-slate-500">Official correspondence</p>
              </div>
            </div>
            <div>
              <a
                href={`mailto:${siteSettings.email}`}
                className="text-base font-bold text-navy-900 hover:text-brand-orange transition-colors block truncate"
              >
                {siteSettings.email}
              </a>
              <div className="text-xs text-slate-400 mt-1">Average response within 2 hours</div>
            </div>
          </div>

          {/* Card 3: WhatsApp */}
          <div className="bg-white p-6 rounded-2xl shadow-card border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-emerald-600 flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-navy-900 uppercase">Instant WhatsApp</h3>
                <p className="text-xs text-slate-500">Quick property brochures</p>
              </div>
            </div>
            <div>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:underline"
              >
                <span>Chat on WhatsApp</span>
                <Sparkles className="w-3.5 h-3.5" />
              </a>
              <div className="text-xs text-slate-400 mt-1">Instant photo & location sharing</div>
            </div>
          </div>
        </div>

        {/* Main Grid: Form + Office Location & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-slate-100">
            <h2 className="text-2xl font-extrabold text-navy-900 mb-2">
              Send Us a Message
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mb-6">
              Fill in your requirements and our Amaravati real estate representative will follow up.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@email.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Subject / Interest
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange"
                  >
                    <option value="General Property Enquiry">General Property Enquiry</option>
                    <option value="Buy Flats / Villa">Buy Flats / Villa</option>
                    <option value="Buy CRDA Open Plot">Buy CRDA Open Plot</option>
                    <option value="Sell My Property">Sell My Property</option>
                    <option value="Commercial Space Investment">Commercial Space Investment</option>
                    <option value="Agricultural Land Purchase">Agricultural Land Purchase</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Message / Details *
                </label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details such as preferred location, budget, or timeline..."
                  className="w-full p-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-white font-bold text-sm shadow-lg shadow-brand-orange/30 flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Sending Request...' : 'Send Message'}</span>
              </button>
            </form>
          </div>

          {/* Map Preview & Office Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100">
              <h3 className="text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-orange" />
                <span>Amaravati Regional Office</span>
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600 mb-6">
                <p className="font-semibold text-navy-900">
                  {siteSettings.address || 'SimplyBuySell Tower, Core Capital Zone, Amaravati, Andhra Pradesh 522503'}
                </p>
                <div className="flex items-center gap-2 text-slate-500">
                  <Clock className="w-4 h-4 text-brand-royal" />
                  <span>Working Hours: 9:00 AM – 7:30 PM (Mon – Sat)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-brand-green" />
                  <span>On-ground physical consultation available</span>
                </div>
              </div>

              {/* Interactive Google Maps iframe representation for Amaravati */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-[4/3] bg-slate-100 relative">
                <iframe
                  title="Amaravati Real Estate Map"
                  src="https://maps.google.com/maps?q=Amaravati,%20Andhra%20Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
