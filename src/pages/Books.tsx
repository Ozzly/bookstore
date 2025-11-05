import MediaPageTemplate from "../components/MediaPageTemplate.js";
import { bookConfig } from "../configs/mediaConfigs.js";

function Books() {
  return <MediaPageTemplate config={bookConfig} />;
}

export default Books;
