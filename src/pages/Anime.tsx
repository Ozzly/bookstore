import React from "react";
import { useAnimeStore } from "../stores/animeStore.js";
import AnimeCard from "../components/AnimeCard.js";

function Anime() {
  const animeSearchResults = useAnimeStore((state) => state.animeResults);
  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap justify-center gap-3 w-[1600px]">
        {animeSearchResults.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
    </div>
  );
}

export default Anime;
