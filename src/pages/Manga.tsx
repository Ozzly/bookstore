import React from "react";
import MediaPageTemplate from "../components/MediaPageTemplate.js";
import { mangaConfig } from "../configs/mediaConfigs.js";

function Manga() {
  return <MediaPageTemplate config={mangaConfig} />;
}

export default Manga;
