import React, { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import CatCard from './CatCard';
import LoadingSpinner from './LoadingSpinner';

const Gallery: React.FC = () => {
  const { images, loading, error, fetchImages } = useAppStore();

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // Check if API key is missing
  const isApiKeyMissing = !import.meta.env.VITE_CAT_API_KEY;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center max-w-md px-4">
          <p className="text-red-600 dark:text-red-400 text-lg mb-4">{error}</p>
          {error.includes('API key') && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Setup Required</h3>
              <p className="text-yellow-700 dark:text-yellow-300 text-sm mb-3">
                To vote on cat images, you need a free API key from The Cat API.
              </p>
              <ol className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                <li>1. Go to <a href="https://thecatapi.com/" target="_blank" rel="noopener noreferrer" className="underline">thecatapi.com</a></li>
                <li>2. Sign up for a free account</li>
                <li>3. Get your API key</li>
                <li>4. Create a <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">.env</code> file in your project root</li>
                <li>5. Add: <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">VITE_CAT_API_KEY=your_key_here</code></li>
                <li>6. Restart the development server</li>
              </ol>
            </div>
          )}
          <button
            onClick={fetchImages}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center px-4">
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
            No cat images found
          </p>
          <button
            onClick={fetchImages}
            className="btn-primary"
          >
            Load Images
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
      {isApiKeyMissing && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                API Key Required for Voting
              </h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <p>You can view cat images, but voting requires a free API key from <a href="https://thecatapi.com/" target="_blank" rel="noopener noreferrer" className="underline">thecatapi.com</a>.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
        {images.map((image) => (
          <CatCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
};

export default Gallery; 