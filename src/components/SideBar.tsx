import React from "react";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div className="h-screen fixed left-0 top-0 bg-ctp-mantle w-10 text-ctp-text items-center flex pt-3 gap-3 flex-col">
      <Link to="/">
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 512 512"
          height="30px"
          width="30px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M261.56 101.28a8 8 0 0 0-11.06 0L66.4 277.15a8 8 0 0 0-2.47 5.79L63.9 448a32 32 0 0 0 32 32H192a16 16 0 0 0 16-16V328a8 8 0 0 1 8-8h80a8 8 0 0 1 8 8v136a16 16 0 0 0 16 16h96.06a32 32 0 0 0 32-32V282.94a8 8 0 0 0-2.47-5.79z"></path>
          <path d="m490.91 244.15-74.8-71.56V64a16 16 0 0 0-16-16h-48a16 16 0 0 0-16 16v32l-57.92-55.38C272.77 35.14 264.71 32 256 32c-8.68 0-16.72 3.14-22.14 8.63l-212.7 203.5c-6.22 6-7 15.87-1.34 22.37A16 16 0 0 0 43 267.56L250.5 69.28a8 8 0 0 1 11.06 0l207.52 198.28a16 16 0 0 0 22.59-.44c6.14-6.36 5.63-16.86-.76-22.97z"></path>
        </svg>
      </Link>

      <Link to="/books">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="30px"
          height="30px"
        >
          <path
            fill="currentColor"
            d="M14 2v13H3.5a1.5 1.5 0 1 1 0-3H13V0H3C1.9 0 1 .9 1 2v12c0 1.1.9 2 2 2h12V2z"
          ></path>
          <path fill="currentColor" d="M3.501 13a.5.5 0 0 0 0 1H13v-1z"></path>
        </svg>
      </Link>
    </div>
  );
}

export default SideBar;
