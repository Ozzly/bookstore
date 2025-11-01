import React, { useEffect } from "react";
import { useAnimeStore } from "../stores/animeStore.js";
import AnimeCard from "../components/AnimeCard.js";
import { useSearchStore } from "../stores/searchUIStore.js";
import { BarLoader } from "react-spinners";
import { RadioGroup } from "radix-ui";
import type { Anime, AnimeStatus } from "../types.js";
import { Select } from "radix-ui";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { FaSortAlphaDown, FaSortNumericDownAlt } from "react-icons/fa";
import Search from "../components/SearchInput.js";
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

function SelectItem({ value }: { value: "Title" | "Rating" }) {
  return (
    <Select.Item
      value={value}
      className="hover:bg-ctp-surface1 rounded-md py-1 px-2 data-[state=checked]:text-ctp-mauve data-[state=checked]:font-bold"
    >
      <Select.ItemText>
        <div className="flex items-center gap-2">
          {value}
          {value === "Title" ? <FaSortAlphaDown /> : <FaSortNumericDownAlt />}
        </div>
      </Select.ItemText>
    </Select.Item>
  );
}

function AnimePage() {
  const animeSearchResults = useAnimeStore((state) => state.animeResults);
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const watchedAnime = useAnimeStore((state) => state.animeWatched);
  const watchingAnime = useAnimeStore((state) => state.animeWatching);
  const plannedAnime = useAnimeStore((state) => state.animePlanned);
  const isLoading = useSearchStore((state) => state.isLoading);

  const [summarySearchTerm, setSummarySearchTerm] = React.useState("");

  const [animeSummary, setAnimeSummary] = React.useState<Anime[]>(() => {
    const allAnime = [...watchedAnime, ...watchingAnime, ...plannedAnime];
    allAnime.sort((a, b) => a.title.localeCompare(b.title));
    return allAnime;
  });

  const [filterStatus, setFilterStatus] = React.useState<"All" | AnimeStatus>(
    "All"
  );
  const [sortBy, setSortBy] = React.useState<"Title" | "Rating">("Title");

  useEffect(() => {
    let animeList: Anime[] = [];
    switch (filterStatus) {
      case "All":
        animeList = [...watchedAnime, ...watchingAnime, ...plannedAnime];
        break;
      case "Watched":
        animeList = [...watchedAnime];
        break;
      case "Watching":
        animeList = [...watchingAnime];
        break;
      case "Planned":
        animeList = [...plannedAnime];
        break;
    }
    if (summarySearchTerm !== "") {
      animeList = animeList.filter((anime) =>
        anime.title.toLowerCase().includes(summarySearchTerm.toLowerCase())
      );
    }

    if (sortBy === "Title") {
      animeList.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "Rating") {
      animeList.sort((a, b) => (b.score || 0) - (a.score || 0));
    }
    setAnimeSummary(animeList);
  }, [
    filterStatus,
    watchedAnime,
    watchingAnime,
    plannedAnime,
    sortBy,
    summarySearchTerm,
  ]);

  return (
    <div className="flex justify-center">
      {searchTerm === "" ? (
        <div className="w-full">
          <div className="text-ctp-text font-bold text-xl mb-2 ml-2">
            Your Anime Collection
          </div>
          <div className="flex gap-2 items-center mb-4">
            <div>
              <Search
                searchTerm={summarySearchTerm}
                setSearchTerm={setSummarySearchTerm}
                placeholder="Search your anime collection..."
              />
            </div>
            <div className="flex">
              <RadioGroup.Root
                defaultValue="All"
                value={filterStatus}
                onValueChange={(value) =>
                  setFilterStatus(value as "All" | AnimeStatus)
                }
                className="flex gap-2"
              >
                <ToggleGroupItem value="All" />
                <ToggleGroupItem value="Watched" />
                <ToggleGroupItem value="Watching" />
                <ToggleGroupItem value="Planned" />
              </RadioGroup.Root>
            </div>
            <div>
              <Select.Root
                value={sortBy}
                onValueChange={(value) => {
                  setSortBy(value as "Title" | "Rating");
                }}
              >
                <Select.Trigger
                  className="text-ctp-text border-3 border-ctp-surface0 rounded-lg flex items-center px-3 py-1 gap-2 hover:brightness-120 transition-all duration-400 justify-between"
                  aria-label="Sort By"
                >
                  <Select.Value>Sort: {sortBy}</Select.Value>
                  <Select.Icon className="SelectIcon">
                    <ChevronDownIcon />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content
                    position="popper"
                    alignOffset={6}
                    className="SelectContent z-10 bg-ctp-surface0 text-ctp-text rounded-lg show-lg p-3 border-2 border-ctp-surface1"
                  >
                    <Select.ScrollUpButton className="SelectScrollButton">
                      <ChevronUpIcon />
                    </Select.ScrollUpButton>
                    <Select.Viewport className="">
                      <SelectItem value="Title" />
                      <SelectItem value="Rating" />
                    </Select.Viewport>
                    <Select.ScrollDownButton className="SelectScrollButton">
                      <ChevronDownIcon />
                    </Select.ScrollDownButton>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
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

export default AnimePage;
