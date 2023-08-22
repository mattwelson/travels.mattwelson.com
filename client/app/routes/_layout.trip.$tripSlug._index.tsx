import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Prose } from "~/components/layout";
import { TripPage } from "~/components/trip";
import { imageBuilder } from "~/lib/sanity";
import { getTrip } from "~/model/sanity";

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  const imageUrl = data?.trip?.image
    ? imageBuilder
        .image(data?.trip.image)
        .fit("clip")
        .quality(95)
        .url()
    : null;
  return [
    {
      title: `${data?.trip?.title} - Travels - Matt Welson`,
    },
    {
      "og:type": "article",
    },
    {
      "og:image": imageUrl,
    },
    {
      description: data?.trip?.excerpt,
    },
  ];
};

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
