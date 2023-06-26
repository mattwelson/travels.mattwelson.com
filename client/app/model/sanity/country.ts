import type { TypeFromSelection, Selection } from "groqd";
import { q } from "groqd";
import { runQuery } from "~/lib/sanity";
import { imageSelection, pageSelection } from "./page";

const firstStopDateSelection = {
  firstStopDate: q("*")
    .filter("_type == 'stop' && references(^._id)")
    .order("date asc")
    .slice(0)
    .grabOne$("date", q.string())
    .nullable(),
  stopCount: ["count(*[_type == 'stop' && references(^._id)])", q.number()],
} satisfies Selection;

export const countrySelection = {
  ...firstStopDateSelection,
  ...pageSelection,
  _type: q.literal("country"),
  slug: ["['', 'country', slug.current]", q.string().array()],
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

const countryListSelect = {
  ...firstStopDateSelection,
  _type: q.string(),
  _id: q.string(),
  title: q.string(),
  image: imageSelection,
  // Join with .join('/') - empty string creates leading `/`
  slug: ["['', 'country', slug.current]", q.string().array()],
} satisfies Selection;

export async function getCountry(slug: string) {
  return runQuery(
    q("*")
      .filter("slug.current == $slug")
      .filter("_type in ['country']")
      .slice(0)
      .grab$({
        ...countrySelection,
        otherCountries: q("*")
          .filterByType("country")
          .grab$(countryListSelect)
          .filter("_id != ^_id")
          .filter("stopCount > 0")
          .order("firstStopDate desc")
          .slice(0, 3),
      })
      .nullable(),
    { slug }
  );
}

export async function getNextAndPreviousCountries(
  firstStopDate?: string | undefined
) {
  if (!firstStopDate) return null;
  return runQuery(
    q("*")
      .filter("_type in ['country']")
      .grab$({
        nextCountry: q("*")
          .filterByType("country")
          .grab$(countryListSelect)
          .filter("firstStopDate > $firstStopDate")
          .filter("stopCount > 0")
          .order("firstStopDate asc")
          .slice(0)
          .nullable(),
        previousCountry: q("*")
          .filterByType("country")
          .grab$(countryListSelect)
          .filter("firstStopDate < $firstStopDate")
          .filter("stopCount > 0")
          .order("firstStopDate desc")
          .slice(0)
          .nullable(),
      })
      .slice(0)
      .nullable(),
    { firstStopDate }
  );
}

export async function getIndexPageCountries() {
  return runQuery(
    q("*")
      .filter("_type == 'country'")
      .grab$({
        ...firstStopDateSelection,
        _type: q.string(),
        _id: q.string(),
        title: q.string(),
        // Join with .join('/') - empty string creates leading `/`
        slug: ["['', 'country', slug.current]", q.string().array()],
        image: imageSelection,
      })
      .filter("stopCount > 0")
      .order("firstStopDate desc")
  );
}
