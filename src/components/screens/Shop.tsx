import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';

export const Shop: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center overflow-y-auto">
      <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center mb-6 relative">
        <ShoppingBag size={64} className="text-purple-400 opacity-50" />
        <div className="absolute inset-0 border-2 border-dashed border-purple-500/30 rounded-full animate-spin-slow" />
      </div>
      <motion.h1 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-2"
      >
        오픈 준비중
      </motion.h1>
      <p className="text-gray-400">
        더 멋진 아이템들을 준비하고 있어요!<br/>
        조금만 기다려주세요.
      </p>
    </div>
  );
};
