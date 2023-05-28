import { image } from "./image";
import { z } from "zod";

export const pageModel = z.object({
  title: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  tags: z.array(z.string()),
  body: z.array(z.object({})),
  image,
});

export type pageSchema = z.infer<typeof pageModel>;
