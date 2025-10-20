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
  mal_id: number;
  title: string;
  score: number;
  cover_image: string;
  episodes: number;
  year: number;
  release_season: string;
}
