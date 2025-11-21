import React, { ReactNode } from 'react';
import { BottomNav } from './BottomNav';

type Tab = 'home' | 'friends' | 'chat' | 'shop' | 'settings';

interface LayoutProps {
  children: ReactNode;
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
  showNav?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentTab, onTabChange, showNav = true }) => {
  return (
    <div className="min-h-screen bg-[#111] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden flex justify-center">
      {/* Global Background Elements (Ambient) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px]" />
        <div className="absolute top-[20%] right-[-20%] w-[300px] h-[300px] bg-pink-900/10 rounded-full blur-[120px]" />
      </div>

      {/* Mobile Container */}
      <div className="w-full max-w-[430px] h-screen bg-[#0a0a0a] relative z-10 shadow-2xl border-x border-white/5 flex flex-col overflow-hidden">
        {/* Content */}
        <div className="flex-1 pb-24 relative overflow-hidden flex flex-col">
           {children}
        </div>

        {/* Navigation */}
        {showNav && (
          <BottomNav currentTab={currentTab} onTabChange={onTabChange} />
        )}
      </div>
    </div>
  );
};
