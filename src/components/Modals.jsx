import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  CheckCircle2,
  Calendar,
  Clock,
  Phone,
  Mail,
  User,
  Star,
  Send,
  Building,
  ShieldCheck,
  Upload,
  Sparkles,
  MessageCircle,
  Image as ImageIcon
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Modals() {
  const {
    modalState,
    closeEnquiryModal,
    closeScheduleVisitModal,
    closeReviewModal,
    closeSuccessModal,
    submitEnquiry,
    submitCustomerReview,
    getWhatsAppLink,
    toast
  } = useApp();

  // Timed Lead Capture Popup (Appears once after 12 seconds to engage visitors)
  const [leadPopupOpen, setLeadPopupOpen] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const alreadyShown = sessionStorage.getItem('sbs_lead_shown');
      if (!alreadyShown) {
        setLeadPopupOpen(true);
        sessionStorage.setItem('sbs_lead_shown', 'true');
      }
    }, 12000);

    return () => clearTimeout(timer);
  }, []);

  // Escape key listener for accessible modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeEnquiryModal();
        closeScheduleVisitModal();
        closeReviewModal();
        closeSuccessModal();
        setLeadPopupOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Form states
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    requirement: '',
    message: '',
    preferredContact: 'WhatsApp'
  });

  const [visitForm, setVisitForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '10:00 AM',
    notes: ''
  });

  const [reviewForm, setReviewForm] = useState({
    name: '',
    contact: '',
    location: 'Amaravati',
    propertyUsed: '',
    rating: 5,
    comment: ''
  });

  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    interest: 'Plots in Amaravati / Thullur'
  });

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    if (!enquiryForm.name || !enquiryForm.phone) return;
    submitEnquiry({
      ...enquiryForm,
      propertyTitle: modalState.enquiry.property?.title || 'General Enquiry'
    });
    setEnquiryForm({ name: '', phone: '', email: '', requirement: '', message: '', preferredContact: 'WhatsApp' });
    closeEnquiryModal();
  };

  const handleVisitSubmit = (e) => {
    e.preventDefault();
    if (!visitForm.name || !visitForm.phone || !visitForm.date) return;
    submitEnquiry({
      name: visitForm.name,
      phone: visitForm.phone,
      email: visitForm.email,
      requirement: `Scheduled Site Visit for: ${visitForm.date} at ${visitForm.time}`,
      message: visitForm.notes,
      propertyTitle: modalState.scheduleVisit.property?.title || 'Amaravati Site Tour',
      preferredContact: 'Phone Call'
    });
    setVisitForm({ name: '', phone: '', email: '', date: '', time: '10:00 AM', notes: '' });
    closeScheduleVisitModal();
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.comment) return;
    submitCustomerReview({
      name: reviewForm.name,
      location: reviewForm.location,
      propertyUsed: reviewForm.propertyUsed || 'Property Consultation',
      rating: Number(reviewForm.rating),
      comment: reviewForm.comment
    });
    setReviewForm({ name: '', contact: '', location: 'Amaravati', propertyUsed: '', rating: 5, comment: '' });
    closeReviewModal();
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;
    submitEnquiry({
      name: leadForm.name,
      phone: leadForm.phone,
      requirement: `Lead Popup: ${leadForm.interest}`,
      propertyTitle: 'Amaravati Real Estate Consultation Request',
      preferredContact: 'WhatsApp'
    });
    setLeadCaptured(true);
    setTimeout(() => {
      setLeadPopupOpen(false);
    }, 2000);
  };

  return (
    <>
      {/* 1. TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 max-w-sm w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-100 p-4 flex items-start gap-3 animate-fade-in-scale">
          <div className="p-2 rounded-xl bg-emerald-50 text-brand-green shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-navy-900">{toast.title}</h4>
            <p className="text-xs text-slate-600 mt-0.5">{toast.message}</p>
          </div>
        </div>
      )}

      {/* 2. TIMED LEAD CAPTURE POPUP (Heavy Popup Feature) */}
      {leadPopupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-scale"
          onClick={() => setLeadPopupOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-blue-200 relative overflow-hidden text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top decorative gradient */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-orange via-brand-green to-brand-royal" />

            <button
              onClick={() => setLeadPopupOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-navy-900 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-brand-royal flex items-center justify-center mx-auto mb-4 mt-2">
              <Sparkles className="w-7 h-7 text-brand-orange" />
            </div>

            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 inline-block mb-2">
              Exclusive Investor Advisory
            </span>

            <h3 className="text-xl sm:text-2xl font-extrabold text-navy-900 leading-tight mb-2">
              Looking for Property in Amaravati?
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
              Get our verified price index report, CRDA layout maps, and top verified deals sent directly to your phone.
            </p>

            {leadCaptured ? (
              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 font-bold text-sm flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-brand-green" />
                <span>Thank you! We will reach out shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-3 text-left">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">WhatsApp / Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Interested In</label>
                  <select
                    value={leadForm.interest}
                    onChange={(e) => setLeadForm({ ...leadForm, interest: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-brand-orange"
                  >
                    <option value="Plots in Amaravati / Thullur">CRDA Approved Plots (Thullur / Mangalagiri)</option>
                    <option value="Flats & Villas in Mangalagiri">Luxury Flats & Villas</option>
                    <option value="Commercial Showrooms & Offices">Commercial Spaces / Offices</option>
                    <option value="Agricultural Lands">Agricultural Lands</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-white font-bold text-sm shadow-lg shadow-brand-orange/30 flex items-center justify-center gap-2 transition-all mt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Get Free Property Brochure</span>
                </button>

                <div className="text-center pt-1">
                  <a
                    href={getWhatsAppLink('Hello SimplyBuySell, I would like instant assistance for Amaravati properties.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-700 font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Or chat instantly on WhatsApp</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 3. QUICK ENQUIRY MODAL */}
      {modalState.enquiry.isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-scale"
          onClick={closeEnquiryModal}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-blue-100 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeEnquiryModal}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-navy-900 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-brand-orange text-xs font-bold uppercase tracking-wider block mb-1">
                Direct Property Enquiry
              </span>
              <h3 className="text-2xl font-extrabold text-navy-900">
                {modalState.enquiry.property ? 'Enquire About Property' : 'Get in Touch'}
              </h3>
              {modalState.enquiry.property && (
                <div className="mt-2 p-3 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center gap-3">
                  <Building className="w-5 h-5 text-brand-royal shrink-0" />
                  <div className="truncate">
                    <div className="text-xs font-bold text-navy-900 truncate">
                      {modalState.enquiry.property.title}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {modalState.enquiry.property.location} • {modalState.enquiry.property.priceDisplay}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleEnquirySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={enquiryForm.name}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      value={enquiryForm.phone}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      value={enquiryForm.email}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                      placeholder="name@email.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Preferred Contact Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['WhatsApp', 'Phone Call', 'Email'].map((method) => (
                    <button
                      type="button"
                      key={method}
                      onClick={() => setEnquiryForm({ ...enquiryForm, preferredContact: method })}
                      className={`py-2 text-xs font-bold rounded-xl border transition-colors ${
                        enquiryForm.preferredContact === method
                          ? 'border-brand-orange bg-orange-50 text-brand-orange'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Message / Special Questions
                </label>
                <textarea
                  rows="3"
                  value={enquiryForm.message}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                  placeholder="I would like to know about registration details and layout approval..."
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-white font-bold text-sm shadow-lg shadow-brand-orange/30 flex items-center justify-center gap-2 transition-all duration-200"
              >
                <Send className="w-4 h-4" />
                <span>Submit Property Enquiry</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 4. SCHEDULE SITE VISIT MODAL */}
      {modalState.scheduleVisit.isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-scale"
          onClick={closeScheduleVisitModal}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-blue-100 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeScheduleVisitModal}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-navy-900 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-brand-green text-xs font-bold uppercase tracking-wider block mb-1">
                Complimentary Service
              </span>
              <h3 className="text-2xl font-extrabold text-navy-900">
                Schedule a Free Site Visit
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Our property advisor will accompany you to inspect the layout, examine boundaries, and verify surroundings.
              </p>
            </div>

            <form onSubmit={handleVisitSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={visitForm.name}
                  onChange={(e) => setVisitForm({ ...visitForm, name: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={visitForm.phone}
                    onChange={(e) => setVisitForm({ ...visitForm, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={visitForm.date}
                    onChange={(e) => setVisitForm({ ...visitForm, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Preferred Time Slot
                </label>
                <select
                  value={visitForm.time}
                  onChange={(e) => setVisitForm({ ...visitForm, time: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green"
                >
                  <option value="10:00 AM">Morning (10:00 AM – 12:00 PM)</option>
                  <option value="02:00 PM">Afternoon (02:00 PM – 04:00 PM)</option>
                  <option value="04:30 PM">Evening (04:30 PM – 06:30 PM)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Pickup / Special Notes
                </label>
                <textarea
                  rows="2"
                  value={visitForm.notes}
                  onChange={(e) => setVisitForm({ ...visitForm, notes: e.target.value })}
                  placeholder="Need pickup from Vijayawada or meeting directly at site..."
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-brand-green hover:bg-brand-greenDark text-white font-bold text-sm shadow-lg shadow-brand-green/30 flex items-center justify-center gap-2 transition-all duration-200"
              >
                <Calendar className="w-4 h-4" />
                <span>Confirm Site Visit Request</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 5. WRITE CUSTOMER REVIEW MODAL */}
      {modalState.review.isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-scale"
          onClick={closeReviewModal}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-blue-100 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeReviewModal}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-navy-900 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-brand-orange text-xs font-bold uppercase tracking-wider block mb-1">
                Share Your Experience
              </span>
              <h3 className="text-2xl font-extrabold text-navy-900">
                Write a Customer Review
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Help other buyers and sellers make informed decisions. All reviews are vetted before public display.
              </p>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                  placeholder="e.g. S. Rama Krishna"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    City / Location
                  </label>
                  <input
                    type="text"
                    value={reviewForm.location}
                    onChange={(e) => setReviewForm({ ...reviewForm, location: e.target.value })}
                    placeholder="e.g. Amaravati"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Rating (1-5 Stars)
                  </label>
                  <div className="flex items-center gap-1 py-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        className="text-amber-400 hover:scale-125 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= reviewForm.rating ? 'fill-current' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Property or Service Used
                </label>
                <input
                  type="text"
                  value={reviewForm.propertyUsed}
                  onChange={(e) => setReviewForm({ ...reviewForm, propertyUsed: e.target.value })}
                  placeholder="e.g. 3BHK Flat Purchase, Mangalagiri"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Your Review / Feedback *
                </label>
                <textarea
                  rows="4"
                  required
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  placeholder="Share details of your experience with SimplyBuySell..."
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-orange"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-white font-bold text-sm shadow-lg shadow-brand-orange/30 flex items-center justify-center gap-2 transition-all duration-200"
              >
                <span>Submit Review for Verification</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 6. SUCCESS CONFIRMATION MODAL */}
      {modalState.success.isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-scale"
          onClick={closeSuccessModal}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-blue-100 relative text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-brand-green flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-extrabold text-navy-900 mb-2">
              {modalState.success.title || 'Submitted Successfully!'}
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {modalState.success.message}
            </p>

            <button
              onClick={closeSuccessModal}
              className="w-full py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-sm transition-colors shadow-md"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}
