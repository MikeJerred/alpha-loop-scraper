import type { Context } from '@netlify/functions';
import { db } from '~/database';
import { getPendleYield, scrapeDefiLlama, type YieldData } from '~/yields';

export default async (req: Request, context: Context) => {
  console.log(`Running 'yields' function...`);

  const borrowAddresses = db.selectFrom('loops').select(['chain_id', 'borrow_asset_address as address', 'borrow_asset_symbol as symbol']);
  const supplyAddresses = db.selectFrom('loops').select(['chain_id', 'supply_asset_address as address', 'supply_asset_symbol as symbol']);
  const results = await borrowAddresses.union(supplyAddresses).execute();
  const symbols = new Set(results.map(result => result.symbol.toLowerCase()).filter(symbol => !!symbol));

  console.log(`Found ${symbols.size} distinct symbols in the existing loops table`);

  const yields = await Promise.all([
    scrapeDefiLlama(),
    ...results.map(async ({ chain_id, address, symbol }) => {
      const pendleYield = await getPendleYield(chain_id, address);
      if (!pendleYield) return [];

      return [{
        asset: {
          addresses: [`${chain_id}-${address.toLowerCase()}`],
          symbol,
        },
        yields: {
          daily: pendleYield,
          weekly: null,
          monthly: null,
          yearly: null,
        },
      } as YieldData];
    }),
  ]);

  const values = yields.flat().map(data => ({
    asset_symbol: data.asset.symbol,
    yield_apr_daily: data.yields.daily,
    yield_apr_weekly: data.yields.weekly,
    yield_apr_monthly: data.yields.monthly,
    yield_apr_yearly: data.yields.yearly,
  }));

  console.log(`Found ${values.length} yields, updating db...`);

  await db.transaction().execute(async trx => {
    await trx.deleteFrom('yields').execute();
    return await trx.insertInto('yields')
      .values(values)
      .execute();
  });

  console.log(`Updated db with ${values.length} yield entries`);
  return new Response("Success!");
}
