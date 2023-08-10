import type { StopWithCountrySelection } from "~/model/sanity";
import { LinkWithImage } from "../country/LinkWithImage";

export function OtherStops({
  next,
  previous,
}: {
  next: StopWithCountrySelection | null;
  previous: StopWithCountrySelection | null;
}) {
  return (
    <>
      {next && (
        <div className="!col-start-1 col-end-[-1] mt-8 flex flex-col gap-16">
          <LinkWithImage {...next} subtitle="Next" showCountry />
        </div>
      )}
      {previous && (
        <div className="!col-start-1 col-end-[-1] mt-8 flex flex-col gap-16">
          <LinkWithImage {...previous} subtitle="Previous" showCountry />
        </div>
      )}
    </>
  );
}
