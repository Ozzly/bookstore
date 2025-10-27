import React from "react";
import { NavLink } from "react-router";
import { useSearchStore } from "../stores/searchUIStore.js";

type Page = "books" | "anime" | "manga" | "movies" | "shows";

function Sidebar() {
  const setSearchCategory = useSearchStore((state) => state.setSearchCategory);

  return (
    <div className="w-64 flex-shrink-0 h-full border-r-1 border-ctp-surface0">
      <div className="flex flex-col m-3 text-ctp-text">
        <SidebarPageItem page="books" />
        <SidebarPageItem page="anime" />
        <div className="py-2 hover:bg-ctp-surface0 line-through">Manga</div>
        <div className="py-2 hover:bg-ctp-surface0 line-through">Movies</div>
        <div className="pl-2 py-2 hover:bg-ctp-surface0 line-through">
          TV Shows
        </div>
      </div>
    </div>
  );
}

interface SidebarPageItemProps {
  page: Page;
}

function SidebarPageItem({ page }: SidebarPageItemProps) {
  const setSearchCategory = useSearchStore((state) => state.setSearchCategory);
  return (
    <NavLink to={`/${page}`} onClick={() => setSearchCategory(page)}>
      {({ isActive }) => (
        <div
          className={`p-1 hover:bg-ctp-surface0 w-full rounded-lg ${
            isActive && "font-bold bg-ctp-surface1"
          } `}
        >
          {page}
        </div>
      )}
    </NavLink>
  );
}

export default Sidebar;
