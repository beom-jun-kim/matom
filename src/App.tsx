import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Splash } from './components/screens/Splash';
import { Home } from './components/screens/Home';
import { FriendList } from './components/screens/FriendList';
import { FriendProfile } from './components/screens/FriendProfile';
import { Chat } from './components/screens/Chat';
import { Shop } from './components/screens/Shop';
import { Settings } from './components/screens/Settings';
import { friends } from './lib/data';
import { Toaster } from 'sonner';

type Tab = 'home' | 'friends' | 'chat' | 'shop' | 'settings';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentTab, setCurrentTab] = useState<Tab>('home');
  
  // Navigation State
  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null);
  const [activeChatFriendId, setActiveChatFriendId] = useState<string | null>(null);

  const handleTabChange = (tab: Tab) => {
    setCurrentTab(tab);
    if (tab !== 'friends') setSelectedFriendId(null);
    if (tab !== 'chat') setActiveChatFriendId(null);
  };

  const handleFriendSelect = (id: string) => {
    setSelectedFriendId(id);
  };

  const handleChatStart = (friendId: string) => {
    setActiveChatFriendId(friendId);
    setCurrentTab('chat');
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return <Home />;
      
      case 'friends':
        if (selectedFriendId) {
          const friend = friends.find(f => f.id === selectedFriendId);
          if (!friend) return <FriendList onSelectFriend={handleFriendSelect} />;
          return (
            <FriendProfile 
              friend={friend} 
              onBack={() => setSelectedFriendId(null)}
              onChat={handleChatStart}
            />
          );
        }
        return <FriendList onSelectFriend={handleFriendSelect} />;
      
      case 'chat':
        return (
          <Chat 
            friendId={activeChatFriendId} 
            onBack={() => setActiveChatFriendId(null)} 
          />
        );
      
      case 'shop':
        return <Shop />;
      
      case 'settings':
        return <Settings />;
        
      default:
        return <Home />;
    }
  };

  return (
    <Layout currentTab={currentTab} onTabChange={handleTabChange} showNav={!showSplash}>
      {showSplash ? (
        <Splash onComplete={() => setShowSplash(false)} />
      ) : (
        <>
          {renderContent()}
          <Toaster position="top-center" theme="dark" />
        </>
      )}
    </Layout>
  );
}
