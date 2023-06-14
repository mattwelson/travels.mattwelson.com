import { PortableText } from "@portabletext/react";
import { Image } from "./Image";
import { Images } from "./Images";
import type { imageWithHotspotType } from "~/model/sanity";

export function Text({ value }: { value: any[] | undefined | null }) {
  if (!value || !value.length) return null;
  return (
    <PortableText
      value={value}
      components={{
        types: {
          image: ({ value }) => <Image image={value} />,
          imageList: ({ value }) => <Images images={value.images as imageWithHotspotType} />
        },
      }}
    />
  );
}
