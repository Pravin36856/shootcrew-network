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
  Download 
} from 'lucide-react';
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
                  <span>Central India's #1 Wedding Photography Network</span>
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  Book Cameraman & Crew in <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">
                    Gondia, Nagpur & Vidarbha
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                  शादी सीजन में अपने स्टूडियो के लिए तुरंत लड़का हायर करें — <strong>कैमरे के साथ (With Camera)</strong> या <strong>सिर्फ एक्सपोजिंग / ऑपरेटर (Without Camera)</strong>। खाली तारीखें चेक करें और सीधे बुक करें!
                </p>

                {/* Popular Quick City Filters */}
                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-400 font-semibold">Quick Select City:</span>
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
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    📍 Gondia (गोंदिया)
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
                    onClick={() => setSelectedCity('balaghat')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all border ${
                      selectedCity === 'balaghat'
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    📍 Balaghat (बालाघाट)
                  </button>
                </div>

                {/* Badges */}
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Drone, Cinema, Traditional, Reel & LED</span>
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
              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  Are you a Photographer or Cameraman?
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Get Unlimited Shoot Bookings in Gondia & Nagpur!
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  अपनी खाली तारीखें डालें और गोंदिया, नागपुर, भंडारा के स्टूडियोज से सीधे काम पाएं। सिर्फ ₹{config.registrationFee} में लिस्ट हों।
                </p>
              </div>

              <button
                onClick={() => {
                  setIsRegisterAdminMode(false);
                  setIsRegisterOpen(true);
                }}
                className="shrink-0 flex items-center gap-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <UserPlus className="w-5 h-5" />
                <span>Register as Crew Now</span>
              </button>
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

        {/* TAB 4: Admin Panel & Fees */}
        {activeTab === 'admin' && (
          <AdminPanel
            crewList={crewList}
            setCrewList={setCrewList}
            bookings={bookings}
            config={config}
            onSaveConfig={handleSaveConfig}
            onOpenAddCrewFree={() => {
              setIsRegisterAdminMode(true);
              setIsRegisterOpen(true);
            }}
          />
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
