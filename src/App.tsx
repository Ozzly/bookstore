import React, { useEffect, useState } from "react";
import { createBrowserRouter, Outlet } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./components/Home.js";
import Search from "./components/SearchInput.js";
import Books from "./pages/Books.js";
import Header from "./components/Header.js";
import Anime from "./pages/Anime.js";
import Sidebar from "./components/Sidebar.js";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    errorElement: <div>Page Not Found</div>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/books",
        Component: Books,
      },
      {
        path: "/anime",
        Component: Anime,
      },
    ],
  },
]);

function Layout() {
  return (
    <div className="h-screen flex flex-col">
      {/* Header - fixed at top */}
      <Header />

      {/* Main content area with sidebar and content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - fixed on left */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex-1 overflow-auto px-4 mb-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return <RouterProvider router={router} />;
}
