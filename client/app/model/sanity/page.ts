import type { TypeFromSelection, Selection } from "groqd";
import { q, sanityImage } from "groqd";
import { runQuery } from "~/lib/sanity";

export const imageSelection = sanityImage("image", {
  additionalFields: {
    caption: q.string().nullable(),
    attribution: q.string().nullable(),
  },
}).nullable();

export const pageSelection = {
  _type: q.literal("page"),
  title: q.string(),
  slug: q.slug("slug"),
  body: q("body")
    .filter()
    .select({
      '_type == "block"': ["{...}", q.contentBlock()],
      '_type == "image"': ["{...}", sanityImage("").schema],
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
  stops: q("*")
    .filter("_type == 'stop' && references(^._id)")
    .order("date asc")
    .grab$({
      _type: q.string(),
      _id: q.string(),
      title: q.string(),
      image: imageSelection,
      slug: q.slug("slug"),
      date: q.string(),
      region: q.string(),
    }),
} satisfies Selection;

export type countryType = TypeFromSelection<typeof countrySelection>;
export type imageSelectionType = countryType["image"];

export async function getPageOrCountry(slug: string) {
  return runQuery(
    q("*")
      .filter("slug.current == $slug")
      .filter("_type in ['country', 'page']")
      .slice(0)
      .select({
        "_type == 'country'": countrySelection,
        default: pageSelection,
      })
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
        slug: q.slug("slug"),
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
