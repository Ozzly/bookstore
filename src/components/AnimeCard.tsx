import type { Anime, GenericStatus } from "../types.js";
import { useAnimeStore } from "../stores/animeStore.js";
import { FaStar } from "react-icons/fa";
import StatusButton from "./StatusButton.js";
import NumberInputWithButtons from "./NumberInputWithButtons.js";
import MediaCard from "./MediaCard.js";
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
    <MediaCard coverImage={cover_image} alt={title}>
      <h2 className="font-bold line-clamp-2 leading-tight" title={title}>
        {title}
      </h2>
      <p className="text-sm mb-1">{studio}</p>
      <p>
        {release_season} {year}
      </p>
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
          buttonText={getButtonText()}
        />
      </div>
    </MediaCard>
  );
}

export default AnimeCard;
