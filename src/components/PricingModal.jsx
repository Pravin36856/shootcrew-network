import React from 'react';
import { X, Check, DollarSign, Shield, Zap, Sparkles, QrCode } from 'lucide-react';

export default function PricingModal({ onClose, config, onOpenRegister }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-2xl border border-amber-500/20">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                ShootCrew Platform Monetization & Plans
              </h3>
              <p className="text-xs text-slate-400">
                एप्लिकेशन से कमाई करने का पूरा मॉडल (How the App Owner Makes Money)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h4 className="text-2xl font-black text-white">
              Transparent, High-Margin Revenue Model
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              गोंदिया, नागपुर, भंडारा, बालाघाट में हर शादी सीजन में 1000+ कैमरामैन और 300+ स्टूडियोज को लड़के चाहिए होते हैं।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: Cameraman Listing */}
            <div className="bg-slate-950 border-2 border-amber-500/40 rounded-3xl p-6 relative flex flex-col justify-between shadow-xl shadow-amber-500/5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    FOR CAMERAMEN & CREW
                  </span>
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>

                <div>
                  <h5 className="text-lg font-bold text-white">Annual Membership</h5>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-black text-amber-400">₹{config.registrationFee}</span>
                    <span className="text-xs text-slate-400">/ 1 Year (One-Time)</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    कैमरामैन, ड्रोन ऑपरेटर, रील मेकर और स्टिल फोटोग्राफर के लिए।
                  </p>
                </div>

                <div className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-900">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>गोंदिया व नागपुर के सभी बड़े स्टूडियोज में लिस्टिंग</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Free / Khali Dates Calendar फीचर</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Verified Professional Shield Badge</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Direct WhatsApp & Call Booking</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenRegister();
                }}
                className="mt-6 w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
              >
                Register Now as Crew (रजिस्टर करें)
              </button>
            </div>

            {/* Card 2: Studio Pass */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 relative flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
                    FOR STUDIOS & AGENCIES
                  </span>
                  <Shield className="w-5 h-5 text-sky-400" />
                </div>

                <div>
                  <h5 className="text-lg font-bold text-white">Studio VIP Pass</h5>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-black text-sky-400">₹499</span>
                    <span className="text-xs text-slate-400">/ Full Season</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    डिजिटल स्टूडियोज के लिए जिन्हें पूरे सीजन लड़के हायर करने होते हैं।
                  </p>
                </div>

                <div className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-900">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Unlimited Direct Crew Contacts Unlock</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Priority Emergency Replacement Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Direct WhatsApp Quote & Booking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Both Camera & Exposing Boys Database</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-3 rounded-xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400">
                Instant Access Active on Website
              </div>
            </div>

          </div>

          {/* Revenue Estimation Box */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Estimated Regional Earnings Potential
              </span>
              <p className="text-xs text-slate-300 mt-0.5">
                Gondia (120+ Crew) + Nagpur (300+ Crew) @ ₹299 = <strong>₹1,25,000+ / Season Direct UPI Revenue!</strong>
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs text-slate-400 block">Payments directly to:</span>
              <span className="text-xs font-mono font-bold text-emerald-400">{config.upiId}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
