import { Link } from "@remix-run/react";
import { DateTime } from "luxon";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import type { countryType, getNextAndPreviousCountries } from "~/model/sanity";

export function CountryMeta({
  stops,
  country,
  nextCountry,
  previousCountry,
}: {
  stops: countryType["stops"];
  country: countryType;
  nextCountry: NonNullable<
    Awaited<ReturnType<typeof getNextAndPreviousCountries>>
  >["nextCountry"];
  previousCountry: NonNullable<
    Awaited<ReturnType<typeof getNextAndPreviousCountries>>
  >["previousCountry"];
}) {
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="grid">
        {nextCountry ? (
          <Link
            to={nextCountry.slug.join("/")}
            className="self-center justify-self-end text-xl"
            title={nextCountry.title}
          >
            <MdOutlineChevronLeft />
          </Link>
        ) : (
          <MdOutlineChevronLeft className="self-center justify-self-end text-xl opacity-50" />
        )}
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
        {previousCountry ? (
          <Link
            to={previousCountry.slug.join("/")}
            className="self-center justify-self-start text-xl"
            title={previousCountry.title}
          >
            <MdOutlineChevronRight />
          </Link>
        ) : (
          <MdOutlineChevronRight className="self-center justify-self-start text-xl opacity-50" />
        )}
      </div>
    </div>
  );
}
