import React from 'react';
import { 
  Camera, 
  MapPin, 
  Star, 
  Calendar, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Check, 
  Briefcase, 
  Tag, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function CrewCard({ crew, onBook, onViewDates, selectedDate }) {
  const isAvailableOnSelectedDate = selectedDate ? crew.availableDates.includes(selectedDate) : null;

  // Format WhatsApp Link
  const waText = encodeURIComponent(
    `Namaste ${crew.name} ji! Maine aapki profile PhotographerCrew application par dekhi hai. Mujhe ${selectedDate ? `Date: ${selectedDate} ke liye ` : ''}shoot ke liye ${crew.roleLabel} hire karna hai. Kya aap available hain?`
  );
  const waUrl = `https://wa.me/91${crew.phone}?text=${waText}`;

  return (
    <div className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 flex flex-col justify-between group">
      
      {/* Top Banner / Card Header */}
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          
          {/* Avatar and basic info */}
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={crew.avatar}
                alt={crew.name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-slate-700 group-hover:border-amber-400 transition-colors"
              />
              {crew.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 p-1 rounded-full shadow" title="Verified PhotographerCrew Professional">
                  <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  {crew.name}
                </h3>
                {crew.isVerified && (
                  <span className="text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-semibold flex items-center gap-0.5">
                    <Check className="w-2.5 h-2.5" /> Verified
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-medium text-slate-300">{crew.area}</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {crew.rating}
                  <span className="text-slate-500 font-normal">({crew.reviewsCount})</span>
                </span>
                <span>•</span>
                <span className="text-slate-400">{crew.experience} Exp</span>
              </div>
            </div>

          </div>

          {/* Role Badge */}
          <div className="text-right">
            <span className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 whitespace-nowrap">
              {crew.roleLabel}
            </span>
          </div>

        </div>

        {/* Camera Gear Status Box */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-semibold flex items-center gap-1.5">
              {crew.hasCamera ? (
                <>
                  <Camera className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-amber-300 font-bold">Camera ke Sath (With Gear):</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  <span className="text-sky-300 font-bold">Without Camera (सिर्फ ऑपरेटर):</span>
                </>
              )}
            </span>
            <span className="text-[11px] font-mono font-bold text-slate-300">
              {crew.hasCamera ? 'GEAR INCLUDED' : 'OPERATOR ONLY'}
            </span>
          </div>
          <p className="text-xs text-slate-300 font-medium leading-relaxed">
            {crew.cameraDetails}
          </p>
        </div>

        {/* Bio / Work summary */}
        {crew.bio && (
          <p className="text-xs text-slate-400 line-clamp-2">
            "{crew.bio}"
          </p>
        )}

        {/* Pricing Grid */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          {crew.rateWithGear ? (
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-medium block">
                With Camera Rate
              </span>
              <span className="text-sm font-bold text-amber-400">
                ₹{crew.rateWithGear.toLocaleString('en-IN')}{' '}
                <span className="text-[10px] text-slate-500 font-normal">/ day</span>
              </span>
            </div>
          ) : (
            <div className="bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/60 opacity-60">
              <span className="text-[10px] text-slate-500 font-medium block">
                With Camera
              </span>
              <span className="text-xs text-slate-500 font-medium">N/A (No gear)</span>
            </div>
          )}

          {crew.rateWithoutGear ? (
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-medium block">
                Without Camera (Exposing)
              </span>
              <span className="text-sm font-bold text-emerald-400">
                ₹{crew.rateWithoutGear.toLocaleString('en-IN')}{' '}
                <span className="text-[10px] text-slate-500 font-normal">/ day</span>
              </span>
            </div>
          ) : (
            <div className="bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/60 opacity-60">
              <span className="text-[10px] text-slate-500 font-medium block">
                Without Camera
              </span>
              <span className="text-xs text-slate-500 font-medium">Not Available</span>
            </div>
          )}
        </div>

        {/* Available Dates Preview */}
        <div className="pt-2 border-t border-slate-800/70">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400 font-semibold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Available (खाली तारीखें):</span>
            </span>
            <button
              onClick={() => onViewDates(crew)}
              className="text-amber-400 hover:text-amber-300 font-bold text-[11px] flex items-center gap-0.5 hover:underline"
            >
              All {crew.availableDates.length} Dates
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {crew.availableDates.slice(0, 4).map((d) => {
              const isMatch = selectedDate === d;
              return (
                <span
                  key={d}
                  className={`text-[11px] px-2 py-0.5 rounded-md font-mono font-medium transition-all ${
                    isMatch
                      ? 'bg-emerald-500 text-slate-950 font-bold ring-2 ring-emerald-300'
                      : 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/20'
                  }`}
                >
                  {d}
                </span>
              );
            })}
            {crew.availableDates.length > 4 && (
              <span
                onClick={() => onViewDates(crew)}
                className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 font-medium hover:bg-slate-700 cursor-pointer"
              >
                +{crew.availableDates.length - 4} more
              </span>
            )}
          </div>
        </div>

      </div>

      {/* Card Footer Action Buttons */}
      <div className="p-4 bg-slate-950/90 border-t border-slate-800 grid grid-cols-12 gap-2">
        
        {/* Book Now Button */}
        <button
          onClick={() => onBook(crew)}
          className="col-span-6 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 transition-all active:scale-[0.98]"
        >
          <Calendar className="w-3.5 h-3.5 text-slate-950" />
          <span>Book Crew</span>
        </button>

        {/* Direct WhatsApp Action */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-4 flex items-center justify-center gap-1 py-2.5 px-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 font-bold text-xs transition-colors"
          title="Direct WhatsApp"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        {/* Direct Call Button */}
        <a
          href={`tel:${crew.phone}`}
          className="col-span-2 flex items-center justify-center py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs transition-colors"
          title="Direct Call"
        >
          <Phone className="w-3.5 h-3.5" />
        </a>

      </div>

    </div>
  );
}
