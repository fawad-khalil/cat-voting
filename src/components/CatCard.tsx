import React, { useState } from 'react';
import { type CatImage } from '../types';
import { useAppStore } from '../store/useAppStore';
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/outline';
import { HandThumbUpIcon as HandThumbUpSolid, HandThumbDownIcon as HandThumbDownSolid } from '@heroicons/react/24/solid';

interface CatCardProps {
  image: CatImage;
}

const CatCard: React.FC<CatCardProps> = ({ image }) => {
  const { votes, voteOnImage } = useAppStore();
  const [loadingVote, setLoadingVote] = useState<'up' | 'down' | null>(null);
  
  // Find if user has voted on this image
  const userVote = votes.find(vote => vote.image_id === image.id);
  
  // Calculate total score for this image
  const imageVotes = votes.filter(vote => vote.image_id === image.id);
  const totalScore = imageVotes.reduce((sum, vote) => sum + vote.value, 0);

  const handleVote = async (value: 1 | -1) => {
    const voteType = value === 1 ? 'up' : 'down';
    setLoadingVote(voteType);
    
    try {
      // Allow toggling between votes - if same vote, it will update, if different, it will change
      await voteOnImage(image.id, value);
    } finally {
      setLoadingVote(null);
    }
  };

  const isVotedUp = userVote?.value === 1;
  const isVotedDown = userVote?.value === -1;
  const isUpLoading = loadingVote === 'up';
  const isDownLoading = loadingVote === 'down';

  return (
    <div className="card group">
      <div className="relative overflow-hidden">
        <img
          src={image.url}
          alt={`Cat ${image.id}`}
          className="w-full h-48 sm:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      
      <div className="p-3 sm:p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
              {image.breeds?.[0]?.name || 'Unknown Breed'}
            </h3>
            {image.breeds?.[0]?.temperament && (
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                {image.breeds[0].temperament.split(',').slice(0, 3).join(', ')}
              </p>
            )}
          </div>
        </div>
        
        {/* Voting section with score display */}
        <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
          {/* Score display */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <span className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
                Score: {totalScore}
              </span>
            </div>
          </div>
          
          {/* Voting buttons - responsive layout */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => handleVote(1)}
              disabled={isUpLoading || isDownLoading}
              aria-label="Upvote this cat"
              className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 px-2 sm:px-4 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                isVotedUp
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-2 border-green-300 dark:border-green-700'
                  : 'bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-800 dark:bg-gray-700 dark:hover:bg-green-900 dark:text-gray-300 dark:hover:text-green-200 border-2 border-transparent'
              }`}
            >
              {isUpLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-current border-t-transparent"></div>
              ) : isVotedUp ? (
                <HandThumbUpSolid className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <HandThumbUpIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
              <span className="hidden xs:inline sm:hidden">Up</span>
              <span className="xs:hidden sm:inline">Upvote</span>
            </button>
            
            <button
              onClick={() => handleVote(-1)}
              disabled={isUpLoading || isDownLoading}
              aria-label="Downvote this cat"
              className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 px-2 sm:px-4 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                isVotedDown
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-2 border-red-300 dark:border-red-700'
                  : 'bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-800 dark:bg-gray-700 dark:hover:bg-red-900 dark:text-gray-300 dark:hover:text-red-200 border-2 border-transparent'
              }`}
            >
              {isDownLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-current border-t-transparent"></div>
              ) : isVotedDown ? (
                <HandThumbDownSolid className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <HandThumbDownIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
              <span className="hidden xs:inline sm:hidden">Down</span>
              <span className="xs:hidden sm:inline">Downvote</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatCard; 