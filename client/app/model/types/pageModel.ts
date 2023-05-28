import { image } from "./image";
import { z } from "zod";

// page or country
export const pageModel = z.object({
  title: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  tags: z.array(z.string()).optional(),
  body: z.array(z.object({})).optional(),
  image: image.optional(),
  map: z
    .object({
      asset: z.object({
        _ref: z.string(),
      }),
    })
    .optional(),
});

export type pageSchema = z.infer<typeof pageModel>;
