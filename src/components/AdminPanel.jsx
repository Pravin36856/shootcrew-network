import React, { useState } from 'react';
import { 
  ShieldCheck, 
  DollarSign, 
  Users, 
  BookOpen, 
  Settings, 
  Check, 
  X, 
  Trash2, 
  Edit3, 
  QrCode, 
  Save, 
  Eye, 
  MapPin, 
  Camera,
  ExternalLink,
  Plus,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AdminPanel({ 
  crewList, 
  setCrewList, 
  bookings, 
  config, 
  onSaveConfig,
  onOpenAddCrewFree,
  onLogout
}) {
  const [activeTab, setActiveTab] = useState('overview'); // overview, crew, bookings, fees
  const [feeInput, setFeeInput] = useState(config.registrationFee.toString());
  const [upiInput, setUpiInput] = useState(config.upiId);
  const [supportPhoneInput, setSupportPhoneInput] = useState(config.supportPhone);
  const [adminPinInput, setAdminPinInput] = useState(config.adminPin || '1234');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Revenue calculation: Every crew member who paid registration fee
  const paidCrewCount = crewList.filter(c => c.registrationPaid).length;
  const totalRevenue = paidCrewCount * config.registrationFee;

  const handleToggleVerify = (id) => {
    const updated = crewList.map(c => {
      if (c.id === id) {
        return { ...c, isVerified: !c.isVerified };
      }
      return c;
    });
    setCrewList(updated);
  };

  const handleDeleteCrew = (id) => {
    if (confirm('Are you sure you want to remove this cameraman from the platform?')) {
      const updated = crewList.filter(c => c.id !== id);
      setCrewList(updated);
    }
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    const newFee = parseInt(feeInput, 10) || 299;
    const newConfig = {
      ...config,
      registrationFee: newFee,
      upiId: upiInput,
      supportPhone: supportPhoneInput,
      adminPin: adminPinInput.trim() || '1234',
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=${encodeURIComponent(upiInput)}%26pn=PhotographerCrew%26am=${newFee}%26cu=INR`
    };
    onSaveConfig(newConfig);
    setSaveSuccess(true);
    confetti({ particleCount: 40, spread: 60 });
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                PhotographerCrew Admin & Revenue Management
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              एप्लिकेशन के मालिक का कंट्रोल पैनल — फीस सेटिंग्स, UPI QR कोड, और वेरिफाइड फोटोग्राफर
            </p>
          </div>

          {/* Quick Actions & Navigation */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenAddCrewFree}
              className="flex items-center gap-2 py-2 px-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/25 transition-transform active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-slate-950 stroke-[3]" />
              <span>➕ नया क्रू जोड़ें (बिना पेमेंट - FREE)</span>
            </button>

            {/* Quick Sub-Navigation */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'overview' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('crew')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'crew' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                All Crew ({crewList.length})
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'bookings' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Bookings ({bookings.length})
              </button>
              <button
                onClick={() => setActiveTab('fees')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'fees' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Fee & UPI Setup
              </button>
            </div>

            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="flex items-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-300 font-bold text-xs border border-slate-700 transition-colors cursor-pointer"
                title="Lock Admin Panel"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>लॉगआउट</span>
              </button>
            )}
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
          
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 font-medium block">Total Platform Earnings</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-emerald-500/80 font-medium">From {paidCrewCount} Registration Fees</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 font-medium block">Total Registered Crew</span>
            <span className="text-2xl font-black text-amber-400 mt-1 block">
              {crewList.length}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">Across Gondia & Nagpur</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 font-medium block">Verified Professionals</span>
            <span className="text-2xl font-black text-sky-400 mt-1 block">
              {crewList.filter(c => c.isVerified).length}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">Verified by Admin</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 font-medium block">Registration Fee (Per Crew)</span>
            <span className="text-2xl font-black text-purple-400 mt-1 block">
              ₹{config.registrationFee}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">Direct to your UPI</span>
          </div>

        </div>
      </div>

      {/* TAB CONTENT: Overview & Quick Monetization Details */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-amber-400" />
              <span>How You Earn Money From This Application</span>
            </h3>
            
            <div className="space-y-3 text-xs text-slate-300">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0">1</span>
                <div>
                  <strong className="text-white block text-sm">Cameraman Registration Fee (फीस)</strong>
                  <p className="text-slate-400 mt-0.5">
                    Har naya photographer ya cameraman jab register karega, to vo ₹{config.registrationFee} aapke UPI ({config.upiId}) par pay karega. 100 photographers = ₹{(config.registrationFee * 100).toLocaleString('en-IN')} direct profit!
                  </p>
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">2</span>
                <div>
                  <strong className="text-white block text-sm">Wedding Season Featured Badge</strong>
                  <p className="text-slate-400 mt-0.5">
                    Top rank par aane ke liye cameramen se "Featured Boost" fee le sakte hain (e.g. ₹499/month).
                  </p>
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold shrink-0">3</span>
                <div>
                  <strong className="text-white block text-sm">Direct Contact Unlock for Studios</strong>
                  <p className="text-slate-400 mt-0.5">
                    Studio owners unlimited boys hire karne ke liye season membership le sakte hain.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Current UPI Setup Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <QrCode className="w-5 h-5 text-emerald-400" />
              <span>Current Payment Gateway & QR Code</span>
            </h3>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-5">
              <div className="bg-white p-2 rounded-xl shrink-0">
                <img
                  src={config.qrCodeUrl}
                  alt="QR"
                  className="w-24 h-24 object-contain"
                />
              </div>
              <div className="space-y-1 text-xs">
                <span className="text-slate-400 block">Receiving UPI ID:</span>
                <span className="text-sm font-mono font-bold text-amber-400 block">
                  {config.upiId}
                </span>
                <span className="text-slate-400 block pt-1">Active Fee:</span>
                <span className="text-sm font-bold text-emerald-400 block">
                  ₹{config.registrationFee} INR
                </span>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('fees')}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
            >
              Update UPI ID or Fee Amount
            </button>
          </div>

        </div>
      )}

      {/* TAB CONTENT: Crew Management */}
      {activeTab === 'crew' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h3 className="text-base font-bold text-white">
              All Registered Cameramen & Photographers
            </h3>
            <span className="text-xs text-slate-400">
              Total: {crewList.length} Photographers
            </span>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-3">Photographer</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Services / काम</th>
                  <th className="p-3">City / Area</th>
                  <th className="p-3">Gear Status</th>
                  <th className="p-3">Rates</th>
                  <th className="p-3">Free Dates</th>
                  <th className="p-3">Fee Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {crewList.map((crew) => (
                  <tr key={crew.id} className="hover:bg-slate-950/40">
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={crew.avatar}
                          alt={crew.name}
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                        <div>
                          <strong className="text-white block font-bold">{crew.name}</strong>
                          <span className="text-[10px] text-slate-400">{crew.phone}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 text-[11px] font-semibold">
                        {crew.roleLabel}
                      </span>
                    </td>

                    <td className="p-3">
                      <div className="flex flex-wrap gap-1 max-w-[140px]">
                        {(crew.skills || []).map((sk) => (
                          <span key={sk} className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium">
                            {sk.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="p-3">
                      <span className="text-slate-200">{crew.cityName}</span>
                      <span className="block text-[10px] text-slate-400">{crew.area}</span>
                    </td>

                    <td className="p-3">
                      {crew.hasCamera ? (
                        <span className="text-amber-400 font-semibold text-[11px]">With Camera</span>
                      ) : (
                        <span className="text-sky-400 font-semibold text-[11px]">Operator Only</span>
                      )}
                    </td>

                    <td className="p-3">
                      {crew.rateWithGear && <div>Cam: ₹{crew.rateWithGear}</div>}
                      {crew.rateWithoutGear && <div className="text-emerald-400">Op: ₹{crew.rateWithoutGear}</div>}
                    </td>

                    <td className="p-3">
                      <span className="font-mono text-emerald-400 font-bold">
                        {crew.availableDates.length} Dates
                      </span>
                    </td>

                    <td className="p-3">
                      {crew.addedByAdmin ? (
                        <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
                          👑 Admin Free
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                          ₹{config.registrationFee} Paid
                        </span>
                      )}
                    </td>

                    <td className="p-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleToggleVerify(crew.id)}
                          className={`p-1.5 rounded-lg text-xs font-semibold ${
                            crew.isVerified 
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                              : 'bg-slate-800 text-slate-400'
                          }`}
                          title="Toggle Verification"
                        >
                          <ShieldCheck className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDeleteCrew(crew.id)}
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20"
                          title="Delete Cameraman"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Bookings Log */}
      {activeTab === 'bookings' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h3 className="text-base font-bold text-white">
              Studio Booking Requests
            </h3>
            <span className="text-xs text-slate-400">
              Total: {bookings.length} Bookings Placed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {bookings.map((b) => (
              <div key={b.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-400 text-sm">
                    {b.studioName || 'Studio Booking'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-[10px]">
                    {b.status}
                  </span>
                </div>

                <div className="text-slate-300">
                  <span>Hired: </span>
                  <strong className="text-white">{b.crewName}</strong>
                </div>

                <div className="grid grid-cols-2 gap-2 text-slate-400 pt-1 border-t border-slate-900">
                  <div>
                    <span>Shoot Date:</span>
                    <strong className="block text-white font-mono">{b.shootDate}</strong>
                  </div>
                  <div>
                    <span>Shift:</span>
                    <strong className="block text-white">{b.shift}</strong>
                  </div>
                  <div>
                    <span>Venue:</span>
                    <strong className="block text-white">{b.location}</strong>
                  </div>
                  <div>
                    <span>Est. Rate:</span>
                    <strong className="block text-amber-400">₹{b.rate}</strong>
                  </div>
                </div>

                <div className="text-slate-400 text-[11px] pt-1">
                  Contact: {b.contactPerson} ({b.phone})
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: Fee & UPI Setup */}
      {activeTab === 'fees' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-white mb-2">
            Configure App Fees & Your Payment Details
          </h3>
          <p className="text-xs text-slate-400 mb-6">
            Jab bhi koi naya photographer ya drone operator register karega, to ye fees aapke diye hue UPI ID par aayegi.
          </p>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                Registration Fee per Photographer (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-400 text-sm font-bold">₹</span>
                <input
                  type="number"
                  required
                  value={feeInput}
                  onChange={(e) => setFeeInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 font-bold"
                />
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Standard regional fee is ₹199 to ₹499 per year.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                Your UPI ID (GooglePay / PhonePe / Paytm)
              </label>
              <input
                type="text"
                required
                value={upiInput}
                onChange={(e) => setUpiInput(e.target.value)}
                placeholder="8669173204@hdfc"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                Admin Support WhatsApp / Mobile
              </label>
              <input
                type="tel"
                value={supportPhoneInput}
                onChange={(e) => setSupportPhoneInput(e.target.value)}
                placeholder="8669173204"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="pt-2 border-t border-slate-800/80">
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Secret Admin PIN (एडमिन सीक्रेट पिन)</span>
                </span>
                <span className="text-[10px] text-slate-400 font-normal lowercase tracking-normal">
                  (केवल आपके पास रहेगा)
                </span>
              </label>
              <input
                type="text"
                maxLength={8}
                required
                value={adminPinInput}
                onChange={(e) => setAdminPinInput(e.target.value)}
                placeholder="4-digit PIN (e.g. 1234)"
                className="w-full bg-slate-950 border border-amber-500/40 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none font-mono tracking-widest font-bold"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                यह पिन केवल एडमिन के लिए है। किसी भी पब्लिक पेज या रजिस्ट्रेशन फॉर्म पर यह पिन नहीं दिखेगा।
              </span>
            </div>

            {saveSuccess && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Settings updated successfully! New QR Code is active.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4 text-slate-950" />
              <span>Save & Update Payment Gateway</span>
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
