// Mock data and storage helpers for ShootCrew (Cameraman & Crew Booking Network)

export const ROLES = [
  { id: 'all', label: 'All Roles (सभी)', labelHi: 'सभी काम', icon: 'Sparkles' },
  { id: 'traditional_photo', label: 'Traditional Photographer', labelHi: 'स्टिल / ट्रेडिशनल फोटो', icon: 'Camera' },
  { id: 'traditional_video', label: 'Traditional Videographer', labelHi: 'ट्रेडिशनल वीडियो', icon: 'Video' },
  { id: 'cinematographer', label: 'Candid / Cinematographer', labelHi: 'सिनेमैटोग्राफर / कैंडिड', icon: 'Film' },
  { id: 'drone_operator', label: 'Drone Pilot (ड्रोन वाला)', labelHi: 'ड्रोन पायलट', icon: 'Plane' },
  { id: 'reel_creator', label: 'Reel Maker / Mobile Shooter', labelHi: 'रील मेकर (इंस्टाग्राम)', icon: 'Smartphone' },
  { id: 'led_operator', label: 'LED Wall Operator', labelHi: 'एलईडी वॉल ऑपरेटर', icon: 'Tv' },
  { id: 'editor', label: 'Album & Video Editor', labelHi: 'एल्बम / वीडियो एडिटर', icon: 'Monitor' },
];

export const CITIES = [
  { id: 'gondia', name: 'Gondia (गोंदिया)', state: 'Maharashtra', areas: ['Rail Toli', 'Ramnagar', 'Kudwa', 'Goregaon', 'Tirora', 'Amgaon', 'Civil Lines'] },
  { id: 'nagpur', name: 'Nagpur (नागपुर)', state: 'Maharashtra', areas: ['Dharampeth', 'Sitabuldi', 'Manish Nagar', 'Wardhaman Nagar', 'Nandanvan', 'Mahal', 'Kamptee'] },
  { id: 'bhandara', name: 'Bhandara (भंडारा)', state: 'Maharashtra', areas: ['Main Market', 'Khat Road', 'Tumsar', 'Lakhani', 'Sakoli'] },
  { id: 'balaghat', name: 'Balaghat (बालाघाट)', state: 'Madhya Pradesh', areas: ['Premnagar', 'Waraseoni', 'Katangi', 'Baihar', 'Lalbarra'] },
  { id: 'raipur', name: 'Raipur (रायपुर)', state: 'Chhattisgarh', areas: ['Pandri', 'Shankar Nagar', 'Telibandha', 'Samta Colony'] },
  { id: 'amravati', name: 'Amravati (अमरावती)', state: 'Maharashtra', areas: ['Rajapeth', 'Camp', 'Badnera'] },
  { id: 'chandrapur', name: 'Chandrapur (चंद्रपुर)', state: 'Maharashtra', areas: ['Gandhi Chowk', 'Civil Lines', 'Ballarpur'] },
];

