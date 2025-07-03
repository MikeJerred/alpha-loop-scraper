export type Protocol = 'aave' | 'compound' | 'morpho';

export type YieldLoop = {
  protocol: Protocol,
  chainId: number,
  borrowAsset: {
    address: string,
    symbol: string,
  },
  supplyAsset: {
    address: string,
    symbol: string,
  },
  borrowApr: {
    daily: number,
    weekly: number,
    monthly: number,
    yearly: number,
  },
  supplyApr: {
    daily: number,
    weekly: number,
    monthly: number,
    yearly: number,
  },
  liquidityUSD: number,
  maxLtv: number,
  lltv: number,
  link: string,
};

export const apyToApr = (apy: number) => Math.log(1 + apy);

export const isDefined = <T>(value: T | null | undefined): value is T => value !== null && value !== undefined;

export const average = (array: number[]) => array.reduce((value, total) => total + value) / array.length;

export const isCorrelated = (symbol: string, type: 'btc' | 'eth' | 'usd') => {
  switch (type) {
    case 'btc':
      return symbol.toLowerCase().includes('btc');
    case 'eth':
      return symbol.toLowerCase().includes('eth');
    case 'usd':
      return symbol.toLowerCase().includes('usd') ||
        symbol.toLowerCase().includes('usr') ||
        symbol.toLowerCase().includes('rlp') ||
        symbol.toLowerCase() === 'gho';
  }
}

export const fetchRetry = async (url: string) => {
  const retries = 7;
  const delay = 250;
  let lastError: unknown;

  for (let tries = 0; tries <= retries; tries++) {
    try {
      return await fetch(url);
    } catch (e) {
      lastError = e;
      if (tries < retries) {
        await new Promise(resolve => setTimeout(resolve, delay * 2**tries));
      }
    }
  }

  throw lastError;
};
