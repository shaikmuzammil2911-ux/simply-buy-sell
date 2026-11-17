export const initialHeroSlides = [
  {
    id: 1,
    title: "Invest in Amaravati's Bright Future",
    subtitle: "Buy • Sell • Invest",
    description: "Discover premium flats, approved plots, luxury homes, and high-yield commercial investments across the rising Amaravati capital region.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80",
    badge: "Prime Amaravati Capital Region",
    active: true,
    ctaPrimary: { text: "Explore Properties", link: "/buy" },
    ctaSecondary: { text: "Know More", link: "/motto" },
    ctaBuy: { text: "Buy Property", link: "/buy" },
    ctaSell: { text: "Sell Property", link: "/sell" }
  },
  {
    id: 2,
    title: "Find Your Dream Luxury Home & Villa",
    subtitle: "Modern Living • Gated Communities",
    description: "Contemporary 2, 3 & 4 BHK apartments and independent villas with premium amenities in Mangalagiri & Amaravati growth corridors.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=80",
    badge: "Verified Residential Properties",
    active: true,
    ctaPrimary: { text: "View Residential Homes", link: "/services/residential" },
    ctaSecondary: { text: "Schedule Site Visit", link: "/contact" },
    ctaBuy: { text: "Browse Flats", link: "/buy?type=Flats" },
    ctaSell: { text: "Sell Your House", link: "/sell" }
  },
  {
    id: 3,
    title: "Approved Open Plots & Plotted Ventures",
    subtitle: "High Capital Appreciation • Clear Titles",
    description: "Secure clear-title CRDA & DTCP approved open plots in Thullur, Tadikonda, and strategic expressway growth zones.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80",
    badge: "CRDA & DTCP Approved Plots",
    active: true,
    ctaPrimary: { text: "Browse Open Plots", link: "/services/plots" },
    ctaSecondary: { text: "Buyer's Choice", link: "/buyers-choice" },
    ctaBuy: { text: "Find Plots", link: "/buy?type=Plots" },
    ctaSell: { text: "Post Your Plot", link: "/sell" }
  },
  {
    id: 4,
    title: "Commercial Spaces & Agricultural Lands",
    subtitle: "Strategic Growth • High ROI Assets",
    description: "High-value commercial showroom spaces, office complexes, and productive agricultural land parcels near Vijayawada-Amaravati Highway.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80",
    badge: "High-Yield Investment Opportunities",
    active: true,
    ctaPrimary: { text: "Explore Commercial", link: "/services/commercial" },
    ctaSecondary: { text: "Agricultural Lands", link: "/services/agricultural-land" },
    ctaBuy: { text: "Commercial Assets", link: "/buy?type=Commercial" },
    ctaSell: { text: "Sell Land / Property", link: "/sell" }
  }
];

export const trustCards = [
  {
    id: 1,
    title: "Customer-Friendly & Flexible",
    description: "Simple, flexible and hassle-free property solutions tailored for buyers, sellers and long-term investors.",
    icon: "Users",
    color: "green"
  },
  {
    id: 2,
    title: "More Than Just a Transaction",
    description: "Helping customers make confident property decisions that deliver compounding long-term value.",
    icon: "HeartHandshake",
    color: "orange"
  },
  {
    id: 3,
    title: "Trust, Clarity & Accurate Information",
    description: "Reliable and 100% transparent property documentation for safe and informed decision-making.",
    icon: "ShieldCheck",
    color: "blue"
  },
  {
    id: 4,
    title: "Our Role in Your Journey",
    description: "Directly connecting genuine buyers and verified sellers with pre-screened property opportunities.",
    icon: "Sparkles",
    color: "orange"
  },
  {
    id: 5,
    title: "Transparent & Responsible Platform",
    description: "A simple and responsible marketplace designed strictly around customer confidence and safety.",
    icon: "Award",
    color: "green"
  },
  {
    id: 6,
    title: "Complete & Clear Details",
    description: "Precise property dimensions, zoning laws, pricing breakdown, amenities, and essential documents upfront.",
    icon: "FileCheck",
    color: "blue"
  }
];

export const initialStatistics = {
  propertiesListed: "10K+",
  propertiesCount: 10000,
  happyCustomers: "5K+",
  happyCount: 5000,
  trustedPlatform: "100%",
  trustedCount: 100,
  serviceArea: "Andhra Pradesh",
  serviceTagline: "Our Service Area"
};

