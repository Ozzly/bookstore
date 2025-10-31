import React, { useEffect } from "react";
import { useAnimeStore } from "../stores/animeStore.js";
import AnimeCard from "../components/AnimeCard.js";
import { useSearchStore } from "../stores/searchUIStore.js";
import { BarLoader } from "react-spinners";
import { ToggleGroup } from "radix-ui";
import {
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
} from "@radix-ui/react-icons";

function ToggleGroupItem({ value }: { value: string }) {
  return (
    <ToggleGroup.Item
      value={value}
      aria-label={`Select ${value} Anime`}
      className="text-ctp-mauve border-3 border-ctp-mauve rounded-lg px-4 py-1  data-[state=on]:bg-ctp-mauve data-[state=on]:text-ctp-base"
    >
      {value}
    </ToggleGroup.Item>
  );
}

function Anime() {
  const animeSearchResults = useAnimeStore((state) => state.animeResults);
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const watchedAnime = useAnimeStore((state) => state.animeWatched);
  const watchingAnime = useAnimeStore((state) => state.animeWatching);
  const plannedAnime = useAnimeStore((state) => state.animePlanned);
  const isLoading = useSearchStore((state) => state.isLoading);

  const [animeSummary, setAnimeSummary] = React.useState([
    ...watchedAnime,
    ...watchingAnime,
    ...plannedAnime,
  ]);

  const [filterStatus, setFilterStatus] = React.useState("all");
  useEffect(() => {
    switch (filterStatus) {
      case "All":
        setAnimeSummary([...watchedAnime, ...watchingAnime, ...plannedAnime]);
        break;
      case "Watched":
        setAnimeSummary([...watchedAnime]);
        break;
      case "Watching":
        setAnimeSummary([...watchingAnime]);
        break;
      case "Planned":
        setAnimeSummary([...plannedAnime]);
        break;
    }
  }, [filterStatus]);

  return (
    <div className="flex justify-center">
      {searchTerm === "" ? (
        <div>
          <div>
            <ToggleGroup.Root
              type="single"
              defaultValue="all"
              value={filterStatus}
              onValueChange={(value) => setFilterStatus(value)}
              className="flex gap-2"
            >
              <ToggleGroupItem value="All" />
              <ToggleGroupItem value="Watched" />
              <ToggleGroupItem value="Watching" />
              <ToggleGroupItem value="Planned" />
            </ToggleGroup.Root>
          </div>
          <div className="text-ctp-text text-center font-bold text-xl mb-4">
            Your Anime Collection
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {animeSummary.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
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
