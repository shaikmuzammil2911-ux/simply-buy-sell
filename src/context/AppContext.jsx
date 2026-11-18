import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialPlots,
  amaravatiVillages,
  amaravatiLandmarks,
  initialStatistics,
  initialReviews,
  initialSiteSettings
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
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

  const [plots, setPlots] = usePersistedState('sbs_plots', initialPlots);
  const [villages, setVillages] = usePersistedState('sbs_villages', amaravatiVillages);
  const [landmarks, setLandmarks] = usePersistedState('sbs_landmarks', amaravatiLandmarks);
  const [statistics, setStatistics] = usePersistedState('sbs_statistics', initialStatistics);
  const [siteSettings, setSiteSettings] = usePersistedState('sbs_site_settings', initialSiteSettings);
  const [reviews, setReviews] = usePersistedState('sbs_reviews', initialReviews);
  const [savedPlots, setSavedPlots] = usePersistedState('sbs_saved_plots', ['SBS-AMA-000101', 'SBS-AMA-000102']);

  // Plot Comparison State (Up to 4 plots)
  const [compareList, setCompareList] = usePersistedState('sbs_compare_list', ['SBS-AMA-000101', 'SBS-AMA-000103']);

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

  // Seller Plot Submissions
  const [sellerSubmissions, setSellerSubmissions] = usePersistedState('sbs_seller_plots', [
    {
      id: 'sub-1',
      sellerName: 'K. Sambasiva Rao',
      mobile: '+91 99890 55443',
      email: 'sambasiva.k@gmail.com',
      category: 'Residential Plot',
      village: 'Rayapudi',
      apcrdaPlotCode: 'LPS-RAY-R-0891',
      plotSizeSqYd: '300',
      facing: 'North-East',
      roadWidth: '60ft',
      askingPrice: '₹96 Lakhs',
      pricePerSqYd: '₹32,000 / sq.yd.',
      documentsAvailable: 'LPS Allotment Order, 30Y EC',
      status: 'Pending Review',
      date: '2026-11-16'
    }
  ]);

  // General Plot Inquiries
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

  // Modal controls
  const [modalState, setModalState] = useState({
    enquiry: { isOpen: false, plot: null },
    scheduleVisit: { isOpen: false, plot: null },
    buyerRequirement: { isOpen: false },
    review: { isOpen: false },
    success: { isOpen: false, title: '', message: '' }
  });

  const [toast, setToast] = useState(null);

  const showToast = (title, message, type = 'success') => {
    setToast({ title, message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Compare Actions
  const addToCompare = (id) => {
    if (compareList.includes(id)) {
      showToast('Already in Compare', 'This plot is already in your comparison list.', 'info');
      return;
    }
    if (compareList.length >= 4) {
      showToast('Comparison Full', 'You can compare up to 4 plots at a time. Remove one to add another.', 'info');
      return;
    }
    setCompareList(prev => [...prev, id]);
    showToast('Plot Added to Compare', 'Added to comparison list. Access via "Compare Plots".');
  };

  const removeFromCompare = (id) => {
    setCompareList(prev => prev.filter(item => item !== id));
    showToast('Removed from Compare', 'Plot removed from comparison.');
  };

  const clearCompare = () => {
    setCompareList([]);
    showToast('Compare Cleared', 'All plots removed from comparison.');
  };

  const isCompared = (id) => compareList.includes(id);

  // Favorite / Save Actions
  const toggleSavePlot = (id) => {
    setSavedPlots(prev => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Removed from Saved', 'Plot removed from saved list.');
        return prev.filter(item => item !== id);
      } else {
        showToast('Plot Saved', 'Plot added to your saved favorites.');
        return [...prev, id];
      }
    });
  };

  const isPlotSaved = (id) => savedPlots.includes(id);

  // Modal Openers
  const openEnquiryModal = (plot = null) => {
    setModalState(prev => ({ ...prev, enquiry: { isOpen: true, plot } }));
  };
  const closeEnquiryModal = () => {
    setModalState(prev => ({ ...prev, enquiry: { isOpen: false, plot: null } }));
  };

  const openScheduleVisitModal = (plot = null) => {
    setModalState(prev => ({ ...prev, scheduleVisit: { isOpen: true, plot } }));
  };
  const closeScheduleVisitModal = () => {
    setModalState(prev => ({ ...prev, scheduleVisit: { isOpen: false, plot: null } }));
  };

  const openBuyerRequirementModal = () => {
    setModalState(prev => ({ ...prev, buyerRequirement: { isOpen: true } }));
  };
  const closeBuyerRequirementModal = () => {
    setModalState(prev => ({ ...prev, buyerRequirement: { isOpen: false } }));
  };

  const openReviewModal = () => {
    setModalState(prev => ({ ...prev, review: { isOpen: true } }));
  };
  const closeReviewModal = () => {
    setModalState(prev => ({ ...prev, review: { isOpen: false } }));
  };

  const triggerSuccessModal = (title, message) => {
    setModalState(prev => ({ ...prev, success: { isOpen: true, title, message } }));
  };
  const closeSuccessModal = () => {
    setModalState(prev => ({ ...prev, success: { isOpen: false, title: '', message: '' } }));
  };

  // Buyer Requirement Submission
  const submitBuyerRequirement = (reqData) => {
    const newReq = {
      ...reqData,
      id: `req-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Matching Inventory'
    };
    setBuyerRequirements(prev => [newReq, ...prev]);
    triggerSuccessModal(
      'Requirement Received!',
      'Thank you. Our Amaravati plot matching desk has received your criteria. We will review our active APCRDA plot database and contact you with matching verified plots.'
    );
  };

  // Seller Plot Submission
  const submitSellerPlot = (subData) => {
    const newSub = {
      ...subData,
      id: `sub-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending Review'
    };
    setSellerSubmissions(prev => [newSub, ...prev]);
    triggerSuccessModal(
      'Plot Listing Submitted for Verification!',
      `Your submission reference is #${newSub.id.toUpperCase()}. Our team will cross-check the APCRDA plot records, verify the survey and LPS credentials, and contact you before public publication.`
    );
  };

  const updateSellerStatus = (id, newStatus) => {
    setSellerSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
    showToast('Submission Updated', `Status changed to: ${newStatus}`);
  };

  // Inquiries
  const submitPlotEnquiry = (enqData) => {
    const newEnq = {
      ...enqData,
      id: `enq-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'New'
    };
    setEnquiries(prev => [newEnq, ...prev]);
    triggerSuccessModal(
      'Enquiry Registered!',
      'Our Amaravati plot consultant has received your inquiry. We will provide verified documentation details and coordinate your site inspection.'
    );
  };

  // Plot CRUD for Admin
  const addPlot = (newPlot) => {
    const internalId = `SBS-AMA-${String(plots.length + 101).padStart(6, '0')}`;
    const plotWithId = {
      ...newPlot,
      id: internalId,
      listingDate: new Date().toISOString().split('T')[0]
    };
    setPlots(prev => [plotWithId, ...prev]);
    showToast('Plot Added', `Plot ${internalId} added successfully to inventory.`);
  };

  const updatePlot = (id, updatedData) => {
    setPlots(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
    showToast('Plot Updated', 'Plot details saved successfully.');
  };

  const deletePlot = (id) => {
    setPlots(prev => prev.filter(p => p.id !== id));
    showToast('Plot Deleted', 'Plot removed from database.');
  };

  const toggleFeatured = (id) => {
    setPlots(prev => prev.map(p => p.id === id ? { ...p, featured: !p.featured } : p));
  };

  const toggleVerified = (id) => {
    setPlots(prev => prev.map(p => p.id === id ? { ...p, verified: !p.verified } : p));
  };

  // Dynamic WhatsApp Link Builder complying with Phase 16
  const getWhatsAppLink = (customText = null, plot = null) => {
    const phone = siteSettings.whatsappPhone || '919876543210';
    let text = '';
    if (customText) {
      text = customText;
    } else if (plot) {
      text = `Hello Simply Buy Sell Team,

I am interested in this Amaravati plot.

Property Code: ${plot.apcrdaPlotCode || plot.id}
Village: ${plot.village}
Category: ${plot.category}
Plot Size: ${plot.plotSizeSqYd} Sq.Yds
Asking Price: ${plot.priceDisplay} (${plot.pricePerSqYdDisplay})

Please share the complete property details and arrange a site visit.`;
    } else {
      text = `Hello Simply Buy Sell Team, I am looking to buy/sell verified plots in Amaravati. Please share current available inventory.`;
    }
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <AppContext.Provider
      value={{
        plots,
        villages,
        landmarks,
        statistics,
        siteSettings,
        reviews,
        savedPlots,
        compareList,
        buyerRequirements,
        sellerSubmissions,
        enquiries,
        modalState,
        toast,
        showToast,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isCompared,
        toggleSavePlot,
        isPlotSaved,
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
        submitBuyerRequirement,
        submitSellerPlot,
        updateSellerStatus,
        submitPlotEnquiry,
        addPlot,
        updatePlot,
        deletePlot,
        toggleFeatured,
        toggleVerified,
        setStatistics,
        setSiteSettings,
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
