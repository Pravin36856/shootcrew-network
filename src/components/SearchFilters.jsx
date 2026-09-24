import React from 'react';
import { 
  Search, 
  MapPin, 
  Calendar as CalendarIcon, 
  Camera, 
  Video, 
  Film, 
  Plane, 
  Smartphone, 
  Tv, 
  Monitor, 
  Sparkles, 
  SlidersHorizontal, 
  X, 
  CheckCircle2, 
  Shield 
} from 'lucide-react';
import { ROLES, CITIES, SERVICES_LIST } from '../data/mockData';

// Map icon string to Lucide icon
const getRoleIcon = (iconName) => {
  switch (iconName) {
    case 'Camera': return <Camera className="w-4 h-4" />;
    case 'Video': return <Video className="w-4 h-4" />;
    case 'Film': return <Film className="w-4 h-4" />;
    case 'Plane': return <Plane className="w-4 h-4" />;
    case 'Smartphone': return <Smartphone className="w-4 h-4" />;
    case 'Tv': return <Tv className="w-4 h-4" />;
    case 'Monitor': return <Monitor className="w-4 h-4" />;
    default: return <Sparkles className="w-4 h-4" />;
  }
};

export default function SearchFilters({
  selectedCity,
  setSelectedCity,
  selectedDate,
  setSelectedDate,
  selectedRole,
  setSelectedRole,
  selectedSkill = 'all',
  setSelectedSkill,
  selectedGearType,
  setSelectedGearType,
  selectedSpecialGear,
  setSelectedSpecialGear,
  searchQuery,
  setSearchQuery,
  totalResults,
  onResetFilters
}) {
  const isFiltered = selectedCity !== 'all' || selectedDate !== '' || selectedRole !== 'all' || (selectedSkill && selectedSkill !== 'all') || selectedGearType !== 'all' || (selectedSpecialGear && selectedSpecialGear !== 'all') || searchQuery !== '';

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl shadow-slate-950/50 space-y-5">
      
      {/* Search Header / Quick Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span>Find Photography & Video Crew</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
              {totalResults} Available
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            अपनी सिटी चुनें, तारीख चुनें और कैमरे के साथ या बिना कैमरे वाले लड़के तुरंत बुक करें
          </p>
        </div>

        {isFiltered && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-semibold px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset All Filters (फ़िल्टर हटाएं)</span>
          </button>
        )}
      </div>

      {/* Row 1: City & Date & Search Input */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4">
        
        {/* City Filter */}
        <div className="lg:col-span-4">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>City / Village (शहर या गांव)</span>
          </label>
          <div className="relative">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-medium appearance-none cursor-pointer"
            >
              <option value="all">📍 All Cities (सभी शहर - गोंदिया, नागपुर आदि)</option>
              {CITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  📍 {c.name}
                </option>
              ))}
            </select>
            <div className="absolute right-3.5 top-3 pointer-events-none text-slate-400 text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* Shoot Date Filter (Khali Date) */}
        <div className="lg:col-span-4">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <CalendarIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>Shoot Date (तारीख - कौन खाली है?)</span>
            </span>
            {selectedDate && (
              <button 
                onClick={() => setSelectedDate('')} 
                className="text-[11px] text-amber-400 hover:underline"
              >
                Clear Date
              </button>
            )}
          </label>
          <div className="relative">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-medium cursor-pointer"
            />
          </div>
        </div>

        {/* Free text search (Gear name / Area / Person) */}
        <div className="lg:col-span-4">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <span>Search Gear / Area / Name</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Sony FX3, Mavic 3, Tirora, Rohan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-medium"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Row 2: Equipment Status Toggle (With Camera vs Without Camera) */}
      <div className="border-t border-slate-800/80 pt-4">
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
          <span>Camera & Gear Type (कैमरे की स्थिति)</span>
        </label>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            onClick={() => setSelectedGearType('all')}
            className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all border flex items-center justify-center gap-2 ${
              selectedGearType === 'all'
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            <span>All Options (दोनों)</span>
          </button>

          <button
            onClick={() => setSelectedGearType('with_gear')}
            className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all border flex items-center justify-center gap-2 ${
              selectedGearType === 'with_gear'
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>With Camera (कैमरे के साथ) 📸</span>
          </button>

          <button
            onClick={() => setSelectedGearType('without_gear')}
            className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all border flex items-center justify-center gap-2 ${
              selectedGearType === 'without_gear'
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Without Camera (सिर्फ ऑपरेटर / एक्सपोजिंग) 👤</span>
          </button>
        </div>

        {/* Quick Equipment Filters (Drone, Gimbal, 2+ Cameras) */}
        {selectedGearType !== 'without_gear' && (
          <div className="flex flex-wrap items-center gap-2 pt-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Specific Equipment Need:
            </span>
            <button
              type="button"
              onClick={() => setSelectedSpecialGear && setSelectedSpecialGear('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                (!selectedSpecialGear || selectedSpecialGear === 'all')
                  ? 'bg-slate-800 text-white border-slate-600'
                  : 'bg-slate-950 text-slate-400 border-slate-850 hover:text-slate-200'
              }`}
            >
              Any Setup
            </button>

            <button
              type="button"
              onClick={() => setSelectedSpecialGear && setSelectedSpecialGear(selectedSpecialGear === 'drone' ? 'all' : 'drone')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                selectedSpecialGear === 'drone'
                  ? 'bg-sky-500/20 text-sky-300 border-sky-400 font-bold ring-1 ring-sky-400'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Plane className="w-3.5 h-3.5 text-sky-400" />
              <span>Drone Needed (ड्रोन वाले लड़के) 🚁</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedSpecialGear && setSelectedSpecialGear(selectedSpecialGear === 'gimbal' ? 'all' : 'gimbal')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                selectedSpecialGear === 'gimbal'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 font-bold ring-1 ring-emerald-400'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Camera className="w-3.5 h-3.5 text-emerald-400" />
              <span>Gimbal Operator (गिम्बल सेटअप) 🎯</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedSpecialGear && setSelectedSpecialGear(selectedSpecialGear === 'multi_cam' ? 'all' : 'multi_cam')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                selectedSpecialGear === 'multi_cam'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400 font-bold ring-1 ring-amber-400'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span>Multi-Camera (2+ कैमरे) 📷</span>
            </button>
          </div>
        )}
      </div>

      {/* Row: Specific Services / Skills Filter */}
      <div className="border-t border-slate-800/80 pt-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Select Required Work (क्या काम करवाना है?)</span>
          </label>
          {selectedSkill !== 'all' && (
            <button
              type="button"
              onClick={() => setSelectedSkill && setSelectedSkill('all')}
              className="text-[11px] text-amber-400 hover:underline cursor-pointer"
            >
              Clear Service
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedSkill && setSelectedSkill('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              selectedSkill === 'all'
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-sm shadow-amber-500/20'
                : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            All Work (सभी काम)
          </button>
          {SERVICES_LIST.map((srv) => {
            const isMatch = selectedSkill === srv.id;
            return (
              <button
                key={srv.id}
                type="button"
                onClick={() => setSelectedSkill && setSelectedSkill(isMatch ? 'all' : srv.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1 cursor-pointer ${
                  isMatch
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md shadow-amber-500/20 ring-1 ring-amber-400'
                    : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span>{srv.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 3: Role / Category Chips */}
      <div className="border-t border-slate-800/80 pt-4">
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
          Category / Specialty (काम का प्रकार)
        </label>
        
        <div className="flex flex-wrap gap-2">
          {ROLES.map((r) => {
            const isSelected = selectedRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setSelectedRole(r.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-amber-400 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                {getRoleIcon(r.icon)}
                <span>{r.label}</span>
                <span className="opacity-70 text-[10px]">({r.labelHi})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Date notification banner */}
      {selectedDate && (
        <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-emerald-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Showing only cameramen who are <strong>Available (Khali)</strong> on <strong>{selectedDate}</strong>.
            </span>
          </div>
          <button
            onClick={() => setSelectedDate('')}
            className="underline hover:text-white ml-2 text-[11px]"
          >
            Show All Dates
          </button>
        </div>
      )}

    </div>
  );
}
