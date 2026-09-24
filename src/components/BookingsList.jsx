import React from 'react';
import { BookOpen, Calendar, MapPin, Phone, MessageSquare, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function BookingsList({ bookings, onOpenExplore }) {
  if (!bookings || bookings.length === 0) {
    return (
      <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4">
        <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-slate-500">
          <BookOpen className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white">No Bookings Yet</h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          अभी तक कोई बुकिंग दर्ज नहीं हुई है। फोटोग्राफर खोजने के लिए 'Find Crew' पर जाएं।
        </p>
        <button
          onClick={onOpenExplore}
          className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg"
        >
          Find Cameraman Now
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-400" />
            <span>Studio Shoot Bookings ({bookings.length})</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            आपके द्वारा बुक किए गए या एप्लिकेशन पर आए सभी ऑर्डर्स
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 space-y-3.5 shadow-lg transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                  {b.eventType}
                </span>
                <h3 className="text-base font-bold text-white">
                  {b.crewName}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                {b.status}
              </span>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-mono font-semibold">{b.shootDate}</span>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{b.shift}</span>
              </div>

              <div className="col-span-2 flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="truncate">{b.location}</span>
              </div>
            </div>

            {/* Studio Info */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-xs space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Studio:</span>
                <span className="font-semibold text-white">{b.studioName}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Booked By:</span>
                <span className="font-semibold text-white">{b.contactPerson} ({b.phone})</span>
              </div>
              <div className="flex justify-between text-slate-400 pt-1 border-t border-slate-900">
                <span>Agreed Rate:</span>
                <span className="font-bold text-amber-400 text-sm">₹{b.rate}</span>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href={`tel:${b.crewPhone || b.phone}`}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call Crew</span>
              </a>

              <a
                href={`https://wa.me/91${b.crewPhone || b.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
