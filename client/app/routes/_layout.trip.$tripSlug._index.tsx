import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Prose } from "~/components/layout";
import { TripPage } from "~/components/trip";
import { getTrip } from "~/model/sanity";

export async function loader({ params }: LoaderArgs) {
  const trip = await getTrip(params.tripSlug);
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
