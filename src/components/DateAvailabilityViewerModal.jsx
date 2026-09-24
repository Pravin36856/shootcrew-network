import React from 'react';
import { X, Calendar, MapPin, CheckCircle, Phone, MessageSquare, Camera } from 'lucide-react';

export default function DateAvailabilityViewerModal({ crew, onClose, onBookWithDate }) {
  if (!crew) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={crew.avatar}
              alt={crew.name}
              className="w-12 h-12 rounded-xl object-cover border border-amber-500/30"
            />
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>{crew.name}</span>
                <span className="text-xs text-amber-400 font-normal">
                  ({crew.roleLabel})
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {crew.area} • {crew.hasCamera ? 'With Camera' : 'Without Camera (Exposing)'}
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
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>All Available / Free Shoot Dates ({crew.availableDates.length} Days Free):</span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {crew.availableDates.map((dateStr) => {
              const d = new Date(dateStr);
              const dayName = isNaN(d) ? '' : d.toLocaleDateString('en-US', { weekday: 'short' });
              return (
                <div
                  key={dateStr}
                  className="bg-slate-950 p-3 rounded-xl border border-emerald-500/30 hover:border-emerald-400 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                      {dayName}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400 block mt-0.5">
                      {dateStr}
                    </span>
                    <span className="text-[10px] text-emerald-500 font-medium block mt-0.5">
                      Khali (Available)
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onBookWithDate(crew, dateStr);
                    }}
                    className="mt-2 py-1 px-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-[10px] font-bold text-center transition-colors"
                  >
                    Book This Date
                  </button>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-400">
            Note: If you need dates beyond these, you can call {crew.name} directly to check upcoming schedule.
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <a
            href={`tel:${crew.phone}`}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>Call: {crew.phone}</span>
          </a>

          <button
            onClick={() => {
              onClose();
              onBookWithDate(crew, crew.availableDates[0]);
            }}
            className="py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
          >
            Book Now
          </button>
        </div>

      </div>
    </div>
  );
}