export const INITIAL_CREW = [
  {
    id: 'crew-1',
    name: 'Rohan Meshram',
    phone: '9823456781',
    city: 'gondia',
    cityName: 'Gondia',
    area: 'Ramnagar, Gondia',
    role: 'traditional_photo',
    roleLabel: 'Traditional Photographer',
    experience: '6 Years',
    hasCamera: true, // Camera ke saath
    gearType: 'with_gear',
    cameraDetails: 'Sony A7 IV + 24-70mm GM II + Godox V1 Flash',
    withoutGearAvailable: true,
    rateWithGear: 2800,
    rateWithoutGear: 1200,
    rating: 4.9,
    reviewsCount: 38,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    availableDates: ['2026-10-15', '2026-10-16', '2026-10-20', '2026-10-25', '2026-11-02', '2026-11-05', '2026-11-12', '2026-11-18', '2026-11-24', '2026-12-01', '2026-12-08'],
    isVerified: true,
    registrationPaid: true,
    instagram: '@rohan_clicks_gondia',
    bio: 'Specialist in wedding stage photography, vidhi rituals & group posing. Sharp framing and fast turnaround.',
  },
  {
    id: 'crew-2',
    name: 'Amit Bisen',
    phone: '9422891234',
    city: 'gondia',
    cityName: 'Gondia',
    area: 'Rail Toli, Gondia',
    role: 'drone_operator',
    roleLabel: 'Drone Pilot (ड्रोन वाला)',
    experience: '4 Years',
    hasCamera: true,
    gearType: 'with_gear',
    cameraDetails: 'DJI Mavic 3 Pro (3 Batteries, 4K 60FPS, PolarPro ND Filters)',
    withoutGearAvailable: true,
    rateWithGear: 4500,
    rateWithoutGear: 1800,
    rating: 4.8,
    reviewsCount: 42,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    availableDates: ['2026-10-18', '2026-10-22', '2026-10-28', '2026-11-04', '2026-11-08', '2026-11-15', '2026-11-20', '2026-12-02', '2026-12-10'],
    isVerified: true,
    registrationPaid: true,
    instagram: '@amit_drone_gondia',
    bio: 'Professional DGCA certified drone pilot. Baarat entry, outdoor pre-wedding & venue bird-eye shots.',
  },
  {
    id: 'crew-3',
    name: 'Pratik Wanjari',
    phone: '9765432109',
    city: 'nagpur',
    cityName: 'Nagpur',
    area: 'Dharampeth, Nagpur',
    role: 'cinematographer',
    roleLabel: 'Candid / Cinematographer',
    experience: '5 Years',
    hasCamera: true,
    gearType: 'with_gear',
    cameraDetails: 'Sony FX3 + Sony 50mm f/1.2 GM + Ronin RS3 Pro Gimbal',
    withoutGearAvailable: true,
    rateWithGear: 5500,
    rateWithoutGear: 2200,
    rating: 5.0,
    reviewsCount: 56,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    availableDates: ['2026-10-14', '2026-10-19', '2026-10-24', '2026-11-01', '2026-11-09', '2026-11-14', '2026-11-22', '2026-11-28', '2026-12-04'],
    isVerified: true,
    registrationPaid: true,
    instagram: '@pratik_films_ngp',
    bio: 'Cinematic teaser specialist with S-Log3 color grading experience. Smooth gimbal movements and slow motion.',
  },
  {
    id: 'crew-4',
    name: 'Sachin Rahangdale',
    phone: '9158334455',
    city: 'gondia',
    cityName: 'Gondia',
    area: 'Goregaon Road, Gondia',
    role: 'traditional_video',
    roleLabel: 'Traditional Videographer',
    experience: '8 Years',
    hasCamera: false, // Without Camera - Exposing / Crew only!
    gearType: 'without_gear',
    cameraDetails: 'Operator Only (Experienced with Sony FX30, Panasonic CX350, Sony NX200, Canon XA50)',
    withoutGearAvailable: true,
    rateWithGear: null,
    rateWithoutGear: 1400,
    rating: 4.7,
    reviewsCount: 29,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    availableDates: ['2026-10-15', '2026-10-17', '2026-10-21', '2026-10-29', '2026-11-02', '2026-11-07', '2026-11-13', '2026-11-19', '2026-11-25', '2026-12-05'],
    isVerified: true,
    registrationPaid: true,
    instagram: '@sachin_videography',
    bio: 'Punctual & dedicated cameraman. Full rituals knowledge (Haldi, Barat, Mangalsutra, Pheras) with zero camera shake.',
  },
  {
    id: 'crew-5',
    name: 'Kunal Shrivas',
    phone: '9370123490',
    city: 'nagpur',
    cityName: 'Nagpur',
    area: 'Manish Nagar, Nagpur',
    role: 'reel_creator',
    roleLabel: 'Reel Maker / Mobile Shooter',
    experience: '3 Years',
    hasCamera: true,
    gearType: 'with_gear',
    cameraDetails: 'iPhone 15 Pro Max + DJI Osmo Mobile 6 Gimbal + Rode Wireless Go II',
    withoutGearAvailable: false,
    rateWithGear: 3000,
    rateWithoutGear: 1500,
    rating: 4.9,
    reviewsCount: 31,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    availableDates: ['2026-10-16', '2026-10-20', '2026-10-26', '2026-11-03', '2026-11-11', '2026-11-16', '2026-11-23', '2026-11-30', '2026-12-07'],
    isVerified: true,
    registrationPaid: true,
    instagram: '@kunal_weddingreels',
    bio: 'Same-day trending wedding reels delivery! 4-5 high quality viral format reels delivered during wedding evening.',
  },
  {
    id: 'crew-6',
    name: 'Mahesh Patle',
    phone: '9890556677',
    city: 'gondia',
    cityName: 'Gondia',
    area: 'Tirora, Gondia',
    role: 'led_operator',
    roleLabel: 'LED Wall Operator',
    experience: '7 Years',
    hasCamera: true,
    gearType: 'with_gear',
    cameraDetails: 'P3 Outdoor/Indoor LED Cabinet Setup + Novastar Processor + Live Switcher',
    withoutGearAvailable: true,
    rateWithGear: 6500,
    rateWithoutGear: 1500,
    rating: 4.8,
    reviewsCount: 24,
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    availableDates: ['2026-10-18', '2026-10-25', '2026-11-05', '2026-11-12', '2026-11-18', '2026-11-26', '2026-12-02'],
    isVerified: true,
    registrationPaid: true,
    instagram: '@mahesh_led_solutions',
    bio: 'Flawless live telecast with zero lag. Experienced with Blackmagic Atem Mini, multi-cam live switching & LED playback.',
  },
  {
    id: 'crew-7',
    name: 'Deepak Chouhan',
    phone: '9403112233',
    city: 'bhandara',
    cityName: 'Bhandara',
    area: 'Khat Road, Bhandara',
    role: 'traditional_photo',
    roleLabel: 'Traditional Photographer',
    experience: '5 Years',
    hasCamera: false, // Without camera
    gearType: 'without_gear',
    cameraDetails: 'Operator Only (Expert on Nikon Z6 II / Z8, Canon R6 & Sony Alpha)',
    withoutGearAvailable: true,
    rateWithGear: null,
    rateWithoutGear: 1300,
    rating: 4.6,
    reviewsCount: 18,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    availableDates: ['2026-10-15', '2026-10-21', '2026-10-27', '2026-11-04', '2026-11-10', '2026-11-17', '2026-11-24', '2026-12-03'],
    isVerified: true,
    registrationPaid: true,
    instagram: '@deepak_clicks_bhandara',
    bio: 'Exposing specialist without camera. Available on short notice in Bhandara, Gondia, and Nagpur belt.',
  },
  {
    id: 'crew-8',
    name: 'Vikas Dongre',
    phone: '9637889900',
    city: 'nagpur',
    cityName: 'Nagpur',
    area: 'Sitabuldi, Nagpur',
    role: 'traditional_video',
    roleLabel: 'Traditional Videographer',
    experience: '6 Years',
    hasCamera: true,
    gearType: 'with_gear',
    cameraDetails: 'Sony FX30 4K + 18-105mm G Lens + Simpex LED Light + Heavy Stand',
    withoutGearAvailable: true,
    rateWithGear: 3200,
    rateWithoutGear: 1500,
    rating: 4.9,
    reviewsCount: 45,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    availableDates: ['2026-10-16', '2026-10-23', '2026-10-30', '2026-11-06', '2026-11-15', '2026-11-21', '2026-11-27', '2026-12-06'],
    isVerified: true,
    registrationPaid: true,
    instagram: '@vikas_video_ngp',
    bio: 'Crystal clear 4K video recording with clean audio lapel mics. Excellent lighting balance during night baarat.',
  },
  {
    id: 'crew-9',
    name: 'Aniket Bagde',
    phone: '9881223344',
    city: 'balaghat',
    cityName: 'Balaghat',
    area: 'Premnagar, Balaghat',
    role: 'drone_operator',
    roleLabel: 'Drone Pilot (ड्रोन वाला)',
    experience: '3 Years',
    hasCamera: true,
    gearType: 'with_gear',
    cameraDetails: 'DJI Air 3 Dual Camera (48MP, 70mm telephoto + wide)',
    withoutGearAvailable: false,
    rateWithGear: 4000,
    rateWithoutGear: null,
    rating: 4.8,
    reviewsCount: 22,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    availableDates: ['2026-10-17', '2026-10-24', '2026-10-31', '2026-11-08', '2026-11-14', '2026-11-20', '2026-11-29', '2026-12-08'],
    isVerified: true,
    registrationPaid: true,
    instagram: '@aniket_drone_bgt',
    bio: 'Ready to travel to Gondia, Balaghat, Seoni, and Lalbarra for wedding shoots. High wind resistance.',
  }
];

