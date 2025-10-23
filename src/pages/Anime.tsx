import React from "react";
import { useAnimeStore } from "../stores/animeStore.js";
import AnimeCard from "../components/AnimeCard.js";
import { DropdownMenu } from "radix-ui";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";

function Anime() {
  const animeSearchResults = useAnimeStore((state) => state.animeResults);
  const addWatchedAnime = useAnimeStore((state) => state.addWatchedAnime);
  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap justify-center gap-3 w-[1600px]">
        {animeSearchResults.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime}>
            <div className="">
              <button
                className="border-3 border-ctp-mauve rounded-l-lg p-1 border-r-2"
                onClick={() => addWatchedAnime(anime)}
              >
                Mark as Watched
              </button>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <button className="text-ctp-mauve border-3 border-l-2 border-ctp-mauve rounded-r-lg p-1 px-2 font-bold">
                    +
                  </button>
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
                      >
                        Mark as Watched
                        <DropdownMenu.ItemIndicator />
                      </DropdownMenu.RadioItem>
                      <DropdownMenu.RadioItem
                        value="watching"
                        className="hover:bg-ctp-surface2 p-1 rounded-md"
                      >
                        Mark as Watching
                        <DropdownMenu.ItemIndicator />
                      </DropdownMenu.RadioItem>
                      <DropdownMenu.RadioItem
                        value="planToWatch"
                        className="hover:bg-ctp-surface2 p-1 rounded-md"
                      >
                        Plan to Watch
                        <DropdownMenu.ItemIndicator />
                      </DropdownMenu.RadioItem>
                    </DropdownMenu.RadioGroup>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
          </AnimeCard>
        ))}
      </div>
    </div>
  );
}

export default Anime;
