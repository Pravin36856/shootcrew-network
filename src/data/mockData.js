// Mock data and storage helpers for PhotographerCrew (Cameraman & Crew Booking Network)

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

// Master list of services & skills photographers/crew can offer
export const SERVICES_LIST = [
  { id: 'traditional_photo', label: 'Traditional Photo (स्टिल फोटोग्राफी)', shortLabel: 'Trad Photo', icon: 'Camera' },
  { id: 'traditional_video', label: 'Traditional Video (ट्रेडिशनल वीडियो)', shortLabel: 'Trad Video', icon: 'Video' },
  { id: 'candid_photo', label: 'Candid Photography (कैंडिड फोटोग्राफी)', shortLabel: 'Candid Photo', icon: 'Sparkles' },
  { id: 'cinematic_video', label: 'Cinematic Video (सिनेमैटिक वीडियो)', shortLabel: 'Cinematic', icon: 'Film' },
  { id: 'drone_shoot', label: 'Drone Shoot (ड्रोन शूटिंग)', shortLabel: 'Drone Shoot', icon: 'Plane' },
  { id: 'pre_wedding', label: 'Pre-Wedding Shoot (प्री-वेडिंग)', shortLabel: 'Pre-Wedding', icon: 'Heart' },
  { id: 'reels_maker', label: 'Reel Maker (इंस्टाग्राम रील्स)', shortLabel: 'Reels', icon: 'Smartphone' },
  { id: 'live_telecast', label: 'LED Wall / Live Setup (लाइव टेलीकास्ट)', shortLabel: 'LED / Live', icon: 'Tv' },
  { id: 'album_editing', label: 'Album & Video Editing (एडिटिंग)', shortLabel: 'Editing', icon: 'Monitor' },
];

// Presets for Equipment Management
export const COMMON_CAMERAS = [
  'Sony A7 IV',
  'Sony A7 III',
  'Sony FX3 Cinema',
  'Sony FX30 Cinema',
  'Sony A7R V',
  'Canon EOS R6 Mark II',
  'Canon EOS R5',
  'Canon EOS R8',
  'Nikon Z6 II',
  'Nikon Z8',
  'Panasonic Lumix S5 II',
  'Panasonic CX350 (4K Camcorder)',
  'Sony NX200 (HD/4K Camcorder)',
  'iPhone 15/16 Pro Max',
];

export const COMMON_GIMBALS = [
  'DJI RS3 Pro',
  'DJI RS4 Pro',
  'DJI RS3 Mini',
  'DJI Ronin SC',
  'Zhiyun Crane 4',
  'Zhiyun Crane 3S',
  'Zhiyun Weebill 3S',
  'Moza Air 2S',
];

export const COMMON_DRONES = [
  'DJI Mavic 3 Pro (Triple Lens)',
  'DJI Mavic 3 Classic',
  'DJI Air 3 (Dual Camera)',
  'DJI Air 2S',
  'DJI Mini 4 Pro',
  'DJI Avata 2 (FPV Baarat Entry)',
];

export const COMMON_LENSES = [
  '24-70mm f/2.8 (Stage & Vidhi Zoom)',
  '70-200mm f/2.8 (Candid Closeups)',
  '16-35mm f/2.8 (Wide Stage / Hall)',
  '50mm f/1.2 / f/1.4 (Portraits)',
  '85mm f/1.4 (Bridal Beauty)',
  '35mm f/1.4 (Haldi & Candids)',
  '24-105mm f/4 (All Rounder)',
];

export const COMMON_LIGHTS = [
  'Godox V1 On-Camera Round Flash',
  'Godox AD200 Pro Strobe Light',
  'Godox AD600 Pro Outdoor Flash',
  'Simpex 100W Video LED + Stand',
  'Aputure Amaran 200d LED + Softbox',
  'RGB Tube Lights (Nanlite / Godox)',
];

