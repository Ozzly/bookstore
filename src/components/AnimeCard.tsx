import { useEffect, useState, type ReactNode } from "react";
import type { Anime, AnimeStatus, GenericStatus } from "../types.js";
import { useAnimeStore } from "../stores/animeStore.js";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import StatusButton from "./StatusButton.js";
import NumberInputWithButtons from "./NumberInputWithButtons.js";
interface AnimeCardProps {
  item: Anime;
}

function AnimeCard({ item }: AnimeCardProps) {
  const {
    id,
    title,
    score,
    cover_image,
    episodes,
    year,
    release_season,
    studio,
    themes,
    videoType,
  } = item;

  const addAnimeToList = useAnimeStore((state) => state.addAnimeToList);
  const currentStatus = useAnimeStore((state) => state.getAnimeStatus(id));
  const removeAnimeFromList = useAnimeStore(
    (state) => state.removeAnimeFromList
  );
  const dateAdded = useAnimeStore((state) => state.getDateAdded(id));
  const currentEpisode = useAnimeStore((state) => state.getCurrentEpisode(id));
  const setCurrentEpisode = useAnimeStore((state) => state.setCurrentEpisode);

  function getButtonText() {
    switch (currentStatus) {
      case "completed":
        return "Watched";
      case "progress":
        return "Watching";
      case "planned":
        return "Planned";
      default:
        return "Mark Watched";
    }
  }

  function handleStatusChange(status: GenericStatus | null) {
    if (currentStatus) {
      removeAnimeFromList(id, currentStatus);
    }
    if (status === null) return;
    addAnimeToList(item, status);
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
          <p className="text-sm mb-1">{studio}</p>
          <p>{release_season}</p>
          <div
            className={
              score >= 8
                ? "text-ctp-green"
                : score >= 6
                ? "text-ctp-yellow"
                : score >= 5
                ? "text-ctp-maroon"
                : score === null
                ? "text-ctp-subtext0"
                : "text-ctp-red"
            }
          >
            <div className="flex items-center gap-1">
              {score || "N/A"} <FaStar />
            </div>
          </div>
          <p>
            {episodes || "N/A"} {videoType === "TV" ? "Episodes" : videoType}
          </p>

          <div className="h-12 overflow-hidden mt-1">
            <div className="flex flex-wrap gap-1">
              {themes?.map((theme: string) => (
                <div
                  key={theme}
                  className="text-xs bg-ctp-surface2 rounded-xl w-fit px-2 py-0.5"
                >
                  {theme}
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 w-full">
            {currentStatus === "completed" ? (
              <div className="text-ctp-subtext0 text-center">
                Finished {dateAdded}
              </div>
            ) : (
              currentStatus === "progress" && (
                <div className="text-ctp-subtext0 text-center justify-center items-center flex">
                  <div className="hidden group-hover/card:flex justify-center mr-1">
                    <NumberInputWithButtons
                      count={currentEpisode || 0}
                      setCount={(newCount) => {
                        setCurrentEpisode(id, newCount);
                      }}
                      maxCount={episodes}
                    />
                  </div>
                  <div className="group-hover/card:hidden mr-1">
                    {currentEpisode}
                  </div>
                  of {episodes || "?"}
                </div>
              )
            )}
            <StatusButton
              currentStatus={currentStatus}
              handleStatusChange={handleStatusChange}
              getButtonText={getButtonText}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeCard;
