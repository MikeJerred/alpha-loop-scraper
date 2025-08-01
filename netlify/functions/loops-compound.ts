import type { Context } from '@netlify/functions';
import { scrapeCompound, updateLoopsData } from '~/protocols';

export default async (req: Request, context: Context) => {
  const protocol = 'compound';
  console.log(`Running 'loops' function for ${protocol}...`);

  await updateLoopsData(protocol, await scrapeCompound());

  return new Response("Success!");
}
