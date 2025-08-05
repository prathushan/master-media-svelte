// src/routes/blogs/[slug]/+page.server.ts
import { serverClient } from '$lib/utils/sanity.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;

  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    slug,
    publishedAt,
    body,
    excerpt,
    mainImage {
      asset->{url}
    }
  }`;

  const post = await serverClient.fetch(query, { slug });

  if (!post) {
    return {
      status: 404,
      error: new Error('Post not found')
    };
  }

  return { post };
};
