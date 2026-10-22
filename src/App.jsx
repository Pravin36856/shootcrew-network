import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  Video, 
  Film, 
  Plane, 
  Smartphone, 
  Tv, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  UserPlus, 
  Sparkles, 
  ChevronRight, 
  PhoneCall, 
  CheckCircle2, 
  Filter, 
  DollarSign,
  Download,
  Lock,
  Monitor
} from 'lucide-react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import SearchFilters from './components/SearchFilters';
import CrewCard from './components/CrewCard';
import BookingModal from './components/BookingModal';
import CrewRegistrationModal from './components/CrewRegistrationModal';
import AvailabilityManager from './components/AvailabilityManager';
import AdminPanel from './components/AdminPanel';
import PricingModal from './components/PricingModal';
import DateAvailabilityViewerModal from './components/DateAvailabilityViewerModal';
import BookingsList from './components/BookingsList';
import GearKitModal from './components/GearKitModal';
import InstallAppModal from './components/InstallAppModal';
import { 
  getStoredCrew, 
  saveCrewData, 
  getBookings, 
  saveBookings, 
  getPlatformConfig, 
  savePlatformConfig,
  CITIES,
  ROLES,
  SERVICES_LIST
} from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('explore'); // explore, availability, bookings, admin
  const [crewList, setCrewList] = useState(getStoredCrew());
  const [bookings, setBookings] = useState(getBookings());
  const [config, setConfig] = useState(getPlatformConfig());

  // Filter States
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [selectedGearType, setSelectedGearType] = useState('all'); // all, with_gear, without_gear
  const [selectedSpecialGear, setSelectedSpecialGear] = useState('all'); // all, drone, gimbal, multi_cam
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & PWA State
  const [bookingCrew, setBookingCrew] = useState(null);
  const [preselectedBookingDate, setPreselectedBookingDate] = useState('');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isRegisterAdminMode, setIsRegisterAdminMode] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [viewingDatesCrew, setViewingDatesCrew] = useState(null);
  const [viewingGearKitCrew, setViewingGearKitCrew] = useState(null);

  // Admin Security & Authentication State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try {
      return sessionStorage.getItem('photographercrew_admin_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [adminLoginPin, setAdminLoginPin] = useState('');
  const [adminLoginError, setAdminLoginError] = useState(false);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const expectedPin = config?.adminPin || '1234';
    if (adminLoginPin.trim() === expectedPin) {
      setIsAdminLoggedIn(true);
      try {
        sessionStorage.setItem('photographercrew_admin_auth', 'true');
      } catch (err) {
        console.error(err);
      }
      setAdminLoginError(false);
      setAdminLoginPin('');
      confetti({ particleCount: 50, spread: 60 });
    } else {
      setAdminLoginError(true);
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    try {
      sessionStorage.removeItem('photographercrew_admin_auth');
    } catch (err) {
      console.error(err);
    }
    setActiveTab('explore');
  };

  // PWA App Installation
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(true);

  // Listen for PWA install prompt
  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsAppInstalled(true);
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Sync to local storage
  useEffect(() => {
    saveCrewData(crewList);
  }, [crewList]);

  useEffect(() => {
    saveBookings(bookings);
  }, [bookings]);

  const handleSaveConfig = (newConfig) => {
    setConfig(newConfig);
    savePlatformConfig(newConfig);
  };

  // Filter logic with complete null-safety
  const filteredCrew = (crewList || []).filter((crew) => {
    if (!crew) return false;

    // City filter
    if (selectedCity !== 'all' && crew.city !== selectedCity) {
      return false;
    }

    // Shoot date filter (khali dates)
    const dates = Array.isArray(crew.availableDates) ? crew.availableDates : [];
    if (selectedDate && !dates.includes(selectedDate)) {
      return false;
    }

    // Role filter
    if (selectedRole !== 'all' && crew.role !== selectedRole) {
      return false;
    }

    // Specific service/skill filter (Traditional Photo, Video, Cinematic, Drone, etc.)
    if (selectedSkill !== 'all') {
      const skills = Array.isArray(crew.skills) ? crew.skills : [];
      if (!skills.includes(selectedSkill)) {
        return false;
      }
    }

    // Gear filter: with_gear vs without_gear
    if (selectedGearType === 'with_gear' && !crew.hasCamera) {
      return false;
    }
    if (selectedGearType === 'without_gear' && !crew.withoutGearAvailable && crew.hasCamera) {
      return false;
    }

    // Special Equipment Filter: Drone, Gimbal, Multi-Camera
    if (selectedSpecialGear === 'drone') {
      const hasD = crew.role === 'drone_operator' || 
                   crew?.gearKit?.hasDrone || 
                   (crew?.cameraDetails || '').toLowerCase().includes('drone') || 
                   (crew?.cameraDetails || '').toLowerCase().includes('mavic');
      if (!hasD) return false;
    }

    if (selectedSpecialGear === 'gimbal') {
      const hasG = crew?.gearKit?.hasGimbal || 
                   (crew?.cameraDetails || '').toLowerCase().includes('gimbal') || 
                   (crew?.cameraDetails || '').toLowerCase().includes('rs3') ||
                   (crew?.cameraDetails || '').toLowerCase().includes('ronin');
      if (!hasG) return false;
    }

    if (selectedSpecialGear === 'multi_cam') {
      const totalCams = crew?.gearKit?.totalCameras !== undefined
        ? crew.gearKit.totalCameras
        : (crew?.gearKit?.cameras?.reduce((acc, c) => acc + (c.qty || 1), 0) || 1);
      const isMulti = totalCams >= 2 || (crew?.cameraDetails || '').toLowerCase().includes('2x');
      if (!isMulti) return false;
    }

    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = (crew.name || '').toLowerCase().includes(q);
      const matchArea = (crew.area || '').toLowerCase().includes(q);
      const matchGear = (crew.cameraDetails || '').toLowerCase().includes(q);
      const matchRole = (crew.roleLabel || '').toLowerCase().includes(q);
      if (!matchName && !matchArea && !matchGear && !matchRole) {
        return false;
      }
    }

    return true;
  });

  const handleResetFilters = () => {
    setSelectedCity('all');
    setSelectedDate('');
    setSelectedRole('all');
    setSelectedSkill('all');
    setSelectedGearType('all');
    setSelectedSpecialGear('all');
    setSearchQuery('');
  };

  // Handle new registration
  const handleRegisterSuccess = (newCrew) => {
    const updated = [newCrew, ...crewList];
    setCrewList(updated);
  };

  // Handle new booking
  const handleBookingSuccess = (newBooking) => {
    const updated = [newBooking, ...bookings];
    setBookings(updated);
  };

  // Handle updating availability dates
  const handleUpdateCrewDates = (crewId, newDates) => {
    const updated = crewList.map((c) => {
      if (c.id === crewId) {
        return { ...c, availableDates: newDates };
      }
      return c;
    });
    setCrewList(updated);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenRegister={() => {
          setIsRegisterAdminMode(false);
          setIsRegisterOpen(true);
        }}
        onOpenPricing={() => setIsPricingOpen(true)}
        onOpenInstallApp={() => setIsInstallModalOpen(true)}
        crewCount={crewList.length}
      />

      {/* Floating Download App Banner for Mobile/Desktop */}
      {showInstallBanner && !isAppInstalled && (
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 text-slate-950 px-4 py-2.5 shadow-xl flex items-center justify-between text-xs font-bold z-30 sticky top-16 sm:top-20">
          <div className="flex items-center gap-2 max-w-2xl">
            <span className="p-1 bg-slate-950 text-emerald-400 rounded-lg shrink-0">
              <Download className="w-4 h-4" />
            </span>
            <span className="leading-snug">
              📲 <strong>PhotographerCrew ऐप अपने मोबाइल में डाउनलोड करें</strong> — 1 क्लिक में सीधे होमस्क्रीन पर चलाएं!
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsInstallModalOpen(true)}
              className="px-3 py-1 bg-slate-950 text-white hover:bg-slate-900 rounded-lg text-xs font-black shadow-md cursor-pointer whitespace-nowrap"
            >
              डाउनलोड / Install
            </button>
            <button
              onClick={() => setShowInstallBanner(false)}
              className="text-slate-950 hover:text-white p-1 rounded transition-colors cursor-pointer text-sm font-black"
              title="Dismiss"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        
        {/* TAB 1: Explore & Hire Crew */}
        {activeTab === 'explore' && (
          <div className="space-y-8">
            
            {/* Hero Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 p-6 sm:p-10 shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-3xl space-y-4">
                
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Central India's Photography Crew Network</span>
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  Book Cameraman & Crew in <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">
                    Gondia, Tirora, Tumsar & Nagpur
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                  शादी सीजन में अपने स्टूडियो के लिए तुरंत लड़का हायर करें — <strong>कैमरे के साथ (With Camera)</strong> या <strong>सिर्फ एक्सपोजिंग / ऑपरेटर (Without Camera)</strong>। खाली तारीखें चेक करें और सीधे संपर्क करें!
                </p>

                {/* Popular Quick City Filters */}
                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-400 font-semibold">City Focus:</span>
                  <button
                    onClick={() => setSelectedCity('all')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all border ${
                      selectedCity === 'all'
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    All Cities
                  </button>
                  <button
                    onClick={() => setSelectedCity('gondia')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all border ${
                      selectedCity === 'gondia'
                        ? 'bg-amber-500 text-slate-950 border-amber-400 ring-2 ring-amber-500/30'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    📍 Gondia (गोंदिया - मुख्य केंद्र)
                  </button>
                  <button
                    onClick={() => setSelectedCity('tirora')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all border ${
                      selectedCity === 'tirora'
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    📍 Tirora (तिरोड़ा)
                  </button>
                  <button
                    onClick={() => setSelectedCity('tumsar')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all border ${
                      selectedCity === 'tumsar'
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    📍 Tumsar (तुमसर)
                  </button>
                  <button
                    onClick={() => setSelectedCity('bhandara')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all border ${
                      selectedCity === 'bhandara'
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    📍 Bhandara (भंडारा)
                  </button>
                  <button
                    onClick={() => setSelectedCity('nagpur')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all border ${
                      selectedCity === 'nagpur'
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    📍 Nagpur (नागपुर)
                  </button>
                </div>

                {/* Badges */}
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Drone, Cinema, Traditional, Reel, Edit & LED</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Direct WhatsApp & Call Connect</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Zero Middleman Commission on Shoots</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Dedicated Professionals Section: Join PhotographerCrew */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 border-2 border-amber-500/40 p-6 sm:p-8 shadow-2xl">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="space-y-3.5 max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wide">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>For Freelancers & Operators</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
                    Photography Professionals —{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                      Join PhotographerCrew
                    </span>
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    अगर आप गोंदिया, तिरोड़ा, तुमसर, भंडारा या नागपुर में काम करते हैं, तो हमारे नेटवर्क से जुड़ें। इसमें निम्नलिखित सभी प्रोफेशनल्स शामिल हैं:
                  </p>

                  {/* Included Professionals Chips */}
                  <div className="flex flex-wrap gap-2 pt-0.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-200">
                      <Camera className="w-3.5 h-3.5 text-amber-400" />
                      <span>Photographer (स्टिल / फोटो)</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-200">
                      <Video className="w-3.5 h-3.5 text-amber-400" />
                      <span>Videographer (ट्रेडिशनल वीडियो)</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-200">
                      <Plane className="w-3.5 h-3.5 text-amber-400" />
                      <span>Drone Pilot (ड्रोन ऑपरेटर)</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-200">
                      <Film className="w-3.5 h-3.5 text-amber-400" />
                      <span>Cinematographer (सिनेमैटिक)</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-200">
                      <Monitor className="w-3.5 h-3.5 text-amber-400" />
                      <span>Editor (एल्बम व वीडियो एडिटर)</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-200">
                      <Tv className="w-3.5 h-3.5 text-amber-400" />
                      <span>LED Operator (लाइव व वॉल)</span>
                    </span>
                  </div>

                  {/* 3 Honest Benefits for ₹299 */}
                  <div className="pt-3 border-t border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                      ₹{config.registrationFee} वार्षिक सदस्यता के 3 वास्तविक फायदे:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                      <div className="flex items-start gap-2.5 bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white block">1. प्रोफाइल और Portfolio</strong>
                          <span className="text-slate-400 text-[11px] leading-tight block mt-0.5">
                            अपना कैमरा गियर, लेंस, काम और दिन का रेट पारदर्शी तरीके से दिखाएँ।
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5 bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white block">2. Professional Networking</strong>
                          <span className="text-slate-400 text-[11px] leading-tight block mt-0.5">
                            स्थानीय फोटो स्टूडियोज और साथी कैमरामैन से सीधे नेटवर्क बनाएँ।
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5 bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white block">3. Direct Client Contact</strong>
                          <span className="text-slate-400 text-[11px] leading-tight block mt-0.5">
                            उपलब्ध तारीखों पर ग्राहक और स्टूडियो सीधे आपको कॉल या WhatsApp कर सकें।
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Actions & WhatsApp Help */}
                <div className="shrink-0 flex flex-col gap-3 w-full lg:w-72">
                  <button
                    onClick={() => {
                      setIsRegisterAdminMode(false);
                      setIsRegisterOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <UserPlus className="w-5 h-5 text-slate-950" />
                    <span>Join Now (₹{config.registrationFee} / 1 Year)</span>
                  </button>

                  {/* Direct WhatsApp Joining Assistance Button */}
                  <a
                    href={`https://wa.me/91${config.supportPhone}?text=${encodeURIComponent('Namaste, mujhe PhotographerCrew par apna profile judwana hai. Kripya registration me help karein.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/40 font-bold text-xs transition-colors shadow-sm cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4 text-emerald-400" />
                    <span>💬 WhatsApp से सीधे जुड़ें</span>
                  </a>

                  <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                    फॉर्म भरने में कोई दिक्कत आए तो सीधे WhatsApp पर विवरण भेजें — हम स्वयं आपकी प्रोफाइल जोड़ देंगे।
                  </p>
                </div>
              </div>
            </div>

            {/* Smart Search & Filter Box */}
            <SearchFilters
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
              selectedSkill={selectedSkill}
              setSelectedSkill={setSelectedSkill}
              selectedGearType={selectedGearType}
              setSelectedGearType={setSelectedGearType}
              selectedSpecialGear={selectedSpecialGear}
              setSelectedSpecialGear={setSelectedSpecialGear}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              totalResults={filteredCrew.length}
              onResetFilters={handleResetFilters}
            />

            {/* Crew Cards Grid */}
            {filteredCrew.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-800 text-slate-500 rounded-2xl flex items-center justify-center mx-auto">
                  <Filter className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  No Cameraman Found for this Selection
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                  चुने हुए फिल्टर (तारीख, सिटी या रोल) के अनुसार कोई कैमरामैन नहीं मिला। कृपया तारीख बदलकर या फिल्टर रीसेट करके देखें।
                </p>
                <button
                  onClick={handleResetFilters}
                  className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  Reset Filters (सभी को देखें)
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCrew.map((crew) => (
                  <CrewCard
                    key={crew.id}
                    crew={crew}
                    selectedDate={selectedDate}
                    onBook={(c) => {
                      setBookingCrew(c);
                      setPreselectedBookingDate(selectedDate);
                    }}
                    onViewDates={(c) => setViewingDatesCrew(c)}
                    onViewGearKit={(c) => setViewingGearKitCrew(c)}
                  />
                ))}
              </div>
            )}

            {/* Bottom Join CTA Banner */}
            <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent border border-amber-500/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  Photography Professionals — Join Today
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  अपना प्रोफाइल बनाएँ और स्थानीय स्टूडियोज से सीधे जुड़ें
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  गोंदिया, तिरोड़ा, तुमसर, भंडारा व नागपुर के स्टूडियोज के साथ प्रोफेशनल नेटवर्किंग और सीधी बुकिंग संपर्क के लिए सिर्फ ₹{config.registrationFee} में अपना प्रोफाइल लिस्ट करें।
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-slate-400 pt-1">
                  <span>✔ 1. प्रोफाइल व पोर्टफोलियो दिखाएँ</span>
                  <span>✔ 2. प्रोफेशनल नेटवर्किंग करें</span>
                  <span>✔ 3. सीधे ग्राहक व स्टूडियो संपर्क</span>
                </div>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => {
                    setIsRegisterAdminMode(false);
                    setIsRegisterOpen(true);
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <UserPlus className="w-5 h-5 text-slate-950" />
                  <span>Join as Crew (₹{config.registrationFee})</span>
                </button>

                <a
                  href={`https://wa.me/91${config.supportPhone}?text=${encodeURIComponent('Namaste, mujhe PhotographerCrew par apna profile judwana hai. Kripya registration me help karein.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/40 font-bold text-xs transition-colors shadow-sm"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Help</span>
                </a>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: Manage Khali Dates */}
        {activeTab === 'availability' && (
          <AvailabilityManager
            crewList={crewList}
            onUpdateCrewDates={handleUpdateCrewDates}
          />
        )}

        {/* TAB 3: Bookings */}
        {activeTab === 'bookings' && (
          <BookingsList
            bookings={bookings}
            onOpenExplore={() => setActiveTab('explore')}
          />
        )}

        {/* TAB 4: Admin Panel & Fees (PIN Protected) */}
        {activeTab === 'admin' && (
          !isAdminLoggedIn ? (
            <div className="max-w-md mx-auto my-12 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-2xl">
              <div className="w-16 h-16 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                <Lock className="w-8 h-8 text-amber-400" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">Admin Security Access</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  यह सेक्शन केवल प्लेटफॉर्म ओनर (Admin) के लिए सुरक्षित है। कृपया अपना सीक्रेट एडमिन पिन दर्ज करें।
                </p>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-4 pt-2">
                <input
                  type="password"
                  maxLength={8}
                  autoFocus
                  placeholder="••••"
                  value={adminLoginPin}
                  onChange={(e) => {
                    setAdminLoginPin(e.target.value);
                    setAdminLoginError(false);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-center text-2xl font-mono text-white tracking-[0.5em] focus:outline-none focus:border-amber-500"
                />

                {adminLoginError && (
                  <p className="text-xs text-rose-400 font-semibold">
                    गलत पिन! केवल अधिकृत एडमिन ही लॉगिन कर सकते हैं।
                  </p>
                )}

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('explore')}
                    className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-xl shadow-amber-500/20 cursor-pointer transition-all"
                  >
                    Unlock Admin
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <AdminPanel
              crewList={crewList}
              setCrewList={setCrewList}
              bookings={bookings}
              config={config}
              onSaveConfig={handleSaveConfig}
              onLogout={handleAdminLogout}
              onOpenAddCrewFree={() => {
                setIsRegisterAdminMode(true);
                setIsRegisterOpen(true);
              }}
            />
          )
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-8 text-center text-xs text-slate-500 space-y-2">
        <div className="flex items-center justify-center gap-2 font-bold text-slate-300">
          <Camera className="w-4 h-4 text-amber-400" />
          <span>PhotographerCrew Network • Gondia - Nagpur - Bhandara - Balaghat</span>
        </div>
        <p>
          कैमरामैन, ड्रोन पायलट, सिनेमैटोग्राफर, रील मेकर और एलईडी वॉल हायरिंग प्लेटफॉर्म
        </p>
        <div className="flex items-center justify-center gap-4 text-[11px] pt-1 text-slate-400">
          <button onClick={() => setIsPricingOpen(true)} className="hover:underline">
            Platform Fees (₹{config.registrationFee})
          </button>
          <span>•</span>
          <button onClick={() => setActiveTab('admin')} className="hover:underline">
            Admin & UPI Settings
          </button>
          <span>•</span>
          <button onClick={() => setIsInstallModalOpen(true)} className="hover:text-amber-400 font-semibold text-emerald-400 transition-colors">
            📲 ऐप डाउनलोड करें
          </button>
          <span>•</span>
          <a 
            href={`https://wa.me/91${config.supportPhone}?text=${encodeURIComponent('Namaste, mujhe PhotographerCrew platform ke baare me jankari chahiye.')}`}
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-emerald-400 font-semibold text-slate-300 transition-colors"
          >
            Support / WhatsApp: +91 {config.supportPhone}
          </a>
        </div>
      </footer>

      {/* MODALS */}

      {/* Booking Modal */}
      {bookingCrew && (
        <BookingModal
          crew={bookingCrew}
          preselectedDate={preselectedBookingDate}
          onClose={() => setBookingCrew(null)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {/* Crew Registration Modal */}
      {isRegisterOpen && (
        <CrewRegistrationModal
          config={config}
          isAdminMode={isRegisterAdminMode}
          onClose={() => {
            setIsRegisterOpen(false);
            setIsRegisterAdminMode(false);
          }}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}

      {/* Pricing / Monetization Modal */}
      {isPricingOpen && (
        <PricingModal
          config={config}
          onClose={() => setIsPricingOpen(false)}
          onOpenRegister={() => {
            setIsRegisterAdminMode(false);
            setIsRegisterOpen(true);
          }}
        />
      )}

      {/* Date Availability Calendar Viewer Modal */}
      {viewingDatesCrew && (
        <DateAvailabilityViewerModal
          crew={viewingDatesCrew}
          onClose={() => setViewingDatesCrew(null)}
          onBookWithDate={(c, d) => {
            setBookingCrew(c);
            setPreselectedBookingDate(d);
          }}
        />
      )}

      {/* Complete Gear & Equipment Kit Modal */}
      {viewingGearKitCrew && (
        <GearKitModal
          crew={viewingGearKitCrew}
          onClose={() => setViewingGearKitCrew(null)}
          onBook={(c) => {
            setBookingCrew(c);
            setPreselectedBookingDate(selectedDate);
          }}
        />
      )}

      {/* PWA / App Install Modal */}
      {isInstallModalOpen && (
        <InstallAppModal
          deferredPrompt={deferredPrompt}
          isInstalled={isAppInstalled}
          setIsInstalled={setIsAppInstalled}
          onClose={() => setIsInstallModalOpen(false)}
        />
      )}

    </div>
  );
}
