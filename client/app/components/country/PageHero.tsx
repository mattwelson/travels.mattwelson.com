import type { getPageOrCountry } from "~/model/sanity";
import { Image, Map } from "../layout";

export function PageHero({
  image,
  slug,
  title,
}: Partial<NonNullable<Awaited<ReturnType<typeof getPageOrCountry>>>>) {
  return (
    <div className="relative !col-start-1 col-end-[-1] mb-16 grid items-end justify-items-center gap-16">
      <Image
        image={image}
        className="z-0 col-start-1 row-start-1 mb-0 mt-0"
        caption={false}
      />
      <div className="z-10 col-start-1 row-start-1 hidden self-stretch justify-self-stretch bg-gradient-to-b from-transparent from-70% to-black to-95% dark:to-slate-800 sm:block" />
      <div className="relative z-20 col-start-1 mb-4 grid items-center justify-items-center sm:row-start-1 ">
        <Map countrySlug={slug} className="absolute col-start-1 row-start-1" />
        <h1 className="col-start-1 row-start-1 text-slate-800 blur-sm">
          {title}
        </h1>
        <h1 className="col-start-1 row-start-1 text-white drop-shadow-md">
          {title}
        </h1>
      </div>
    </div>
  );
}
