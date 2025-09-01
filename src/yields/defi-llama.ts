import { apyToApr, average, isDefined } from '~/util';
import type { YieldData } from '.';

const defiLlamaPools = {
  // staked eth
  wsteth: '747c1d2a-c668-4682-b9f9-296708a3dd90',
  reth: 'd4b3c522-6127-4b89-bedf-83641cdcd2eb',
  cbeth: '0f45d730-b279-4629-8e11-ccb5cc3038b4',
  meth: 'b9f2f00a-ba96-4589-a171-dde979a23d87',

  // restaked / other eth
  weeth: '46bd2bdf-6d92-4066-b482-e885ee172264',
  rseth: '33c732f6-a78d-41da-af5b-ccd9fa5e52d5',
  wrseth: '33c732f6-a78d-41da-af5b-ccd9fa5e52d5',
  ezeth: 'e28e32b5-e356-41d9-8dc7-a376ece56619',
  sweth: 'ca2acc2d-6246-44aa-ae91-8725b2c62c7c',
  unieth: 'ad383eed-61d8-4378-80bd-a197d9a11c79',
  woeth: '423681e3-4787-40ce-ae43-e9f67c5269b3',
  wsuperoethb: 'f388573e-5c0f-4dac-9f70-116a4aabaf17',
  oseth: '4d01599c-69ae-41a3-bae1-5fab896f04c8',
  yneth: '44dd4153-aa9f-4616-9a88-e6803c86b995',
  ynethx: 'e3c59895-d6ad-4634-b257-f599f1a1a4a0',
  rsweth: 'eff9b43c-a80d-4bfc-9f9e-55e02a8ef619',
  ethx: '90bfb3c2-5d35-4959-a275-ba5085b08aa3',
  bsdeth: 'ca775845-b68a-4084-8d8d-29c31970a643',
  'eth+': '4e6cd326-72d5-4680-8d2f-3481d50e8bb1',
  eth0: 'd6747cb4-9635-49f9-b417-cbfb9faa252e',
  teth: '5762f4a8-bb48-45d6-90ed-2d93d1777169',

  // stables
  susds: 'd8c4eff5-c8a9-46fc-a888-057c4c668e72',
  susde: '66985a81-9c51-46ca-9977-42b4fe7bc6df',
  stusr: '0aedb3f6-9298-49de-8bb0-2f611a4df784',
  wstusr: '0aedb3f6-9298-49de-8bb0-2f611a4df784',
  rlp: '2ad8497d-c855-4840-85ad-cdc536b92ced',
  'usd0++': '55b0893b-1dbb-47fd-9912-5e439cd3d511',
  srusd: '402b0554-9525-40af-8703-3c59b0aa863c',
  stusdt: 'e1b9420a-30d4-4c27-8e01-2d6cd240e1b9',
  hyusd: '8449ce9a-fc8d-4d93-991a-55113fa80a5a',
};

type PoolsResponse = {
  status: string,
  data: {
    chain: string,
    symbol: string,
    pool: string,
    apy: number,
    apyMean30d: number,
    underlyingTokens: string[],
  }[],
};

type ChartResponse = {
  data: {
    timestamp: string,
    tvlUsd: number,
    apy: number,
    apyReward: number | null,
  }[],
};

const hasDefiLlamaPool = (symbol: string): symbol is keyof typeof defiLlamaPools => Object.hasOwn(defiLlamaPools, symbol);

export const scrape = async (): Promise<YieldData[]> => {
  const results = await Promise.all(Object.entries(defiLlamaPools).map(async ([symbol, pool]) => {
    const yields = await getPoolYields(pool);
    if (!yields) return null;

    return {
      asset: {
        addresses: [],
        symbol: symbol.toLowerCase(),
      },
      yields,
    };
  }));

  return results.filter(isDefined);
};

export async function getPoolYields(pool: string) {
  const response = await fetch(`https://yields.llama.fi/chart/${pool}`).catch(error => {
    console.warn(`Unable to fetch defi llama pool ${pool}`, error);
    return null;
  });
  if (!response) return null;

  const { data }: ChartResponse = await response.json();

  const now = new Date();

  const nowMinus1Day = new Date();
  nowMinus1Day.setDate(now.getDate() - 1);
  const dailyData = data
    .filter(({ timestamp }) => new Date(timestamp).getTime() >= nowMinus1Day.getTime())
    .map(({ apy }) => apy);

  const nowMinus7Days = new Date();
  nowMinus7Days.setDate(now.getDate() - 7);
  const weeklyData = data
    .filter(({ timestamp }) => new Date(timestamp).getTime() >= nowMinus7Days.getTime())
    .map(({ apy }) => apy);

  const nowMinus30Days = new Date();
  nowMinus30Days.setDate(now.getDate() - 30);
  const monthlyData = data
    .filter(({ timestamp }) => new Date(timestamp).getTime() >= nowMinus30Days.getTime())
    .map(({ apy }) => apy);

  const nowMinus365Days = new Date();
  nowMinus365Days.setDate(now.getDate() - 365);
  const yearlyData = data
    .filter(({ timestamp }) => new Date(timestamp).getTime() >= nowMinus365Days.getTime())
    .map(({ apy }) => apy);

  return {
    daily: apyToApr(average(dailyData) / 100),
    weekly: apyToApr(average(weeklyData) / 100),
    monthly: apyToApr(average(monthlyData) / 100),
    yearly: apyToApr(average(yearlyData) / 100),
  };
}
