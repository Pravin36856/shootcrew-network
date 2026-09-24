import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  AlertCircle,
  Building,
  User,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookingModal({ crew, preselectedDate, onClose, onBookingSuccess }) {
  const [shootDate, setShootDate] = useState(
    preselectedDate || (crew.availableDates.length > 0 ? crew.availableDates[0] : '')
  );
  const [shift, setShift] = useState('Full Day (पूरा दिन)');
  const [bookingGearType, setBookingGearType] = useState(
    crew.hasCamera ? 'with_gear' : 'without_gear'
  );
  const [eventType, setEventType] = useState('Wedding & Reception (शादी)');
  const [venue, setVenue] = useState('');
  const [studioName, setStudioName] = useState('');
  const [photographerName, setPhotographerName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialNote, setSpecialNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Rate calculation
  const currentRate = bookingGearType === 'with_gear' 
    ? (crew.rateWithGear || 0) 
    : (crew.rateWithoutGear || 0);

  // Shift multiplier
  let estimatedTotal = currentRate;
  if (shift.includes('Half Day') || shift.includes('Morning') || shift.includes('Evening')) {
    estimatedTotal = Math.round(currentRate * 0.7);
  } else if (shift.includes('2-Days')) {
    estimatedTotal = currentRate * 2;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!shootDate) {
      alert('कृपया शूट की तारीख चुनें (Please select shoot date)');
      return;
    }
    if (!phone || !photographerName) {
      alert('कृपया अपना नाम और मोबाइल नंबर दर्ज करें (Please provide name and phone)');
      return;
    }

    setIsSubmitting(true);

    const newBooking = {
      id: `b-${Date.now()}`,
      crewId: crew.id,
      crewName: crew.name,
      crewPhone: crew.phone,
      studioName: studioName || 'Freelance Studio',
      contactPerson: photographerName,
      phone: phone,
      shootDate: shootDate,
      shift: shift,
      location: venue || `${crew.cityName} Area`,
      eventType: eventType,
      gearType: bookingGearType === 'with_gear' ? `With Camera (${crew.cameraDetails})` : 'Without Camera (Operator Only)',
      rate: estimatedTotal,
      notes: specialNote,
      status: 'Pending Confirmation (कन्फर्मेशन बाकी)',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setTimeout(() => {
      onBookingSuccess(newBooking);
      setIsSubmitting(false);
      setIsSuccess(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 600);
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(
      `*ShootCrew Direct Booking Request*\n\n` +
      `Namaste ${crew.name} ji!\n` +
      `Main ${photographerName} (${studioName || 'Studio'}) se bol raha hoon.\n` +
      `Mujhe aapko booking karni hai:\n` +
      `📅 *Date:* ${shootDate}\n` +
      `⏰ *Shift:* ${shift}\n` +
      `🎉 *Event:* ${eventType}\n` +
      `📍 *Location / Venue:* ${venue || crew.cityName}\n` +
      `🎥 *Gear:* ${bookingGearType === 'with_gear' ? `With Camera (${crew.cameraDetails})` : 'Without Camera (Operator Only)'}\n` +
      `💰 *Agreed Rate:* ₹${estimatedTotal}\n` +
      `📞 *Contact:* ${phone}\n\n` +
      `Kripya confirm karein ki aap is date ko free hain.`
    );
    window.open(`https://wa.me/91${crew.phone}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <img
              src={crew.avatar}
              alt={crew.name}
              className="w-12 h-12 rounded-xl object-cover border border-amber-500/40"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Book {crew.name}
                </h3>
                <span className="text-[11px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-semibold">
                  {crew.roleLabel}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {crew.area} • {crew.hasCamera ? 'Camera Available' : 'Operator Only'}
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

        {/* Success Screen */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h4 className="text-xl font-bold text-white">
                Booking Request Sent Successfully!
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                आपकी बुकिंग रिकवेस्ट दर्ज कर ली गई है। तुरंत कन्फर्मेशन के लिए {crew.name} को सीधे WhatsApp पर मैसेज भेजें।
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-left text-xs space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>Shoot Date:</span>
                <span className="font-bold text-white">{shootDate}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Shift & Timing:</span>
                <span className="font-bold text-white">{shift}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Estimated Rate:</span>
                <span className="font-bold text-amber-400">₹{estimatedTotal}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleSendWhatsApp}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send via WhatsApp to Cameraman</span>
              </button>

              <button
                onClick={onClose}
                className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors"
              >
                Done / बंद करें
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            
            {/* Shoot Date & Shift */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Shoot Date (शूट की तारीख) *</span>
                </label>
                <input
                  type="date"
                  required
                  value={shootDate}
                  onChange={(e) => setShootDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
                {crew.availableDates.length > 0 && (
                  <p className="text-[11px] text-emerald-400 mt-1">
                    Free on: {crew.availableDates.slice(0, 3).join(', ')}...
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Shift / Timing (समय)</span>
                </label>
                <select
                  value={shift}
                  onChange={(e) => setShift(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Full Day (पूरा दिन)">Full Day (पूरा दिन - 8 से 10 घंटे)</option>
                  <option value="Morning Vidhi / Haldi (सुबह)">Morning Vidhi / Haldi (सुबह 4-5 घंटे)</option>
                  <option value="Evening Baarat & Stage (शाम)">Evening Baarat & Stage (शाम 5-6 घंटे)</option>
                  <option value="2-Days Complete Wedding (2 दिन)">2-Days Complete Wedding (2 दिन शादी)</option>
                </select>
              </div>
            </div>

            {/* Gear Selection: With Camera vs Without Camera */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                Camera Requirement (कैमरे की जरूरत)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled={!crew.rateWithGear}
                  onClick={() => setBookingGearType('with_gear')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    bookingGearType === 'with_gear'
                      ? 'bg-amber-500/20 border-amber-500 text-white ring-1 ring-amber-500'
                      : !crew.rateWithGear 
                        ? 'opacity-40 cursor-not-allowed border-slate-800 bg-slate-950'
                        : 'border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <span className="block text-xs font-bold text-white">With Camera 📸</span>
                  <span className="block text-[11px] text-amber-400 font-semibold mt-0.5">
                    {crew.rateWithGear ? `₹${crew.rateWithGear}/day` : 'Not available'}
                  </span>
                  <span className="block text-[10px] text-slate-400 truncate mt-1">
                    {crew.cameraDetails}
                  </span>
                </button>

                <button
                  type="button"
                  disabled={!crew.rateWithoutGear}
                  onClick={() => setBookingGearType('without_gear')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    bookingGearType === 'without_gear'
                      ? 'bg-amber-500/20 border-amber-500 text-white ring-1 ring-amber-500'
                      : !crew.rateWithoutGear 
                        ? 'opacity-40 cursor-not-allowed border-slate-800 bg-slate-950'
                        : 'border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <span className="block text-xs font-bold text-white">Without Camera 👤</span>
                  <span className="block text-[11px] text-emerald-400 font-semibold mt-0.5">
                    {crew.rateWithoutGear ? `₹${crew.rateWithoutGear}/day` : 'Not available'}
                  </span>
                  <span className="block text-[10px] text-slate-400 mt-1">
                    सिर्फ ऑपरेटर / एक्सपोजिंग
                  </span>
                </button>
              </div>
            </div>

            {/* Event Type & Venue Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                  Event Type (कार्यक्रम)
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Wedding & Reception (शादी)">Wedding & Reception (शादी)</option>
                  <option value="Haldi & Sangeet (हल्दी संगीत)">Haldi & Sangeet (हल्दी संगीत)</option>
                  <option value="Pre-Wedding Shoot (प्री-वेडिंग)">Pre-Wedding Shoot (प्री-वेडिंग)</option>
                  <option value="Engagement Ceremony (सगाई)">Engagement Ceremony (सगाई)</option>
                  <option value="Birthday / Anniversary">Birthday / Anniversary</option>
                  <option value="Corporate / Live Event">Corporate / Live Event</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Venue / Hall / Village (स्थान) *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. Kudwa Lawn, Gondia ya Manish Nagar, Nagpur"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Studio Name & Main Photographer Info */}
            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5" />
                <span>Your Studio / Hiring Photographer Details</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Studio Name
                  </label>
                  <input
                    type="text"
                    placeholder="उदा. Shree Digital Studio"
                    value={studioName}
                    onChange={(e) => setStudioName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Your Name (नाम) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. Kailash Patle"
                    value={photographerName}
                    onChange={(e) => setPhotographerName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Your Mobile / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10 digit number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Any specific note for the crew (कोई खास निर्देश):
              </label>
              <textarea
                rows="2"
                placeholder="उदा. Time par aana, Battery full charge lana, Card khali rakhna..."
                value={specialNote}
                onChange={(e) => setSpecialNote(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Price Summary Bar */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Estimated Booking Charge</span>
                <span className="text-xs text-slate-300">Pay directly to crew on shoot completion</span>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-amber-400">
                  ₹{estimatedTotal.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-slate-400 block font-medium">({shift})</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Confirming Booking...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-slate-950" />
                  <span>Send Booking Request (बुकिंग कन्फर्म करें)</span>
                </>
              )}
            </button>

          </form>
        )}

      </div>
    </div>
  );
}
