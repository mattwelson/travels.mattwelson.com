import { imageBuilder } from "~/lib/sanity";
import type { imageWithHotspotType } from "~/model/sanity";
import { motion, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";

//const parentVariants = { animate: { transition: { staggerChildren: 0.2 } } };
const childVariants = { initial: { opacity: 0 }, animate: { opacity: 1 } };

export function ImageCell({ image }: { image: imageWithHotspotType[0] }) {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, amount: 0.25 });

  useEffect(() => {
    if (isInView) {
      animate(scope.current, { opacity: 1 });
    }
  }, [isInView, animate, scope]);

  return (
    <motion.div
      ref={scope}
      key={image._key}
      style={{
        flexBasis: image.fullWidth ? "100%" : (image.hotspot?.width ?? 1) * 450,
        opacity: 0,
      }}
      className={`grow`}
      variants={childVariants}
    >
      <a
        href={imageBuilder.image(image).url()}
        className=""
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={imageBuilder.image(image).width(1_200).fit("min").url()}
          alt={""}
          className={`m-0 h-full max-h-full mx-auto object-cover max-w-full`}
          loading="lazy"
        />
      </a>
    </motion.div>
  );
}

// TODO: fix aspect ratio, make it based off of crop, so it's different for each image
export function Images({ images }: { images: imageWithHotspotType }) {
  return (
    <div className="my-8 !col-start-1 !col-end-[-1] sm:mx-2 ">
      <motion.div className="flex flex-wrap mx-auto max-w-full gap-2 items-stretch">
        {images.map((image) => (
          <ImageCell image={image} key={image._key} />
        ))}
      </motion.div>
    </div>
  );
}
