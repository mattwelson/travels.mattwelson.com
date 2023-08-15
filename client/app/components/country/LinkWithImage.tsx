import type { imageSelectionType } from "~/model/sanity";
import { Image, Map } from "../layout";
import { Link } from "@remix-run/react";
import { DateTime } from "luxon";
import { LayoutGroup, motion } from "framer-motion";

const variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
};

const mapVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

export function LinkWithImage({
  _type,
  _id,
  slug,
  title,
  subtitle,
  date,
  image,
  country,
  showCountry,
}: {
  _type: string;
  _id: string;
  country?: { title: string; slug: string[] };
  slug: string[];
  title: string;
  subtitle?: string;
  date?: string;
  image: imageSelectionType;
  showCountry: boolean;
}) {
  return (
    <LayoutGroup id={slug.join("/")}>
      <motion.div
        key={_id ?? slug}
        className="grid items-center gap-y-4 md:grid-cols-2"
        variants={variants}
      >
        <div className="px-8 md:text-right z-10 grid">
          {showCountry && country && (
            <motion.div
              className="pointer-events-none absolute col-start-1 row-start-1 self-center justify-self-end md:justify-self-center md:ml-[50%]"
              variants={mapVariants}
            >
              <Map
                countrySlug={country.slug?.join("/")}
                className="md:opacity-40"
              />
            </motion.div>
          )}
          {subtitle && (
            <div className="no-underline font-bold text-slate-400">
              {subtitle}
            </div>
          )}
          {!subtitle && country && (
            <Link
              to={country.slug.join("/")}
              className="no-underline font-bold text-emerald-700 dark:text-emerald-600 z-10"
            >
              {country.title}
            </Link>
          )}
          <Link className="no-underline" to={slug.join("/")}>
            <motion.h2 className="m-0" layout="position">
              {title}
            </motion.h2>
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
              includeLayoutId
            />
          </Link>
        </div>
      </motion.div>
    </LayoutGroup>
  );
}
