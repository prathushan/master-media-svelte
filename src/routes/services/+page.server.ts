// src/routes/+page.server.ts
import { serverClient } from '$lib/utils/sanity.server';

export async function load() {
  const query = `*[_type == "page"]`;
  const result = await serverClient.fetch(query);

  const servicesPage = result.find((page: any) => page.title?.toLowerCase().trim() === 'services');

  if (!servicesPage) {
    throw new Error('Services page not found');
  }

  return {
    servicesPage
  };
}
