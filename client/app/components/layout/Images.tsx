import { imageBuilder } from "~/lib/sanity";
import type { imageWithHotspotType } from "~/model/sanity";

// TODO: fix aspect ratio, make it based off of crop, so it's different for each image
export function Images({ images }: { images: imageWithHotspotType }) {
  return (
    <div className="my-8 !col-start-1 !col-end-[-1] sm:mx-2 ">
      <div className="flex flex-wrap mx-auto w-[1200px] max-w-full gap-2 items-stretch">
        {images.map((image) => (
          <div
            key={image._key}
            style={{
              flexBasis: image.fullWidth
                ? "100%"
                : (image.hotspot?.width ?? 1) * 350,
            }}
            className={`grow`}
          >
            <img
              src={imageBuilder.image(image).width(1_200).fit("min").url()}
              alt={""}
              className={`m-0 h-full max-h-full mx-auto object-cover max-w-full`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
