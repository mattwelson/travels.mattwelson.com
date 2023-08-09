import type { StopSelection } from "~/model/sanity";
import { LinkWithImage } from "../country/LinkWithImage";

export function OtherStops({
  next,
  previous,
}: {
  next: StopSelection | null;
  previous: StopSelection | null;
}) {
  return (
    <>
      {next && (
        <div className="!col-start-1 col-end-[-1] mt-8 flex flex-col gap-16">
          <LinkWithImage {...next} subtitle="Next" />
        </div>
      )}
      {previous && (
        <div className="!col-start-1 col-end-[-1] mt-8 flex flex-col gap-16">
          <LinkWithImage {...previous} subtitle="Previous" />
        </div>
      )}
    </>
  );
}
