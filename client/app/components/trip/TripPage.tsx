import { DateTime } from "luxon";
import { getTrip } from "~/model/sanity";
import { LinkListWithImage } from "../country";

// TODO: mode to just view the stops and not the countries?
export function TripPage({
  trip,
}: {
  trip: NonNullable<Awaited<ReturnType<typeof getTrip>>>;
}) {
  return (
    <>
      <h2 className="m-0">{trip.title}</h2>
      <div className="text-slate-600 dark:text-slate-400">
        {DateTime.fromISO(trip.date).toFormat("LLL yyyy")} -{" "}
        {DateTime.fromISO(trip.endDate).toFormat("LLL yyyy")}
      </div>
      <div class="text-center font-bold text-slate-400">Countries</div>
      <LinkListWithImage links={trip.countries} />
    </>
  );
}
