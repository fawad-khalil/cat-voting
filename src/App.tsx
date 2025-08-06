import { useState, useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import Header from './components/Header';
import Gallery from './components/Gallery';
import MyVotes from './components/MyVotes';
import Toast from './components/Toast';
import FloatingRefreshButton from './components/FloatingRefreshButton';

function App() {
  const [activeTab, setActiveTab] = useState<'gallery' | 'my-votes'>('gallery');
  const { error, setError, darkMode } = useAppStore();

  // Initialize dark mode on app load
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleTabChange = (tab: 'gallery' | 'my-votes') => {
    setActiveTab(tab);
  };

  const handleCloseToast = () => {
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header activeTab={activeTab} onTabChange={handleTabChange} />
      
      <main>
        {activeTab === 'gallery' ? <Gallery /> : <MyVotes />}
      </main>

      {/* Floating Refresh Button */}
      <FloatingRefreshButton activeTab={activeTab} />

      {/* Toast notifications */}
      {error && (
        <Toast
          message={error}
          type="error"
          onClose={handleCloseToast}
        />
      )}
    </div>
  );
}

export default App;
