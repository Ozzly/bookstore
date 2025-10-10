import React from "react";
import SideBar from "./SideBar.js";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <SideBar />
      <div className="ml-10">{children}</div>
    </div>
  );
}
