import { json, Response, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPage } from "~/model/sanity";
import { Image, Map, Prose, Text } from "~/components/layout";

export async function loader({ params }: LoaderArgs) {
  const page = await getPage(params.slug!);
  if (!page)
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  return json({ page });
}

// Renders the "page" type or the "country" type
export default function PageOrCountryPage() {
  const { page } = useLoaderData<typeof loader>();
  console.log({ page });
  return (
    <Prose>
      <Image image={page.image} />
      <Map countrySlug={page.slug.current} />
      <h1>{page.title}</h1>
      <Text value={page.body} />
    </Prose>
  );
}
