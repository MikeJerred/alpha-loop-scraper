import { Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface Database {
  loops: LoopTable;
  yields: YieldTable;
}

export interface LoopTable {
  id: Generated<number>;
  chain_id: number;
  protocol: 'aave' | 'compound' | 'morpho';

  borrow_asset_address: string;
  borrow_asset_symbol: string;

  supply_asset_address: string;
  supply_asset_symbol: string;

  borrow_apr_daily: number;
  borrow_apr_weekly: number;
  borrow_apr_monthly: number;
  borrow_apr_yearly: number;

  supply_apr_daily: number;
  supply_apr_weekly: number;
  supply_apr_monthly: number;
  supply_apr_yearly: number;

  liquidity_usd: number;
  max_ltv: number;
  lltv: number;
  link: string;
}

export type Loop = Selectable<LoopTable>;
export type NewLoop = Insertable<LoopTable>;
export type LoopUpdate = Updateable<LoopTable>;

export interface YieldTable {
  id: Generated<number>;
  asset_addresses: string[];
  asset_symbol: string;
  yield_apr_daily: number | null;
  yield_apr_weekly: number | null;
  yield_apr_monthly: number | null;
  yield_apr_yearly: number | null;
}
