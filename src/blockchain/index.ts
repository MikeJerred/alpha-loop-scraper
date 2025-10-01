import { createPublicClient, fallback, http, type FallbackTransport, type PublicClient } from 'viem';
import { arbitrum, base, linea, mainnet, mantle, optimism, plasma, polygon, scroll, unichain, zksync } from 'viem/chains';

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
  [plasma, [
    `https://plasma-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    ...plasma.rpcUrls.default.http,
  ]],
  [polygon, [
    `https://polygon-mainnet.infura.io/v3/${INFURA_API_KEY}`,
    `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    `https://polygon-mainnet.public.blastapi.io`,
    ...polygon.rpcUrls.default.http,
  ]],
  [scroll, [
    `https://scroll-mainnet.infura.io/v3/${INFURA_API_KEY}`,
    `https://scroll-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    'https://scroll-mainnet.public.blastapi.io',
    ...scroll.rpcUrls.default.http,
  ]],
  [unichain, [
    `https://unichain-mainnet.infura.io/v3/${INFURA_API_KEY}`,
    `https://unichain-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    `https://unichain-mainnet.public.blastapi.io`,
    ...unichain.rpcUrls.default.http,
  ]],
  [zksync, [
    `https://zksync-mainnet.infura.io/v3/${INFURA_API_KEY}`,
    `https://zksync-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    'https://zksync-mainnet.public.blastapi.io',
    ...zksync.rpcUrls.default.http,
  ]],
] as const;

export const validChainIds = chains.map(([chain]) => chain.id);
export type ChainId = typeof chains[number][0]['id'];

const clients = new Map<number, PublicClient<FallbackTransport, typeof chains[number][0]>>();

export const getClient = (id: ChainId) => {
  const cached = clients.get(id);
  if (cached) return cached;

  const chainData = chains.find(([c]) => c.id === id);
  if (!chainData) throw new Error(`No data found for chain with id: ${id}`);

  const [chain, rpcUrls] = chainData;

  const client = createPublicClient({
    // batch: { multicall: true },
    chain,
    transport: fallback(rpcUrls.map(url => http(url))),
  });

  clients.set(id, client);

  return client;
};
