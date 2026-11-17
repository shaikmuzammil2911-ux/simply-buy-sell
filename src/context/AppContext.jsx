import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialHeroSlides,
  initialProperties,
  initialServices,
  initialStatistics,
  initialReviews,
  initialSiteSettings,
  trustCards
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Persisted state helper
  const usePersistedState = (key, defaultValue) => {
    const [state, setState] = useState(() => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (err) {
        console.error(`Error reading ${key} from localStorage:`, err);
        return defaultValue;
      }
    });

    useEffect(() => {
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch (err) {
        console.error(`Error saving ${key} to localStorage:`, err);
      }
    }, [key, state]);

    return [state, setState];
  };

  const [properties, setProperties] = usePersistedState('sbs_properties', initialProperties);
  const [heroSlides, setHeroSlides] = usePersistedState('sbs_hero_slides', initialHeroSlides);
  const [services, setServices] = usePersistedState('sbs_services', initialServices);
  const [statistics, setStatistics] = usePersistedState('sbs_statistics', initialStatistics);
  const [siteSettings, setSiteSettings] = usePersistedState('sbs_site_settings', initialSiteSettings);
  const [reviews, setReviews] = usePersistedState('sbs_reviews', initialReviews);
  const [savedProperties, setSavedProperties] = usePersistedState('sbs_saved_properties', ['prop-1', 'prop-3']);

  // Enquiries & Requests
  const [enquiries, setEnquiries] = usePersistedState('sbs_enquiries', [
    {
      id: 'enq-1',
      name: 'P. Sai Kumar',
      phone: '+91 94401 23456',
      email: 'sai.kumar@gmail.com',
      propertyTitle: 'Luxury 3BHK Sky Residence with River View',
      requirement: 'Looking to purchase for self-occupation within 2 months',
      message: 'Please send latest floor plan and payment schedule.',
      preferredContact: 'WhatsApp',
      date: '2026-11-16 14:30',
      status: 'New'
    },
    {
      id: 'enq-2',
      name: 'N. Venkat Rao',
      phone: '+91 98480 98765',
      email: 'venkat.rao@yahoo.com',
      propertyTitle: 'CRDA Approved Corner Open Plot',
      requirement: 'Investment in plotted land',
      message: 'Interested in site visit this Saturday morning.',
      preferredContact: 'Phone Call',
      date: '2026-11-15 11:20',
      status: 'Site Visit Scheduled'
    }
  ]);

  const [sellRequests, setSellRequests] = usePersistedState('sbs_sell_requests', [
    {
      id: 'sell-1',
      fullName: 'G. Madhusudhan Rao',
      mobileNumber: '+91 99890 11223',
      email: 'madhu.g@gmail.com',
      propertyType: 'Open Plots',
      propertyTitle: '200 Sq.Yd Residential Plot in Mangalagiri',
      location: 'Mangalagiri',
      address: 'Near AIIMS Bypass, Mangalagiri',
      priceExpectation: '₹45 Lakhs',
      area: '200 sq.yd.',
      bedrooms: '',
      bathrooms: '',
      description: 'Clear title DTCP layout plot ready for construction. East facing.',
      features: 'Electricity, Water supply, 40ft road',
      status: 'Under Review',
      submissionDate: '2026-11-14'
    }
  ]);

  // Modal controls
  const [modalState, setModalState] = useState({
    enquiry: { isOpen: false, property: null },
    scheduleVisit: { isOpen: false, property: null },
    review: { isOpen: false },
    success: { isOpen: false, title: '', message: '' }
  });

  // Toast notification
  const [toast, setToast] = useState(null);

  const showToast = (title, message, type = 'success') => {
    setToast({ title, message, type });
    setTimeout(() => setToast(null), 4500);
  };

  const openEnquiryModal = (property = null) => {
    setModalState(prev => ({
      ...prev,
      enquiry: { isOpen: true, property }
    }));
  };

  const closeEnquiryModal = () => {
    setModalState(prev => ({
      ...prev,
      enquiry: { isOpen: false, property: null }
    }));
  };

  const openScheduleVisitModal = (property = null) => {
    setModalState(prev => ({
      ...prev,
      scheduleVisit: { isOpen: true, property }
    }));
  };

  const closeScheduleVisitModal = () => {
    setModalState(prev => ({
      ...prev,
      scheduleVisit: { isOpen: false, property: null }
    }));
  };

  const openReviewModal = () => {
    setModalState(prev => ({
      ...prev,
      review: { isOpen: true }
    }));
  };

  const closeReviewModal = () => {
    setModalState(prev => ({
      ...prev,
      review: { isOpen: false }
    }));
  };

  const triggerSuccessModal = (title, message) => {
    setModalState(prev => ({
      ...prev,
      success: { isOpen: true, title, message }
    }));
  };

  const closeSuccessModal = () => {
    setModalState(prev => ({
      ...prev,
      success: { isOpen: false, title: '', message: '' }
    }));
  };

  // Property Actions
  const addProperty = (newProperty) => {
    const propertyWithId = {
      ...newProperty,
      id: `prop-${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0]
    };
    setProperties(prev => [propertyWithId, ...prev]);
    showToast('Property Added', 'The property listing has been created successfully.');
  };

  const updateProperty = (id, updatedData) => {
    setProperties(prev => prev.map(p => (p.id === id ? { ...p, ...updatedData } : p)));
    showToast('Property Updated', 'Property changes have been saved.');
  };

  const deleteProperty = (id) => {
    setProperties(prev => prev.filter(p => p.id !== id));
    showToast('Property Deleted', 'The property listing has been removed.');
  };

  const toggleFeatured = (id) => {
    setProperties(prev => prev.map(p => (p.id === id ? { ...p, featured: !p.featured } : p)));
  };

  const toggleVerified = (id) => {
    setProperties(prev => prev.map(p => (p.id === id ? { ...p, verified: !p.verified } : p)));
  };

  // Favorites
  const toggleSaveProperty = (id) => {
    setSavedProperties(prev => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Removed from Saved', 'Property removed from your saved list.');
        return prev.filter(itemId => itemId !== id);
      } else {
        showToast('Saved Property', 'Property added to your favorites.');
        return [...prev, id];
      }
    });
  };

  const isPropertySaved = (id) => savedProperties.includes(id);

  // Review Submissions
  const submitCustomerReview = (reviewData) => {
    const newRev = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      approved: false // Requires admin approval by default
    };
    setReviews(prev => [newRev, ...prev]);
    triggerSuccessModal(
      'Review Submitted!',
      'Thank you for sharing your experience. Your review has been submitted for approval and will appear publicly once verified by our team.'
    );
  };

  const approveReview = (id) => {
    setReviews(prev => prev.map(r => (r.id === id ? { ...r, approved: true } : r)));
    showToast('Review Approved', 'Review is now visible on the website.');
  };

  const rejectReview = (id) => {
    setReviews(prev => prev.map(r => (r.id === id ? { ...r, approved: false } : r)));
    showToast('Review Hidden', 'Review status updated to pending/rejected.');
  };

  const deleteReview = (id) => {
    setReviews(prev => prev.filter(r => r.id !== id));
    showToast('Review Deleted', 'The review has been deleted.');
  };

  // Enquiries & Site Visits
  const submitEnquiry = (enquiryData) => {
    const newEnq = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      date: new Date().toLocaleString(),
      status: 'New'
    };
    setEnquiries(prev => [newEnq, ...prev]);
    triggerSuccessModal(
      'Enquiry Received!',
      'Thank you for your interest. Our Amaravati property advisor has received your request and will contact you shortly.'
    );
  };

  const updateEnquiryStatus = (id, newStatus) => {
    setEnquiries(prev => prev.map(e => (e.id === id ? { ...e, status: newStatus } : e)));
    showToast('Status Updated', `Enquiry status changed to: ${newStatus}`);
  };

  // Sell Property Requests
  const submitSellProperty = (sellData) => {
    const newSellReq = {
      ...sellData,
      id: `sell-${Date.now()}`,
      submissionDate: new Date().toISOString().split('T')[0],
      status: 'Submitted'
    };
    setSellRequests(prev => [newSellReq, ...prev]);
    triggerSuccessModal(
      'Property Request Submitted!',
      'Your property request has been submitted successfully. Our team will review your details, verify the title documents, and contact you shortly.'
    );
  };

  const updateSellStatus = (id, newStatus) => {
    setSellRequests(prev => prev.map(s => (s.id === id ? { ...s, status: newStatus } : s)));
    showToast('Seller Request Updated', `Status updated to: ${newStatus}`);
  };

  // Hero Slides
  const updateHeroSlide = (id, updated) => {
    setHeroSlides(prev => prev.map(s => (s.id === id ? { ...s, ...updated } : s)));
    showToast('Hero Slide Updated', 'Changes saved successfully.');
  };

  const toggleHeroSlideActive = (id) => {
    setHeroSlides(prev => prev.map(s => (s.id === id ? { ...s, active: !s.active } : s)));
  };

  // WhatsApp helper
  const getWhatsAppLink = (customText = null, propertyTitle = null) => {
    const phone = siteSettings.whatsappPhone || '919876543210';
    let text = '';
    if (customText) {
      text = customText;
    } else if (propertyTitle) {
      text = `Hello SimplyBuySell, I am interested in this property: "${propertyTitle}". Please share more details and arrange a site visit.`;
    } else {
      text = `Hello SimplyBuySell, I am interested in buying/selling property in Amaravati. Please assist me.`;
    }
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <AppContext.Provider
      value={{
        properties,
        heroSlides,
        services,
        statistics,
        siteSettings,
        reviews,
        savedProperties,
        enquiries,
        sellRequests,
        trustCards,
        modalState,
        toast,
        showToast,
        openEnquiryModal,
        closeEnquiryModal,
        openScheduleVisitModal,
        closeScheduleVisitModal,
        openReviewModal,
        closeReviewModal,
        closeSuccessModal,
        triggerSuccessModal,
        addProperty,
        updateProperty,
        deleteProperty,
        toggleFeatured,
        toggleVerified,
        toggleSaveProperty,
        isPropertySaved,
        submitCustomerReview,
        approveReview,
        rejectReview,
        deleteReview,
        submitEnquiry,
        updateEnquiryStatus,
        submitSellProperty,
        updateSellStatus,
        updateHeroSlide,
        toggleHeroSlideActive,
        setStatistics,
        setSiteSettings,
        setServices,
        getWhatsAppLink
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
