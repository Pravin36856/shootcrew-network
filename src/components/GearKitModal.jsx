import React from 'react';
import { 
  X, 
  Camera, 
  Video, 
  Layers, 
  CheckCircle2, 
  BatteryCharging, 
  Mic, 
  Sun, 
  Sliders, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles,
  Plane
} from 'lucide-react';

export default function GearKitModal({ crew, onClose, onBook }) {
  if (!crew) return null;

  const kit = crew.gearKit || {};
  const cameras = Array.isArray(kit.cameras) ? kit.cameras : [];
  const lenses = Array.isArray(kit.lenses) ? kit.lenses : [];
  const operatedCameras = Array.isArray(kit.operatedCameras) ? kit.operatedCameras : [];

  const totalCameras = kit.totalCameras !== undefined 
    ? kit.totalCameras 
    : (cameras.reduce((acc, c) => acc + (c.qty || 1), 0) || (crew.hasCamera ? 1 : 0));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <img
              src={crew.avatar}
              alt={crew.name}
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl object-cover border-2 border-amber-500/40"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {crew.name}'s Complete Gear Kit
                </h3>
                {crew.isVerified && (
                  <span className="p-1 rounded-full bg-amber-500 text-slate-950" title="Verified Equipment">
                    <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                {crew.roleLabel} • {crew.area}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Top Status Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-transparent border border-amber-500/30 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                {crew.hasCamera ? 'Full Equipment Kit Available' : 'Operator Only (Exposing Specialist)'}
              </span>
              <p className="text-xs text-slate-300 mt-0.5">
                {crew.hasCamera 
                  ? `Total ${totalCameras} Camera Body + Lens & Accessories Setup`
                  : 'Skilled camera operator for your studio cameras'}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block font-medium">Per Day Rate</span>
              <span className="text-base font-black text-amber-400">
                ₹{crew.rateWithGear ? `${crew.rateWithGear}` : `${crew.rateWithoutGear} (Op)`}
                <span className="text-[10px] text-slate-400 font-normal"> / day</span>
              </span>
            </div>
          </div>

          {/* Section 1: Camera Bodies & Quantity */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-amber-400" />
                <span>Camera Bodies & Quantities (कैमरे और संख्या)</span>
              </h4>
              {totalCameras > 0 && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Total: {totalCameras} Camera{totalCameras > 1 ? 's' : ''}
                </span>
              )}
            </div>

            {crew.hasCamera ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {cameras.length > 0 ? (
                  cameras.map((c, i) => (
                    <div
                      key={i}
                      className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center">
                          {c.qty || 1}x
                        </span>
                        <div>
                          <strong className="text-xs font-bold text-white block">{c.model || c.name}</strong>
                          <span className="text-[10px] text-slate-400">4K / Full Frame Body</span>
                        </div>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
                    {crew.cameraDetails}
                  </div>
                )}
              </div>
            ) : (
              /* If operator without camera, show which cameras they operate */
              <div className="space-y-2">
                <p className="text-xs text-slate-400">
                  These are the cameras this operator can handle expertly without any assistance:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {operatedCameras.length > 0 ? (
                    operatedCameras.map((cam, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-emerald-300 font-medium flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{cam}</span>
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-300">{crew.cameraDetails}</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Gimbals & Drones Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Gimbal Card */}
            <div className={`p-4 rounded-2xl border transition-all ${
              kit.hasGimbal || kit.gimbal 
                ? 'bg-slate-950 border-emerald-500/30' 
                : 'bg-slate-950/50 border-slate-800/80 opacity-60'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-300 uppercase flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-emerald-400" />
                  <span>Gimbal Stabilizer</span>
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  kit.hasGimbal || kit.gimbal ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                }`}>
                  {kit.hasGimbal || kit.gimbal ? 'Available ✅' : 'No Gimbal'}
                </span>
              </div>
              <p className="text-xs font-semibold text-white">
                {kit.gimbal || (crew.cameraDetails.includes('Gimbal') ? 'DJI RS3 / Ronin Gimbal' : 'Not Included')}
              </p>
              <span className="text-[10px] text-slate-400 block mt-1">
                Smooth cinematic walking & baarat shots
              </span>
            </div>

            {/* Drone Card */}
            <div className={`p-4 rounded-2xl border transition-all ${
              kit.hasDrone || kit.drone 
                ? 'bg-slate-950 border-sky-500/30' 
                : 'bg-slate-950/50 border-slate-800/80 opacity-60'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-300 uppercase flex items-center gap-1.5">
                  <Plane className="w-4 h-4 text-sky-400" />
                  <span>Drone Setup</span>
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  kit.hasDrone || kit.drone ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-800 text-slate-500'
                }`}>
                  {kit.hasDrone || kit.drone ? 'Available 🚁' : 'No Drone'}
                </span>
              </div>
              <p className="text-xs font-semibold text-white">
                {kit.drone || (crew.role === 'drone_operator' ? crew.cameraDetails : 'Not Included')}
              </p>
              <span className="text-[10px] text-slate-400 block mt-1 flex items-center gap-1">
                <BatteryCharging className="w-3 h-3 text-sky-400" />
                <span>{kit.droneBatteries ? `${kit.droneBatteries} Flight Batteries Included` : 'Standard Battery Setup'}</span>
              </span>
            </div>

          </div>

          {/* Section 3: Lenses Kit */}
          {lenses.length > 0 && (
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Lenses Kit (लेंस की सूची)</span>
              </h4>
              <div className="flex flex-wrap gap-2 pt-1">
                {lenses.map((lens, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200"
                  >
                    🔍 {lens}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Section 4: Lighting & Mics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Lighting */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
              <span className="text-xs font-bold text-slate-300 uppercase flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Lighting & Flash</span>
              </span>
              <p className="text-xs font-medium text-slate-200">
                {kit.lighting || 'Godox On-Camera Flash + LED Light'}
              </p>
              <span className="text-[10px] text-slate-400 block">
                Balanced exposure during stage & night rituals
              </span>
            </div>

            {/* Mics */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
              <span className="text-xs font-bold text-slate-300 uppercase flex items-center gap-1.5">
                <Mic className="w-4 h-4 text-purple-400" />
                <span>Audio & Wireless Mics</span>
              </span>
              <p className="text-xs font-medium text-slate-200">
                {kit.mic || 'Wireless Lapel Mic for Vows & Interviews'}
              </p>
              <span className="text-[10px] text-slate-400 block">
                Crystal clear sound recording
              </span>
            </div>

          </div>

        </div>

        {/* Modal Footer with Actions */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          <a
            href={`tel:${crew.phone}`}
            className="flex items-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>Call {crew.name}</span>
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onBook(crew);
              }}
              className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20"
            >
              Book this Crew with Gear
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
