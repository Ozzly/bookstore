import AnimeCard from "../components/AnimeCard.js";
import { useAnimeStore } from "../stores/animeStore.js";

export interface MediaConfig {
  title: string;
  searchPlaceholder: string;
  statusOptions: {
    completed: string;
    progress: string;
    planned: string;
  };
  cardComponent: React.ComponentType<any>;
  useStore: () => {
    results: any[];
    completed: any[];
    progress: any[];
    planned: any[];
  };
  sortOptions: string[];
}

export const animeConfig: MediaConfig = {
  title: "Anime",
  searchPlaceholder: "Search your anime collection...",
  statusOptions: {
    completed: "Watched",
    progress: "Watching",
    planned: "Planned",
  },
  cardComponent: AnimeCard,
  useStore: () => {
    const store = useAnimeStore();
    return {
      results: store.animeResults,
      completed: store.animeWatched,
      progress: store.animeWatching,
      planned: store.animePlanned,
    };
  },
  sortOptions: ["Title", "Rating"],
};
