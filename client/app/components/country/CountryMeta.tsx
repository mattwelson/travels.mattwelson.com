import { DateTime } from "luxon";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import type { countryType } from "~/model/sanity";

export function CountryMeta({
  stops,
  country,
}: {
  stops: countryType["stops"];
  country: countryType;
}) {
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="grid">
        <MdOutlineChevronLeft className="self-center justify-self-end text-xl" />
      </div>
      <div className="col-span-4 col-start-2 grid grid-cols-2 items-end justify-items-center gap-8 rounded bg-slate-900 px-8 py-4 drop-shadow">
        <div className="grid justify-items-center">
          <div className="text-xl">{`${stops.length}`}</div>
          <div className="text-sm text-slate-400">{`Stop${
            stops.length === 1 ? "" : "s"
          }`}</div>
        </div>
        <div className="grid justify-items-center">
          <div className="text-xl">
            {country.firstStopDate &&
              DateTime.fromISO(country.firstStopDate.toString()).toFormat(
                "LLL yyyy"
              )}
          </div>
          <div className="text-sm text-slate-400">Summer</div>
        </div>
      </div>
      <div className="grid">
        <MdOutlineChevronRight className="self-center justify-self-start text-xl" />
      </div>
    </div>
  );
}
