import React from "react";
import { useAnimeStore } from "../stores/animeStore.js";
import AnimeCard from "../components/AnimeCard.js";
import { useSearchStore } from "../stores/searchUIStore.js";

function Anime() {
  const animeSearchResults = useAnimeStore((state) => state.animeResults);
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const watchedAnime = useAnimeStore((state) => state.animeWatched);

  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap justify-center gap-3">
        {searchTerm === ""
          ? watchedAnime.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))
          : animeSearchResults.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
      </div>
    </div>
  );
}

export default Anime;
