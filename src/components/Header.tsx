import React from "react";
import Search from "./Search.js";
import { Link } from "react-router";

function Header() {
  return (
    <div className="w-full border-b-1 border-ctp-surface0 sticky top-0 bg-ctp-base z-10 mb-3 text-ctp-text flex justify-center">
      <div className="grid grid-cols-6 items-center text-center divide-x-1 divide divide-ctp-surface1 px-4">
        <Link to="/">
          <div className="py-2 hover:bg-ctp-surface0 ">Home</div>
        </Link>
        <Link to="/books">
          <div className="py-2 hover:bg-ctp-surface0 ">Books</div>
        </Link>
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
