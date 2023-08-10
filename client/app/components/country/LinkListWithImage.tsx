import type { imageSelectionType } from "~/model/sanity";
import { Image } from "../layout";
import { Link } from "@remix-run/react";
import { DateTime } from "luxon";
import { LinkWithImage } from "./LinkWithImage";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

export function LinkListWithImage({
  links,
  showCountry = false,
}: {
  links: {
    _type: string;
    _id: string;
    country?: { title: string; slug: string[] };
    slug: string[];
    title: string;
    date?: string;
    image: imageSelectionType;
  }[];
  showCountry?: boolean;
}) {
  if (links === null || links.length === 0) return null;
  return (
    <motion.div
      className="!col-start-1 col-end-[-1] mt-8 flex flex-col gap-16"
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      <AnimatePresence>
        {links.map(({ _type, _id, slug, title, date, image, country }, i) => (
          <LinkWithImage
            key={_id ?? slug}
            _type={_type}
            _id={_id}
            slug={slug}
            title={title}
            date={date}
            image={image}
            country={country}
            showCountry={
              showCountry && country?.title !== links[i - 1]?.country?.title
            }
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
