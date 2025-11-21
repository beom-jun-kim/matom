import React, { useState, useEffect } from 'react';
import { ArrowLeft, Send, MoreVertical } from 'lucide-react';
import { friends, initialMessages, currentUser, Message } from '../../lib/data';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { motion } from 'motion/react';

interface ChatProps {
  friendId?: string | null;
  onBack: () => void; // To go back to conversation list or previous screen
}

export const Chat: React.FC<ChatProps> = ({ friendId: initialFriendId, onBack }) => {
  const [activeFriendId, setActiveFriendId] = useState<string | null>(initialFriendId || null);
  const [messages, setMessages] = useState<Record<string, Message[]>>(initialMessages);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (initialFriendId) setActiveFriendId(initialFriendId);
  }, [initialFriendId]);

  const handleSend = () => {
    if (!inputValue.trim() || !activeFriendId) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => ({
      ...prev,
      [activeFriendId]: [...(prev[activeFriendId] || []), newMessage]
    }));
    setInputValue("");

    // Mock reply
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        senderId: activeFriendId,
        text: "응응 그렇구나! ㅎㅎ",
        timestamp: new Date()
      };
      setMessages(prev => ({
        ...prev,
        [activeFriendId]: [...(prev[activeFriendId] || []), reply]
      }));
    }, 2000);
  };

  // View: Conversation List
  if (!activeFriendId) {
    return (
      <div className="p-6 pt-8 h-full flex flex-col overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Messages</h1>
        <div className="space-y-4">
          {friends.map(friend => {
            const lastMsg = messages[friend.id]?.[messages[friend.id].length - 1];
            return (
              <div 
                key={friend.id}
                onClick={() => setActiveFriendId(friend.id)}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 cursor-pointer transition-colors"
              >
                <div className="relative w-12 h-12">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-800">
                    <ImageWithFallback src={friend.profileImage} alt={friend.name} className="w-full h-full object-cover" />
                  </div>
                  {friend.intimacy > 50 && (
                     <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0a0a0a]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold truncate">{friend.name}</h3>
                    <span className="text-xs text-gray-500">{lastMsg ? formatTime(lastMsg.timestamp) : 'New'}</span>
                  </div>
                  <p className="text-sm text-gray-400 truncate">{lastMsg?.text || "대화를 시작해보세요!"}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // View: Active Chat
  const activeFriend = friends.find(f => f.id === activeFriendId);
  const currentMessages = messages[activeFriendId] || [];

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => {
            if (initialFriendId) onBack(); // If we came from another screen, go back there
            else setActiveFriendId(null); // If we were in the list, go back to list
          }} className="-ml-2 p-2 rounded-full hover:bg-white/10">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full overflow-hidden">
               <ImageWithFallback src={activeFriend?.profileImage || ''} alt="" className="w-full h-full object-cover" />
             </div>
             <span className="font-bold">{activeFriend?.name}</span>
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-white/10">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentMessages.map((msg) => {
          const isMe = msg.senderId === 'me';
          return (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id} 
              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
            >
               <div className={`max-w-[70%] p-3 rounded-2xl ${
                 isMe 
                   ? 'bg-purple-600 text-white rounded-tr-none' 
                   : 'bg-white/10 text-gray-200 rounded-tl-none'
               }`}>
                 <p className="text-sm">{msg.text}</p>
                 <p className="text-[10px] opacity-50 mt-1 text-right">{formatTime(msg.timestamp)}</p>
               </div>
            </motion.div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/5 bg-[#0a0a0a] pb-8">
        <div className="flex gap-2 items-center bg-white/5 rounded-full px-4 py-2 border border-white/10">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="메시지를 입력하세요..."
            className="flex-1 bg-transparent border-none focus:outline-none text-sm py-2"
          />
          <button 
            onClick={handleSend}
            className="p-2 bg-purple-600 rounded-full text-white hover:bg-purple-500 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
