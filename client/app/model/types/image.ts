import { z } from "zod";

export const image = z.object({
  attribution: z.string().optional(),
  caption: z.string().optional(),
  asset: z.object({
    _ref: z.string(),
  }),
});

export type imageSchema = z.infer<typeof image>;
