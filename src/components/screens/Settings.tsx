import React from 'react';
import { User, Bell, Lock, Sliders, ChevronRight, LogIn, Share2, MessageSquare, FileText, Activity } from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <div className="p-6 pt-8 h-full overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6">설정</h1>

      <div className="space-y-6">
        {/* Account Section */}
        <section>
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">계정</h2>
          <div className="bg-white/5 rounded-2xl border border-white/5 overflow-hidden">
            <SettingItem icon={<LogIn />} label="로그인 / 계정 관리" />
            <SettingItem icon={<Lock />} label="공개 설정" />
            <SettingItem icon={<Bell />} label="알림 설정" />
          </div>
        </section>

        {/* Character Section */}
        <section>
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">캐릭터</h2>
          <div className="bg-white/5 rounded-2xl border border-white/5 overflow-hidden">
             <SettingItem icon={<Sliders />} label="문지 성격 설정하기" />
          </div>
        </section>

        {/* Features/Links Section */}
        <section>
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">기능</h2>
          <div className="grid grid-cols-2 gap-3">
            <FeatureCard icon={<Share2 className="text-blue-400" />} label="자동 친구 찾기" />
            <FeatureCard icon={<Activity className="text-pink-400" />} label="친밀도 정보 나누기" />
            <FeatureCard icon={<MessageSquare className="text-green-400" />} label="챗팅방 알림" />
            <FeatureCard icon={<FileText className="text-yellow-400" />} label="100문 100답" />
            <FeatureCard icon={<User className="text-purple-400" />} label="성격 검사" />
          </div>
        </section>
      </div>
      
      <div className="mt-8 text-center text-xs text-gray-600">
        App Version 1.0.0
      </div>
    </div>
  );
};

const SettingItem = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 text-left">
    <div className="flex items-center gap-3">
      <div className="text-gray-400">{icon}</div>
      <span className="font-medium text-sm">{label}</span>
    </div>
    <ChevronRight size={16} className="text-gray-600" />
  </button>
);

const FeatureCard = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <button className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors gap-2">
    <div className="p-2 bg-white/5 rounded-full">{icon}</div>
    <span className="text-xs font-medium text-center">{label}</span>
  </button>
);
