import React from "react";
import Search from "./SearchInput.js";
import { Link, NavLink } from "react-router";

function Header() {
  return (
    <div className="w-full border-b-1 border-ctp-surface0 sticky top-0 bg-ctp-base z-10 mb-3 text-ctp-text flex justify-center">
      <div className="grid grid-cols-6 items-center text-center divide-x-1 divide divide-ctp-surface1 px-4">
        <NavLink to="/">
          {({ isActive }) => (
            <div
              className={`py-2 hover:bg-ctp-surface0 ${
                isActive ? "font-bold text-ctp-mauve" : ""
              } `}
            >
              Search
            </div>
          )}
        </NavLink>
        <NavLink to="/books">
          {({ isActive }) => (
            <div
              className={`py-2 hover:bg-ctp-surface0 ${
                isActive ? "font-bold text-ctp-mauve" : ""
              } `}
            >
              Books
            </div>
          )}
        </NavLink>
        <div className="py-2 hover:bg-ctp-surface0 line-through">Manga</div>
        <div className="py-2 hover:bg-ctp-surface0 line-through">Anime</div>
        <div className="py-2 hover:bg-ctp-surface0 line-through">Movies</div>
        <div className="pl-2 py-2 hover:bg-ctp-surface0 line-through">
          TV Shows
        </div>
      </div>

      <Search />
    </div>
  );
}

export default Header;
