import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Trash2, 
  User, 
  Camera, 
  Sparkles, 
  Save, 
  AlertCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AvailabilityManager({ crewList, onUpdateCrewDates }) {
  // Let user pick a crew member or enter mobile number to load
  const [selectedCrewId, setSelectedCrewId] = useState(crewList[0]?.id || '');
  const [currentCrew, setCurrentCrew] = useState(crewList[0] || null);
  const [dates, setDates] = useState(crewList[0]?.availableDates || []);
  const [newDate, setNewDate] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  // Handle changing the crew profile
  const handleSelectCrew = (id) => {
    setSelectedCrewId(id);
    const found = crewList.find(c => c.id === id);
    if (found) {
      setCurrentCrew(found);
      setDates([...found.availableDates]);
      setSaveMessage('');
    }
  };

  // Toggle or add a date
  const handleToggleDate = (dateStr) => {
    if (dates.includes(dateStr)) {
      setDates(dates.filter(d => d !== dateStr));
    } else {
      setDates([...dates, dateStr].sort());
    }
  };

  const handleAddCustomDate = () => {
    if (!newDate) return;
    if (dates.includes(newDate)) {
      alert('This date is already marked available (यह तारीख पहले से जोड़ी जा चुकी है)');
      return;
    }
    setDates([...dates, newDate].sort());
    setNewDate('');
  };

  const handleSave = () => {
    if (!currentCrew) return;
    onUpdateCrewDates(currentCrew.id, dates);
    setSaveMessage('Availability updated successfully! Studios can now see your free dates.');
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
    setTimeout(() => setSaveMessage(''), 4000);
  };

  // Generate next 30 days list for easy 1-click toggling
  const generateUpcomingDays = () => {
    const list = [];
    const base = new Date();
    for (let i = 0; i < 35; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNum = d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
      list.push({ iso, dayName, dayNum, fullDate: d });
    }
    return list;
  };

  const upcomingDays = generateUpcomingDays();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Title Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                <CalendarIcon className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Manage Khali / Free Dates (खाली तारीखें मैनेज करें)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              फोटोग्राफर और कैमरामैन अपनी खाली तारीखों को हरा (Available) मार्क करें ताकि स्टूडियो वाले आपको डायरेक्ट हायर कर सकें।
            </p>
          </div>

          {/* Crew Profile Selector */}
          <div className="min-w-[240px]">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>Select Cameraman Profile:</span>
            </label>
            <select
              value={selectedCrewId}
              onChange={(e) => handleSelectCrew(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 cursor-pointer font-medium"
            >
              {crewList.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.cityName} - {c.roleLabel})
                </option>
              ))}
            </select>
          </div>
        </div>

        {currentCrew && (
          <div className="pt-6 space-y-6">
            
            {/* Active Crew Summary Bar */}
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <img
                  src={currentCrew.avatar}
                  alt={currentCrew.name}
                  className="w-12 h-12 rounded-xl object-cover border border-amber-500/30"
                />
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>{currentCrew.name}</span>
                    <span className="text-xs text-amber-400 font-normal">
                      ({currentCrew.roleLabel})
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    {currentCrew.area} • {currentCrew.hasCamera ? 'With Camera' : 'Without Camera (Exposing only)'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Total Free Dates:</span>
                  <span className="text-lg font-black text-emerald-400">
                    {dates.length} Days Free
                  </span>
                </div>

                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 py-2.5 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Availability</span>
                </button>
              </div>
            </div>

            {/* Notification message */}
            {saveMessage && (
              <div className="bg-emerald-950/50 border border-emerald-500/40 p-3 rounded-xl flex items-center gap-2 text-xs text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{saveMessage}</span>
              </div>
            )}

            {/* Interactive 35-Day Calendar Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Quick Calendar (आगामी तारीखों पर क्लिक करके खाली मार्क करें):
                  </h4>
                  <p className="text-xs text-slate-400">
                    हरा (Green) = Available / Khali • स्लेटी (Gray) = Busy / Not Free
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" /> Available
                  </span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <span className="w-2.5 h-2.5 bg-slate-800 rounded-full" /> Busy
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {upcomingDays.map((day) => {
                  const isAvailable = dates.includes(day.iso);
                  return (
                    <button
                      key={day.iso}
                      type="button"
                      onClick={() => handleToggleDate(day.iso)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        isAvailable
                          ? 'bg-emerald-950/80 border-emerald-500 text-white font-bold ring-1 ring-emerald-400 shadow-md shadow-emerald-950/50'
                          : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <span className="block text-[10px] uppercase font-bold text-slate-400">
                        {day.dayName}
                      </span>
                      <span className="block text-sm font-extrabold my-0.5">
                        {day.dayNum}
                      </span>
                      <span className={`block text-[10px] font-semibold ${isAvailable ? 'text-emerald-400' : 'text-slate-600'}`}>
                        {isAvailable ? '✅ Khali' : '❌ Busy'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Date Input for Wedding Muhurat dates beyond 35 days */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Add Any Specific Future Date (आगामी लग्न मुहूर्त की तारीख डालें):
              </h4>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                />
                <button
                  type="button"
                  onClick={handleAddCustomDate}
                  className="flex items-center gap-1.5 py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Mark Khali</span>
                </button>
              </div>

              {/* All current marked dates list */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-400 block mb-1.5">
                  All Active Available Dates ({dates.length} Days):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {dates.map((d) => (
                    <span
                      key={d}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-mono text-xs"
                    >
                      <span>{d}</span>
                      <button
                        onClick={() => handleToggleDate(d)}
                        className="text-slate-400 hover:text-rose-400 ml-1"
                        title="Remove date"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
