import React from 'react';
import { Camera, Calendar, UserPlus, ShieldCheck, DollarSign, BookOpen, MapPin, Sparkles, Download } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenRegister, onOpenPricing, onOpenInstallApp, crewCount }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Region Badge */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('explore')}>
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-300 p-0.5 shadow-lg shadow-amber-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                </div>
              </div>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-2xl font-black tracking-tight text-white flex items-center">
                  Photographer<span className="text-amber-400">Crew</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <MapPin className="w-3 h-3" /> Gondia & Nagpur Network
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 -mt-0.5 font-medium">
                कैमरामैन और फोटोग्राफर बुकिंग नेटवर्क
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('explore')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'explore'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Find Crew (लड़के ढूंढें)</span>
            </button>

            <button
              onClick={() => setActiveTab('availability')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'availability'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Khali Dates (तारीखें)</span>
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'bookings'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Bookings (ऑर्डर्स)</span>
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'admin'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Admin / Fees (एडमिन)</span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Install / Download App Button */}
            <button
              onClick={onOpenInstallApp}
              className="flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl text-xs sm:text-xs font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/35 hover:bg-emerald-500/25 transition-all shadow-sm shadow-emerald-500/15 cursor-pointer"
              title="Download Mobile Application"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">📲 ऐप डाउनलोड करें</span>
              <span className="sm:hidden">📲 ऐप डाउनलोड</span>
            </button>

            <button
              onClick={onOpenPricing}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-colors"
            >
              <DollarSign className="w-3.5 h-3.5 text-amber-400" />
              <span>App Fee Plan (₹)</span>
            </button>

            <button
              onClick={onOpenRegister}
              className="flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <UserPlus className="w-4 h-4" />
              <span className="whitespace-nowrap">Join as Crew / रजिस्ट्रेशन</span>
            </button>
          </div>

        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-2 border-t border-slate-800/60 no-scrollbar">
          <button
            onClick={onOpenInstallApp}
            className="px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" /> 📲 ऐप डाउनलोड
          </button>

          <button
            onClick={() => setActiveTab('explore')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'explore'
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-800 text-slate-300'
            }`}
          >
            <Camera className="w-3.5 h-3.5" /> Find Crew
          </button>

          <button
            onClick={() => setActiveTab('availability')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'availability'
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-800 text-slate-300'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" /> Khali Dates
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'bookings'
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-800 text-slate-300'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Bookings
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'admin'
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-800 text-slate-300'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Admin
          </button>

          <button
            onClick={onOpenPricing}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 bg-amber-500/10 text-amber-300 border border-amber-500/30"
          >
            <DollarSign className="w-3.5 h-3.5" /> Fees
          </button>
        </div>

      </div>
    </header>
  );
}
