import React, { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import LoadingSpinner from './LoadingSpinner';
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/solid';

const MyVotes: React.FC = () => {
  const { votes, loading, error, fetchUserVotes } = useAppStore();

  useEffect(() => {
    fetchUserVotes();
  }, [fetchUserVotes]);

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
        <div className="text-center px-4">
          <p className="text-red-600 dark:text-red-400 text-lg mb-4">{error}</p>
          <button
            onClick={fetchUserVotes}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (votes.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center px-4">
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
            You haven't voted on any cats yet
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm">
            Head to the Gallery to start voting!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
          My Votes ({votes.length})
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Here are all the cats you've voted on
        </p>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
        {votes.map((vote) => (
          <div key={vote.id} className="card">
            <div className="relative overflow-hidden">
              <img
                src={vote.image.url}
                alt={`Cat ${vote.image.id}`}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              
              {/* Vote indicator */}
              <div className="absolute top-2 left-2">
                {vote.value === 1 ? (
                  <div className="bg-green-500 text-white p-2 rounded-full">
                    <HandThumbUpIcon className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="bg-red-500 text-white p-2 rounded-full">
                    <HandThumbDownIcon className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Voted {vote.value === 1 ? 'Up' : 'Down'}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {new Date(vote.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Score: {vote.value}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyVotes; 