export const COMMON_MICS = [
  'DJI Mic 2 Wireless',
  'Rode Wireless GO II Dual',
  'Sennheiser EW-D Wireless Lapel',
  'Boya Wireless Mic',
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
    hasCamera: true,
    gearType: 'with_gear',
    cameraDetails: '2x Sony A7 IV + 24-70mm GM II + Godox V1 Flash',
    gearKit: {
      cameras: [
        { model: 'Sony A7 IV', qty: 2 }
      ],
      totalCameras: 2,
      hasGimbal: false,
      gimbal: null,
      hasDrone: false,
      drone: null,
      lenses: ['24-70mm f/2.8 GM II', '70-200mm f/2.8 GM', '50mm f/1.4 GM'],
      lighting: 'Godox V1 Flash (2x) + Stand',
      mic: 'Boya Wireless Lapel'
    },
    withoutGearAvailable: true,
    rateWithGear: 2800,
    rateWithoutGear: 1200,
    rating: 4.9,
    reviewsCount: 38,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    availableDates: ['2026-10-15', '2026-10-16', '2026-10-20', '2026-10-25', '2026-11-02', '2026-11-05', '2026-11-12', '2026-11-18', '2026-11-24', '2026-12-01', '2026-12-08'],
    isVerified: true,
    registrationPaid: true,
    skills: ['traditional_photo', 'candid_photo', 'pre_wedding'],
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
    cameraDetails: 'DJI Mavic 3 Pro (3 Batteries, 4K 60FPS) + Sony A7 III',
    gearKit: {
      cameras: [
        { model: 'Sony A7 III', qty: 1 }
      ],
      totalCameras: 1,
      hasGimbal: true,
      gimbal: 'DJI RS3 Pro Gimbal',
      hasDrone: true,
      drone: 'DJI Mavic 3 Pro (Triple Lens 4K)',
      droneBatteries: 3,
      lenses: ['24-70mm f/2.8', 'Drone 24mm/70mm/166mm'],
      lighting: 'Outdoor LED Searchlight',
      mic: null
    },
    withoutGearAvailable: true,
    rateWithGear: 4500,
    rateWithoutGear: 1800,
    rating: 4.8,
    reviewsCount: 42,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    availableDates: ['2026-10-18', '2026-10-22', '2026-10-28', '2026-11-04', '2026-11-08', '2026-11-15', '2026-11-20', '2026-12-02', '2026-12-10'],
    isVerified: true,
    registrationPaid: true,
    skills: ['drone_shoot', 'traditional_video', 'cinematic_video'],
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
    cameraDetails: '1x Sony FX3 + 1x Sony A7 IV + DJI RS3 Pro Gimbal + Drone',
    gearKit: {
      cameras: [
        { model: 'Sony FX3 Cinema', qty: 1 },
        { model: 'Sony A7 IV', qty: 1 }
      ],
      totalCameras: 2,
      hasGimbal: true,
      gimbal: 'DJI RS3 Pro + Tilta Follow Focus',
      hasDrone: true,
      drone: 'DJI Mini 4 Pro',
      droneBatteries: 3,
      lenses: ['Sony 50mm f/1.2 GM', 'Sony 24-70mm f/2.8 GM II', 'Sony 16-35mm f/2.8 GM'],
      lighting: 'Aputure Amaran 200d LED + Lantern Softbox',
      mic: 'DJI Mic 2 Wireless (2 Transmitters)'
    },
    withoutGearAvailable: true,
    rateWithGear: 5500,
    rateWithoutGear: 2200,
    rating: 5.0,
    reviewsCount: 56,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    availableDates: ['2026-10-14', '2026-10-19', '2026-10-24', '2026-11-01', '2026-11-09', '2026-11-14', '2026-11-22', '2026-11-28', '2026-12-04'],
    isVerified: true,
    registrationPaid: true,
    skills: ['cinematic_video', 'candid_photo', 'pre_wedding', 'drone_shoot'],
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
    hasCamera: false,
    gearType: 'without_gear',
    cameraDetails: 'Operator Only (Expert on Sony FX30, Panasonic CX350, NX200, Canon XA50)',
    gearKit: {
      cameras: [],
      totalCameras: 0,
      hasGimbal: true,
      gimbal: 'Operator on DJI RS3 / Crane',
      hasDrone: false,
      drone: null,
      operatedCameras: ['Sony FX30', 'Panasonic CX350', 'Sony NX200', 'Canon XA50', 'Sony A7M3'],
      speciality: 'Handheld ritual tracking, Zero camera shake'
    },
    withoutGearAvailable: true,
    rateWithGear: null,
    rateWithoutGear: 1400,
    rating: 4.7,
    reviewsCount: 29,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    availableDates: ['2026-10-15', '2026-10-17', '2026-10-21', '2026-10-29', '2026-11-02', '2026-11-07', '2026-11-13', '2026-11-19', '2026-11-25', '2026-12-05'],
    isVerified: true,
    registrationPaid: true,
    skills: ['traditional_video', 'traditional_photo'],
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
    cameraDetails: 'iPhone 15 Pro Max 4K 60FPS + DJI Osmo Mobile 6 Gimbal + Rode Wireless Go II',
    gearKit: {
      cameras: [
        { model: 'iPhone 15 Pro Max (512GB 4K 60FPS)', qty: 1 }
      ],
      totalCameras: 1,
      hasGimbal: true,
      gimbal: 'DJI Osmo Mobile 6 Gimbal',
      hasDrone: false,
      drone: null,
      lenses: ['Triple Lens 0.5x, 1x, 2x, 5x Macro'],
      lighting: 'Ulanzi Bi-Color Pocket LED',
      mic: 'Rode Wireless GO II Dual Channel'
    },
    withoutGearAvailable: false,
    rateWithGear: 3000,
    rateWithoutGear: 1500,
    rating: 4.9,
    reviewsCount: 31,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    availableDates: ['2026-10-16', '2026-10-20', '2026-10-26', '2026-11-03', '2026-11-11', '2026-11-16', '2026-11-23', '2026-11-30', '2026-12-07'],
    isVerified: true,
    registrationPaid: true,
    skills: ['reels_maker', 'cinematic_video', 'candid_photo'],
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
    cameraDetails: 'P3 Outdoor/Indoor LED Cabinet Setup + Novastar Processor + Atem Mini Switcher',
    gearKit: {
      cameras: [
        { model: 'Sony FX30 (Live HDMI Feed)', qty: 1 }
      ],
      totalCameras: 1,
      hasGimbal: false,
      gimbal: null,
      hasDrone: false,
      drone: null,
      lenses: ['18-105mm G Zoom'],
      lighting: 'LED Wall Stage Illumination',
      mic: 'Atem Audio Mixer Inputs'
    },
    withoutGearAvailable: true,
    rateWithGear: 6500,
    rateWithoutGear: 1500,
    rating: 4.8,
    reviewsCount: 24,
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
    availableDates: ['2026-10-18', '2026-10-25', '2026-11-05', '2026-11-12', '2026-11-18', '2026-11-26', '2026-12-02'],
    isVerified: true,
    registrationPaid: true,
    skills: ['live_telecast', 'traditional_video'],
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
    hasCamera: false,
    gearType: 'without_gear',
    cameraDetails: 'Operator Only (Expert on Nikon Z6 II / Z8, Canon R6 & Sony Alpha)',
    gearKit: {
      cameras: [],
      totalCameras: 0,
      hasGimbal: false,
      gimbal: null,
      hasDrone: false,
      drone: null,
      operatedCameras: ['Nikon Z6 II', 'Nikon Z8', 'Canon R6 Mark II', 'Sony A7 IV'],
      speciality: 'Exposing specialist without camera, punctual & quick posing'
    },
    withoutGearAvailable: true,
    rateWithGear: null,
    rateWithoutGear: 1300,
    rating: 4.6,
    reviewsCount: 18,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    availableDates: ['2026-10-15', '2026-10-21', '2026-10-27', '2026-11-04', '2026-11-10', '2026-11-17', '2026-11-24', '2026-12-03'],
    isVerified: true,
    registrationPaid: true,
    skills: ['traditional_photo', 'candid_photo'],
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
    cameraDetails: '2x Sony FX30 Cinema + 18-105mm G Lens + Simpex LED Light + DJI RS3',
    gearKit: {
      cameras: [
        { model: 'Sony FX30 Cinema', qty: 2 }
      ],
      totalCameras: 2,
      hasGimbal: true,
      gimbal: 'DJI RS3 Gimbal',
      hasDrone: false,
      drone: null,
      lenses: ['18-105mm G OSS', '50mm f/1.8'],
      lighting: 'Simpex Heavy 100W LED + Stand',
      mic: 'Sennheiser Wireless Lapel'
    },
    withoutGearAvailable: true,
    rateWithGear: 3200,
    rateWithoutGear: 1500,
    rating: 4.9,
    reviewsCount: 45,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    availableDates: ['2026-10-16', '2026-10-23', '2026-10-30', '2026-11-06', '2026-11-15', '2026-11-21', '2026-11-27', '2026-12-06'],
    isVerified: true,
    registrationPaid: true,
    skills: ['traditional_video', 'cinematic_video', 'traditional_photo'],
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
    cameraDetails: 'DJI Air 3 Dual 4K Camera (4 Batteries, ND Filters) + Fast Charger',
    gearKit: {
      cameras: [],
      totalCameras: 0,
      hasGimbal: true,
      gimbal: 'In-built 3-Axis Gimbal',
      hasDrone: true,
      drone: 'DJI Air 3 Dual Camera 4K',
      droneBatteries: 4,
      lenses: ['Dual 24mm Wide + 70mm Medium Telephoto'],
      lighting: 'Beacon Lights',
      mic: null
    },
    withoutGearAvailable: false,
    rateWithGear: 4000,
    rateWithoutGear: null,
    rating: 4.8,
    reviewsCount: 22,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    availableDates: ['2026-10-17', '2026-10-24', '2026-10-31', '2026-11-08', '2026-11-14', '2026-11-20', '2026-11-29', '2026-12-08'],
    isVerified: true,
    registrationPaid: true,
    skills: ['drone_shoot', 'cinematic_video'],
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

// Storage helper functions with complete backward compatibility & automatic gear kit enrichment
export const getStoredCrew = () => {
  try {
    const data = localStorage.getItem('photographercrew_crew_data') || localStorage.getItem('shootcrew_crew_data');
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((c, i) => {
          const fallback = INITIAL_CREW[i % INITIAL_CREW.length] || INITIAL_CREW[0];
          return {
            ...fallback,
            ...c,
            name: c?.name || fallback.name,
            phone: c?.phone || fallback.phone,
            area: c?.area || fallback.area,
            cityName: c?.cityName || fallback.cityName,
            roleLabel: c?.roleLabel || fallback.roleLabel,
            cameraDetails: c?.cameraDetails || fallback.cameraDetails,
            availableDates: Array.isArray(c?.availableDates) ? c.availableDates : fallback.availableDates,
            rateWithGear: c?.rateWithGear ? Number(c.rateWithGear) : fallback.rateWithGear,
            rateWithoutGear: c?.rateWithoutGear ? Number(c.rateWithoutGear) : fallback.rateWithoutGear,
            gearKit: c?.gearKit || fallback.gearKit,
            skills: Array.isArray(c?.skills) && c.skills.length > 0 ? c.skills : fallback.skills,
          };
        });
      }
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
    const data = localStorage.getItem('photographercrew_bookings') || localStorage.getItem('shootcrew_bookings');
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
    localStorage.setItem('photographercrew_bookings', JSON.stringify(bookings));
  } catch (e) {
    console.error('Failed to save bookings', e);
  }
};
