import React from "react";
import { FaStar } from "react-icons/fa";

function PublicRating({ score }: { score: number | null }) {
  return (
    <div
      className={
        score === null
          ? "text-ctp-subtext0"
          : score >= 8
          ? "text-ctp-green"
          : score >= 6
          ? "text-ctp-yellow"
          : score >= 5
          ? "text-ctp-maroon"
          : "text-ctp-red"
      }
    >
      <div className="flex items-center gap-1">
        {score ? score.toFixed(1) : "N/A"} <FaStar />
      </div>
    </div>
  );
}

export default PublicRating;
