import React from "react";
import { useAnimeStore } from "../stores/animeStore.js";
import AnimeCard from "../components/AnimeCard.js";

function Anime() {
  const animeSearchResults = useAnimeStore((state) => state.animeResults);
  return (
    <div>
      {animeSearchResults.map((anime) => (
        <AnimeCard key={anime.mal_id} anime={anime} />
      ))}
    </div>
  );
}

export default Anime;
