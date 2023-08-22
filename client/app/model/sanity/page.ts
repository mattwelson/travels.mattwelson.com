import type { Selection } from "groqd";
import { q, sanityImage } from "groqd";
import { runQuery } from "~/lib/sanity";
import { imagesWithHotspot } from "./stop";

export const imageSelection = sanityImage("image", {
  additionalFields: {
    caption: q.string().nullable(),
    attribution: q.string().nullable(),
  },
});

export const pageSelection = {
  _type: q.literal("page"),
  title: q.string(),
  slug: ["['', slug.current]", q.string().array()],
  excerpt: [
    `array::join(string::split((pt::text(body)), "")[0..255], "") + "..."`,
    q.string(),
  ],
  body: q("body")
    .filter()
    .select({
      '_type == "block"': ["{...}", q.contentBlock()],
      '_type == "image"': ["{...}", sanityImage("").schema],
      '_type == "imageList"': [
        `{..., "images": ${imagesWithHotspot.query}}`,
        q.object({
          _type: q.string(),
          images: imagesWithHotspot.schema,
        }),
      ],
      default: {
        _key: q.string(),
        _type: ['"unsupported"', q.literal("unsupported")],
        unsupportedType: ["_type", q.string()],
      },
    })
    .nullable(),
  image: imageSelection,
} satisfies Selection;

export async function getPage(slug: string) {
  return runQuery(
    q("*")
      .filter("slug.current == $slug")
      .filter("_type in ['page']")
      .slice(0)
      .grab(pageSelection)
      .nullable(),
    { slug },
  );
}
