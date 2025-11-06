import React, { type ReactNode } from "react";

interface MediaCardProps {
  children: ReactNode;
  coverImage: string;
  alt: string;
}

function MediaCard({ children, coverImage, alt }: MediaCardProps) {
  return (
    <div className="size-fit p-4 bg-ctp-surface0 rounded-lg border-ctp-surface1 hover:scale-102 hover:shadow-xl transition shadow-lg group/card">
      <div className="flex h-full gap-4 text-ctp-text">
        <div className="w-[180px] h-[256px]">
          <img
            src={coverImage}
            alt={alt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-[190px] relative">{children}</div>
      </div>
    </div>
  );
}

export default MediaCard;
