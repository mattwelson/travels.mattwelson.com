import type { imageSelectionType } from "~/model/sanity";
import { Image } from "../layout";
import { Link } from "@remix-run/react";
import { DateTime } from "luxon";

export function LinkWithImage({
  _type,
  _id,
  slug,
  title,
  subtitle,
  date,
  image,
  country,
}: {
  _type: string;
  _id: string;
  country?: { title: string; slug: string[] };
  slug: string[];
  title: string;
  subtitle?: string;
  date: string;
  image: imageSelectionType;
}) {
  return (
    <div key={_id ?? slug} className="grid items-center gap-y-4 md:grid-cols-2">
      <div className="px-8 md:text-right">
        {subtitle && (
          <div className="no-underline font-bold text-slate-400">
            {subtitle}
          </div>
        )}
        {!subtitle && country && (
          <Link
            to={country.slug.join("/")}
            className="no-underline font-bold text-emerald-700 dark:text-emerald-400/50"
          >
            {country.title}
          </Link>
        )}
        <Link className="no-underline" to={slug.join("/")}>
          <h2 className="m-0">{title}</h2>
        </Link>
        {date && (
          <div className="text-slate-600 dark:text-slate-400">
            {DateTime.fromISO(date).toFormat(
              _type === "stop" ? "dd LLL yyyy" : "LLL yyyy",
            )}
          </div>
        )}
      </div>
      <div className="grid xl:max-w-lg xl:justify-items-start xl:pr-2">
        <Link to={slug.join("/")}>
          <Image
            className="m-0 overflow-hidden md:rounded-bl-md md:rounded-tl-md md:shadow-lg xl:rounded-lg"
            image={image}
            caption={false}
            halfWidth
          />
        </Link>
      </div>
    </div>
  );
}
