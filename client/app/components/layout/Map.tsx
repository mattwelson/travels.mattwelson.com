import { AustriaMap } from "../maps/austria";
import { FranceMap } from "../maps/france";
import { GermanyMap } from "../maps/germany";
import { ItalyMap } from "../maps/italy";
import { NewZealandMap } from "../maps/new-zealand";
import { UnitedStatesMap } from "../maps/united-states";

// Note mapsvg requires some alterations to make them work,
// and including them as JSX SVGs works best
function getCountryMap(countrySlug: string) {
  switch (countrySlug) {
    case "austria":
      return <AustriaMap />;
    case "france":
      return <FranceMap />;
    case "germany":
      return <GermanyMap />;
    case "italy":
      return <ItalyMap />;
    case "new-zealand":
      return <NewZealandMap />;
    case "united-states":
      return <UnitedStatesMap />;
    default:
      return null;
  }
}

// TODO: fix aspect ratio, make it based off of crop, so it's different for each image
export function Map({
  countrySlug,
  className,
}: {
  countrySlug?: string;
  className?: string;
}) {
  if (!countrySlug) return null;
  const countryMap = getCountryMap(countrySlug);
  return (
    <div
      className={`h-32 w-32 fill-slate-400/50 dark:fill-white/50 sm:h-48 sm:w-64 [&>svg]:h-full [&>svg]:w-full ${className}`}
    >
      {countryMap}
    </div>
  );
}
