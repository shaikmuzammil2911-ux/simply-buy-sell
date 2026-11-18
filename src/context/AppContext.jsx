import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialPlots,
  initialHeroSlides,
  initialServices,
  trustCards,
  amaravatiVillages,
  amaravatiLandmarks,
  initialStatistics,
  initialReviews,
  initialSiteSettings
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

  // Primary Data State (Versioned cache ensures immediate freshness across browsers)
  const [properties, setProperties] = usePersistedState('sbs_properties_v5', initialPlots);
  const [heroSlides, setHeroSlides] = usePersistedState('sbs_hero_slides_v5', initialHeroSlides);
  const [services, setServices] = usePersistedState('sbs_services_v5', initialServices);
  const [villages, setVillages] = usePersistedState('sbs_villages_v5', amaravatiVillages);
  const [landmarks, setLandmarks] = usePersistedState('sbs_landmarks_v5', amaravatiLandmarks);
  const [statistics, setStatistics] = usePersistedState('sbs_statistics_v5', initialStatistics);
  const [siteSettings, setSiteSettings] = usePersistedState('sbs_site_settings_v5', initialSiteSettings);
  const [reviews, setReviews] = usePersistedState('sbs_reviews_v5', initialReviews);
  const [savedProperties, setSavedProperties] = usePersistedState('sbs_saved_properties_v5', ['SBS-AMA-000101', 'SBS-AMA-000102']);

  // Auto-heal / sync if stored properties array is smaller than updated catalog
  useEffect(() => {
    if (!properties || properties.length < initialPlots.length) {
      setProperties(initialPlots);
    }
  }, []);

  // Comparison State (Array of plot objects)
  const [rawCompare, setRawCompare] = usePersistedState('sbs_compare_list', ['SBS-AMA-000101', 'SBS-AMA-000103']);

  // Resolve compareList into objects so table doesn't crash
  const compareList = (Array.isArray(rawCompare) ? rawCompare : [])
    .map((item) => {
      if (typeof item === 'object' && item !== null) return item;
      return properties.find((p) => p.id === item || p.plotCode === item) || null;
    })
    .filter(Boolean);

  const isInCompare = (id) => {
    if (!id) return false;
    return compareList.some((p) => p.id === id || p.plotCode === id);
  };

  const addToCompare = (plotOrId) => {
    const plot = typeof plotOrId === 'object' && plotOrId !== null
      ? plotOrId
      : properties.find((p) => p.id === plotOrId || p.plotCode === plotOrId);

    if (!plot) return;

    if (compareList.length >= 4) {
      showToast('Limit Reached', 'You can compare up to 4 plots simultaneously.', 'info');
      return;
    }

    if (isInCompare(plot.id)) {
      showToast('Already Added', 'This plot is already in your comparison table.', 'info');
      return;
    }

    setRawCompare((prev) => [...prev, plot.id]);
    showToast('Plot Added', `${plot.plotCode || plot.id} added to comparison table.`);
  };

  const removeFromCompare = (id) => {
    setRawCompare((prev) => prev.filter((item) => {
      const itemId = typeof item === 'object' && item !== null ? item.id : item;
      return itemId !== id;
    }));
    showToast('Removed', 'Plot removed from comparison.');
  };

  const clearCompare = () => {
    setRawCompare([]);
    showToast('Cleared', 'Comparison table cleared.');
  };

  // Buyer Requirements Submissions
  const [buyerRequirements, setBuyerRequirements] = usePersistedState('sbs_buyer_reqs', [
    {
      id: 'req-1',
      name: 'B. Suresh Kumar',
      phone: '+91 98480 12345',
      whatsapp: '+91 98480 12345',
      email: 'suresh.b@gmail.com',
      preferredVillage: 'Thullur',
      category: 'Residential Plot',
      budget: '₹60 – ₹75 Lakhs',
      plotSize: '240 sq.yd.',
      facing: 'East',
      roadWidth: '40ft or 50ft',
      notes: 'Looking for verified CRDA LPS allotment near High Court sector.',
      status: 'Matching Inventory',
      date: '2026-11-15'
    }
  ]);

  const submitBuyerRequirement = (reqData) => {
    const newReq = {
      ...reqData,
      id: `req-${Date.now()}`,
      status: 'Under Review',
      date: new Date().toISOString().split('T')[0]
    };
    setBuyerRequirements((prev) => [newReq, ...prev]);
    showToast('Requirement Received', 'Our land advisory desk will contact you with matched plots.');
  };

  // Seller Plot Submissions
  const [sellerSubmissions, setSellerSubmissions] = usePersistedState('sbs_seller_plots', [
    {
      id: 'sub-1',
      fullName: 'K. Sambasiva Rao',
      mobileNumber: '+91 99890 55443',
      email: 'sambasiva.k@gmail.com',
      category: 'Residential Plot',
      village: 'Rayapudi',
      plotCode: 'LPS-RAY-R-0891',
      plotSizeSqYds: '300',
      facing: 'North-East',
      roadWidth: '60ft',
      expectedAskingPrice: '₹96 Lakhs',
      status: 'Pending Verification',
      date: '2026-11-16'
    }
  ]);

  const submitSellProperty = (sellData) => {
    const newSub = {
      ...sellData,
      id: `sub-${Date.now()}`,
      status: 'Under Verification',
      date: new Date().toISOString().split('T')[0]
    };
    setSellerSubmissions((prev) => [newSub, ...prev]);
    triggerSuccessModal(
      'Plot Listing Submitted!',
      'Your plot details have been received. Our Amaravati cadastral verification desk will inspect the allotment orders and verify the boundaries.'
    );
  };

  // General Inquiries
  const [enquiries, setEnquiries] = usePersistedState('sbs_plot_enquiries', [
    {
      id: 'enq-1',
      name: 'N. Ravindra',
      phone: '+91 94401 98765',
      plotCode: 'LPS-THU-R-0412',
      village: 'Thullur',
      message: 'Need legal document verification and want to inspect boundaries this weekend.',
      date: '2026-11-17',
      status: 'New'
    }
  ]);

  const submitEnquiry = (enquiryData) => {
    const newEnq = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      date: new Date().toLocaleString(),
      status: 'New'
    };
    setEnquiries((prev) => [newEnq, ...prev]);
    triggerSuccessModal(
      'Enquiry Received!',
      'Thank you for your interest. Our Amaravati property advisor will contact you with legal documentation.'
    );
  };

  // Modal State
  const [modalState, setModalState] = useState({
    enquiry: { isOpen: false, property: null },
    scheduleVisit: { isOpen: false, property: null },
    buyerRequirement: { isOpen: false },
    review: { isOpen: false },
    success: { isOpen: false, title: '', message: '' }
  });

  const openEnquiryModal = (property = null) => {
    setModalState((prev) => ({
      ...prev,
      enquiry: { isOpen: true, property }
    }));
  };

  const closeEnquiryModal = () => {
    setModalState((prev) => ({
      ...prev,
      enquiry: { isOpen: false, property: null }
    }));
  };

  const openScheduleVisitModal = (property = null) => {
    setModalState((prev) => ({
      ...prev,
      scheduleVisit: { isOpen: true, property }
    }));
  };

  const closeScheduleVisitModal = () => {
    setModalState((prev) => ({
      ...prev,
      scheduleVisit: { isOpen: false, property: null }
    }));
  };

  const openBuyerRequirementModal = () => {
    setModalState((prev) => ({
      ...prev,
      buyerRequirement: { isOpen: true }
    }));
  };

  const closeBuyerRequirementModal = () => {
    setModalState((prev) => ({
      ...prev,
      buyerRequirement: { isOpen: false }
    }));
  };

  const openReviewModal = () => {
    setModalState((prev) => ({
      ...prev,
      review: { isOpen: true }
    }));
  };

  const closeReviewModal = () => {
    setModalState((prev) => ({
      ...prev,
      review: { isOpen: false }
    }));
  };

  const triggerSuccessModal = (title, message) => {
    setModalState((prev) => ({
      ...prev,
      success: { isOpen: true, title, message }
    }));
  };

  const closeSuccessModal = () => {
    setModalState((prev) => ({
      ...prev,
      success: { isOpen: false, title: '', message: '' }
    }));
  };

  // Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (title, message, type = 'success') => {
    setToast({ title, message, type });
    setTimeout(() => setToast(null), 4500);
  };

  // Save / Bookmark Plots
  const toggleSaveProperty = (id) => {
    setSavedProperties((prev) => {
      if (prev.includes(id)) {
        showToast('Removed from Saved', 'Plot removed from your saved list.');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Saved Plot', 'Plot added to your saved list.');
        return [...prev, id];
      }
    });
  };

  const isPropertySaved = (id) => savedProperties.includes(id);

  // Reviews
  const submitCustomerReview = (reviewData) => {
    const newRev = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      approved: true
    };
    setReviews((prev) => [newRev, ...prev]);
    triggerSuccessModal(
      'Review Submitted!',
      'Thank you for your feedback. Your review is now live.'
    );
  };

  const approveReview = (id) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, approved: true } : r)));
    showToast('Review Approved', 'Review is now visible on the website.');
  };

  const rejectReview = (id) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, approved: false } : r)));
    showToast('Review Hidden', 'Review status updated to pending/rejected.');
  };

  const deleteReview = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    showToast('Review Deleted', 'The review has been deleted.');
  };

  // Plot CRUD Operations
  const addProperty = (newPlot) => {
    const internalId = `SBS-AMA-${String(properties.length + 101).padStart(6, '0')}`;
    const plotWithId = {
      ...newPlot,
      id: internalId,
      listingDate: new Date().toISOString().split('T')[0]
    };
    setProperties((prev) => [plotWithId, ...prev]);
    showToast('Plot Added', `Plot ${internalId} added successfully to inventory.`);
  };

  const updateProperty = (id, updatedData) => {
    setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p)));
    showToast('Plot Updated', 'Plot details saved successfully.');
  };

  const deleteProperty = (id) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
    showToast('Plot Deleted', 'The plot has been removed from active inventory.');
  };

  const toggleFeatured = (id) => {
    setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)));
  };

  const toggleVerified = (id) => {
    setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, verified: !p.verified } : p)));
  };

  // WhatsApp Link Helper (Safely handles both object and string arguments)
  const getWhatsAppLink = (arg1 = null, arg2 = null) => {
    const phone = siteSettings?.whatsappPhone || '919876543210';
    let text = '';
    if (typeof arg1 === 'object' && arg1 !== null) {
      const p = arg1;
      text = `Hello Simply Buy Sell Team, I am interested in this Amaravati property:
Plot Title: ${p.title || 'Amaravati Plot'}
Plot Code: ${p.plotCode || p.id || 'N/A'}
Village: ${p.village || 'Amaravati'}
Size: ${p.sizeSqYds || p.area || 'N/A'} sq.yd
Asking Price: ${p.priceDisplay || 'On Request'}

Please share the legal verification details and coordinate a site inspection.`;
    } else if (typeof arg1 === 'string' && arg1.trim()) {
      text = arg1;
    } else if (typeof arg2 === 'string' && arg2.trim()) {
      text = `Hello Simply Buy Sell Team, I am interested in "${arg2}". Please share verified documentation and pricing details.`;
    } else {
      text = `Hello Simply Buy Sell Team, I am looking to buy/sell verified plots in Amaravati. Please share current available inventory.`;
    }
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <AppContext.Provider
      value={{
        // Data Collections
        properties,
        plots: properties,
        heroSlides,
        services,
        villages,
        landmarks,
        statistics,
        siteSettings,
        reviews,
        trustCards,
        savedProperties,
        savedPlots: savedProperties,
        compareList,
        buyerRequirements,
        sellerSubmissions,
        sellRequests: sellerSubmissions,
        enquiries,

        // Modals & Notifications
        modalState,
        toast,
        showToast,
        openEnquiryModal,
        closeEnquiryModal,
        openScheduleVisitModal,
        closeScheduleVisitModal,
        openBuyerRequirementModal,
        closeBuyerRequirementModal,
        openReviewModal,
        closeReviewModal,
        closeSuccessModal,
        triggerSuccessModal,

        // Comparison Actions
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        isCompared: isInCompare,

        // Saved Plot Actions
        toggleSaveProperty,
        toggleSavePlot: toggleSaveProperty,
        isPropertySaved,
        isPlotSaved: isPropertySaved,

        // Form Submissions
        submitBuyerRequirement,
        submitSellProperty,
        submitSellerPlot: submitSellProperty,
        updateSellStatus: () => {},
        submitEnquiry,
        submitPlotEnquiry: submitEnquiry,
        submitCustomerReview,
        approveReview,
        rejectReview,
        deleteReview,

        // Admin CRUD
        addProperty,
        updateProperty,
        deleteProperty,
        addPlot: addProperty,
        updatePlot: updateProperty,
        deletePlot: deleteProperty,
        toggleFeatured,
        toggleVerified,
        setStatistics,
        setSiteSettings,
        setServices,

        // Communication
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
