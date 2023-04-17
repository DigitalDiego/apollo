import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2023-04-16",
  useCdn: false,
  dataset: "production",
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
