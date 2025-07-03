import type { Config, Context } from '@netlify/functions';
import { db } from '~/database';
import { scrapeAave, scrapeCompound, scrapeMorpho } from '~/protocols';

export default async (req: Request, context: Context) => {

  const loops = await Promise.all([
    scrapeAave(),
    scrapeCompound(),
    scrapeMorpho(),
  ]);

  const values = loops.flat().map(loop => ({
    chain_id: loop.chainId,
    protocol: loop.protocol,

    borrow_asset_address: loop.borrowAsset.address,
    borrow_asset_symbol: loop.borrowAsset.symbol,

    suply_asset_address: loop.supplyAsset.address,
    suply_asset_symbol: loop.supplyAsset.symbol,

    borrow_apr_daily: loop.borrowApr.daily,
    borrow_apr_weekly: loop.borrowApr.weekly,
    borrow_apr_monthly: loop.borrowApr.monthly,
    borrow_apr_yearly: loop.borrowApr.yearly,

    supply_apr_daily: loop.supplyApr.daily,
    supply_apr_weekly: loop.supplyApr.weekly,
    supply_apr_monthly: loop.supplyApr.monthly,
    supply_apr_yearly: loop.supplyApr.yearly,

    liquidity_usd: loop.liquidityUSD,
    max_ltv: loop.maxLtv,
    lltv: loop.lltv,
    link: loop.link,
  }));

  await db.transaction().execute(async trx => {
    await trx.deleteFrom('loops').execute();
    return await trx.insertInto('loops')
      .values(values)
      .execute();
  });

  return new Response("Success!");
}

export const config: Config = {
  schedule: '0 0 * * *',
};
