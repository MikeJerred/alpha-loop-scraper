import {
  AaveV3Arbitrum,
  AaveV3Base,
  AaveV3Ethereum,
  AaveV3EthereumEtherFi,
  AaveV3EthereumLido,
  AaveV3Scroll,
  AaveV3ZkSync,
} from '@bgd-labs/aave-address-book';
import { getContract } from 'viem';
import { arbitrum, base, mainnet, scroll, zksync } from 'viem/chains';
import { IUiPoolDataProvider_ABI } from '~/abi/AaveUiPoolDataProvider';
import { getClient } from '~/blockchain';
import { average, fetchRetry, isCorrelated } from '~/util';
import type { YieldLoop } from '.';

type AaveRateCacheItem = {
  supply?: {
    daily?: number,
    weekly?: number,
    monthly?: number,
  },
  borrow?: {
    daily?: number,
    weekly?: number,
    monthly?: number,
  },
};

const providers = {
  mainnet: [AaveV3Ethereum, mainnet.id],
  etherfi: [AaveV3EthereumEtherFi, mainnet.id],
  lido: [AaveV3EthereumLido, mainnet.id],
  arbitrum: [AaveV3Arbitrum, arbitrum.id],
  base: [AaveV3Base, base.id],
  scroll: [AaveV3Scroll, scroll.id],
  zksync: [AaveV3ZkSync, zksync.id],
} as const;

const aaveRateCache = new Map<string, AaveRateCacheItem | null>();

export const scrape = async (): Promise<YieldLoop[]> => {
  aaveRateCache.clear();
  const results: YieldLoop[] = [];

  for (const [providerKey, [provider, chainId]] of Object.entries(providers)) {
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

        const supplyAPRs = (await getRate(chainId, provider.POOL_ADDRESSES_PROVIDER, supplyAsset.underlyingAsset))?.supply;
        const borrowAPRs = (await getRate(chainId, provider.POOL_ADDRESSES_PROVIDER, borrowAsset.underlyingAsset))?.borrow;

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
            yearly: 12 * (supplyAPRs?.monthly ?? 0),
          },
          borrowApr: {
            daily: borrowAPRs.daily ?? 0,
            weekly: borrowAPRs.weekly ?? 0,
            monthly: borrowAPRs.monthly ?? 0,
            yearly: 12 * (borrowAPRs.monthly ?? 0),
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
  }

  return results;
};

async function getRate(chainId: number, poolAddressesProvider: `0x${string}`, tokenAddress: `0x${string}`) {
  const key = `${tokenAddress}${poolAddressesProvider}${chainId}`;
  const cached = aaveRateCache.get(key);
  if (cached) return cached;

  const timestamp = Math.floor(Date.now() / 1000) - 30*24*60*60;
  const response = await fetchRetry(
    `https://aave-api-v2.aave.com/data/rates-history?reserveId=${key}&from=${timestamp}&resolutionInHours=24`
  );
  const data = await response.json() as { liquidityRate_avg: number, variableBorrowRate_avg: number }[];

  const result = data && data.length > 0
    ? {
      supply: {
        daily: average(data.map(x => x.liquidityRate_avg).slice(-1)),
        weekly: average(data.map(x => x.liquidityRate_avg).slice(-7)),
        monthly: average(data.map(x => x.liquidityRate_avg).slice(-30)),
      },
      borrow: {
        daily: average(data.map(x => x.variableBorrowRate_avg).slice(-1)),
        weekly: average(data.map(x => x.variableBorrowRate_avg).slice(-7)),
        monthly: average(data.map(x => x.variableBorrowRate_avg).slice(-30)),
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
