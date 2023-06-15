import { json, type V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { LinkListWithImage } from "~/components/country";
import { Prose } from "~/components/layout";
import { getIndexPageCountries } from "~/model/sanity";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  const countries = await getIndexPageCountries();
  return json({ countries });
}

export default function Index() {
  const { countries } = useLoaderData<typeof loader>();
  return (
    <Prose>
      <div className="text-center font-bold text-slate-400">Trips</div>
      <LinkListWithImage
        links={countries.map((c) => ({ ...c, date: c.firstStopDate }))}
      />
    </Prose>
  );
}
