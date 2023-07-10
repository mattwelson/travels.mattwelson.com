import type { V2_MetaFunction } from "@remix-run/node";
import { json, Response, type LoaderArgs } from "@remix-run/node";
import {
  Outlet,
  isRouteErrorResponse,
  useLoaderData,
  useParams,
  useRouteError,
} from "@remix-run/react";
import { getCountry } from "~/model/sanity";
import { Prose } from "~/components/layout";
import { LinkListWithImage, PageHero } from "~/components/country";

export const meta: V2_MetaFunction<typeof loader> = ({data}) => [{
    title: `${data?.country.title} - Travels - Matt Welson`,
  }
];

export async function loader({ params }: LoaderArgs) {
  const country = await getCountry(params.countrySlug!);
  if (!country)
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  return json({ country });
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
export default function CountryPage() {
  const { country } = useLoaderData<typeof loader>();
  const { stopSlug } = useParams();
  return (
    <>
      <Prose>
        <PageHero {...country} shrink={!!stopSlug} />
        <Outlet />
      </Prose>
      {country.otherCountries?.length && (
        <div className="dark:bg-emerald-800 -mb-16 py-16 mt-16">
          <Prose>
            <div className="text-center font-bold text-slate-400">
              MORE COUNTRIES
            </div>
            <LinkListWithImage
              links={country.otherCountries.map((c) => ({
                ...c,
                date: c.firstStopDate,
              }))}
            />
          </Prose>
        </div>
      )}
    </>
  );
}
