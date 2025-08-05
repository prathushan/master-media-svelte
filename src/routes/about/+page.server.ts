// File: /src/routes/+page.server.ts
import { serverClient } from "$lib/utils/sanity.server";

export async function load() {
  const query = `*[_type == "page"]`;
  const result = await serverClient.fetch(query);

  // Find the page with title "Home"
  const aboutPage = result.find(
    (page: any) => page.title?.toLowerCase().trim() === "about"
  );

  return {
    aboutPage,
  };
}
