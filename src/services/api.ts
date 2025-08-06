import axios from 'axios';
import type { CatImage, Vote, VoteRequest, VoteResponse } from '../types';

const API_BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = import.meta.env.VITE_CAT_API_KEY;

if (!API_KEY) {
  console.warn('VITE_CAT_API_KEY is not set. Please add your API key to .env file.');
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'x-api-key': API_KEY || '',
    'Content-Type': 'application/json',
  },
});

export const catApi = {
  // Get random cat images
  getRandomImages: async (limit: number = 10): Promise<CatImage[]> => {
    try {
      const response = await api.get(`/images/search?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching cat images:', error);
      throw new Error('Failed to fetch cat images');
    }
  },

  // Create a vote
  createVote: async (voteData: VoteRequest): Promise<VoteResponse> => {
    try {
      if (!API_KEY) {
        throw new Error('API key is required for voting. Please add VITE_CAT_API_KEY to your .env file.');
      }
      
      const response = await api.post('/votes', voteData);
      return response.data;
    } catch (error: unknown) {
      console.error('Error creating vote:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error('Invalid API key. Please check your VITE_CAT_API_KEY in .env file.');
        } else if (error.response?.status === 403) {
          throw new Error('API key is required for voting. Please add VITE_CAT_API_KEY to your .env file.');
        }
      } else if (error instanceof Error && error.message.includes('API key is required')) {
        throw error;
      }
      
      throw new Error('Failed to create vote. Please try again.');
    }
  },

  // Get user votes
  getUserVotes: async (subId: string): Promise<Vote[]> => {
    try {
      if (!API_KEY) {
        throw new Error('API key is required for fetching votes. Please add VITE_CAT_API_KEY to your .env file.');
      }
      
      const response = await api.get(`/votes?sub_id=${subId}`);
      return response.data;
    } catch (error: unknown) {
      console.error('Error fetching user votes:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error('Invalid API key. Please check your VITE_CAT_API_KEY in .env file.');
        } else if (error.response?.status === 403) {
          throw new Error('API key is required for fetching votes. Please add VITE_CAT_API_KEY to your .env file.');
        }
      } else if (error instanceof Error && error.message.includes('API key is required')) {
        throw error;
      }
      
      throw new Error('Failed to fetch votes. Please try again.');
    }
  },
};

export default catApi; 