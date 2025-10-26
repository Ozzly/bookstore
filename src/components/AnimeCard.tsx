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
    dateAdded,
  } = anime;

  const addAnimeToList = useAnimeStore((state) => state.addAnimeToList);
  const currentStatus = useAnimeStore((state) => state.getAnimeStatus(mal_id));
  const removeFromAllLists = useAnimeStore((state) => state.removeFromAllLists);

  function getButtonText() {
    switch (currentStatus) {
      case "Watched":
        return "Watched";
      case "Watching":
        return "Watching";
      case "Planned":
        return "Planned";
      default:
        return "Mark Watched";
    }
  }

  function handleStatusChangeMainButton() {
    if (currentStatus) {
      removeFromAllLists(mal_id);
    } else {
      addAnimeToList(anime, "Watched");
    }
  }

  function handleStatusChange(status: AnimeStatus | null) {
    if (currentStatus) {
      removeFromAllLists(mal_id);
    }
    if (status === null) return;
    addAnimeToList(anime, status);
  }

  function getMainButtonStyle() {
    const baseStyle =
      "border-3 text-ctp-base rounded-l-lg p-1 border-r-2 w-full transition-all duration-400 hover:brightness-115 active:brightness-90 group";

    switch (currentStatus) {
      case "Watched":
        return `${baseStyle} bg-ctp-blue border-ctp-blue`;
      case "Watching":
        return `${baseStyle} bg-ctp-peach border-ctp-peach`;
      case "Planned":
        return `${baseStyle} bg-ctp-pink border-ctp-pink`;
      default:
        return `${baseStyle} bg-ctp-mauve border-ctp-mauve`;
    }
  }

  function getDropdownButtonStyle() {
    const baseStyle =
      "border-3 border-l-2 rounded-r-lg p-1 px-2 font-bold transition-all duration-400 hover:brightness-115 active:brightness-90";

    switch (currentStatus) {
      case "Watched":
        return `${baseStyle} border-ctp-blue text-ctp-blue hover:bg-ctp-blue/20`;
      case "Watching":
        return `${baseStyle} border-ctp-peach text-ctp-peach hover:bg-ctp-peach/20`;
      case "Planned":
        return `${baseStyle} border-ctp-pink text-ctp-pink hover:bg-ctp-pink/20`;
      default:
        return `${baseStyle} border-ctp-mauve text-ctp-mauve hover:bg-ctp-mauve/20`;
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
            {currentStatus === "Watched" ? (
              <div className="text-ctp-subtext0">Finished {dateAdded}</div>
            ) : (
              currentStatus === "Watching" && (
                <div className="text-ctp-subtext0">Episode X/{episodes}</div>
              )
            )}
            <div className="flex">
              <button
                className={getMainButtonStyle()}
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
                <DropdownMenu.Trigger className={getDropdownButtonStyle()}>
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
                        onClick={() => handleStatusChange("Watched")}
                      >
                        Mark as Watched
                        <DropdownMenu.ItemIndicator />
                      </DropdownMenu.RadioItem>
                      <DropdownMenu.RadioItem
                        value="watching"
                        className="hover:bg-ctp-surface2 p-1 rounded-md"
                        onClick={() => handleStatusChange("Watching")}
                      >
                        Mark as Watching
                        <DropdownMenu.ItemIndicator />
                      </DropdownMenu.RadioItem>
                      <DropdownMenu.RadioItem
                        value="planToWatch"
                        className="hover:bg-ctp-surface2 p-1 rounded-md"
                        onClick={() => handleStatusChange("Planned")}
                      >
                        Mark as Planned
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
