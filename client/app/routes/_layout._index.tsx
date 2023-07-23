import { json, type V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { LinkListWithImage } from "~/components/country";
import { Prose } from "~/components/layout";
import { TripPage } from "~/components/trip";
import { getIndexPageCountries, getTrip } from "~/model/sanity";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Travels - Matt Welson",
    },
    { name: "description", content: "Travels with Matt and Family" },
  ];
};

export async function loader() {
  const countries = await getIndexPageCountries();
  const trip = await getTrip();
  return json({ countries, trip });
}

export default function Index() {
  const { countries, trip } = useLoaderData<typeof loader>();
  return (
    <Prose>
      <TripPage trip={trip!} />
      <div className="text-center font-bold text-slate-400">Trips</div>
      <LinkListWithImage
        links={countries.map((c) => ({ ...c, date: c.firstStopDate }))}
      />
    </Prose>
  );
}
