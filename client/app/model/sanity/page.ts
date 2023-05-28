import type { pageSchema } from "./../types/pageModel";
import groq from "groq";
import { client } from "~/lib/sanity";

export async function getPage(slug: string) {
  const query = groq`*[_type in ["page", "country"] && slug.current == $slug][0]`;
  const page = await client.fetch<pageSchema>(query, { slug });

  return page;
}
