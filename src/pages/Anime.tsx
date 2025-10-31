import React from "react";
import { useAnimeStore } from "../stores/animeStore.js";
import AnimeCard from "../components/AnimeCard.js";
import { useSearchStore } from "../stores/searchUIStore.js";
import { BarLoader } from "react-spinners";

function Anime() {
  const animeSearchResults = useAnimeStore((state) => state.animeResults);
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const watchedAnime = useAnimeStore((state) => state.animeWatched);
  const watchingAnime = useAnimeStore((state) => state.animeWatching);
  const plannedAnime = useAnimeStore((state) => state.animePlanned);
  const isLoading = useSearchStore((state) => state.isLoading);

  const allAnime = [...watchedAnime, ...watchingAnime, ...plannedAnime];
  allAnime.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="flex justify-center">
      {searchTerm === "" ? (
        <div className="flex flex-wrap justify-center gap-3">
          {allAnime.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      ) : isLoading ? (
        <div>
          <h2 className="text-ctp-text text-center font-bold text-xl mb-10">
            Fetching results for "{searchTerm}"...
          </h2>

          <BarLoader loading={true} color="#cba6f7" width="100%" />
        </div>
      ) : (
        <div>
          <h2 className="text-ctp-text text-center font-bold text-xl mb-4">
            Results for "{searchTerm}"
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {animeSearchResults.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Anime;
