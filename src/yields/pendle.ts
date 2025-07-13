import { fetchWithCache } from '@netlify/cache';
import { arbitrum, base, bsc, mainnet, mantle, optimism } from 'viem/chains';
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

const validChainIds = [arbitrum.id, base.id, bsc.id, mainnet.id, mantle.id, optimism.id] as number[];

export async function getPendleYield(chainId: number, tokenAddress: string) {
  if (!validChainIds.includes(chainId)) return null;

  const markets = await getPendleMarkets(chainId);
  const data = markets?.find(({ address, pt }) =>
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
  const response = await fetchWithCache(`https://api-v2.pendle.finance/core/v1/${chainId}/markets/active`, { ttl: 60*60 })
    .catch(() => null);

  if (!response) return null;

  const { markets }: PendleMarketsResponse = await response.json();
  return markets;
}
