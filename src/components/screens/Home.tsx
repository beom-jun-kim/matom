import React from 'react';
import { motion } from 'motion/react';
import { currentUser } from '../../lib/data';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Bell, Grid } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export const Home: React.FC = () => {
  const { name, profileImage, character, description } = currentUser;

  const handleAction = () => {
    toast.success("몽지가 즐거워합니다!", {
      description: "친밀도가 1 상승했습니다."
    });
  };

  return (
    <div className="p-6 pt-8 flex flex-col h-full overflow-y-auto scrollbar-hide">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
            <ImageWithFallback src={profileImage} alt={name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="font-semibold text-sm">Hello,</h2>
            <p className="text-lg font-bold">{name}!</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
            <Grid size={20} />
          </button>
          <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors relative">
            <Bell size={20} />
            <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>
      </div>

      {/* Main Character Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-900/40 to-black border border-white/10 rounded-3xl p-6 relative overflow-hidden mb-6 shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="flex flex-col items-center z-10 relative">
           <div className="relative w-40 h-40 mb-4">
             <div className="absolute inset-0 bg-purple-500/30 blur-2xl rounded-full animate-pulse" />
             <ImageWithFallback 
               src={character.image} 
               alt={character.name} 
               className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
             />
           </div>
           
           <h2 className="text-3xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">{character.name}</h2>
           <p className="text-purple-300 text-sm mb-6">{character.description}</p>

           <div className="w-full space-y-4">
             {/* Intimacy Bar */}
             <div>
               <div className="flex justify-between text-xs mb-1 text-gray-400">
                 <span>친밀도</span>
                 <span>{character.intimacy}%</span>
               </div>
               <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${character.intimacy}%` }}
                   transition={{ duration: 1, delay: 0.2 }}
                   className="h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" 
                 />
               </div>
             </div>

             {/* Stats Grid */}
             <div className="grid grid-cols-3 gap-3 mt-4">
               <StatBox label="수다스러움" value={character.attributes.talkativeness} />
               <StatBox label="주변관심" value={character.attributes.curiosity} />
               <StatBox label="친화력" value={character.attributes.friendliness} />
             </div>
           </div>
           
           <button 
             onClick={handleAction}
             className="mt-6 w-full py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors shadow-lg shadow-purple-900/20 active:scale-95 transform"
           >
             행동하기
           </button>
        </div>
      </motion.div>
    </div>
  );
};

const StatBox = ({ label, value }: { label: string, value: number }) => (
  <div className="bg-white/5 rounded-xl p-3 flex flex-col items-center justify-center border border-white/5">
    <div className="relative w-10 h-10 flex items-center justify-center mb-1">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#333"
          strokeWidth="3"
        />
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: value / 100 }}
          transition={{ duration: 1, ease: "easeOut" }}
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#a855f7"
          strokeWidth="3"
          strokeDasharray="100, 100"
        />
      </svg>
      <span className="absolute text-[10px] font-bold">{value}</span>
    </div>
    <span className="text-[10px] text-gray-400">{label}</span>
  </div>
);
