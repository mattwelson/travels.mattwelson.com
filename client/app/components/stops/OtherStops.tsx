import { getStop } from "~/model/sanity";

export function OtherStops({
  next,
  previous,
}: {
  next: NonNullable<Awaited<ReturnType<typeof getStop>>>["nextStop"];
  previous: NonNullable<Awaited<ReturnType<typeof getStop>>>["previousStop"];
}) {
  console.log({ next, previous });
  return (
    <>
      {next && <div>{next.title}</div>}
      {previous && <div>{previous.title}</div>}
    </>
  );
}
