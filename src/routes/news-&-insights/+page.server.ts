// src/routes/blogs/+page.server.ts
import { serverClient } from '$lib/utils/sanity.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const query = `*[_type == "post"] | order(publishedAt desc){
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage {
      asset->{url}
    }
  }`;

  const posts = await serverClient.fetch(query);

  return {
    posts
  };
};
