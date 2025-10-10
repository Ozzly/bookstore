import React, { useEffect, useState } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./components/Home.js";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    errorElement: <div>Page Not Found</div>,
  },
  {
    path: "/books",
    element: <div>Books</div>,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
