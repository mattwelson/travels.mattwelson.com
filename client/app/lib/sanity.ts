// ./app/lib/sanity.ts

import { createClient } from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

// copy these from your Studio's sanity.config.ts
export const projectId = "k3w6sp5u";
export const dataset = "demonstration"; // 'production'
export const apiVersion = "2023-05-26";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

export const imageBuilder = ImageUrlBuilder({ projectId, dataset });
