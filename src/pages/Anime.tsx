import React from "react";
import MediaPageTemplate from "../components/MediaPageTemplate.js";
import { animeConfig } from "../configs/mediaConfigs.js";

function Anime() {
  return <MediaPageTemplate config={animeConfig} />;
}

export default Anime;
