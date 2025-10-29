import { createBrowserRouter, Outlet } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./components/Home.js";
import Books from "./pages/Books.js";
import Header from "./components/Header.js";
import Anime from "./pages/Anime.js";
import Sidebar from "./components/Sidebar.js";
import Manga from "./pages/Manga.js";
import Shows from "./pages/Shows.js";
import Movies from "./pages/Movies.js";

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
      {
        path: "/manga",
        Component: Manga,
      },
      {
        path: "/movies",
        Component: Movies,
      },
      {
        path: "/shows",
        Component: Shows,
      },
    ],
  },
]);

function Layout() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto p-2 pt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return <RouterProvider router={router} />;
}
