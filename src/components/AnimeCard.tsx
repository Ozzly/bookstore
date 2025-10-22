import React from "react";
import type { Anime } from "../types.js";

interface AnimeCardProps {
  anime: Anime;
}

function AnimeCard({ anime, children }: AnimeCardProps) {
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
            <p>{score}★</p>
          </div>
          <p className="text-center">
            {episodes || "N/A"} {episodes > 1 ? "episodes" : "episode"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AnimeCard;
