import React, { useEffect, useState } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./components/Home.js";
import Search from "./components/Search.js";
import Books from "./pages/Books.js";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    errorElement: <div>Page Not Found</div>,
  },
  {
    path: "/books",
    Component: Books,
  },
]);

export default function App() {
  return (
    <>
      <Search />
      <div className="px-4">
        <RouterProvider router={router} />
      </div>
    </>
  );
}
