export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: CatBreed[];
}

export interface CatBreed {
  id: string;
  name: string;
  description: string;
  temperament: string;
  origin: string;
}

export interface Vote {
  id: number;
  image_id: string;
  sub_id: string;
  value: 1 | -1;
  created_at: string;
  image: {
    id: string;
    url: string;
  };
}

export interface VoteRequest {
  image_id: string;
  sub_id: string;
  value: 1 | -1;
}

export interface VoteResponse {
  id: number;
  image_id: string;
  sub_id: string;
  value: 1 | -1;
  created_at: string;
}

export interface AppState {
  images: CatImage[];
  votes: Vote[];
  loading: boolean;
  error: string | null;
  darkMode: boolean;
  subId: string;
}

export interface AppActions {
  fetchImages: () => Promise<void>;
  voteOnImage: (imageId: string, value: 1 | -1) => Promise<void>;
  fetchUserVotes: () => Promise<void>;
  toggleDarkMode: () => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
} 