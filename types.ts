
export type TradeStatus = 'WON' | 'LOST' | 'PENDING';
export type TradeSide = 'YES' | 'NO';

// This interface is now structured to match a realistic API response for a trade.
export interface Trade {
  id: string;
  marketId: string;
  marketTitle: string;
  category: string;
  side: TradeSide;
  amount: number; // The amount staked
  price: number; // The odds/price
  status: TradeStatus;
  timestamp: Date;
  realizedPnl: number;
  feesPaid: number;
}

export interface DashboardStats {
  totalPnl: number; // Gross PnL
  netPnl: number; // Net PnL (totalPnl - totalFeesPaid)
  totalFeesPaid: number;
  totalInvested: number;
  winRate: number;
  roi: number; // Based on Net PnL
  winCount: number;
  lossCount: number;
  pendingCount: number;
}

export interface PnlChartData {
  date: string;
  cumulativePnl: number;
}
