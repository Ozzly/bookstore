export interface Book {
  key: string;
  title: string;
  author_name: string[];
  edition_count: number;
  first_publish_year: number;
  cover_i: number;
}

export type Category = "books" | "anime" | "manga" | "movies" | "shows";

export interface Anime {
  id: number;
  title: string;
  score: number;
  cover_image: string;
  episodes: number;
  year: number;
  release_season: string;
  studio: string; // Replace with array for multiple studios later
  dateAdded?: string;
  currentEpisode?: number;
  themes: string[];
  videoType: VideoType;
}

export type VideoType =
  | "TV"
  | "Movie"
  | "OVA"
  | "ONA"
  | "Music"
  | "Special"
  | "tv_special"
  | "pv";

export type AnimeStatus = "Watched" | "Watching" | "Planned";
