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
