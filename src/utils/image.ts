import client from "./client";
import ImageUrlBuilder from "@sanity/image-url";
import { imageProductProps } from "./types";

function urlForThumbnail(source: imageProductProps) {
  return ImageUrlBuilder(client).image(source).width(300).url();
}

function urlFor(source: imageProductProps) {
  return ImageUrlBuilder(client).image(source).width(580).url();
}

export { urlFor, urlForThumbnail };
