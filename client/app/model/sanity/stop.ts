import type { InferType } from "groqd";
import { q, sanityImage } from "groqd";
import { runQuery } from "~/lib/sanity";
import { countrySelection, imageSelection } from ".";

export const imageWithHotspot = sanityImage("", {
  additionalFields: { fullWidth: q.boolean() },
  withHotspot: true,
  withCrop: true,
  isList: true,
}).schema;

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
        "slug.current == $stopSlug && country->.slug.current == $countrySlug",
      )
      .filter("_type == 'stop'")
      .slice(0)
      .grab$({
        title: q.string(),
        date: q.string(),
        region: q.string(),
        image: imageSelection,
        country: q("country").deref().grab$(countrySelection),
        slug: [
          "['', 'country', country->.slug.current, slug.current]",
          q.string().array(),
        ],
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
        // TODO: move to a separate function like countries are
        nextStop: q("*")
          .filterByType("stop")
          .filter("country == ^.country")
          .filter("date > ^.date")
          .order("date asc")
          .slice(0)
          .grab$({
            title: q.string(),
            slug: [
              "['', 'country', country->.slug.current, slug.current]",
              q.string().array(),
            ],
            image: imageSelection,
            date: q.string(),
          })
          .nullable(),
        previousStop: q("*")
          .filterByType("stop")
          .filter("country == ^.country")
          .filter("date < ^.date")
          .order("date desc")
          .slice(0)
          .grab$({
            title: q.string(),
            slug: [
              "['', 'country', country->.slug.current, slug.current]",
              q.string().array(),
            ],
            image: imageSelection,
            date: q.string(),
          })
          .nullable(),
      })
      .nullable(),
    { countrySlug, stopSlug },
  );
}
