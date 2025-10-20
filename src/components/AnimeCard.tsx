import React from "react";
import type { Anime } from "../types.js";

interface AnimeCardProps {
  anime: Anime;
}

function AnimeCard({ anime }: AnimeCardProps) {
  const { mal_id, title, score, cover_image, episodes, year, release_season } =
    anime;
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
        <div className="w-[200px]">
          <h2 className="font-bold">{title}</h2>
          <p className="text-sm mb-2">{release_season}</p>
          <p className="text-sm mb-2">{episodes || "N/A"} episodes</p>

          <h3>{score}★</h3>
        </div>
      </div>
    </div>
  );
}

export default AnimeCard;
