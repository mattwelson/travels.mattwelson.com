import { imageBuilder } from "~/lib/sanity";
import type { imageSchema } from "~/model/types/image";

// TODO: fix aspect ratio, make it based off of crop, so it's different for each image
export function Image({ image }: { image?: imageSchema }) {
  if (!image) return null;
  return (
    <figure>
      <img
        src={imageBuilder.image(image).width(1_200).height(700).url()}
        alt={image.caption ?? ""}
        className="aspect-[12/7] w-[1200px]"
      />
      <figcaption>{image.attribution ?? image.caption}</figcaption>
    </figure>
  );
}
