import type { Context } from '@netlify/functions';
import { scrapeMorpho, updateLoopsData } from '~/protocols';

export default async (req: Request, context: Context) => {
  const protocol = 'morpho';
  console.log(`Running 'loops' function for ${protocol}...`);

  await updateLoopsData(protocol, await scrapeMorpho());

  return new Response("Success!");
}
