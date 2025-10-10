import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.js";
import Layout from "./components/Layout.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    errorElement: <div>Page Not Found</div>,
  },
  {
    path: "/books",
    element: (
      <Layout>
        <div>Books</div>
      </Layout>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
