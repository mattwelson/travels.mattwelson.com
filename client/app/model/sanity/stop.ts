import { InferType, q, sanityImage } from "groqd";
import { runQuery } from "~/lib/sanity";
import { countrySelection, imageSelection } from "./page";

export const imageWithHotspot = sanityImage("", {
  additionalFields: { fullWidth: q.boolean(),  },
  withHotspot: true,
  withCrop: true,
  isList: true
}).schema

export type imageWithHotspotType = InferType<typeof imageWithHotspot>;

export async function getStop({
  countrySlug,
  stopSlug,
}: {
  countrySlug: string;
  stopSlug: string;
}) {
  return runQuery(
    q("*")
      .filter(
        "slug.current == $stopSlug && country->.slug.current == $countrySlug"
      )
      .filter("_type == 'stop'")
      .slice(0)
      .grab$({
        title: q.string(),
        date: q.string(),
        image: imageSelection,
        country: q("country").deref().grab$(countrySelection),
        body: q("body")
          .filter()
          .select({
            '_type == "block"': ["{...}", q.contentBlock()],
            '_type == "image"': ["{...}", sanityImage("").schema],
            '_type == "imageList"': [
              "{...}",
              q.object({
                _type: q.string(),
                images: imageWithHotspot,
              }),
            ],
            default: {
              _key: q.string(),
              _type: ['"unsupported"', q.literal("unsupported")],
              unsupportedType: ["_type", q.string()],
            },
          })
          .nullable(),
      })
      .nullable(),
    { countrySlug, stopSlug }
  );
}
