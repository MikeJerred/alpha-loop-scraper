export { scrape as scrapeDefiLlama } from './defi-llama';
export { getPendleYield } from './pendle';

export type YieldData = {
  asset: {
    addresses: string[],
    symbol: string,
  },
  yields: {
    daily: number | null,
    weekly: number | null,
    monthly: number | null,
    yearly: number | null,
  },
};
