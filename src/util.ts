/**
 * @param apy APY in decimal form, e.g. 10% APY should be provided as the number 0.1
 * @returns The equivalent APR in decimal form, e.g. a value of 0.1 represents 10% APR
 */
export const apyToApr = (apy: number) => Math.log(1 + apy);

export const average = (array: number[]) => array.length > 0 ? array.reduce((total, value) => total + value) / array.length : 0;

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

export const isDefined = <T>(value: T | null | undefined): value is T => value !== null && value !== undefined;

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
