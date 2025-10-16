import React from "react";
import type { Anime } from "../types.js";

interface AnimeCardProps {
  anime: Anime;
}

function AnimeCard({ anime }: AnimeCardProps) {
  const { mal_id, title, score, cover_image, episodes, year } = anime;
  return (
    <div className="w-[400px] h-[220px] p-4 bg-ctp-surface0 rounded-lg border-ctp-surface1 hover:scale-102 hover:shadow-xl transition shadow-lg">
      <div className="flex h-full">
        <div className="w-1/3 h-full flex">
          <img
            src={cover_image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-ctp-text">
          <h2 className="font-bold">{title}</h2>
        </div>
      </div>
    </div>
  );
}

export default AnimeCard;
