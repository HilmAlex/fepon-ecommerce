import client from "./client";
import ImageUrlBuilder from "@sanity/image-url";
import { imageProductProps } from "./types";

function urlForThumbnail(source: imageProductProps) {
  return ImageUrlBuilder(client).image(source).width(300).url();
}

export { urlForThumbnail };
