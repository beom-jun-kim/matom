import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, ChevronRight } from 'lucide-react';
import { friends, Friend } from '../../lib/data';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface FriendListProps {
  onSelectFriend: (friendId: string) => void;
}

export const FriendList: React.FC<FriendListProps> = ({ onSelectFriend }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFriends = friends.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 pt-8 h-full overflow-y-auto scrollbar-hide">
      <h1 className="text-2xl font-bold mb-6">Friends</h1>
      
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        <input 
          type="text" 
          placeholder="친구 찾기..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
        />
      </div>

      {/* List */}
      <div className="space-y-3">
        {filteredFriends.map((friend, index) => (
          <motion.div 
            key={friend.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelectFriend(friend.id)}
            className="group bg-white/5 hover:bg-white/10 border border-white/5 p-4 rounded-2xl flex items-center gap-4 cursor-pointer transition-all active:scale-98"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-800 border border-white/10">
              <ImageWithFallback src={friend.profileImage} alt={friend.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-bold text-base">{friend.name}</h3>
              <p className="text-xs text-gray-400">{friend.description}</p>
            </div>

            <ChevronRight className="text-gray-600 group-hover:text-purple-400 transition-colors" size={20} />
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-white/10 flex flex-col items-center text-center">
        <p className="text-sm text-gray-300 mb-3">새로운 친구를 찾고 싶나요?</p>
        <button className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold transition-colors">
          자동 친구 찾기
        </button>
      </div>
    </div>
  );
};
