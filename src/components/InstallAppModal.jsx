import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Smartphone, 
  Share, 
  PlusSquare, 
  Check, 
  Sparkles, 
  Laptop, 
  ShieldCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InstallAppModal({ onClose, deferredPrompt, isInstalled, setIsInstalled }) {
  const [activeDevice, setActiveDevice] = useState('android'); // 'android', 'ios', 'desktop'
  const [installSuccess, setInstallSuccess] = useState(false);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
        setInstallSuccess(true);
        confetti({ particleCount: 80, spread: 70 });
        setTimeout(() => {
          onClose();
        }, 2500);
      }
    } else {
      // Fallback instructions
      alert('अगर आपका ब्राउज़र डायरेक्ट इंस्टॉल सपोर्ट करता है, तो ऊपर 3 डॉट्स (⋮) दबाकर "Install app" या "Add to Home screen" चुनें।');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 p-0.5 shadow-lg shadow-amber-500/25">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Download className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base sm:text-lg font-black text-white">
                  Download PhotographerCrew App
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                सीधे अपने मोबाइल में ऐप डाउनलोड करें
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

        {/* Device Switcher Tabs */}
        <div className="p-4 sm:p-6 space-y-5">
          <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => setActiveDevice('android')}
              className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeDevice === 'android'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Android Phone</span>
            </button>

            <button
              onClick={() => setActiveDevice('ios')}
              className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeDevice === 'ios'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>iPhone (iOS)</span>
            </button>

            <button
              onClick={() => setActiveDevice('desktop')}
              className={`py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeDevice === 'desktop'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Laptop className="w-4 h-4" />
              <span>PC / Laptop</span>
            </button>
          </div>

          {/* Success Banner */}
          {installSuccess && (
            <div className="p-4 bg-emerald-950/70 border border-emerald-500/40 rounded-2xl text-xs text-emerald-300 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <strong className="block text-sm text-white">App Successfully Installed!</strong>
                <span>PhotographerCrew अब आपके फोन की होमस्क्रीन पर आ चुकी है।</span>
              </div>
            </div>
          )}

          {/* TAB 1: Android Instructions & Direct 1-Click Install */}
          {activeDevice === 'android' && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black">
                    1-Click
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Direct Android App Install</h4>
                    <p className="text-xs text-slate-400">बिना Play Store फीस के तुरंत मोबाइल में इंस्टॉल</p>
                  </div>
                </div>

                {deferredPrompt ? (
                  <button
                    onClick={handleInstallClick}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    <Download className="w-5 h-5" />
                    <span>📲 अभी ऐप डाउनलोड करें (Install Now)</span>
                  </button>
                ) : (
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                    <p className="font-semibold text-amber-300">
                      अगर डायरेक्ट बटन न दिखे, तो इन 2 आसान स्टेप्स से इंस्टॉल करें:
                    </p>
                    <ol className="list-decimal list-inside space-y-1.5 text-slate-400 text-[11px]">
                      <li>अपने Chrome ब्राउज़र के ऊपर दाईं तरफ <strong>3 डॉट्स (⋮)</strong> दबाएं।</li>
                      <li>मेन्यू में <strong>"Install app"</strong> या <strong>"Add to Home screen" (होम स्क्रीन में जोड़ें)</strong> पर क्लिक करें।</li>
                      <li><strong>"Install"</strong> दबाएं — ऐप आपके फोन के ऐप मेन्यू में आ जाएगी!</li>
                    </ol>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-center text-[11px] text-slate-400">
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800/80">
                  <span className="text-amber-400 font-bold block">⚡ Super Fast</span>
                  <span>मात्र 2 MB साइज, फोन कभी हैंग नहीं होगा</span>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800/80">
                  <span className="text-emerald-400 font-bold block">🔔 Direct Access</span>
                  <span>1 क्लिक में सभी कैमरामैन व तारीखें खुलेंगी</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: iPhone (iOS Safari) Instructions */}
          {activeDevice === 'ios' && (
            <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Share className="w-4 h-4 text-sky-400" />
                <span>iPhone / iPad में इंस्टॉल करने का तरीका:</span>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold shrink-0">
                    1
                  </span>
                  <div>
                    <strong className="text-white block">Safari ब्राउज़र में खोलें</strong>
                    <span className="text-slate-400 text-[11px]">वेबसाइट को Safari ब्राउज़र में खोलें और नीचे <strong>Share बटन</strong> (<Share className="w-3.5 h-3.5 inline text-sky-400" />) दबाएं।</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold shrink-0">
                    2
                  </span>
                  <div>
                    <strong className="text-white block">Add to Home Screen चुनें</strong>
                    <span className="text-slate-400 text-[11px]">नीचे मेन्यू में स्क्रॉल करके <strong>"Add to Home Screen" (➕ होम स्क्रीन पर जोड़ें)</strong> पर क्लिक करें।</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold shrink-0">
                    3
                  </span>
                  <div>
                    <strong className="text-white block">Add बटन दबाएं</strong>
                    <span className="text-slate-400 text-[11px]">ऊपर दाईं तरफ <strong>"Add"</strong> पर क्लिक करते ही ऐप आपके iPhone के होम स्क्रीन पर सेव हो जाएगी!</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Desktop / Laptop */}
          {activeDevice === 'desktop' && (
            <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Laptop className="w-4 h-4 text-amber-400" />
                <span>Computer / Laptop में इंस्टॉल करें:</span>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <p className="text-slate-400">
                  Google Chrome या Microsoft Edge ब्राउज़र में ऊपर URL बार में दाईं तरफ <strong>Install icon (कंप्यूटर या डाउन एरो)</strong> पर क्लिक करके डेस्कटॉप ऐप की तरह चलाएं।
                </p>

                {deferredPrompt && (
                  <button
                    onClick={handleInstallClick}
                    className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Install on Computer</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Bottom Footer Note */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Official PhotographerCrew App</span>
            </span>
            <span className="font-mono text-slate-500">v1.2.0 • PWA</span>
          </div>

        </div>

      </div>
    </div>
  );
}
