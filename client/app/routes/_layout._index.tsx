import { json, type V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Prose } from "~/components/layout";
import { TripPage } from "~/components/trip";
import { getTrip } from "~/model/sanity";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Travels - Matt Welson",
    },
    { name: "description", content: "Travels with Matt and Family" },
  ];
};

export async function loader() {
  const trip = await getTrip();
  return json({ trip });
}

export default function Index() {
  const { trip } = useLoaderData<typeof loader>();
  return (
    <Prose>
      <TripPage trip={trip!} />
    </Prose>
  );
}
