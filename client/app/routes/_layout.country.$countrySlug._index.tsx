import { json, Response, type LoaderArgs } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { getCountry, getNextAndPreviousCountries } from "~/model/sanity";
import { Prose, Text } from "~/components/layout";
import { CountryMeta, LinkListWithImage } from "~/components/country";

export async function loader({ params }: LoaderArgs) {
  const country = await getCountry(params.countrySlug!);
  if (!country)
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  const { nextCountry, previousCountry } =
    (await getNextAndPreviousCountries(country.firstStopDate ?? "")) ?? {};
  return json({ country, nextCountry, previousCountry });
}

export function ErrorBoundary() {
  const error = useRouteError();
  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <Prose>
        <h1 className="mt-32">{error.status}</h1>
        <h2 className="mt-0 dark:text-slate-400">
          {error.status === 404 ? "Page not found" : error.data.message}
        </h2>
      </Prose>
    );
  } else if (error instanceof Error) {
    return (
      <Prose>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre className="font-mono dark:bg-slate-900">{error.stack}</pre>
      </Prose>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}

// Renders the "page" type or the "country" type
export default function PageOrCountryPage() {
  const { country, nextCountry, previousCountry } =
    useLoaderData<typeof loader>();
  console.log({ nextCountry, previousCountry });
  return (
    <>
      {country._type === "country" && (
        <CountryMeta stops={country.stops} country={country} />
      )}
      <Text value={country.body} />
      {country._type === "country" && (
        <LinkListWithImage links={country.stops} />
      )}
    </>
  );
}
