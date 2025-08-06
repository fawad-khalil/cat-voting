import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  activeTab: 'gallery' | 'my-votes';
  onTabChange: (tab: 'gallery' | 'my-votes') => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const { darkMode, toggleDarkMode } = useAppStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTabChange = (tab: 'gallery' | 'my-votes') => {
    onTabChange(tab);
    setIsMobileMenuOpen(false);
  };

  const handleDarkModeToggle = () => {
    toggleDarkMode();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title - Always visible */}
          <div className="flex items-center">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 truncate">
              🐱 Cat Voter
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex space-x-1">
              <button
                onClick={() => onTabChange('gallery')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'gallery'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                Gallery
              </button>
              <button
                onClick={() => onTabChange('my-votes')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'my-votes'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                My Votes
              </button>
            </nav>

            {/* Desktop Action Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
                title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? (
                  <SunIcon className="w-5 h-5" />
                ) : (
                  <MoonIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Navigation Tabs */}
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-3">
                  Navigation
                </h3>
                <button
                  onClick={() => handleTabChange('gallery')}
                  className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    activeTab === 'gallery'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                >
                  Gallery
                </button>
                <button
                  onClick={() => handleTabChange('my-votes')}
                  className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    activeTab === 'my-votes'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                >
                  My Votes
                </button>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-3">
                  Actions
                </h3>
                
                <button
                  onClick={handleDarkModeToggle}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200 flex items-center gap-3"
                >
                  {darkMode ? (
                    <>
                      <SunIcon className="w-5 h-5" />
                      Switch to Light Mode
                    </>
                  ) : (
                    <>
                      <MoonIcon className="w-5 h-5" />
                      Switch to Dark Mode
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 