import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface FloatingRefreshButtonProps {
  activeTab: 'gallery' | 'my-votes';
}

const FloatingRefreshButton: React.FC<FloatingRefreshButtonProps> = ({ activeTab }) => {
  const { fetchImages, fetchUserVotes } = useAppStore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      if (activeTab === 'gallery') {
        await fetchImages();
      } else {
        await fetchUserVotes();
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={isRefreshing}
      className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed group"
      title={`Refresh ${activeTab === 'gallery' ? 'Gallery' : 'Votes'}`}
      aria-label={`Refresh ${activeTab === 'gallery' ? 'Gallery' : 'Votes'}`}
    >
      <ArrowPathIcon 
        className={`w-6 h-6 transition-transform duration-200 ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'}`} 
      />
    </button>
  );
};

export default FloatingRefreshButton; 