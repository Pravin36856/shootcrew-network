import React, { useState } from 'react';
import { 
  X, 
  Camera, 
  MapPin, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  DollarSign, 
  Upload, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck, 
  QrCode,
  Copy,
  Check,
  Plus,
  Trash2,
  Minus,
  Sliders,
  Plane,
  Layers,
  Sun,
  Mic,
  BatteryCharging
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  ROLES, 
  CITIES, 
  SERVICES_LIST,
  COMMON_CAMERAS, 
  COMMON_GIMBALS, 
  COMMON_DRONES, 
  COMMON_LENSES, 
  COMMON_LIGHTS, 
  COMMON_MICS 
} from '../data/mockData';

export default function CrewRegistrationModal({ onClose, onRegisterSuccess, config, isAdminMode = false }) {
  const [step, setStep] = useState(1);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(isAdminMode);
  const [showAdminPinModal, setShowAdminPinModal] = useState(false);
  const [adminPinInput, setAdminPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('gondia');
  const [customVillage, setCustomVillage] = useState('');
  const [area, setArea] = useState('');
  const [role, setRole] = useState('traditional_photo');
  const [selectedSkills, setSelectedSkills] = useState(['traditional_photo', 'candid_photo']);
  const [experience, setExperience] = useState('4 Years');
  const [instagram, setInstagram] = useState('');
  const [bio, setBio] = useState('');

  // Equipment & Kit State
  const [hasCamera, setHasCamera] = useState(true);
  
  // Camera bodies list: [{ model: 'Sony A7 IV', qty: 1 }]
  const [camerasList, setCamerasList] = useState([
    { model: 'Sony A7 IV', qty: 1 }
  ]);
  const [newCamSelect, setNewCamSelect] = useState(COMMON_CAMERAS[0]);
  const [newCamQty, setNewCamQty] = useState(1);
  const [customCamInput, setCustomCamInput] = useState('');

  // Gimbal
  const [hasGimbal, setHasGimbal] = useState(false);
  const [gimbalModel, setGimbalModel] = useState(COMMON_GIMBALS[0]);

  // Drone
  const [hasDrone, setHasDrone] = useState(false);
  const [droneModel, setDroneModel] = useState(COMMON_DRONES[0]);
  const [droneBatteries, setDroneBatteries] = useState(3);

  // Lenses, Lights, Mics
  const [selectedLenses, setSelectedLenses] = useState([
    '24-70mm f/2.8 (Stage & Vidhi Zoom)',
    '50mm f/1.2 / f/1.4 (Portraits)'
  ]);
  const [selectedLights, setSelectedLights] = useState([
    'Godox V1 On-Camera Round Flash'
  ]);
  const [selectedMics, setSelectedMics] = useState([
    'DJI Mic 2 Wireless'
  ]);

  // If without camera: which cameras they operate
  const [operatedCameras, setOperatedCameras] = useState([
    'Sony FX30 Cinema',
    'Panasonic CX350 (4K Camcorder)'
  ]);

  // Rates
  const [rateWithGear, setRateWithGear] = useState('2500');
  const [withoutGearAvailable, setWithoutGearAvailable] = useState(true);
  const [rateWithoutGear, setRateWithoutGear] = useState('1200');

  // Available Dates
  const [newDateInput, setNewDateInput] = useState('');
  const [availableDates, setAvailableDates] = useState([
    '2026-10-15',
    '2026-10-16',
    '2026-10-24',
    '2026-11-02',
    '2026-11-08',
    '2026-11-15',
    '2026-11-25',
  ]);

  // Payment Verification
  const [paymentUtr, setPaymentUtr] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const selectedRoleObj = ROLES.find(r => r.id === role) || ROLES[1];
  const selectedCityObj = CITIES.find(c => c.id === city) || CITIES[0];

  // Camera Management Handlers
  const handleAddCamera = () => {
    const modelToAdd = customCamInput.trim() !== '' ? customCamInput.trim() : newCamSelect;
    if (!modelToAdd) return;
    
    // Check if already in list
    const existingIndex = camerasList.findIndex(c => c.model.toLowerCase() === modelToAdd.toLowerCase());
    if (existingIndex > -1) {
      const updated = [...camerasList];
      updated[existingIndex].qty += Number(newCamQty);
      setCamerasList(updated);
    } else {
      setCamerasList([...camerasList, { model: modelToAdd, qty: Number(newCamQty) }]);
    }
    setCustomCamInput('');
    setNewCamQty(1);
  };

  const handleRemoveCamera = (index) => {
    setCamerasList(camerasList.filter((_, i) => i !== index));
  };

  const handleUpdateCameraQty = (index, delta) => {
    const updated = [...camerasList];
    const newQ = (updated[index].qty || 1) + delta;
    if (newQ > 0) {
      updated[index].qty = newQ;
      setCamerasList(updated);
    }
  };

  // Toggle helper for multi-select chips
  const toggleItem = (list, setList, item) => {
    if (list.includes(item)) {
      setList(list.filter(x => x !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(config.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleAddDate = () => {
    if (!newDateInput) return;
    if (availableDates.includes(newDateInput)) {
      alert('This date is already added (यह तारीख पहले से जुड़ी है)');
      return;
    }
    const updated = [...availableDates, newDateInput].sort();
    setAvailableDates(updated);
    setNewDateInput('');
  };

  const handleRemoveDate = (d) => {
    setAvailableDates(availableDates.filter(x => x !== d));
  };

  const handleAddQuickDates = (daysToAdd) => {
    const today = new Date();
    const newDates = [];
    for (let i = 1; i <= daysToAdd; i += 3) {
      const d = new Date(today);
      d.setDate(today.getDate() + i + 10);
      const str = d.toISOString().split('T')[0];
      if (!availableDates.includes(str)) {
        newDates.push(str);
      }
    }
    setAvailableDates([...availableDates, ...newDates].sort());
  };

  // Skill toggling helper
  const handleToggleSkill = (skillId) => {
    if (selectedSkills.includes(skillId)) {
      if (selectedSkills.length > 1) {
        setSelectedSkills(selectedSkills.filter(s => s !== skillId));
      }
    } else {
      setSelectedSkills([...selectedSkills, skillId]);
    }
  };

  // Admin PIN verification
  const handleVerifyAdminPin = (e) => {
    e.preventDefault();
    if (adminPinInput === '1234') {
      setIsAdminUnlocked(true);
      setShowAdminPinModal(false);
      setPinError(false);
      confetti({ particleCount: 60, spread: 60 });
    } else {
      setPinError(true);
    }
  };

  const handleFinalSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!isAdminUnlocked && !paymentUtr) {
      alert('कृपया UPI Transaction ID / UTR नंबर दर्ज करें (Please enter UPI transaction UTR)');
      return;
    }

    setIsSubmitting(true);

    const fullArea = customVillage 
      ? `${customVillage}, ${selectedCityObj.name}` 
      : (area ? `${area}, ${selectedCityObj.name}` : selectedCityObj.name);

    // Calculate total camera bodies count
    const totalCameras = hasCamera 
      ? camerasList.reduce((acc, c) => acc + (c.qty || 1), 0)
      : 0;

    // Generate descriptive summary for card view
    let gearSummary = '';
    if (hasCamera) {
      const camStrings = camerasList.map(c => `${c.qty}x ${c.model}`);
      const parts = [];
      if (camStrings.length > 0) parts.push(camStrings.join(' + '));
      if (hasGimbal) parts.push(gimbalModel);
      if (hasDrone) parts.push(`${droneModel} (${droneBatteries} Batt)`);
      if (selectedLights.length > 0) parts.push(selectedLights[0].split(' ')[0] + ' ' + selectedLights[0].split(' ')[1]);
      gearSummary = parts.join(' • ');
    } else {
      gearSummary = `Operator Only (Expert on ${operatedCameras.slice(0, 3).join(', ')})`;
    }

    const gearKit = {
      cameras: hasCamera ? camerasList : [],
      totalCameras: totalCameras,
      hasGimbal: hasGimbal,
      gimbal: hasGimbal ? gimbalModel : null,
      hasDrone: hasDrone,
      drone: hasDrone ? droneModel : null,
      droneBatteries: hasDrone ? droneBatteries : 0,
      lenses: selectedLenses,
      lighting: selectedLights.join(' • '),
      mic: selectedMics.join(' • '),
      operatedCameras: !hasCamera ? operatedCameras : [],
    };

    const newCrew = {
      id: `crew-${Date.now()}`,
      name: name,
      phone: phone,
      city: city,
      cityName: selectedCityObj.name.split(' ')[0],
      area: fullArea,
      role: role,
      roleLabel: selectedRoleObj.label,
      skills: selectedSkills,
      experience: experience,
      hasCamera: hasCamera,
      gearType: hasCamera ? 'with_gear' : 'without_gear',
      cameraDetails: gearSummary,
      gearKit: gearKit,
      withoutGearAvailable: withoutGearAvailable || !hasCamera,
      rateWithGear: hasCamera ? parseInt(rateWithGear, 10) || 2500 : null,
      rateWithoutGear: parseInt(rateWithoutGear, 10) || 1200,
      rating: 5.0,
      reviewsCount: 1,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      availableDates: availableDates,
      isVerified: true,
      registrationPaid: true,
      addedByAdmin: isAdminUnlocked,
      paymentUtr: isAdminUnlocked ? (paymentUtr || 'ADMIN_FREE_ONBOARDING') : paymentUtr,
      instagram: instagram || '@photographercrew_member',
      bio: bio || `${selectedRoleObj.label} in ${selectedCityObj.name} with ${totalCameras} Camera(s)${hasGimbal ? ' + Gimbal' : ''}${hasDrone ? ' + Drone' : ''}.`,
    };

    setTimeout(() => {
      onRegisterSuccess(newCrew);
      setIsSubmitting(false);
      setIsRegistered(true);
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 }
      });
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-950/50 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              {isAdminUnlocked ? (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1 shadow-sm shadow-emerald-500/10">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>👑 Admin Free Mode (0 Payment)</span>
                </span>
              ) : (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Step {step} of 4
                </span>
              )}
              <h3 className="text-base sm:text-xl font-bold text-white">
                {isAdminUnlocked ? 'Admin Crew Registration (Free)' : 'Photographer & Cameraman Registration'}
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isAdminUnlocked ? 'एडमिन मोड: बिना किसी पेमेंट के फोटोग्राफर को सीधे लिस्ट करें' : 'कैमरे, गिम्बल, ड्रोन, सर्विसेज और खाली तारीखें दर्ज करें'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-950 h-1.5 flex">
          <div 
            className="bg-gradient-to-r from-amber-500 to-orange-500 h-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Success Modal View */}
        {isRegistered ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-black text-white">
                Badhai Ho! Registration Successful 🎉
              </h4>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                आपकी प्रोफाइल <strong>PhotographerCrew Network</strong> पर लाइव हो गई है। आपके सभी कैमरे, गिम्बल और ड्रोन स्टूडियोज को दिखेंगे!
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-left text-xs max-w-md mx-auto space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Name:</span>
                <span className="font-bold text-white">{name}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Role:</span>
                <span className="font-bold text-amber-400">{selectedRoleObj.label}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Equipment Setup:</span>
                <span className="font-bold text-emerald-400">
                  {hasCamera ? `${camerasList.reduce((acc, c) => acc + (c.qty || 1), 0)} Camera(s)${hasGimbal ? ' + Gimbal' : ''}${hasDrone ? ' + Drone' : ''}` : 'Operator Only'}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>City / Area:</span>
                <span className="font-bold text-white">{customVillage || area || selectedCityObj.name}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Khali Dates Added:</span>
                <span className="font-bold text-emerald-400">{availableDates.length} Dates</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="py-3 px-8 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20"
            >
              Go to Home & View Profile (होम पेज पर देखें)
            </button>
          </div>
        ) : (
          <div className="p-5 sm:p-6 max-h-[72vh] overflow-y-auto">
            
            {/* STEP 1: Personal & City Details */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-2xl flex items-center gap-3">
                  <Camera className="w-5 h-5 text-amber-400 shrink-0" />
                  <p className="text-xs text-amber-300">
                    Step 1: अपनी व्यक्तिगत जानकारी और अपनी सिटी/गांव दर्ज करें।
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                      Full Name (आपका नाम) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="उदा. Kailash Bisen"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10 digit WhatsApp number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>Select City (शहर) *</span>
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    >
                      {CITIES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                      Village or Local Area (गांव / इलाका)
                    </label>
                    <input
                      type="text"
                      placeholder="उदा. Kudwa, Goregaon, Rail Toli, Sitabuldi"
                      value={customVillage}
                      onChange={(e) => setCustomVillage(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                      Work Experience (अनुभव)
                    </label>
                    <select
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="1-2 Years">1-2 Years (शुरुआती)</option>
                      <option value="3-5 Years">3-5 Years (मध्यम)</option>
                      <option value="6-8 Years">6-8 Years (सीनियर)</option>
                      <option value="10+ Years">10+ Years (मास्टर)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                      Instagram / Portfolio Handle (वैकल्पिक)
                    </label>
                    <input
                      type="text"
                      placeholder="@your_photography_page"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    >
                    </input>
                  </div>
                </div>

                {/* Services & Skills Selector (क्या-क्या काम कर सकते हैं) */}
                <div className="pt-2 border-t border-slate-800">
                  <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>आप क्या-क्या काम कर सकते हैं? (Services & Skills - All That Apply) *</span>
                  </label>
                  <p className="text-[11px] text-slate-400 mb-2.5">
                    अपनी सभी खूबियां चुनें — ट्रेडिशनल फोटो, ट्रेडिशनल वीडियो, सिनेमैटिक, ड्रोन, प्री-वेडिंग आदि:
                  </p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SERVICES_LIST.map((srv) => {
                      const isSelected = selectedSkills.includes(srv.id);
                      return (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => handleToggleSkill(srv.id)}
                          className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between gap-1.5 cursor-pointer ${
                            isSelected
                              ? 'bg-amber-500/20 border-amber-500 text-white font-bold ring-1 ring-amber-500 shadow-sm shadow-amber-500/10'
                              : 'border-slate-800 bg-slate-950/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                          }`}
                        >
                          <span className="text-xs leading-snug">{srv.label}</span>
                          {isSelected ? (
                            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-end pt-3">
                  <button
                    type="button"
                    disabled={!name || !phone || selectedSkills.length === 0}
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold text-sm shadow-md"
                  >
                    <span>Next: Equipment Kit (कैमरे, गिम्बल, ड्रोन)</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Complete Gear & Equipment Builder */}
            {step === 2 && (
              <div className="space-y-5">
                <div className="bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-2xl flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                  <p className="text-xs text-amber-300">
                    Step 2: आपके पास कौन-कौन से कैमरे, कितने कैमरे, गिम्बल और ड्रोन हैं? सब जोड़ें।
                  </p>
                </div>

                {/* Primary Role Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                    Primary Role / Specialization (आपका काम) *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {ROLES.filter(r => r.id !== 'all').map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRole(r.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          role === r.id
                            ? 'bg-amber-500/20 border-amber-500 text-white font-bold ring-1 ring-amber-500'
                            : 'border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-300 text-xs'
                        }`}
                      >
                        <span className="block text-xs font-semibold">{r.label}</span>
                        <span className="block text-[10px] text-slate-400 mt-0.5">({r.labelHi})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Camera Equipment Toggle */}
                <div className="border-t border-slate-800 pt-3">
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                    Do you have Camera Equipment? (क्या आपके पास कैमरा है?)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setHasCamera(true)}
                      className={`p-3 rounded-xl border text-center font-bold text-xs transition-all ${
                        hasCamera
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      📸 Yes, With Camera & Gear (कैमरे के साथ)
                    </button>

                    <button
                      type="button"
                      onClick={() => setHasCamera(false)}
                      className={`p-3 rounded-xl border text-center font-bold text-xs transition-all ${
                        !hasCamera
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      👤 No, Without Camera (सिर्फ ऑपरेटर / एक्सपोजिंग)
                    </button>
                  </div>
                </div>

                {hasCamera ? (
                  <div className="space-y-4 bg-slate-950/80 p-4 sm:p-5 rounded-2xl border border-slate-800">
                    
                    {/* 1. CAMERA BODIES & QUANTITIES (कौन-कौन से कैमरे और कितने कैमरे हैं) */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Camera className="w-4 h-4 text-amber-400" />
                          <span>1. Camera Bodies & Count (कैमरे और संख्या)</span>
                        </label>
                        <span className="text-[11px] font-bold text-slate-300">
                          Total: {camerasList.reduce((acc, c) => acc + (c.qty || 1), 0)} Camera Body
                        </span>
                      </div>

                      {/* Added cameras list */}
                      <div className="space-y-2">
                        {camerasList.map((cam, idx) => (
                          <div 
                            key={idx}
                            className="flex items-center justify-between p-2.5 bg-slate-900 border border-slate-800 rounded-xl"
                          >
                            <span className="text-xs font-bold text-white">
                              📷 {cam.model}
                            </span>

                            <div className="flex items-center gap-2">
                              {/* Quantity counter */}
                              <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-2 py-1 rounded-lg">
                                <button
                                  type="button"
                                  onClick={() => handleUpdateCameraQty(idx, -1)}
                                  className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-white bg-slate-800 rounded"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-mono font-bold text-amber-400 px-1">
                                  {cam.qty} Qty
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleUpdateCameraQty(idx, 1)}
                                  className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-white bg-slate-800 rounded"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleRemoveCamera(idx)}
                                className="p-1.5 text-slate-500 hover:text-rose-400"
                                title="Remove camera"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Add new camera selector row */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pt-1 border-t border-slate-900">
                        <div className="sm:col-span-7">
                          <select
                            value={newCamSelect}
                            onChange={(e) => setNewCamSelect(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                          >
                            {COMMON_CAMERAS.map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <select
                            value={newCamQty}
                            onChange={(e) => setNewCamQty(Number(e.target.value))}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-bold"
                          >
                            <option value={1}>1 Qty</option>
                            <option value={2}>2 Qty</option>
                            <option value={3}>3 Qty</option>
                            <option value={4}>4 Qty</option>
                          </select>
                        </div>

                        <div className="sm:col-span-3">
                          <button
                            type="button"
                            onClick={handleAddCamera}
                            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5 text-amber-400" />
                            <span>Add Camera</span>
                          </button>
                        </div>
                      </div>

                      {/* Custom camera name input if not in list */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          placeholder="Or type other camera model (उदा. Sony A7C, Fuji X-T5...)"
                          value={customCamInput}
                          onChange={(e) => setCustomCamInput(e.target.value)}
                          className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                        />
                        {customCamInput && (
                          <button
                            type="button"
                            onClick={handleAddCamera}
                            className="py-1.5 px-3 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs"
                          >
                            Add
                          </button>
                        )}
                      </div>
                    </div>

                    {/* 2. GIMBAL SETUP (क्या गिम्बल है?) */}
                    <div className="pt-3 border-t border-slate-800/80 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-slate-300 uppercase flex items-center gap-1.5">
                          <Sliders className="w-4 h-4 text-emerald-400" />
                          <span>2. Gimbal Stabilizer (क्या आपके पास गिम्बल है?)</span>
                        </label>

                        <button
                          type="button"
                          onClick={() => setHasGimbal(!hasGimbal)}
                          className={`text-xs font-bold px-3 py-1 rounded-full transition-all border ${
                            hasGimbal 
                              ? 'bg-emerald-500 text-slate-950 border-emerald-400' 
                              : 'bg-slate-900 text-slate-400 border-slate-800'
                          }`}
                        >
                          {hasGimbal ? 'Yes, Gimbal Included ✅' : 'No Gimbal'}
                        </button>
                      </div>

                      {hasGimbal && (
                        <div className="p-3 bg-slate-900 rounded-xl border border-emerald-500/30">
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                            Select Gimbal Model:
                          </label>
                          <select
                            value={gimbalModel}
                            onChange={(e) => setGimbalModel(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                          >
                            {COMMON_GIMBALS.map((g) => (
                              <option key={g} value={g}>{g}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>

                    {/* 3. DRONE SETUP (क्या ड्रोन है?) */}
                    <div className="pt-3 border-t border-slate-800/80 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-slate-300 uppercase flex items-center gap-1.5">
                          <Plane className="w-4 h-4 text-sky-400" />
                          <span>3. Drone Setup (क्या आपके पास ड्रोन है?)</span>
                        </label>

                        <button
                          type="button"
                          onClick={() => setHasDrone(!hasDrone)}
                          className={`text-xs font-bold px-3 py-1 rounded-full transition-all border ${
                            hasDrone 
                              ? 'bg-sky-500 text-slate-950 border-sky-400' 
                              : 'bg-slate-900 text-slate-400 border-slate-800'
                          }`}
                        >
                          {hasDrone ? 'Yes, Drone Included 🚁' : 'No Drone'}
                        </button>
                      </div>

                      {hasDrone && (
                        <div className="p-3 bg-slate-900 rounded-xl border border-sky-500/30 grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div className="sm:col-span-2">
                            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                              Select Drone Model:
                            </label>
                            <select
                              value={droneModel}
                              onChange={(e) => setDroneModel(e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                            >
                              {COMMON_DRONES.map((d) => (
                                <option key={d} value={d}>{d}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-400 mb-1 flex items-center gap-1">
                              <BatteryCharging className="w-3 h-3 text-sky-400" />
                              <span>Batteries:</span>
                            </label>
                            <select
                              value={droneBatteries}
                              onChange={(e) => setDroneBatteries(Number(e.target.value))}
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 font-bold"
                            >
                              <option value={2}>2 Batteries</option>
                              <option value={3}>3 Batteries</option>
                              <option value={4}>4 Batteries</option>
                              <option value={5}>5+ Batteries</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 4. LENSES CHIPS */}
                    <div className="pt-3 border-t border-slate-800/80 space-y-2">
                      <label className="block text-xs font-bold text-slate-300 uppercase flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-amber-400" />
                        <span>4. Lenses Available (लेंस चुनें)</span>
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {COMMON_LENSES.map((lens) => {
                          const isSelected = selectedLenses.includes(lens);
                          return (
                            <button
                              key={lens}
                              type="button"
                              onClick={() => toggleItem(selectedLenses, setSelectedLenses, lens)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all border ${
                                isSelected
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                              }`}
                            >
                              {isSelected ? '✓ ' : '+ '}{lens}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 5. LIGHTING & MICS */}
                    <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5 flex items-center gap-1">
                          <Sun className="w-3.5 h-3.5 text-amber-400" />
                          <span>Lighting / Flashes</span>
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {COMMON_LIGHTS.slice(0, 4).map((light) => {
                            const isSelected = selectedLights.includes(light);
                            return (
                              <button
                                key={light}
                                type="button"
                                onClick={() => toggleItem(selectedLights, setSelectedLights, light)}
                                className={`px-2 py-1 rounded-lg text-[10px] font-medium border ${
                                  isSelected
                                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                    : 'bg-slate-900 text-slate-400 border-slate-800'
                                }`}
                              >
                                {isSelected ? '✓ ' : '+ '}{light.split(' ')[0]} {light.split(' ')[1]}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5 flex items-center gap-1">
                          <Mic className="w-3.5 h-3.5 text-purple-400" />
                          <span>Wireless Microphones</span>
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {COMMON_MICS.map((mic) => {
                            const isSelected = selectedMics.includes(mic);
                            return (
                              <button
                                key={mic}
                                type="button"
                                onClick={() => toggleItem(selectedMics, setSelectedMics, mic)}
                                className={`px-2 py-1 rounded-lg text-[10px] font-medium border ${
                                  isSelected
                                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                                    : 'bg-slate-900 text-slate-400 border-slate-800'
                                }`}
                              >
                                {isSelected ? '✓ ' : '+ '}{mic}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                  </div>
                ) : (
                  /* OPERATOR ONLY (WITHOUT CAMERA) SELECTION */
                  <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-3">
                    <label className="block text-xs font-bold text-slate-300 uppercase">
                      Select Cameras you can operate without issue (जिन कैमरों को आप चला सकते हैं):
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {COMMON_CAMERAS.map((cam) => {
                        const isSelected = operatedCameras.includes(cam);
                        return (
                          <button
                            key={cam}
                            type="button"
                            onClick={() => toggleItem(operatedCameras, setOperatedCameras, cam)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                              isSelected
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                : 'bg-slate-900 text-slate-400 border-slate-800'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '}{cam}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Rates Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-800 pt-3">
                  {hasCamera && (
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                        With Camera Rate (₹ / Day) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-2.5 text-slate-400 text-sm font-bold">₹</span>
                        <input
                          type="number"
                          placeholder="2500"
                          value={rateWithGear}
                          onChange={(e) => setRateWithGear(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 font-bold"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                      Without Camera (Exposing) Rate (₹ / Day) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-slate-400 text-sm font-bold">₹</span>
                      <input
                        type="number"
                        placeholder="1200"
                        value={rateWithoutGear}
                        onChange={(e) => setRateWithoutGear(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 font-bold"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex items-center gap-2 py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md"
                  >
                    <span>Next: Available Dates (खाली तारीखें)</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Available Dates / Khali Dates */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-2xl flex items-center gap-3">
                  <CalendarIcon className="w-5 h-5 text-amber-400 shrink-0" />
                  <p className="text-xs text-amber-300">
                    Step 3: शादी सीजन में आप कौन-कौन सी तारीखों को खाली (Free) हैं? वही तारीखें स्टूडियो वाले बुक कर सकेंगे।
                  </p>
                </div>

                {/* Date Input bar */}
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={newDateInput}
                    onChange={(e) => setNewDateInput(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={handleAddDate}
                    className="flex items-center gap-1.5 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Date</span>
                  </button>
                </div>

                {/* Quick Add helper buttons */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400">Quick Add:</span>
                  <button
                    type="button"
                    onClick={() => handleAddQuickDates(15)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 text-[11px] font-semibold border border-slate-700"
                  >
                    + Add Next 5 Dates
                  </button>
                  <button
                    type="button"
                    onClick={() => setAvailableDates([])}
                    className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-[11px] font-semibold border border-rose-500/20"
                  >
                    Clear All
                  </button>
                </div>

                {/* Chips of added dates */}
                <div className="border border-slate-800 bg-slate-950/70 p-4 rounded-2xl min-h-[120px]">
                  <span className="text-xs font-bold text-slate-400 block mb-2">
                    Selected Free Dates ({availableDates.length} Days marked Available):
                  </span>
                  
                  {availableDates.length === 0 ? (
                    <p className="text-xs text-slate-500 italic">
                      No dates selected yet. Please add at least 1 date you are available.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {availableDates.map((d) => (
                        <span
                          key={d}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-semibold"
                        >
                          <span>{d}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveDate(d)}
                            className="text-slate-400 hover:text-rose-400 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-between pt-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex items-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    disabled={availableDates.length === 0}
                    onClick={() => setStep(4)}
                    className="flex items-center gap-2 py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold text-sm shadow-md"
                  >
                    <span>Next: Platform Fee & Verify (फीस भुगतान)</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Registration Fee & Payment */}
            {step === 4 && (
              <div className="space-y-4">
                {isAdminUnlocked ? (
                  /* Admin Free Mode: 0 Payment Needed */
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-transparent border-2 border-emerald-500/50 p-6 rounded-3xl space-y-4 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-500/20">
                        <ShieldCheck className="w-9 h-9" />
                      </div>
                      
                      <div>
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-black uppercase tracking-wider inline-block">
                          👑 ADMIN MASTER POWER ACTIVE
                        </span>
                        <h4 className="text-xl font-black text-white mt-2">
                          Direct Free Activation (बिना पेमेंट)
                        </h4>
                        <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
                          एडमिन अधिकार: इस फोटोग्राफर को जोड़ने के लिए किसी भी फीस/पेमेंट (₹0) की जरूरत नहीं है। नीचे दिए गए बटन पर क्लिक करते ही यह प्रोफाइल तुरंत वेरिफाइड और लाइव हो जाएगी।
                        </p>
                      </div>

                      <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs text-slate-400 max-w-sm mx-auto flex items-center justify-between">
                        <span>Platform Fee:</span>
                        <span className="text-slate-500 line-through">₹{config.registrationFee}</span>
                        <span className="text-emerald-400 font-black text-sm bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">
                          FREE (₹0)
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between pt-3">
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="flex items-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>

                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={handleFinalSubmit}
                        className="flex items-center gap-2 py-3.5 px-8 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 cursor-pointer transform hover:scale-105 active:scale-95 transition-all"
                      >
                        {isSubmitting ? (
                          <span>Activating...</span>
                        ) : (
                          <>
                            <ShieldCheck className="w-5 h-5 text-slate-950" />
                            <span>✅ बिना पेमेंट डायरेक्ट सेव और लाइव करें</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Normal User Payment Section */
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-transparent border border-amber-500/30 p-4 rounded-2xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                            Annual Crew Registration Fee
                          </span>
                          <h4 className="text-xl font-black text-white mt-0.5">
                            ₹{config.registrationFee}{' '}
                            <span className="text-xs font-normal text-slate-400">/ one-time yearly listing</span>
                          </h4>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                          Verified Badge Included
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-2">
                        इस फीस से आपको गोंदिया, नागपुर, भंडारा, बालाघाट के 200+ स्टूडियोज की डायरेक्ट बुकिंग्स मिलेंगी।
                      </p>
                    </div>

                    {/* QR Code and UPI ID */}
                    <div className="bg-slate-950 border border-slate-800 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center gap-5">
                      <div className="bg-white p-2.5 rounded-xl shrink-0 shadow-lg">
                        <img
                          src={config.qrCodeUrl}
                          alt="UPI QR Code"
                          className="w-32 h-32 sm:w-36 sm:h-36 object-contain"
                        />
                      </div>

                      <div className="space-y-3 w-full text-center sm:text-left">
                        <div>
                          <span className="text-xs font-bold text-slate-400 block">
                            Scan with Google Pay, PhonePe, Paytm or BHIM UPI:
                          </span>
                          <div className="flex items-center gap-2 mt-1 justify-center sm:justify-start">
                            <span className="text-sm font-mono font-bold text-amber-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                              {config.upiId}
                            </span>
                            <button
                              type="button"
                              onClick={handleCopyUpi}
                              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1 cursor-pointer"
                            >
                              {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                              <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>
                        </div>

                        <div className="text-[11px] text-slate-400">
                          Amount to Pay: <strong className="text-white">₹{config.registrationFee}</strong> • Official Platform UPI
                        </div>
                      </div>
                    </div>

                    {/* Transaction UTR / Ref No */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                        UPI Transaction ID / UTR Number (12 Digit) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="उदा. 426811983021 (पेमेंट के बाद मिला UTR नंबर)"
                        value={paymentUtr}
                        onChange={(e) => setPaymentUtr(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                      />
                      <p className="text-[11px] text-slate-400 mt-1">
                        PhonePe / GPay में पेमेंट सफल होने के बाद स्क्रीन पर दिखने वाला 12-अंकों का UTR यहां डालें।
                      </p>
                    </div>

                    <div className="flex justify-between pt-3">
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="flex items-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>

                      <button
                        type="button"
                        disabled={isSubmitting || !paymentUtr}
                        onClick={handleFinalSubmit}
                        className="flex items-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <span>Verifying & Activating...</span>
                        ) : (
                          <>
                            <ShieldCheck className="w-4 h-4 text-slate-950" />
                            <span>Submit Registration & Get Listed</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Admin Bypass Link */}
                    <div className="text-center pt-2 border-t border-slate-800/60">
                      <button
                        type="button"
                        onClick={() => setShowAdminPinModal(true)}
                        className="text-xs text-slate-500 hover:text-amber-400 underline transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>Are you Admin? Add without payment (एडमिन बिना पेमेंट एक्टिवेट करें)</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* Admin PIN Prompt Modal */}
        {showAdminPinModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-sm w-full space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <span>Admin PIN Verification</span>
                </h4>
                <button
                  type="button"
                  onClick={() => setShowAdminPinModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-300">
                बिना पेमेंट क्रू ऐड करने के लिए एडमिन 4-अंकों का पिन दर्ज करें (Default PIN: 1234):
              </p>

              <form onSubmit={handleVerifyAdminPin} className="space-y-3">
                <input
                  type="password"
                  maxLength={6}
                  autoFocus
                  placeholder="Enter Admin PIN"
                  value={adminPinInput}
                  onChange={(e) => {
                    setAdminPinInput(e.target.value);
                    setPinError(false);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-center text-lg font-mono text-white tracking-widest focus:outline-none focus:border-amber-500"
                />

                {pinError && (
                  <p className="text-xs text-rose-400 text-center font-semibold">
                    गलत पिन! कृपया सही एडमिन पिन डालें (1234)।
                  </p>
                )}

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAdminPinModal(false)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold"
                  >
                    Verify & Unlock
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
