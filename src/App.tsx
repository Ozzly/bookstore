import React, { useEffect, useState } from "react";
import { createBrowserRouter, Outlet } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./components/Home.js";
import Search from "./components/Search.js";
import Books from "./pages/Books.js";
import Header from "./components/Header.js";

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
    ],
  },
]);

function Layout() {
  return (
    <>
      <Header />
      <div className="px-4 mb-4">
        <Outlet />
      </div>
    </>
  );
}

export default function App() {
  return <RouterProvider router={router} />;
}