export const INITIAL_PLATFORM_CONFIG = {
  appName: 'PhotographerCrew Connect',
  tagline: 'Gondia & Nagpur Photography Crew & Cameraman Network',
  registrationFee: 299, // Platform fee in INR for registering
  directConnectFee: 49,  // Fee per lead or unlimited monthly
  upiId: '8669173204@hdfc',
  supportPhone: '8669173204',
  qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=8669173204@hdfc%26pn=PhotographerCrew%26am=299%26cu=INR',
};

// Storage helper functions
export const getStoredCrew = () => {
  try {
    const data = localStorage.getItem('photographercrew_crew_data') || localStorage.getItem('shootcrew_crew_data');
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to load crew data', e);
  }
  return INITIAL_CREW;
};

export const saveCrewData = (crewList) => {
  try {
    localStorage.setItem('photographercrew_crew_data', JSON.stringify(crewList));
  } catch (e) {
    console.error('Failed to save crew data', e);
  }
};

export const getPlatformConfig = () => {
  try {
    const data = localStorage.getItem('photographercrew_config') || localStorage.getItem('shootcrew_config');
    if (data) {
      const parsed = JSON.parse(data);
      // Auto-migrate to official user UPI ID and Support Phone if old placeholder exists
      if (parsed.upiId === 'shootcrew@upi' || parsed.upiId === 'photographercrew@upi' || !parsed.supportPhone || parsed.supportPhone === '9823000000') {
        parsed.upiId = '8669173204@hdfc';
        parsed.supportPhone = '8669173204';
        parsed.qrCodeUrl = INITIAL_PLATFORM_CONFIG.qrCodeUrl;
        localStorage.setItem('photographercrew_config', JSON.stringify(parsed));
      }
      return parsed;
    }
  } catch (e) {
    console.error('Failed to load platform config', e);
  }
  return INITIAL_PLATFORM_CONFIG;
};

