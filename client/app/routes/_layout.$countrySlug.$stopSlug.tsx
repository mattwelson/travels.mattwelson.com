import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PageHero } from "~/components/country";
import { Prose, Text } from "~/components/layout";
import { getStop } from "~/model/sanity";

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
  console.log({ country, stop });
  return (
    <Prose>
      <PageHero image={stop.image} title={stop.title} slug={country.slug} />
      <Text value={stop.body} />
    </Prose>
  );
}
