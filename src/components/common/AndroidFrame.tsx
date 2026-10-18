import React, { useState } from 'react';
import { Smartphone, Monitor } from 'lucide-react';

interface AndroidFrameProps {
  children: React.ReactNode;
  bottomBar?: React.ReactNode;
  onHomePress?: () => void;
  onBackPress?: () => void;
  canGoBack?: boolean;
  activeModuleName?: string;
  onOpenMasterSwitcher?: () => void;
  topSafeAreaColor?: string;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  children,
  bottomBar,
  onHomePress,
  onBackPress,
  canGoBack,
  activeModuleName = 'BengkelQu - Otomotif & Servis',
  onOpenMasterSwitcher,
  topSafeAreaColor = '#008952'
}) => {
  const [isMobileMode, setIsMobileMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  return (
    <div className="min-h-[100dvh] bg-slate-100 text-slate-800 flex flex-col items-center justify-start p-0 md:py-4 md:px-4">
      {/* Top control bar outside phone frame (hanya di desktop untuk simulasi mode preview) */}
      <div className="w-full max-w-5xl mb-2.5 hidden md:flex items-center justify-between px-4 py-2 bg-white shadow-xs rounded-2xl border border-slate-200 text-slate-600 text-xs">
        <div className="flex items-center gap-3">
          <div 
            onClick={onOpenMasterSwitcher} 
            className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xs shadow-xs cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            title="Klik untuk Buka UsahaQu Master Switcher"
          >
            UQ
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 tracking-tight">UsahaQu v1.83</span>
              <span className="text-slate-300">/</span>
              <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 text-[11px]">
                {activeModuleName}
              </span>
            </div>
          </div>
          <span className="text-[10px] bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full border border-amber-200 hidden sm:inline-flex items-center gap-1 shadow-2xs">
            VIP FAMILY
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Frame mode toggle */}
          <button
            onClick={() => setIsMobileMode(!isMobileMode)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors cursor-pointer"
          >
            {isMobileMode ? (
              <>
                <Monitor className="w-3.5 h-3.5" />
                <span>Mode Lebar</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mode HP (412px)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Container Phone Frame / Full Viewport */}
      <div
        className={`w-full transition-all duration-300 flex flex-col ${
          isMobileMode
            ? 'max-w-[425px] h-[100dvh] md:h-[780px] md:max-h-[92vh] rounded-none md:rounded-[40px] shadow-none md:shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-0 md:border-2 md:border-slate-300/80 overflow-hidden bg-white my-auto'
            : 'max-w-6xl xl:max-w-7xl h-[100dvh] md:h-[840px] md:max-h-[94vh] rounded-none md:rounded-2xl shadow-none md:shadow-xl border-0 md:border md:border-slate-200 bg-white overflow-hidden my-auto'
        }`}
      >
        {/* Application Viewport Container: Kaku 100% Height, Tidak Scroll Luar */}
        <div className="relative flex-1 flex flex-col h-full min-h-0 bg-slate-50 overflow-hidden">
          {/* Safe Area Atas Native Buffer (Mencegah menutupi jam & batre bawaan HP) */}
          <div 
            style={{ 
              height: 'max(env(safe-area-inset-top, 0px), 1.85rem)',
              backgroundColor: topSafeAreaColor
            }}
            className="shrink-0 w-full select-none pointer-events-none z-50 transition-colors"
          />

          {/* Main Viewport Content - Flex-1 kaku tanpa scroll luar agar navbar bawah terkunci permanen */}
          <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden relative">
            {children}
          </div>

          {/* Bottom Bar jika dipassing via prop (misal BengkelQu) */}
          {bottomBar && (
            <div className="shrink-0 w-full z-40 bg-white">
              {bottomBar}
            </div>
          )}

          {/* Safe Area Bawah Native Buffer (Mencegah menutupi tombol navigasi bawaan HP) */}
          <div 
            style={{ height: 'max(env(safe-area-inset-bottom, 0px), 0.35rem)' }}
            className="shrink-0 w-full bg-white select-none pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};
