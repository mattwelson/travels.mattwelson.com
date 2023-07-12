import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DateTime } from "luxon";
import { PageHero } from "~/components/country";
import { Text } from "~/components/layout";
import { OtherStops, StopMeta } from "~/components/stops";
import { getStop } from "~/model/sanity";

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => [
  {
    title: `${data?.stop.title} - Travels - Matt Welson`,
  },
];

export async function loader({ params }: LoaderArgs) {
  const result = await getStop({
    countrySlug: params.countrySlug!,
    stopSlug: params.stopSlug!,
  });
  if (!result)
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  const { country, ...stop } = result;
  return json({ country, stop });
}

export default function StopPage() {
  const { country, stop } = useLoaderData<typeof loader>();
  return (
    <>
      <PageHero image={stop.image} title={stop.title} slug={stop.slug} />
      <StopMeta
        date={DateTime.fromISO(stop.date).toFormat("dd MMM yyyy")}
        region={stop.region}
      />
      <Text value={stop.body} />
      <OtherStops next={stop.nextStop} previous={stop.previousStop} />
    </>
  );
}
