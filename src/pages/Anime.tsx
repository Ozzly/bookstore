import React, { useEffect } from "react";
import { useAnimeStore } from "../stores/animeStore.js";
import AnimeCard from "../components/AnimeCard.js";
import { useSearchStore } from "../stores/searchUIStore.js";
import { BarLoader } from "react-spinners";
import { RadioGroup } from "radix-ui";
import {
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
} from "@radix-ui/react-icons";

function ToggleGroupItem({ value }: { value: string }) {
  function getStyle() {
    const baseStyle =
      "border-3 rounded-lg px-4 py-1 data-[state=checked]:text-ctp-base";
    switch (value) {
      case "All":
        return `${baseStyle} border-ctp-mauve data-[state=checked]:bg-ctp-mauve text-ctp-mauve`;
      case "Watched":
        return `${baseStyle} border-ctp-blue data-[state=checked]:bg-ctp-blue text-ctp-blue`;
      case "Watching":
        return `${baseStyle} border-ctp-peach data-[state=checked]:bg-ctp-peach text-ctp-peach`;
      case "Planned":
        return `${baseStyle} border-ctp-red data-[state=checked]:bg-ctp-red text-ctp-red`;
      default:
        return baseStyle;
    }
  }
  return (
    <RadioGroup.Item
      value={value}
      aria-label={`Select ${value} Anime`}
      className={getStyle()}
    >
      {value}
    </RadioGroup.Item>
  );
}

function Anime() {
  const animeSearchResults = useAnimeStore((state) => state.animeResults);
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const watchedAnime = useAnimeStore((state) => state.animeWatched);
  const watchingAnime = useAnimeStore((state) => state.animeWatching);
  const plannedAnime = useAnimeStore((state) => state.animePlanned);
  const isLoading = useSearchStore((state) => state.isLoading);

  const [animeSummary, setAnimeSummary] = React.useState(() => {
    const allAnime = [...watchedAnime, ...watchingAnime, ...plannedAnime];
    allAnime.sort((a, b) => a.title.localeCompare(b.title));
    return allAnime;
  });

  const [filterStatus, setFilterStatus] = React.useState("All");
  useEffect(() => {
    switch (filterStatus) {
      case "All":
        const allAnime = [...watchedAnime, ...watchingAnime, ...plannedAnime];
        allAnime.sort((a, b) => a.title.localeCompare(b.title));
        setAnimeSummary(allAnime);
        break;
      case "Watched":
        const watchedList = [...watchedAnime];
        watchedList.sort((a, b) => a.title.localeCompare(b.title));
        setAnimeSummary([...watchedList]);
        break;
      case "Watching":
        const watchingList = [...watchingAnime];
        watchingList.sort((a, b) => a.title.localeCompare(b.title));
        setAnimeSummary([...watchingList]);
        break;
      case "Planned":
        const plannedList = [...plannedAnime];
        plannedList.sort((a, b) => a.title.localeCompare(b.title));
        setAnimeSummary([...plannedList]);
        break;
    }
  }, [filterStatus]);

  return (
    <div className="flex justify-center">
      {searchTerm === "" ? (
        <div className="w-full">
          <div className="flex">
            <RadioGroup.Root
              defaultValue="All"
              value={filterStatus}
              onValueChange={(value) => setFilterStatus(value)}
              className="flex gap-2"
            >
              <ToggleGroupItem value="All" />
              <ToggleGroupItem value="Watched" />
              <ToggleGroupItem value="Watching" />
              <ToggleGroupItem value="Planned" />
            </RadioGroup.Root>
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
