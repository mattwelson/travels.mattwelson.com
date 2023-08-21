import type { InferType, Selection, TypeFromSelection } from "groqd";
import { q, sanityImage } from "groqd";
import { runQuery } from "~/lib/sanity";
import { imageSelection } from ".";

export const imagesWithHotspot = sanityImage("images", {
  additionalFields: { fullWidth: q.boolean() },
  withHotspot: true,
  withCrop: true,
  isList: true,
  withAsset: ["base", "dimensions"],
});
export const imagesWithHotspotSchema = imagesWithHotspot.schema;

export type imagesWithHotspotType = InferType<typeof imagesWithHotspotSchema>;

export const stopSelection = {
  _id: q.string(),
  _type: q.literal("stop"),
  title: q.string(),
  date: q.string(),
  region: q.string(),
  image: imageSelection,
  slug: [
    "['', 'trip', *[_type == 'trip' && references(^._id)][0].slug.current, slug.current]",
    q.string().array(),
  ],
} satisfies Selection;

export const stopWithCountrySelection = {
  ...stopSelection,
  country: q("country")
    .deref()
    .grab$({
      title: q.string(),
      slug: ["['', 'country', slug.current]", q.string().array()],
    }),
};

export type StopSelection = TypeFromSelection<typeof stopSelection>;
export type StopWithCountrySelection = TypeFromSelection<
  typeof stopWithCountrySelection
>;

export async function getStop({
  tripSlug,
  stopSlug,
}: {
  tripSlug: string;
  stopSlug: string;
}) {
  const query = q("*")
    .filter("slug.current == $stopSlug")
    .filter("_type == 'stop'")
    .slice(0)
    .grab$({
      ...stopSelection,
      image: imageSelection,
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
      trip: q("*")
        .filter("_type=='trip' && slug.current == $tripSlug")
        .slice(0)
        .grab$({
          title: q.string(),
          slug: ["['','trip',slug.current]", q.string().array()],
          stops: q("stops")
            .filter()
            .deref()
            .grab$({ ...stopWithCountrySelection, image: imageSelection }),
        }),
    })
    .nullable();

  return runQuery(query, { tripSlug, stopSlug });
}

export function getNextAndPreviousStop({
  stopsForTrip,
  currentId,
}: {
  stopsForTrip: StopSelection[];
  currentId: string;
}) {
  const index = stopsForTrip.findIndex(({ _id }) => _id === currentId);
  const [previousIndex, nextIndex] = [index - 1, index + 1];
  const previousStop = previousIndex >= 0 ? stopsForTrip[previousIndex] : null;
  const nextStop =
    nextIndex < stopsForTrip.length ? stopsForTrip[nextIndex] : null;
  return {
    previousStop,
    nextStop,
  };
}
