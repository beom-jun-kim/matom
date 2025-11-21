import React from 'react';
import { Home, Users, MessageCircle, ShoppingBag, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

type Tab = 'home' | 'friends' | 'chat' | 'shop' | 'settings';

interface BottomNavProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const navItems: { id: Tab; icon: React.ReactNode; label: string }[] = [
    { id: 'home', icon: <Home size={24} />, label: '홈' },
    { id: 'friends', icon: <Users size={24} />, label: '친구목록' },
    { id: 'chat', icon: <MessageCircle size={24} />, label: '챗기능' },
    { id: 'shop', icon: <ShoppingBag size={24} />, label: '삽기능' },
    { id: 'settings', icon: <Settings size={24} />, label: '설정' },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-black/80 backdrop-blur-md border-t border-white/10 px-6 py-4 pb-8 flex justify-between items-center z-50 safe-area-pb">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onTabChange(item.id)}
          className={cn(
            "flex flex-col items-center gap-1 transition-all duration-300",
            currentTab === item.id 
              ? "text-purple-400 scale-110" 
              : "text-gray-500 hover:text-gray-300"
          )}
        >
          <div className={cn(
            "p-2 rounded-full transition-all",
            currentTab === item.id && "bg-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
          )}>
            {item.icon}
          </div>
          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  );
};
