import type { ReactNode } from "react";
import type { Anime, AnimeStatus } from "../types.js";
import { DropdownMenu } from "radix-ui";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlusCircledIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { useAnimeStore } from "../stores/animeStore.js";

interface AnimeCardProps {
  anime: Anime;
}

function AnimeCard({ anime }: AnimeCardProps) {
  const {
    mal_id,
    title,
    score,
    cover_image,
    episodes,
    year,
    release_season,
    studio,
  } = anime;

  const addWatchedAnime = useAnimeStore((state) => state.addWatchedAnime);
  const addWatchingAnime = useAnimeStore((state) => state.addWatchingAnime);
  const addPlanToWatchAnime = useAnimeStore(
    (state) => state.addPlanToWatchAnime
  );
  const currentStatus = useAnimeStore((state) => state.getAnimeStatus(mal_id));
  const removeFromAllLists = useAnimeStore((state) => state.removeFromAllLists);

  function getButtonText() {
    switch (currentStatus) {
      case "watched":
        return "Watched";
      case "watching":
        return "Watching";
      case "planToWatch":
        return "Planned";
      default:
        return "Mark Watched";
    }
  }

  function handleStatusChangeMainButton() {
    if (currentStatus) {
      removeFromAllLists(mal_id);
    } else {
      addWatchedAnime(anime);
    }
  }

  function handleStatusChange(status: AnimeStatus | null) {
    if (currentStatus) {
      removeFromAllLists(mal_id);
    }

    if (status === "watched") {
      addWatchedAnime(anime);
    }
    if (status === "watching") {
      addWatchingAnime(anime);
    }
    if (status === "planToWatch") {
      addPlanToWatchAnime(anime);
    }
  }

  function getColor() {
    switch (currentStatus) {
      case "watched":
        return "ctp-blue";
      case "watching":
        return "ctp-peach";
      case "planToWatch":
        return "ctp-pink";
      default:
        return "ctp-mauve";
    }
  }

  return (
    <div className="size-fit p-4 bg-ctp-surface0 rounded-lg border-ctp-surface1 hover:scale-102 hover:shadow-xl transition shadow-lg">
      <div className="flex h-full gap-4 text-ctp-text">
        <div className="w-[180px] h-[256px]">
          <img
            src={cover_image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-[190px] relative">
          <h2 className="font-bold line-clamp-2 leading-tight" title={title}>
            {title}
          </h2>
          <p className="text-center text-sm mb-2">{studio}</p>
          <div className="flex justify-around">
            <p className="">{release_season}</p>
            <p>{score || "N/A"}★</p>
          </div>
          <p className="text-center">
            {episodes || "N/A"} {episodes > 1 ? "episodes" : "episode"}
          </p>
          <div className="absolute bottom-0 w-full">
            <div className="flex">
              <button
                className={`border-3 text-ctp-base rounded-l-lg p-1 border-r-2 w-full transition-all duration-400 hover:brightness-115 active:brightness-90 group bg-${getColor()} border-${getColor()}`}
                onClick={() => handleStatusChangeMainButton()}
              >
                {getButtonText()}

                {currentStatus && (
                  <TrashIcon
                    height={18}
                    width={18}
                    className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-all duration-400 font-bold"
                  />
                )}
              </button>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger
                  className={`border-3 border-l-2 rounded-r-lg p-1 px-2 font-bold transition-all duration-400 hover:brightness-115 active:brightness-90 border-${getColor()} text-${getColor()} hover:bg-${getColor()}/20`}
                >
                  +
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="bg-ctp-base p-2 rounded-lg shadow-lg border-ctp-surface1 border-3 text-ctp-text"
                    side="top"
                    align="end"
                  >
                    <DropdownMenu.Label />
                    <DropdownMenu.Item />

                    <DropdownMenu.RadioGroup>
                      <DropdownMenu.RadioItem
                        value="watched"
                        className="hover:bg-ctp-surface1 p-1 rounded-md"
                        onClick={() => handleStatusChange("watched")}
                      >
                        Mark as Watched
                        <DropdownMenu.ItemIndicator />
                      </DropdownMenu.RadioItem>
                      <DropdownMenu.RadioItem
                        value="watching"
                        className="hover:bg-ctp-surface2 p-1 rounded-md"
                        onClick={() => handleStatusChange("watching")}
                      >
                        Mark as Watching
                        <DropdownMenu.ItemIndicator />
                      </DropdownMenu.RadioItem>
                      <DropdownMenu.RadioItem
                        value="planToWatch"
                        className="hover:bg-ctp-surface2 p-1 rounded-md"
                        onClick={() => handleStatusChange("planToWatch")}
                      >
                        Plan to Watch
                        <DropdownMenu.ItemIndicator />
                      </DropdownMenu.RadioItem>
                    </DropdownMenu.RadioGroup>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeCard;
