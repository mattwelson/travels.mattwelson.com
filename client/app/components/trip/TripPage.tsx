import { DateTime } from "luxon";
import type { getTrip } from "~/model/sanity";
import { LinkListWithImage } from "../country";
import { Text } from "../layout";

// TODO: mode to just view the stops and not the countries?
export function TripPage({
  trip,
}: {
  trip: NonNullable<Awaited<ReturnType<typeof getTrip>>>;
}) {
  console.log({ trip });
  return (
    <>
      <h2 className="m-0">{trip.title}</h2>
      <div className="text-slate-600 dark:text-slate-400">
        {DateTime.fromISO(trip.date).toFormat("LLL yyyy")} -{" "}
        {DateTime.fromISO(trip.endDate).toFormat("LLL yyyy")}
      </div>
      <Text value={trip.body} />
      <div className="text-center font-bold text-slate-400">Timeline</div>
      <LinkListWithImage links={trip.stops} />
    </>
  );
}
