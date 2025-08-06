import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState, AppActions } from '../types';
import { catApi } from '../services/api';

// Generate a unique sub_id for the user
const generateSubId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Get or create sub_id from localStorage
const getSubId = (): string => {
  const stored = localStorage.getItem('cat_app_sub_id');
  if (stored) return stored;
  
  const newSubId = generateSubId();
  localStorage.setItem('cat_app_sub_id', newSubId);
  return newSubId;
};

interface AppStore extends AppState, AppActions {}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Initial state
      images: [],
      votes: [],
      loading: false,
      error: null,
      darkMode: false,
      subId: getSubId(),

      // Actions
      setLoading: (loading: boolean) => set({ loading }),
      
      setError: (error: string | null) => set({ error }),
      
      toggleDarkMode: () => {
        const { darkMode } = get();
        set({ darkMode: !darkMode });
        // Toggle dark mode class on document
        if (!darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      fetchImages: async () => {
        const { setLoading, setError } = get();
        setLoading(true);
        setError(null);
        
        try {
          const images = await catApi.getRandomImages(10);
          set({ images });
        } catch (error) {
          setError(error instanceof Error ? error.message : 'Failed to fetch images');
        } finally {
          setLoading(false);
        }
      },

      voteOnImage: async (imageId: string, value: 1 | -1) => {
        const { subId, setError, fetchUserVotes, votes } = get();
        setError(null);
        
        try {
          // Check if user already voted on this image
          const existingVote = votes.find(vote => vote.image_id === imageId);
          
          // If same vote, no need to send request (already voted this way)
          if (existingVote && existingVote.value === value) {
            return;
          }
          
          // Send vote request
          await catApi.createVote({
            image_id: imageId,
            sub_id: subId,
            value,
          });
          
          // Refresh user votes to get updated data
          await fetchUserVotes();
        } catch (error) {
          setError(error instanceof Error ? error.message : 'Failed to vote');
        }
      },

      fetchUserVotes: async () => {
        const { subId, setError } = get();
        setError(null);
        
        try {
          const votes = await catApi.getUserVotes(subId);
          set({ votes });
        } catch (error) {
          setError(error instanceof Error ? error.message : 'Failed to fetch votes');
        }
      },
    }),
    {
      name: 'cat-app-storage',
      partialize: (state) => ({
        darkMode: state.darkMode,
        subId: state.subId,
      }),
    }
  )
); 