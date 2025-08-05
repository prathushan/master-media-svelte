// /src/routes/+layout.server.ts
import { serverClient } from '$lib/utils/sanity.server';
import { menuQuery, footerQuery} from '$lib/utils/queries';

export async function load() {
  const [footerSetting, menu, liveService] = await Promise.all([
  serverClient.fetch(footerQuery),
  serverClient.fetch(menuQuery)
]);

return { footerSetting, menu}; 
}
