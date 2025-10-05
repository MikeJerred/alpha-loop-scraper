import { chainId as aaveChainId, evmAddress, AaveClient, TimeWindow } from '@aave/client';
import { borrowAPYHistory, supplyAPYHistory } from '@aave/client/actions';
import {
  AaveV3Arbitrum,
  AaveV3Base,
  AaveV3Ethereum,
  AaveV3EthereumLido,
  AaveV3Plasma,
  AaveV3Scroll,
  AaveV3ZkSync,
} from '@bgd-labs/aave-address-book';
import { getContract } from 'viem';
import { arbitrum, base, mainnet, plasma, scroll, zksync } from 'viem/chains';
import { IUiPoolDataProvider_ABI } from '~/abi/AaveUiPoolDataProvider';
import { IUiIncentiveDataProvider_ABI } from '~/abi/AaveUiIncentiveDataProvider';
import { getClient } from '~/blockchain';
import { average, isCorrelated } from '~/util';
import type { YieldLoop } from '.';

type AaveRateCacheItem = {
  supply?: {
    daily?: number,
    weekly?: number,
    monthly?: number,
    yearly? : number,
  },
  borrow?: {
    daily?: number,
    weekly?: number,
    monthly?: number,
    yearly? : number,
  },
};

const providers = {
  mainnet: [AaveV3Ethereum, mainnet.id],
  lido: [AaveV3EthereumLido, mainnet.id],
  arbitrum: [AaveV3Arbitrum, arbitrum.id],
  base: [AaveV3Base, base.id],
  scroll: [AaveV3Scroll, scroll.id],
  // plasma: [AaveV3Plasma, plasma.id],
  zksync: [AaveV3ZkSync, zksync.id],
} as const;

const aaveClient = AaveClient.create();

const aaveRateCache = new Map<string, AaveRateCacheItem | null>();

export const scrape = async (): Promise<YieldLoop[]> => {
  aaveRateCache.clear();

  const results = await Promise.all(Object.entries(providers)
    .map(([providerKey, provider]) => getProviderLoops(providerKey, provider))
  );

  return results.flat();
};

async function getProviderLoops(providerKey: string, [provider, chainId]: typeof providers[keyof typeof providers]) {
  const results: YieldLoop[] = [];

  const client = getClient(chainId);
  const uiPoolData = getContract({
    abi: IUiPoolDataProvider_ABI,
    address: provider.UI_POOL_DATA_PROVIDER,
    client,
  });

  const [reserves, referenceCurrency] = await uiPoolData.read.getReservesData([provider.POOL_ADDRESSES_PROVIDER]);
  const eModes = await uiPoolData.read.getEModes([provider.POOL_ADDRESSES_PROVIDER]);

  for (const [supplyIndex, supplyAsset] of reserves.entries()) {
    if (!supplyAsset.symbol || !supplyAsset.isActive || supplyAsset.isFrozen || supplyAsset.isPaused) continue;

    for (const [borrowIndex, borrowAsset] of reserves.entries()) {
      if (!borrowAsset.symbol || !borrowAsset.isActive || borrowAsset.isFrozen || borrowAsset.isPaused) continue;
      if (supplyAsset === borrowAsset || !borrowAsset.borrowingEnabled) continue;

      const areAssetsCorrelated =
        isCorrelated(supplyAsset.symbol, 'btc') && isCorrelated(borrowAsset.symbol, 'btc') ||
        isCorrelated(supplyAsset.symbol, 'eth') && isCorrelated(borrowAsset.symbol, 'eth') ||
        isCorrelated(supplyAsset.symbol, 'usd') && isCorrelated(borrowAsset.symbol, 'usd');
      if (!areAssetsCorrelated) continue;

      const validEModes = eModes.filter(eMode =>
        getBit(eMode.eMode.collateralBitmap, supplyIndex) &&
        getBit(eMode.eMode.borrowableBitmap, borrowIndex)
      );

      const maxLtv = Math.max(
        Number(supplyAsset.baseLTVasCollateral) / 10000,
        ...validEModes.map(eMode => eMode.eMode.ltv / 10000),
      );
      const lltv = Math.max(
        Number(supplyAsset.reserveLiquidationThreshold) / 10000,
        ...validEModes.map(eMode => eMode.eMode.liquidationThreshold / 10000),
      );

      const supplyAPRs = (await getRate(chainId, provider.POOL, supplyAsset.underlyingAsset))?.supply;
      const borrowAPRs = (await getRate(chainId, provider.POOL, borrowAsset.underlyingAsset))?.borrow;

      if (!borrowAPRs) continue;

      results.push({
        protocol: 'aave',
        chainId,
        borrowAsset: {
          address: borrowAsset.underlyingAsset,
          symbol: borrowAsset.symbol,
        },
        supplyAsset: {
          address: supplyAsset.underlyingAsset,
          symbol: supplyAsset.symbol,
        },
        supplyApr: {
          daily: supplyAPRs?.daily ?? 0,
          weekly: supplyAPRs?.weekly ?? 0,
          monthly: supplyAPRs?.monthly ?? 0,
          yearly: supplyAPRs?.yearly ?? 0,
        },
        borrowApr: {
          daily: borrowAPRs.daily ?? 0,
          weekly: borrowAPRs.weekly ?? 0,
          monthly: borrowAPRs.monthly ?? 0,
          yearly: borrowAPRs.yearly ?? 0,
        },
        liquidityUSD: Number(
          (borrowAsset.priceInMarketReferenceCurrency / referenceCurrency.marketReferenceCurrencyPriceInUsd) *
          borrowAsset.availableLiquidity / (10n ** borrowAsset.decimals)
        ),
        maxLtv,
        lltv,
        link: `https://app.aave.com/reserve-overview/?underlyingAsset=${borrowAsset.underlyingAsset.toLowerCase()}&marketName=proto_${providerKey}_v3`,
      });
    }
  }

  return results;
}

