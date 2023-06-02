import { imageBuilder } from "~/lib/sanity";

// TODO: fix aspect ratio, make it based off of crop, so it's different for each image
export function Image({
  image,
  className = "",
  caption = true,
}: {
  image?: any;
  className?: string;
  caption?: boolean;
}) {
  if (!image) return null;
  return (
    <figure className={`${className}`}>
      <img
        src={imageBuilder.image(image).width(1_200).height(700).url()}
        alt={image.caption ?? ""}
        className="aspect-[12/7] w-[1200px]"
      />
      {caption && <figcaption>{image.attribution ?? image.caption}</figcaption>}
    </figure>
  );
}
