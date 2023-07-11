import type { getCountry, getPage } from "~/model/sanity";
import { Image, Map } from "../layout";
import { Link } from "@remix-run/react";

export function PageHero({
  image,
  slug,
  title,
  shrink = false,
}: Partial<
  NonNullable<
    Awaited<ReturnType<typeof getPage> | ReturnType<typeof getCountry>>
  > & {
    shrink?: boolean;
  }
>) {
  return (
    <div
      className={`relative !col-start-1 col-end-[-1] mb-16 grid items-end justify-items-center gap-16 ${
        shrink ? "h-40" : ""
      }`}
    >
      <Image
        image={image}
        className={`z-0 col-start-1 row-start-1 mb-0 mt-0 overflow-hidden ${
          shrink ? "" : ""
        }`}
        caption={false}
      />
      <div className="z-10 col-start-1 row-start-1 hidden self-stretch justify-self-stretch bg-gradient-to-b from-transparent from-70% to-black to-95% dark:to-slate-800 sm:block" />
      <Link
        to={slug?.join("/") ?? "/"}
        className="no-underline relative z-20 col-start-1 mb-4 grid items-center justify-items-center sm:row-start-1 "
      >
        <Map
          countrySlug={slug?.join("/")}
          className="absolute col-start-1 row-start-1"
        />
        <h1 className="col-start-1 row-start-1 text-slate-800 blur-sm px-4">
          {title}
        </h1>
        <h1 className="col-start-1 row-start-1 text-white drop-shadow-md px-4">
          {title}
        </h1>
      </Link>
    </div>
  );
}