export const initialServices = [
  {
    id: 1,
    slug: "residential",
    title: "Residential Properties",
    subtitle: "Find your dream home with premium options.",
    description: "Explore world-class flats, standalone luxury houses, gated villas, and community apartments designed for elevated modern living.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    icon: "Home",
    badge: "Top Choice for Families",
    overview: "Amaravati and the Mangalagiri corridor are experiencing unprecedented residential development with premium gated communities, high-rise luxury towers, and scenic riverside living.",
    benefits: [
      "CRDA approved layouts and vetted builder titles",
      "Prime connectivity to Secretariat, High Court and AIIMS Mangalagiri",
      "Modern amenities: Clubhouse, swimming pools, 24/7 security",
      "Attractive home loan partnerships with leading banks"
    ],
    hotspots: ["Mangalagiri Core", "Thullur Residential Sector", "Undavalli Riverside", "Tadepalli"],
    faqs: [
      { q: "Are residential properties in Amaravati approved by AP CRDA?", a: "Yes, all verified residential listings on SimplyBuySell undergo thorough CRDA approval verification." },
      { q: "Can I get a home loan for under-construction flats?", a: "Yes, our partner banks provide pre-approved loans up to 80% of property value with attractive interest rates." }
    ]
  },
  {
    id: 2,
    slug: "commercial",
    title: "Commercial Properties",
    subtitle: "Invest in business spaces built for growth.",
    description: "Strategic office spaces, retail showrooms, warehousing hubs, and commercial complexes positioned along key transport corridors.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
    icon: "Building2",
    badge: "High Rental Yield",
    overview: "Commercial properties in the Vijayawada-Guntur-Amaravati tri-city corridor provide steady rental cash flows and exceptional capital appreciation.",
    benefits: [
      "High footfall commercial locations on national highways",
      "Long-term lease potential with institutional and corporate tenants",
      "Modern infrastructure: power backup, multi-level parking, fiber connectivity",
      "Flexible commercial floor plans suitable for retail, IT, and healthcare"
    ],
    hotspots: ["Vijayawada-Amaravati Highway", "Mangalagiri IT SEZ", "Guntur Inner Ring Road", "Benz Circle Extension"],
    faqs: [
      { q: "What is the typical rental yield on commercial assets here?", a: "Commercial real estate in the Amaravati-Vijayawada region averages an attractive 7% to 10% annual rental yield." },
      { q: "Can SimplyBuySell assist with tenant placement?", a: "Yes, our commercial advisory team assists with corporate leasing and tenant due diligence." }
    ]
  },
  {
    id: 3,
    slug: "plots",
    title: "Open Plots",
    subtitle: "Own a piece of future-ready land.",
    description: "Invest in high-growth CRDA, DTCP, and RERA approved open plots with clear titles, demarcated boundaries, and rapid value appreciation.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80",
    icon: "MapPin",
    badge: "Highest Capital Growth",
    overview: "Open plots in Amaravati capital zones offer the highest long-term multiplier on investment as the state capital infrastructure accelerates.",
    benefits: [
      "100% clear titles with computerized link documents",
      "DTCP and CRDA zoning compliance with proper layout sanctions",
      "Underground drainage, electricity, and 40ft-60ft black-top roads",
      "Immediate registration and spot demarcation support"
    ],
    hotspots: ["Thullur Capital Zone", "Tadikonda Plotted Enclaves", "Kaza NH-16 Hub", "Mandadam"],
    faqs: [
      { q: "How do I verify the legal title of a plot before buying?", a: "SimplyBuySell provides link documents dating back 30+ years, Encumbrance Certificates (EC), and official CRDA layout copies." },
      { q: "Is spot registration available?", a: "Yes, clear-title plots are ready for instant sub-registrar registration." }
    ]
  },
  {
    id: 4,
    slug: "agricultural-land",
    title: "Agricultural Lands",
    subtitle: "Explore productive land opportunities.",
    description: "Fertile agricultural parcels, farm land enclaves, and potential zoning expansion tracts suitable for farming or future conversion.",
    image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=1000&q=80",
    icon: "TreePine",
    badge: "Wealth Preservation",
    overview: "The Krishna river delta around Amaravati boasts fertile soil with abundant perennial water resources, making agricultural lands a secure store of generational wealth.",
    benefits: [
      "Rich alluvial soil with Krishna river canal irrigation",
      "Pattadar Passbook verification and 1B revenue records check",
      "Strategic proximity to proposed Outer Ring Road (ORR) alignments",
      "Opportunity for eco-farm houses and organic agricultural projects"
    ],
    hotspots: ["Tadikonda Rural Belt", "Amaravati Riverbank Belts", "Tenali-Guntur Agricultural Corridor"],
    faqs: [
      { q: "Can non-farmers purchase agricultural land in Andhra Pradesh?", a: "We guide you on the specific state land revenue guidelines and legal deed structures." },
      { q: "Are water rights and borewell approvals included?", a: "Each listing specifies canal water entitlement, existing borewells, and electricity connections." }
    ]
  },
  {
    id: 5,
    slug: "investment",
    title: "Investment Opportunities",
    subtitle: "Discover smart property investment options.",
    description: "Data-backed real estate opportunities vetted for high capital gains, infrastructure alignment, and optimal exit horizons in Amaravati.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    icon: "TrendingUp",
    badge: "Smart Wealth Building",
    overview: "Amaravati's revival as Andhra Pradesh's greenfield smart capital offers a generational wealth creation opportunity for early-stage real estate investors.",
    benefits: [
      "Proprietary market analytics comparing historical price trends",
      "Pre-launch institutional syndicate pricing for private investors",
      "Exit advisory and portfolio diversification support",
      "Direct exposure to government infrastructure corridors"
    ],
    hotspots: ["Seed Access Road", "High Court & Judicial Complex", "CRDA Core City Grid", "AIIMS Health Corridor"],
    faqs: [
      { q: "What is the expected ROI in Amaravati over 3-5 years?", a: "With infrastructure resumption, growth sectors show projected capital appreciation between 18% to 28% CAGR." },
      { q: "Can NRIs invest in Amaravati real estate?", a: "Yes! SimplyBuySell has a dedicated NRI advisory desk to handle NRE/NRO accounts, Power of Attorney, and registration." }
    ]
  }
];

