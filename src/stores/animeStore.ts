import { create } from "zustand";

const API_BASE_URL = "https://api.jikan.moe/v4";

type AnimeStore = {
  isLoading: boolean;
  animeResults: any[];
  fetchAnimeQuery: (searchTerm: string) => Promise<void>;
};

export const useAnimeStore = create<AnimeStore>((set) => ({
  isLoading: false,
  animeResults: [],
  fetchAnimeQuery: async (searchTerm: string) => {
    const endpoint = `${API_BASE_URL}/anime?q=${encodeURIComponent(
      searchTerm
    )}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);
  },
}));
