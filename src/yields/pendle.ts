import { fetchWithCache } from '@netlify/cache';
import { apyToApr } from '~/util';

type PendleMarketsResponse = {
  markets: {
    address: string,
    pt: string,
    yt: string,
    details: {
      aggregatedApy: number,
      liquidity: number,
      impliedApy: number,
    },
  }[],
};

export async function getPendleYield(chainId: number, tokenAddress: string) {
  const markets = await getPendleMarkets(chainId);
  const data = markets.find(({ address, pt }) =>
    address.toLowerCase() === tokenAddress.toLowerCase() ||
    pt.toLowerCase() === `${chainId}-${tokenAddress}`.toLowerCase()
  );

  if (data) {
    if (data.address.toLowerCase() === tokenAddress.toLowerCase()) {
      // lp token
      return apyToApr(data.details.aggregatedApy);
    } else {
      // pt token
      return apyToApr(data.details.impliedApy);
    }
  }

  return null;
}

async function getPendleMarkets(chainId: number) {
  const response = await fetchWithCache(`https://api-v2.pendle.finance/core/v1/${chainId}/markets/active`, { ttl: 60*60 });
  const { markets }: PendleMarketsResponse = await response.json();
  return markets;
}
