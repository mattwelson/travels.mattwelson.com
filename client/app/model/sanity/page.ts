import type { TypeFromSelection, Selection } from "groqd";
import { q, sanityImage } from "groqd";
import { runQuery } from "~/lib/sanity";
import { imageWithHotspot } from "./stop";

export const imageSelection = sanityImage("image", {
  additionalFields: {
    caption: q.string().nullable(),
    attribution: q.string().nullable(),
  },
}).nullable();

export const pageSelection = {
  _type: q.literal("page"),
  title: q.string(),
  slug: ["['', slug.current]", q.string().array()],
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
  image: imageSelection,
} satisfies Selection;

export const countrySelection = {
  ...pageSelection,
  _type: q.literal("country"),
  slug: ["['', 'country', slug.current]", q.string().array()],
  firstStopDate: q("*")
    .filter("_type == 'stop' && references(^._id)")
    .order("date asc")
    .slice(0)
    .grabOne$("date", q.date())
    .nullable(),
  stops: q("*")
    .filter("_type == 'stop' && references(^._id)")
    .order("date asc")
    .grab$({
      _type: q.string(),
      _id: q.string(),
      title: q.string(),
      image: imageSelection,
      // Join with .join('/') - empty string creates leading `/`
      slug: [
        "['', 'country', ^.slug.current, slug.current]",
        q.string().array(),
      ],
      date: q.string(),
      region: q.string(),
    }),
} satisfies Selection;

export type countryType = TypeFromSelection<typeof countrySelection>;
export type imageSelectionType = countryType["image"];

export async function getCountry(slug: string) {
  return runQuery(
    q("*")
      .filter("slug.current == $slug")
      .filter("_type in ['country']")
      .slice(0)
      .grab(countrySelection)
      .nullable(),
    { slug }
  );
}
export async function getPage(slug: string) {
  return runQuery(
    q("*")
      .filter("slug.current == $slug")
      .filter("_type in ['page']")
      .slice(0)
      .grab(pageSelection)
      .nullable(),
    { slug }
  );
}

export async function getIndexPageCountries() {
  return runQuery(
    q("*")
      .filter("_type == 'country'")
      .grab$({
        _type: q.string(),
        _id: q.string(),
        title: q.string(),
        // Join with .join('/') - empty string creates leading `/`
        slug: ["['', 'country', slug.current]", q.string().array()],
        image: imageSelection,
        firstStopDate: q("*")
          .filter("_type == 'stop' && references(^._id)")
          .order("date asc")
          .slice(0)
          .grabOne$("date", q.date()),
        stopCount: [
          "count(*[_type == 'stop' && references(^._id)])",
          q.number(),
        ],
      })
      .filter("stopCount > 0")
      .order("firstStopDate asc")
  );
}
