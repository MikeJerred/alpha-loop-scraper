import { gql, request as gqlRequest } from 'graphql-request';
import { base, mainnet } from 'viem/chains';
import { apyToApr, isDefined} from '~/util';
import type { YieldLoop } from '.';

type Item = {
  loanAsset?: {
    address: string,
    symbol: string,
  },
  collateralAsset?: {
    address: string,
    symbol: string,
  },
  lltv: string,
  state: {
    liquidityAssetsUsd: number | string | null,
    dailyBorrowApy: number,
    weeklyBorrowApy: number,
    monthlyBorrowApy: number,
    quarterlyBorrowApy: number,
    yearlyBorrowApy: number,
  },
  morphoBlue?: {
    chain?: { id: number },
  },
  uniqueKey: string,
};

type Results = {
  markets: {
    items: Item[],
    pageInfo: {
      countTotal: number,
      count:number,
      limit: number,
      skip: number,
    },
  },
};

export const scrape = async (): Promise<YieldLoop[]> => {
  const query = gql`query Markets($skip: Int) {
    markets(first: 1000, skip: $skip) {
      pageInfo {
        countTotal
        count
        limit
        skip
      }
      items {
        loanAsset {
          address
          symbol
        }
        collateralAsset {
          address
          symbol
        }
        uniqueKey
        lltv
        state {
          liquidityAssetsUsd
          dailyBorrowApy
          weeklyBorrowApy
          monthlyBorrowApy
          quarterlyBorrowApy
          yearlyBorrowApy
        }
        morphoBlue {
          chain {
            id
          }
        }
      }
    }
  }`;

  const results: Item[] = [];

  let page = 0;
  while (true) {
    const { markets } = await gqlRequest<Results>(
      'https://blue-api.morpho.org/graphql',
      query,
      { skip: page * 1000 },
    );

    results.push(...markets.items);
    page++;

    if (markets.pageInfo.count < 1000) break;
  };

  return results
    .map(({ collateralAsset, loanAsset, lltv, morphoBlue, state, uniqueKey }) => {
      if (!collateralAsset || !loanAsset || !lltv || !morphoBlue?.chain || !state) {
        return null;
      }

      return {
        protocol: 'morpho' as const,
        chainId: morphoBlue.chain.id,
        borrowAsset: {
          address: loanAsset.address,
          symbol: loanAsset.symbol,
        },
        supplyAsset: {
          address: collateralAsset.address,
          symbol: collateralAsset.symbol,
        },
        supplyApr: {
          daily: 0,
          weekly: 0,
          monthly: 0,
          yearly: 0,
        },
        borrowApr: {
          daily: apyToApr(state.dailyBorrowApy),
          weekly: apyToApr(state.weeklyBorrowApy),
          monthly: apyToApr(state.monthlyBorrowApy),
          yearly: apyToApr(state.yearlyBorrowApy),
        },
        liquidityUSD: typeof state.liquidityAssetsUsd === 'string'
          ? Number(BigInt(state.liquidityAssetsUsd) / 10n**12n) / 10**6
          : state.liquidityAssetsUsd ?? 0,
        maxLtv: Number(BigInt(lltv) / 10n**12n) / 10**6,
        lltv: Number(BigInt(lltv) / 10n**12n) / 10**6,
        link: `https://app.morpho.org/${getChainForUrl(morphoBlue.chain.id)}/market/${uniqueKey}`,
      };
    })
    .filter(isDefined);
};

const getChainForUrl = (id: number) => {
  switch (id) {
    case mainnet.id: return 'ethereum';
    case base.id: return 'base';
    default: return null;
  }
};
