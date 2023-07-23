import { runQuery } from "~/lib/sanity";
import { q } from "groqd";
import { countrySelection } from "./country";

export async function getTrip(slug: string = "america") {
  return runQuery(
    q("*")
      .filter("slug.current == $slug")
      .filter("_type in ['trip']")
      .slice(0)
      .grab$({
        _type: q.literal("trip"),
        title: q.string(),
        date: q.string(),
        endDate: q.string(),
        countries: q("countries").filter().deref().grab$(countrySelection),
      })
      .nullable(),
    { slug },
  );
}
