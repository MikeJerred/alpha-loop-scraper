import type { Context } from '@netlify/functions';
import { scrapeAave, updateLoopsData } from '~/protocols';

export default async (req: Request, context: Context) => {
  const protocol = 'aave';
  console.log(`Running 'loops' function for ${protocol}...`);

  await updateLoopsData(protocol, await scrapeAave());

  return new Response("Success!");
}
