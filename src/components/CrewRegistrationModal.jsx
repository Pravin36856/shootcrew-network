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
  Trash2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ROLES, CITIES } from '../data/mockData';

export default function CrewRegistrationModal({ onClose, onRegisterSuccess, config }) {
  const [step, setStep] = useState(1);
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('gondia');
  const [customVillage, setCustomVillage] = useState('');
  const [area, setArea] = useState('');
  const [role, setRole] = useState('traditional_photo');
  const [experience, setExperience] = useState('4 Years');
  const [instagram, setInstagram] = useState('');
  const [bio, setBio] = useState('');

  // Gear & Rates
  const [hasCamera, setHasCamera] = useState(true);
  const [cameraDetails, setCameraDetails] = useState('');
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

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!paymentUtr) {
      alert('कृपया UPI Transaction ID / UTR नंबर दर्ज करें (Please enter UPI transaction UTR)');
      return;
    }

    setIsSubmitting(true);

    const fullArea = customVillage 
      ? `${customVillage}, ${selectedCityObj.name}` 
      : (area ? `${area}, ${selectedCityObj.name}` : selectedCityObj.name);

    const newCrew = {
      id: `crew-${Date.now()}`,
      name: name,
      phone: phone,
      city: city,
      cityName: selectedCityObj.name.split(' ')[0],
      area: fullArea,
      role: role,
      roleLabel: selectedRoleObj.label,
      experience: experience,
      hasCamera: hasCamera,
      gearType: hasCamera ? 'with_gear' : 'without_gear',
      cameraDetails: hasCamera 
        ? (cameraDetails || 'Sony/Canon DSLR/Mirrorless Setup') 
        : (cameraDetails || 'Operator Only (Exposing Specialist)'),
      withoutGearAvailable: withoutGearAvailable || !hasCamera,
      rateWithGear: hasCamera ? parseInt(rateWithGear, 10) || 2500 : null,
      rateWithoutGear: parseInt(rateWithoutGear, 10) || 1200,
      rating: 5.0,
      reviewsCount: 1,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      availableDates: availableDates,
      isVerified: true, // auto-verified for demonstration or pending
      registrationPaid: true,
      paymentUtr: paymentUtr,
      instagram: instagram || '@shootcrew_member',
      bio: bio || `${selectedRoleObj.label} available in ${selectedCityObj.name} for wedding shoots.`,
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
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Step {step} of 4
              </span>
              <h3 className="text-base sm:text-xl font-bold text-white">
                Photographer & Cameraman Registration
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              अपनी सिटी में काम पाने के लिए रजिस्टर करें और खाली तारीखें डालें
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
                आपकी प्रोफाइल <strong>ShootCrew Network</strong> पर लाइव हो गई है। अब {selectedCityObj.name} और आसपास के सभी स्टूडियो वाले आपको खाली तारीखों पर डायरेक्ट बुक कर सकेंगे!
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
                <span>City / Area:</span>
                <span className="font-bold text-white">{customVillage || area || selectedCityObj.name}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Khali Dates Added:</span>
                <span className="font-bold text-emerald-400">{availableDates.length} Dates</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Registration Fee:</span>
                <span className="font-bold text-emerald-400">₹{config.registrationFee} Paid (Verified)</span>
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
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-3">
                  <button
                    type="button"
                    disabled={!name || !phone}
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold text-sm shadow-md"
                  >
                    <span>Next: Role & Gear (आगे बढ़ें)</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Role, Gear & Rates */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-2xl flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                  <p className="text-xs text-amber-300">
                    Step 2: आप क्या काम करते हैं और कैमरे के साथ या बिना कैमरे काम करते हैं?
                  </p>
                </div>

                {/* Role Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                    Primary Role / Specialization (आपका काम) *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {ROLES.filter(r => r.id !== 'all').map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRole(r.id)}
                        className={`p-3 rounded-xl border text-left transition-all ${
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
                    Do you have Camera / Equipment? (क्या आपके पास कैमरा है?)
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
                      📸 Yes, With Camera (कैमरे के साथ)
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

                {/* Camera Details */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                    {hasCamera ? 'Your Camera & Lens Details (कैमरा मॉडल व लेंस)' : 'Known Cameras you can operate (जिन कैमरों पर हाथ साफ है)'}
                  </label>
                  <input
                    type="text"
                    placeholder={hasCamera ? "उदा. Sony A7 IV + 24-70 GM II + V1 Flash ya DJI Mavic 3" : "उदा. Sony FX3, FX30, Panasonic CX350, Nikon Z6"}
                    value={cameraDetails}
                    onChange={(e) => setCameraDetails(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

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
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
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
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
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

            {/* STEP 4: Registration Fee & Payment (Application Owner Revenue) */}
            {step === 4 && (
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
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1"
                        >
                          {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400">
                      Amount to Pay: <strong className="text-white">₹{config.registrationFee}</strong> • Platform Owner Account
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
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
