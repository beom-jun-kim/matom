import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, MessageCircle, Heart } from 'lucide-react';
import { Friend } from '../../lib/data';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface FriendProfileProps {
  friend: Friend;
  onBack: () => void;
  onChat: (friendId: string) => void;
}

export const FriendProfile: React.FC<FriendProfileProps> = ({ friend, onBack, onChat }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="p-6 pt-8 h-full flex flex-col overflow-y-auto scrollbar-hide"
    >
      <button onClick={onBack} className="self-start p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors mb-4">
        <ArrowLeft size={24} />
      </button>

      <div className="flex flex-col items-center flex-1">
        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-purple-500/30 p-1 mb-4 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
          <div className="w-full h-full rounded-full overflow-hidden bg-gray-800">
            <ImageWithFallback src={friend.profileImage} alt={friend.name} className="w-full h-full object-cover" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-1">{friend.name}</h2>
        <p className="text-gray-400 text-sm mb-8">{friend.description}</p>

        {/* Intimacy */}
        <div className="w-full bg-white/5 rounded-2xl p-6 mb-6 border border-white/5">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm text-gray-300 font-medium">나와의 친밀도</span>
            <span className="text-2xl font-bold text-purple-400">{friend.intimacy}%</span>
          </div>
          <div className="h-3 bg-black/40 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${friend.intimacy}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)] relative"
            >
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[2px]" />
            </motion.div>
          </div>
        </div>

        {/* Attributes/Traits */}
        <div className="w-full flex flex-wrap gap-2 justify-center mb-8">
          {friend.traits.map((trait, i) => (
            <div key={i} className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium">
              #{trait}
            </div>
          ))}
        </div>

        <div className="w-full mt-auto grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 py-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10 font-medium">
             <Heart size={20} className="text-pink-500" />
             <span>관심 보내기</span>
          </button>
          <button 
            onClick={() => onChat(friend.id)}
            className="flex items-center justify-center gap-2 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 transition-colors font-bold shadow-lg shadow-purple-900/40"
          >
             <MessageCircle size={20} />
             <span>대화하기</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
