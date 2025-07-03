import { createPublicClient, extractChain, fallback, http, type FallbackTransport, type PublicClient } from 'viem';
import { arbitrum, base, bsc, linea, mainnet, mantle, optimism, scroll, zksync } from 'viem/chains';

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const INFURA_API_KEY = process.env.INFURA_API_KEY;

const chains = [
  [arbitrum, [
    `https://arbitrum-mainnet.infura.io/v3/${INFURA_API_KEY}`,
    `https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    'https://arbitrum-one.public.blastapi.io',
    ...arbitrum.rpcUrls.default.http,
  ]],
  [base, [
    `https://base-mainnet.infura.io/v3/${INFURA_API_KEY}`,
    `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    'https://base-mainnet.public.blastapi.io',
    'https://base.llamarpc.com',
    ...base.rpcUrls.default.http,
  ]],
  [bsc, [
    `https://bsc-mainnet.infura.io/v3/${INFURA_API_KEY}`,
    `https://bnb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    'https://bsc-mainnet.public.blastapi.io',
    ...bsc.rpcUrls.default.http,
  ]],
  [linea, [
    `https://linea-mainnet.infura.io/v3/${INFURA_API_KEY}`,
    `https://linea-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    'https://linea-mainnet.public.blastapi.io',
    ...linea.rpcUrls.default.http,
  ]],
  [mainnet, [
    `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
    `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    'https://eth-mainnet.public.blastapi.io',
    'https://eth.llamarpc.com',
    ...mainnet.rpcUrls.default.http,
  ]],
  [mantle, [
    `https://mantle-mainnet.infura.io/v3/${INFURA_API_KEY}`,
    `https://mantle-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    'https://mantle-mainnet.public.blastapi.io',
    ...mantle.rpcUrls.default.http,
  ]],
  [optimism, [
    `https://optimism-mainnet.infura.io/v3/${INFURA_API_KEY}`,
    `https://opt-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    'https://optimism-mainnet.public.blastapi.io',
    ...optimism.rpcUrls.default.http,
  ]],
  [scroll, [
    `https://scroll-mainnet.infura.io/v3/${INFURA_API_KEY}`,
    `https://scroll-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    'https://scroll-mainnet.public.blastapi.io',
    ...scroll.rpcUrls.default.http,
  ]],
  [zksync, [
    `https://zksync-mainnet.infura.io/v3/${INFURA_API_KEY}`,
    `https://zksync-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    'https://zksync-mainnet.public.blastapi.io',
    ...zksync.rpcUrls.default.http,
  ]],
] as const;

export type ChainId = typeof chains[number][0]['id'];

const clients = new Map<number, PublicClient<FallbackTransport, typeof chains[number][0]>>();

export const getClient = (id: ChainId) => {
  const cached = clients.get(id);
  if (cached) return cached;

  const chain = extractChain({ chains: chains.map(([chain]) => chain), id });

  const client = createPublicClient({
    batch: { multicall: true },
    chain,
    transport: fallback(
      chains.flatMap(([, urls]) => urls.map(url => http(url, { batch: true }))),
      {
        retryCount: 10,
        retryDelay: 150,
      },
    ),
  });

  clients.set(id, client);

  return client;
};
