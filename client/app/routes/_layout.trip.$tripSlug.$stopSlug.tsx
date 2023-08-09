import type { V2_MetaFunction } from "@remix-run/node";
import { json, Response, type LoaderArgs } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { getNextAndPreviousStop, getStop } from "~/model/sanity";
import { Prose, Text } from "~/components/layout";
import { PageHero } from "~/components/country";
import { OtherStops, StopMeta } from "~/components/stops";
import { DateTime } from "luxon";

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => [
  {
    title: `${data?.stop.title} - Travels - Matt Welson`,
  },
];

export async function loader({ params }: LoaderArgs) {
  const stop = await getStop({
    tripSlug: params.tripSlug!,
    stopSlug: params.stopSlug!,
  });
  if (!stop)
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  const { previousStop, nextStop } = getNextAndPreviousStop({
    currentId: stop._id,
    stopsForTrip: stop.trip.stops,
  });
  return json({ stop, previousStop, nextStop });
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
  const { stop, previousStop, nextStop } = useLoaderData<typeof loader>();
  console.log({ stop });
  return (
    <>
      <Prose>
        <PageHero image={stop.image} title={stop.title} slug={stop.slug} />
        <StopMeta
          date={DateTime.fromISO(stop.date).toFormat("dd MMM yyyy")}
          country={stop.country}
        />
        <Text value={stop.body} />
        <OtherStops next={nextStop} previous={previousStop} />
      </Prose>
    </>
  );
}
