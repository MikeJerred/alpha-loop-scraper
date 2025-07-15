import { arbitrum, base, mainnet, mantle, optimism } from 'viem/chains';
import { apyToApr } from '~/util';

type PendleMarketsResponse = {
  markets: {
    name: string,
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

const validChainIds = [arbitrum.id, base.id, mainnet.id, mantle.id, optimism.id] as number[];

export async function getPendleYield(chainId: number, tokenAddress: string) {
  tokenAddress = tokenAddress.toLowerCase();
  if (!validChainIds.includes(chainId)) return null;

  const markets = await getPendleMarkets(chainId);
  const data = markets?.find(({ address, pt }) =>
    address.toLowerCase() === tokenAddress ||
    pt.toLowerCase() === `${chainId}-${tokenAddress}`
  );

  if (data) {
    if (data.address.toLowerCase() === tokenAddress) {
      // lp token
      return apyToApr(data.details.aggregatedApy);
    } else {
      // pt token
      return apyToApr(data.details.impliedApy);
    }
  }

  return null;
}

const marketsCache = new Map<number, PendleMarketsResponse | null>();

async function getPendleMarkets(chainId: number) {
  let data = marketsCache.get(chainId);
  if (data !== undefined) return data?.markets;

  const response = await fetch(`https://api-v2.pendle.finance/core/v1/${chainId}/markets/active`).catch(() => null);

  data = response ? await response.json() : null;

  marketsCache.set(chainId, data ?? null);

  return data?.markets;
}
