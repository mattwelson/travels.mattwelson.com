import type { InferType, Selection, TypeFromSelection } from "groqd";
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

export const stopSelection = {
  _id: q.string(),
  _type: q.literal("stop"),
  title: q.string(),
  date: q.string(),
  region: q.string(),
  image: imageSelection,
  //country: q("country").deref().grab$(countrySelection).nullable(),
  slug: [
    "['', 'trip', *[_type == 'trip' && references(^._id)][0].slug.current, slug.current]",
    q.string().array(),
  ],
} satisfies Selection;

export async function getStop({
  tripSlug,
  stopSlug,
}: {
  tripSlug: string;
  stopSlug: string;
}) {
  return runQuery(
    q("*")
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
        trip: q("*")
          .filter("_type=='trip' && slug.current == $tripSlug")
          .slice(0)
          .grab$({
            stops: q("stops")
              .filter()
              .deref()
              .grab$({ ...stopSelection, image: imageSelection }),
          }),
      })
      .nullable(),
    { tripSlug, stopSlug },
  );
}

export type StopSelection = TypeFromSelection<typeof stopSelection>;

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
