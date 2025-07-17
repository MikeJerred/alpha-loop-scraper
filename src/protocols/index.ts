import { db } from '~/database';

export { scrape as scrapeAave } from './aave';
export { scrape as scrapeCompound } from './compound';
export { scrape as scrapeMorpho } from './morpho';

export type Protocol = 'aave' | 'compound' | 'morpho';

export type YieldLoop = {
  protocol: Protocol,
  chainId: number,
  borrowAsset: {
    address: string,
    symbol: string,
  },
  supplyAsset: {
    address: string,
    symbol: string,
  },
  borrowApr: {
    daily: number,
    weekly: number,
    monthly: number,
    yearly: number,
  },
  supplyApr: {
    daily: number,
    weekly: number,
    monthly: number,
    yearly: number,
  },
  liquidityUSD: number,
  maxLtv: number,
  lltv: number,
  link: string,
};

export const updateLoopsData = async (protocol: Protocol, loops: YieldLoop[]) => {
  const values = loops
    .filter(loop => loop.protocol === protocol)
    .map(loop => ({
      chain_id: loop.chainId,
      protocol: protocol,

      borrow_asset_address: loop.borrowAsset.address,
      borrow_asset_symbol: loop.borrowAsset.symbol,

      supply_asset_address: loop.supplyAsset.address,
      supply_asset_symbol: loop.supplyAsset.symbol,

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

  console.log(`Found ${values.length} loops for ${protocol}, updating db...`);

  await db.transaction().execute(async trx => {
    await trx.deleteFrom('loops').where('protocol', '=', protocol).execute();
    return await trx.insertInto('loops')
      .values(values)
      .execute();
  });

  console.log(`Updated db with ${values.length} loop entries for ${protocol}`);
};
