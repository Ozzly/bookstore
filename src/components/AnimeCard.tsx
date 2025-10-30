import { useEffect, useState, type ReactNode } from "react";
import type { Anime, AnimeStatus } from "../types.js";
import { DropdownMenu } from "radix-ui";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlusCircledIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { useAnimeStore } from "../stores/animeStore.js";
import { SiTaketwointeractivesoftware } from "react-icons/si";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
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

  const addAnimeToList = useAnimeStore((state) => state.addAnimeToList);
  const currentStatus = useAnimeStore((state) => state.getAnimeStatus(mal_id));
  const removeAnimeFromList = useAnimeStore(
    (state) => state.removeAnimeFromList
  );
  const dateAdded = useAnimeStore((state) => state.getDateAdded(mal_id));
  const currentEpisode = useAnimeStore((state) =>
    state.getCurrentEpisode(mal_id)
  );
  const setCurrentEpisode = useAnimeStore((state) => state.setCurrentEpisode);
  const [localCurrentEpisode, setLocalCurrentEpisode] = useState<string>(
    currentEpisode?.toString() || ""
  );

  useEffect(() => {
    setLocalCurrentEpisode(currentEpisode?.toString() || "");
  }, [currentEpisode]);

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

  function handleStatusChange(status: AnimeStatus | null) {
    if (currentStatus) {
      removeAnimeFromList(mal_id, currentStatus);
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
        return `${baseStyle} bg-ctp-red border-ctp-red`;
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
        return `${baseStyle} border-ctp-red text-ctp-red hover:bg-ctp-red/20`;
      default:
        return `${baseStyle} border-ctp-mauve text-ctp-mauve hover:bg-ctp-mauve/20`;
    }
  }

  function handleEpisodeSave() {
    if (localCurrentEpisode === "" || Number(localCurrentEpisode) > episodes) {
      setLocalCurrentEpisode(currentEpisode?.toString() || "");
    } else if (localCurrentEpisode === currentEpisode?.toString()) {
      return;
    } else {
      setCurrentEpisode(mal_id, Number(localCurrentEpisode));
    }
  }

  return (
    <div className="size-fit p-4 bg-ctp-surface0 rounded-lg border-ctp-surface1 hover:scale-102 hover:shadow-xl transition shadow-lg group/card">
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
          <p className="text-sm mb-2">{studio}</p>
          <div className="flex justify-around">
            <p className="">{release_season}</p>
            <p>{score || "N/A"}★</p>
          </div>
          <p className="text-center">
            {episodes || "N/A"} {episodes > 1 ? "episodes" : "episode"}
          </p>
          <div className="absolute bottom-0 w-full">
            {currentStatus === "Watched" ? (
              <div className="text-ctp-subtext0 text-center">
                Finished {dateAdded}
              </div>
            ) : (
              currentStatus === "Watching" && (
                <div className="text-ctp-subtext0 text-center justify-center items-center flex">
                  <div className="hidden group-hover/card:flex justify-center gap-1 mr-1">
                    <button
                      className="hover:brightness-125 transition-all duration-300 "
                      onClick={() => {
                        setCurrentEpisode(
                          mal_id,
                          Math.max(0, (currentEpisode || 0) - 1)
                        );
                      }}
                    >
                      <FaCircleMinus />
                    </button>
                    <input
                      className={`w-12 text-right focus:outline-none border-3 rounded-lg px-1 border-ctp-surface2 focus:border-ctp-mauve`}
                      value={localCurrentEpisode}
                      onChange={(event) => {
                        if (event.target.value === "") {
                          setLocalCurrentEpisode("");
                        } else if (!isNaN(Number(event.target.value))) {
                          setLocalCurrentEpisode(event.target.value);
                        }
                      }}
                      onBlur={handleEpisodeSave}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleEpisodeSave();
                          (event.target as HTMLInputElement).blur();
                        }
                      }}
                      onFocus={(event) => {
                        const input = event.target as HTMLInputElement;
                        input.setSelectionRange(
                          input.value.length,
                          input.value.length
                        );
                      }}
                    />
                    <button
                      className="hover:brightness-125 transition-all duration-300"
                      onClick={() => {
                        setCurrentEpisode(
                          mal_id,
                          Math.min(episodes, (currentEpisode || episodes) + 1)
                        );
                      }}
                    >
                      <FaCirclePlus />
                    </button>
                  </div>
                  <div className="group-hover/card:hidden mr-1">
                    {currentEpisode}
                  </div>
                  of {episodes || "?"}
                </div>
              )
            )}
            <div className="flex">
              <button
                className={getMainButtonStyle()}
                onClick={() => {
                  if (currentStatus) {
                    handleStatusChange(null);
                  } else {
                    handleStatusChange("Watched");
                  }
                }}
              >
                {getButtonText()}

                {currentStatus && (
                  <MdCancel
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
