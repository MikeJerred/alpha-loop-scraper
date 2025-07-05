import { erc20Abi, getContract } from 'viem';
import { arbitrum, base, linea, mainnet, mantle, optimism, polygon, scroll } from 'viem/chains';
import { CompoundCometABI } from '~/abi/CompoundComet';
import { getClient, validChainIds, type ChainId } from '~/blockchain';
import { fetchRetry, isDefined } from '~/util';
import type { YieldLoop } from '.';

type Data = {
  chain_id: number,
  comet: { address: `0x${string}` },
  borrow_apr: string,
  supply_apr: string,
  total_borrow_value: string,
  total_supply_value: string,
  total_collateral_value: string,
  utilization: string,
  base_usd_price: string,
  collateral_asset_symbols: string[],
  timestamp: number,
  date: string,
};

// from: https://docs.compound.finance/helper-functions/#get-asset-info-by-address
const compoundCollateralFactorScale = 1000000000000000000n;

export const scrape = async (): Promise<YieldLoop[]> => {
  const url = 'https://v3-api.compound.finance/market/all-networks/all-contracts/historical/summary';

  const response = await fetchRetry(url);
  const data: Data[] = await response.json();

  const results = await Promise.all(Map.groupBy(data, ({ comet }) => comet.address)
    .entries()
    .map(async ([address, items]) => {
      const chainId = items[0].chain_id as ChainId;
      if (!validChainIds.includes(chainId)) return;

      const client = getClient(chainId);

      items.sort((a, b) => a.timestamp - b.timestamp);
      const dailyApr = Number(items[0].borrow_apr);
      const weeklyApr = items.length >= 7
        ? items.slice(0, 7).reduce((total, item) => total + Number(item.borrow_apr), 0) / 7
        : items.reduce((total, item) => total + Number(item.borrow_apr), 0) / items.length;
      const monthlyApr = items.length >= 30
        ? items.slice(0, 30).reduce((total, item) => total + Number(item.borrow_apr), 0) / 30
        : items.reduce((total, item) => total + Number(item.borrow_apr), 0) / items.length;
      const yearlyApr = items.length >= 365
        ? items.slice(0, 365).reduce((total, item) => total + Number(item.borrow_apr), 0) / 365
        : items.reduce((total, item) => total + Number(item.borrow_apr), 0) / items.length;
      const liquidityUSD = (Number(items[0].total_supply_value) - Number(items[0].total_borrow_value)) * Number(items[0].base_usd_price);

      const comet = getContract({ address, abi: CompoundCometABI, client });

      const erc20SymbolCache = new Map<`0x${string}`, string>();

      const borrowTokenAddress = await comet.read.baseToken();
      let borrowTokenSymbol = erc20SymbolCache.get(borrowTokenAddress);
      if (!borrowTokenSymbol) {
        borrowTokenSymbol = await client.readContract({ address: borrowTokenAddress, abi: erc20Abi, functionName: 'symbol' })
          .catch(e => {
            console.error(`symbol from chain: ${chainId}, tokenAddr: ${borrowTokenAddress}, comet: ${address}`);
            throw e;
          });
        erc20SymbolCache.set(borrowTokenAddress, borrowTokenSymbol);
      }

      const assetCount = await comet.read.numAssets();
      const supplyAssets = await Promise.all(new Array(assetCount).keys().map(async i => {
        const assetInfo = await comet.read.getAssetInfo([i]);
        const supplyTokenAddress = assetInfo.asset;
        let supplyTokenSymbol = erc20SymbolCache.get(supplyTokenAddress);
        if (!supplyTokenSymbol) {
          supplyTokenSymbol = await client.readContract({ address: supplyTokenAddress, abi: erc20Abi, functionName: 'symbol' })
            .catch(e => {
              console.error(`symbol from chain: ${chainId}, tokenAddr: ${supplyTokenAddress}, comet: ${address}`);
              throw e;
            });
          erc20SymbolCache.set(supplyTokenAddress, supplyTokenSymbol);
        }

        return {
          address: assetInfo.asset,
          symbol: supplyTokenSymbol,
          ltv: Number(1000n * assetInfo.borrowCollateralFactor / compoundCollateralFactorScale) / 1000,
          lltv: Number(1000n * assetInfo.liquidationFactor / compoundCollateralFactorScale) / 1000,
        };
      }));

      return supplyAssets.map(supplyAsset => ({
        protocol: 'compound' as const,
        chainId: chainId,
        borrowAsset: {
          address: borrowTokenAddress,
          symbol: borrowTokenSymbol,
        },
        supplyAsset,
        borrowApr: {
          daily: dailyApr,
          weekly: weeklyApr,
          monthly: monthlyApr,
          yearly: yearlyApr,
        },
        supplyApr: {
          daily: 0,
          weekly: 0,
          monthly: 0,
          yearly: 0,
        },
        liquidityUSD,
        maxLtv: supplyAsset.ltv,
        lltv: supplyAsset.lltv,
        link: `https://app.compound.finance/markets/${borrowTokenSymbol}-${getChainForUrl(chainId)}`,
      } as YieldLoop));
    })
  );

  return results.filter(isDefined).flat();
};

function getChainForUrl(id: number) {
  switch (id) {
    case arbitrum.id: return 'arb';
    case base.id: return 'basemainnet';
    case linea.id: return 'linea';
    case mainnet.id: return 'mainnet';
    case mantle.id: return 'mantle';
    case optimism.id: return 'op';
    case polygon.id: return 'polygon';
    case scroll.id: return 'scroll';
    default: return null;
  }
}