export const savePlatformConfig = (cfg) => {
  try {
    localStorage.setItem('photographercrew_config', JSON.stringify(cfg));
  } catch (e) {
    console.error('Failed to save config', e);
  }
};

export const getBookings = () => {
  try {
    const data = localStorage.getItem('shootcrew_bookings');
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to load bookings', e);
  }
  return [
    {
      id: 'b-101',
      crewId: 'crew-1',
      crewName: 'Rohan Meshram',
      studioName: 'Shree Sai Digital Studio, Gondia',
      contactPerson: 'Kailash Patle',
      phone: '9823112233',
      shootDate: '2026-11-12',
      shift: 'Full Day (पूरा दिन)',
      location: 'Gondia - Kudwa Palace',
      eventType: 'Wedding & Reception (शादी)',
      gearType: 'With Camera (Sony A7M4)',
      rate: 2800,
      status: 'Confirmed (कन्फर्म)',
      createdAt: '2026-09-22',
    },
    {
      id: 'b-102',
      crewId: 'crew-2',
      crewName: 'Amit Bisen',
      studioName: 'Royal Moments Photography, Nagpur',
      contactPerson: 'Sunil Agrawal',
      phone: '9422001122',
      shootDate: '2026-11-15',
      shift: 'Evening (शाम बारात)',
      location: 'Nagpur - Chitnavis Centre',
      eventType: 'Drone Coverage for Baarat',
      gearType: 'DJI Mavic 3 Pro',
      rate: 4500,
      status: 'Confirmed (कन्फर्म)',
      createdAt: '2026-09-23',
    }
  ];
};

export const saveBookings = (bookings) => {
  try {
    localStorage.setItem('shootcrew_bookings', JSON.stringify(bookings));
  } catch (e) {
    console.error('Failed to save bookings', e);
  }
};
