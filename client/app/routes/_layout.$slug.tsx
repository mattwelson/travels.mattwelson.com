import { json, Response, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PortableText } from "@portabletext/react";
import { imageBuilder } from "~/lib/sanity";
import { getPage } from "~/model/sanity";
import { Prose } from "~/components/layout";

export async function loader({ params }: LoaderArgs) {
  const page = await getPage(params.slug!);
  if (!page)
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  return json({ page });
}

export default function PagePage() {
  const { page } = useLoaderData<typeof loader>();
  return (
    <Prose>
      <figure>
        <img
          src={imageBuilder.image(page.image).width(1_200).height(700).url()}
          alt={page.image.caption ?? ""}
        />
        <figcaption>{page.image.attribution ?? page.image.caption}</figcaption>
      </figure>
      <h1>{page.title}</h1>
      {page.body && <PortableText value={page.body as any} />}
    </Prose>
  );
}