export const initialProperties = [
  {
    id: "prop-1",
    slug: "luxury-3bhk-sky-residence-amaravati-core",
    title: "Luxury 3BHK Sky Residence with River View",
    type: "Flats",
    category: "residential",
    price: 8500000,
    priceDisplay: "₹85 Lakhs",
    location: "Amaravati",
    address: "Capital City Boulevard, Core Zone, Amaravati, AP",
    area: "1,850 sq.ft.",
    areaSqFt: 1850,
    bedrooms: 3,
    bathrooms: 3,
    status: "Ready to Move",
    featured: true,
    verified: true,
    furnishing: "Semi-Furnished",
    postedDate: "2026-11-12",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "An exceptional 3BHK luxury apartment in Amaravati's premier high-rise community. Featuring expansive balconies with panoramic views of the river and smart capital skyline, Italian marble flooring, designer kitchen, and club amenities.",
    highlights: [
      "100% Vaastu Compliant North-East Facing",
      "Double covered car parking included",
      "High ceiling height with German UPVC soundproof windows",
      "Access to 40,000 sq.ft. clubhouse and rooftop infinity pool"
    ],
    amenities: ["Swimming Pool", "Gymnasium", "24/7 Security", "Power Backup", "Clubhouse", "Children's Play Area", "EV Charging", "Jogging Track"],
    nearby: [
      { name: "AP Secretariat & Assembly", distance: "3.5 km" },
      { name: "AIIMS Mangalagiri", distance: "8.0 km" },
      { name: "Seed Access Road", distance: "0.8 km" },
      { name: "Gannavaram Airport", distance: "32.0 km" }
    ],
    seller: {
      name: "SimplyBuySell Verified Partner",
      phone: "+91 98765 43210",
      role: "Exclusive Property Partner",
      verified: true
    }
  },
  {
    id: "prop-2",
    slug: "crda-approved-open-plot-thullur",
    title: "CRDA Approved Corner Open Plot",
    type: "Plots",
    category: "plots",
    price: 4200000,
    priceDisplay: "₹42 Lakhs",
    location: "Thullur",
    address: "Sector 14, Near Government Complex, Thullur, Amaravati",
    area: "240 sq.yd.",
    areaSqFt: 2160,
    bedrooms: null,
    bathrooms: null,
    status: "Immediately Available",
    featured: true,
    verified: true,
    furnishing: "Unfurnished",
    postedDate: "2026-11-15",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "East-facing corner residential plot in a prime CRDA sanctioned layout. Features 50-foot wide blacktop roads, underground water pipelines, drainage, and street lighting. Rapidly growing residential pocket.",
    highlights: [
      "CRDA Approved & LP Number Sanctioned",
      "East-North Corner with double road frontage",
      "Clear computerized link documents ready for instant registration",
      "Surrounded by elite residential villas and schools"
    ],
    amenities: ["Gated Boundary", "Street Lighting", "Underground Drainage", "Blacktop Roads", "Avenue Plantation", "Water Supply"],
    nearby: [
      { name: "AP High Court", distance: "4.2 km" },
      { name: "Thullur Junction", distance: "1.2 km" },
      { name: "SRM University AP", distance: "9.5 km" },
      { name: "Vijayawada Center", distance: "21.0 km" }
    ],
    seller: {
      name: "K. Raghava Rao",
      phone: "+91 98765 43210",
      role: "Direct Owner / Seller",
      verified: true
    }
  },
  {
    id: "prop-3",
    slug: "grand-luxury-villa-mangalagiri",
    title: "Ultra-Luxury 4BHK Independent Villa",
    type: "Villas",
    category: "residential",
    price: 13500000,
    priceDisplay: "₹1.35 Crore",
    location: "Mangalagiri",
    address: "Greenwood Palms Gated Enclave, Mangalagiri, AP",
    area: "2,800 sq.ft.",
    areaSqFt: 2800,
    bedrooms: 4,
    bathrooms: 4,
    status: "Ready to Move",
    featured: true,
    verified: true,
    furnishing: "Fully Furnished",
    postedDate: "2026-11-08",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Architect-designed 4BHK duplex villa in a gated sanctuary. Complete with a private landscaped lawn, sunlit internal courtyard, high-end teakwood finishes, modular kitchen, home theater lounge, and solar power backup.",
    highlights: [
      "300 sq.yd. private plot with 2,800 sq.ft. built-up area",
      "Private garden and gazebo for family gatherings",
      "100% Vaastu compliant architecture",
      "Fully air-conditioned with premium Daikin VRV systems"
    ],
    amenities: ["Private Garden", "Home Automation", "Gated Security", "Solar Power", "Clubhouse Access", "Tennis Court", "Visitor Parking"],
    nearby: [
      { name: "AIIMS Mangalagiri", distance: "2.5 km" },
      { name: "NH-16 Highway", distance: "1.0 km" },
      { name: "Mangalagiri Temple", distance: "3.0 km" },
      { name: "Vijayawada Club", distance: "12.0 km" }
    ],
    seller: {
      name: "SimplyBuySell Premium Homes",
      phone: "+91 98765 43210",
      role: "Verified Premium Consultant",
      verified: true
    }
  },
  {
    id: "prop-4",
    slug: "commercial-showroom-vijayawada-amaravati-highway",
    title: "Prime Commercial Showroom & Office Space",
    type: "Commercial",
    category: "commercial",
    price: 18000000,
    priceDisplay: "₹1.80 Crore",
    location: "Vijayawada",
    address: "Vijayawada-Amaravati Highway Commercial Hub, Tadepalli",
    area: "3,200 sq.ft.",
    areaSqFt: 3200,
    bedrooms: null,
    bathrooms: 4,
    status: "Ready to Move",
    featured: false,
    verified: true,
    furnishing: "Semi-Furnished",
    postedDate: "2026-11-14",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Exceptional glass façade commercial property ideal for corporate offices, banking institutions, healthcare clinics, or retail flagship showrooms. Unbeatable frontage on the busy Vijayawada-Amaravati arterial corridor.",
    highlights: [
      "60 ft highway frontage with immense branding visibility",
      "Dedicated basement parking for 15+ vehicles",
      "High rental yield projection exceeding 8.5% p.a.",
      "Dual commercial lifts and 100% DG generator backup"
    ],
    amenities: ["High-speed Elevators", "Fire Safety Compliance", "Central AC Provision", "Basement Parking", "24/7 CCTV", "Fiber Internet Ready"],
    nearby: [
      { name: "Prakasam Barrage", distance: "4.0 km" },
      { name: "Vijayawada Railway Station", distance: "6.5 km" },
      { name: "Amaravati Secretariat", distance: "11.0 km" },
      { name: "Benz Circle", distance: "8.0 km" }
    ],
    seller: {
      name: "Apex Commercial Advisory",
      phone: "+91 98765 43210",
      role: "Commercial Real Estate Broker",
      verified: true
    }
  },
  {
    id: "prop-5",
    slug: "productive-agricultural-land-tadikonda",
    title: "Fertile Agricultural Land near Outer Ring Road",
    type: "Agricultural Land",
    category: "agricultural-land",
    price: 6500000,
    priceDisplay: "₹65 Lakhs",
    location: "Tadikonda",
    address: "Village Road, Tadikonda Mandal, Amaravati Region, AP",
    area: "1.25 Acres",
    areaSqFt: 54450,
    bedrooms: null,
    bathrooms: null,
    status: "Immediately Available",
    featured: false,
    verified: true,
    furnishing: "Unfurnished",
    postedDate: "2026-11-09",
    images: [
      "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Highly fertile black cotton agricultural soil parcel adjacent to proposed ORR growth corridor. Perennial groundwater access with existing motor borewell, clear 1B revenue records, and clean title chain.",
    highlights: [
      "Clean revenue passbook with zero encumbrance",
      "Direct 25ft blacktop village road connectivity",
      "Suitable for high-yield agriculture, agro-processing, or long term investment",
      "High probability of urban boundary inclusion"
    ],
    amenities: ["Active Borewell", "Electricity Connection", "Clear Demarcation", "Road Access"],
    nearby: [
      { name: "Tadikonda Center", distance: "3.0 km" },
      { name: "Guntur Inner Ring Road", distance: "12.0 km" },
      { name: "Amaravati Core City", distance: "14.0 km" }
    ],
    seller: {
      name: "S. Venkateswara Rao",
      phone: "+91 98765 43210",
      role: "Land Owner",
      verified: true
    }
  },
  {
    id: "prop-6",
    slug: "budget-friendly-2bhk-flat-mangalagiri",
    title: "Contemporary 2BHK Apartment near AIIMS",
    type: "Flats",
    category: "residential",
    price: 4800000,
    priceDisplay: "₹48 Lakhs",
    location: "Mangalagiri",
    address: "AIIMS Healthcare Avenue, Mangalagiri, AP",
    area: "1,150 sq.ft.",
    areaSqFt: 1150,
    bedrooms: 2,
    bathrooms: 2,
    status: "Ready to Move",
    featured: false,
    verified: true,
    furnishing: "Semi-Furnished",
    postedDate: "2026-11-16",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Perfect home for young families and medical/IT professionals. Modern 2BHK flat featuring open-concept kitchen, spacious balconies, solar water heater, and covered car parking.",
    highlights: [
      "Walking distance to AIIMS campus and public transit",
      "Approved for 85% home loan from SBI & HDFC",
      "Low maintenance society with 24/7 security",
      "Solid brick construction with termite warranty"
    ],
    amenities: ["Lift", "Covered Parking", "24/7 Water Supply", "Security Guard", "Intercom", "Power Backup for Common Areas"],
    nearby: [
      { name: "AIIMS Mangalagiri", distance: "0.6 km" },
      { name: "Mangalagiri Bus Terminal", distance: "2.0 km" },
      { name: "Guntur City Center", distance: "16.0 km" }
    ],
    seller: {
      name: "Sri Sai Builders",
      phone: "+91 98765 43210",
      role: "Authorized Builder Desk",
      verified: true
    }
  },
  {
    id: "prop-7",
    slug: "independent-house-guntur-city",
    title: "Premium 3BHK Independent Duplex House",
    type: "Houses",
    category: "residential",
    price: 9200000,
    priceDisplay: "₹92 Lakhs",
    location: "Guntur",
    address: "Pattabhipuram Extension, Guntur, AP",
    area: "2,200 sq.ft.",
    areaSqFt: 2200,
    bedrooms: 3,
    bathrooms: 3,
    status: "Ready to Move",
    featured: true,
    verified: true,
    furnishing: "Semi-Furnished",
    postedDate: "2026-11-05",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Stately independent 3BHK house situated in a peaceful, upscale Guntur neighborhood. Private compound wall, spacious portico parking, overhead water tank, and dedicated puja room.",
    highlights: [
      "Independent plot ownership with clear municipal municipal sanctions",
      "Borewell + Municipal drinking water connections",
      "Spacious master bedroom with walk-in closet",
      "Close to premier schools, supermarkets, and hospitals"
    ],
    amenities: ["Car Porch", "Private Borewell", "Water Storage Sump", "Modular Kitchen", "Terrace Garden Space"],
    nearby: [
      { name: "Guntur Railway Station", distance: "4.5 km" },
      { name: "Government Hospital", distance: "3.2 km" },
      { name: "Amaravati Expressway", distance: "6.0 km" }
    ],
    seller: {
      name: "M. Subba Rao",
      phone: "+91 98765 43210",
      role: "Direct Owner",
      verified: true
    }
  },
  {
    id: "prop-8",
    slug: "crda-open-plot-kaza-nh16",
    title: "Strategic Plotted Venture near NH-16 Toll Plaza",
    type: "Open Plots",
    category: "plots",
    price: 3400000,
    priceDisplay: "₹34 Lakhs",
    location: "Mangalagiri",
    address: "Kaza Growth Zone, Near NH-16 Highway, AP",
    area: "180 sq.yd.",
    areaSqFt: 1620,
    bedrooms: null,
    bathrooms: null,
    status: "Immediately Available",
    featured: false,
    verified: true,
    furnishing: "Unfurnished",
    postedDate: "2026-11-14",
    images: [
      "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Rapidly appreciating plotted layout located just 3 minutes off NH-16. Surrounded by established institutions like Acharya Nagarjuna University and Haailand.",
    highlights: [
      "DTCP / CRDA Layout Compliance",
      "Wide 40-foot internal roads with curbing stones",
      "Immediate spot registration assistance",
      "Excellent investment potential for 3-year doubling horizon"
    ],
    amenities: ["Compound Wall", "Security Gate", "Water Tank", "Electricity Lines"],
    nearby: [
      { name: "Acharya Nagarjuna University", distance: "2.5 km" },
      { name: "Kaza Toll Plaza", distance: "1.8 km" },
      { name: "Mangalagiri Center", distance: "6.0 km" }
    ],
    seller: {
      name: "SimplyBuySell Plots Desk",
      phone: "+91 98765 43210",
      role: "Verified Consultant",
      verified: true
    }
  }
];

export const initialReviews = [
  {
    id: "rev-1",
    name: "Dr. K. Srinivas Rao",
    location: "Amaravati",
    rating: 5,
    role: "Property Investor",
    propertyUsed: "Commercial Office Space, Tadepalli",
    comment: "SimplyBuySell made our property search simple and transparent. Their guidance helped us make a confident commercial investment decision without any middlemen hassles.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    date: "2026-10-18",
    approved: true
  },
  {
    id: "rev-2",
    name: "P. Lakshmi Prasanna",
    location: "Mangalagiri",
    rating: 5,
    role: "Home Buyer",
    propertyUsed: "3BHK Luxury Apartment, Mangalagiri",
    comment: "From site visit to registration, everything was handled with complete professionalism. The team checked all CRDA documents and title deeds thoroughly. Truly 100% trustworthy!",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    date: "2026-11-02",
    approved: true
  },
  {
    id: "rev-3",
    name: "Anand Verma",
    location: "Vijayawada",
    rating: 5,
    role: "Plot Owner / Seller",
    propertyUsed: "Open Plot Sale, Thullur",
    comment: "I listed my Thullur plot on SimplyBuySell and within 10 days received genuine enquiries from serious buyers. Closed the transaction at a great market price with zero stress.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    date: "2026-11-08",
    approved: true
  },
  {
    id: "rev-4",
    name: "Ramesh Babu Ch",
    location: "Guntur",
    rating: 5,
    role: "Villa Buyer",
    propertyUsed: "4BHK Independent Villa",
    comment: "The best real estate platform for the Amaravati region. The property filters, pricing clarity, and direct WhatsApp contact saved us weeks of futile site visits.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    date: "2026-11-12",
    approved: true
  }
];

export const initialSiteSettings = {
  brandName: "SimplyBuySell",
  tagline: "Buy • Sell • Invest",
  phone: "+91 98765 43210",
  whatsappPhone: "919876543210",
  email: "info@simplybuysell.com",
  location: "Andhra Pradesh, India",
  address: "SimplyBuySell Tower, Core Capital Zone, Amaravati, Andhra Pradesh 522503",
  language: "English",
  trustStatement: "Your Trust is Our Strength. Your Satisfaction is Our Goal.",
  motto: {
    vision: "To be the most transparent, accessible, and customer-centric property marketplace empowering individuals and businesses to build lasting prosperity across Andhra Pradesh.",
    mission: "To eliminate property transaction anxiety through meticulous due diligence, verified listings, objective pricing intelligence, and uncompromising customer advocacy."
  }
};
