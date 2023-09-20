import { runQuery } from "~/lib/sanity";
import { q } from "groqd";
import { countrySelection } from "./country";
import { imageSelection, pageSelection } from "./page";

export async function getTrip(slug: string = "europe") {
  return runQuery(
    q("*")
      .filter("slug.current == $slug")
      .filter("_type in ['trip']")
      .slice(0)
      .grab$({
        ...pageSelection,
        image: pageSelection.image.nullable(),
        _type: q.literal("trip"),
        title: q.string(),
        date: q.string(),
        slug: ["['','trip',slug.current]", q.string().array()],
        endDate: q.string(),
        stops: q("stops")
          .filter()
          .deref()
          .grab$({
            _id: q.string(),
            _type: q.literal("stop"),
            title: q.string(),
            date: q.string(),
            region: q.string().optional(),
            image: imageSelection,
            country: q("country").deref().grab$(countrySelection),
            slug: ["['', 'trip', $slug, slug.current]", q.string().array()],
          })
          .nullable(),
      })
      .nullable(),
    { slug },
  );
}