// TODO: implement this when the Aave API actually works
export async function getIncentives(chainId: number, pool: `0x${string}`, tokenAddress: `0x${string}`) {
  // const client = getClient(324);
  // const uiIncentives = getContract({
  //   abi: IUiIncentiveDataProvider_ABI,
  //   address: AaveV3ZkSync.UI_INCENTIVE_DATA_PROVIDER,
  //   client,
  // });

  // const data = await uiIncentives.read.getReservesIncentivesData([AaveV3ZkSync.POOL_ADDRESSES_PROVIDER]);
  // return data;

  // const data = await reserve(aaveClient, {
  //   chainId: aaveChainId(chainId),
  //   market: evmAddress(pool),
  //   underlyingToken: evmAddress(tokenAddress),
  // })

  // const marketResponse = await market(aaveClient, {
  //   chainId: aaveChainId(chainId),
  //   address: evmAddress(pool),
  // });

  // if (data.isErr()) {
  //   return null;
  // }

  // return data.value;

  // const xx = marketResponse.value?.borrowReserves[0].incentives[0];
  // marketResponse.value?.supplyReserves[0].incentives[0];
}

async function getRate(chainId: number, pool: `0x${string}`, tokenAddress: `0x${string}`) {
  const key = `${tokenAddress}${pool}${chainId}`;
  const cached = aaveRateCache.get(key);
  if (cached) return cached;

  const borrowResponse = await borrowAPYHistory(aaveClient, {
    chainId: aaveChainId(chainId),
    market: evmAddress(pool),
    underlyingToken: evmAddress(tokenAddress),
    window: TimeWindow.LastYear,
  });

  if (borrowResponse.isErr()) {
    return null;
  }

  const supplyResponse = await supplyAPYHistory(aaveClient, {
    chainId: aaveChainId(chainId),
    market: evmAddress(pool),
    underlyingToken: evmAddress(tokenAddress),
    window: TimeWindow.LastYear,
  });

  if (supplyResponse.isErr()) {
    return null;
  }

  const borrowData = borrowResponse?.value?.sort((a, b) => a.date < b.date ? 1 : -1) ?? [];
  const supplyData = supplyResponse?.value?.sort((a, b) => a.date < b.date ? 1 : -1) ?? [];

  const result = borrowResponse.isOk() && borrowData.length || supplyResponse.isOk() && supplyData.length
    ? {
      borrow: borrowResponse.isOk() && borrowData.length > 0
        ? {
          daily: average(borrowData.map(x => +x.avgRate.value).slice(-1)),
          weekly: average(borrowData.map(x => +x.avgRate.value).slice(-7)),
          monthly: average(borrowData.map(x => +x.avgRate.value).slice(-30)),
          yearly: average(borrowData.map(x => +x.avgRate.value).slice(-365)),
        }
        : {
          daily: 0,
          weekly: 0,
          monthly: 0,
          yearly: 0,
        },
      supply: supplyResponse.isOk() && supplyData.length > 0
        ? {
          daily: average(supplyData.map(x => +x.avgRate.value).slice(-1)),
          weekly: average(supplyData.map(x => +x.avgRate.value).slice(-7)),
          monthly: average(supplyData.map(x => +x.avgRate.value).slice(-30)),
          yearly: average(supplyData.map(x => +x.avgRate.value).slice(-365)),
        }
        : {
          daily: 0,
          weekly: 0,
          monthly: 0,
          yearly: 0,
        },
    } satisfies AaveRateCacheItem
    : null;

  aaveRateCache.set(key, result);
  return result;
}

function getBit(bitmap: bigint, bit: number) {
  const mask = 0b1n << BigInt(bit);
  return Boolean(bitmap & mask);
}
