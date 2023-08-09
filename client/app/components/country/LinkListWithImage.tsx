import type { imageSelectionType } from "~/model/sanity";
import { Image } from "../layout";
import { Link } from "@remix-run/react";
import { DateTime } from "luxon";
import { LinkWithImage } from "./LinkWithImage";

export function LinkListWithImage({
  links,
}: {
  links: {
    _type: string;
    _id: string;
    country?: { title: string; slug: string[] };
    slug: string[];
    title: string;
    date: string;
    image: imageSelectionType;
  }[];
}) {
  if (links === null || links.length === 0) return null;
  return (
    <div className="!col-start-1 col-end-[-1] mt-8 flex flex-col gap-16">
      {links.map(({ _type, _id, slug, title, date, image, country }) => (
        <LinkWithImage
          key={_id ?? slug}
          _type={_type}
          _id={_id}
          slug={slug}
          title={title}
          date={date}
          image={image}
          country={country}
        />
      ))}
    </div>
  );
}
