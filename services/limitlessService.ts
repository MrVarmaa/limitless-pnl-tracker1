
import { Trade, DashboardStats, PnlChartData, TradeStatus, TradeSide } from '../types';

export const fetchUserTrades = async (
  walletAddress: string
): Promise<{ 
  trades: Trade[]; 
  stats: DashboardStats; 
  pnlChartData: PnlChartData[]; 
  categoryChartData: { name: string; value: number }[];
  isMock: boolean; 
}> => {
  try {
    const response = await fetch(`/api/proxy?walletAddress=${walletAddress}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch from proxy');
    }

    const rawTrades: any[] = await response.json();
    
    const trades = transformRawTrades(rawTrades);
    const stats = calculateStats(trades);
    const pnlChartData = generatePnlChartData(trades);
    const categoryChartData = generateCategoryChartData(trades);

    console.log("Successfully fetched and processed real data from the API.");

    return {
      trades,
      stats,
      pnlChartData,
      categoryChartData,
      isMock: false,
    };

  } catch (error) {
    console.warn(`Live API fetch failed: ${error.message}. Falling back to mock data.`);
    return generateAndProcessMockData(walletAddress);
  }
};

const transformRawTrades = (rawTrades: any[]): Trade[] => {
    return rawTrades.map(raw => {
        const realizedPnl = parseFloat(raw.realized_pnl) || 0;
        const amount = parseFloat(raw.amount) || 0;
        
        let status: TradeStatus = 'PENDING';
        if (raw.outcome === 'WIN') status = 'WON';
        if (raw.outcome === 'LOSE') status = 'LOST';

        return {
            id: raw.id || `trade_${Math.random()}`,
            marketId: raw.market_id,
            marketTitle: raw.market_title || 'Unknown Market',
            category: raw.category || 'General',
            side: (raw.side === 'YES' ? 'YES' : 'NO') as TradeSide,
            amount: amount,
            price: parseFloat(raw.price) || 0,
            status: status,
            timestamp: new Date(raw.created_at || Date.now()),
            realizedPnl: realizedPnl,
            feesPaid: parseFloat(raw.fees_paid) || amount * 0.01,
        };
    }).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
};

const generateAndProcessMockData = async (walletAddress: string) => {
    console.log(`Generating mock data for wallet: ${walletAddress}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const trades = generateMockTrades(Math.floor(Math.random() * 50) + 20);
    const stats = calculateStats(trades);
    const pnlChartData = generatePnlChartData(trades);
    const categoryChartData = generateCategoryChartData(trades);

    return {
        trades,
        stats,
        pnlChartData,
        categoryChartData,
        isMock: true
    };
};

const MOCK_CATEGORIES = ['Crypto', 'Politics', 'Sports', 'E-Sports', 'Technology'];
const generateRandomDate = (start: Date, end: Date): Date => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const generateMockTrades = (count: number): Trade[] => {
  const trades: Trade[] = [];
  const now = new Date();
  const ninetyDaysAgo = new Date(new Date().setDate(now.getDate() - 90));

  for (let i = 0; i < count; i++) {
    const status: TradeStatus = ['WON', 'LOST', 'PENDING'][Math.floor(Math.random() * 3)] as TradeStatus;
    const amount = Math.random() * 200 + 10;
    let realizedPnl = 0;

    if (status === 'WON') realizedPnl = amount * (Math.random() * 1.5 + 0.2);
    else if (status === 'LOST') realizedPnl = -amount;

    trades.push({
      id: `trade_${i}_${Date.now()}`,
      marketId: `market_${i}`,
      marketTitle: `Mock Market Example #${i+1}`,
      category: MOCK_CATEGORIES[Math.floor(Math.random() * MOCK_CATEGORIES.length)],
      side: (Math.random() > 0.5 ? 'YES' : 'NO') as TradeSide,
      amount,
      price: Math.random() * 0.8 + 0.1,
      status,
      timestamp: generateRandomDate(ninetyDaysAgo, now),
      realizedPnl,
      feesPaid: amount * 0.01,
    });
  }
  return trades.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
};

const calculateStats = (trades: Trade[]): DashboardStats => {
  let totalInvested = 0, winCount = 0, lossCount = 0, pendingCount = 0, grossPnl = 0, totalFeesPaid = 0;
  for (const trade of trades) {
    totalInvested += trade.amount;
    totalFeesPaid += trade.feesPaid;
    if (trade.status === 'WON' || trade.status === 'LOST') {
      grossPnl += trade.realizedPnl;
      if (trade.status === 'WON') winCount++;
      if (trade.status === 'LOST') lossCount++;
    } else {
      pendingCount++;
    }
  }
  const netPnl = grossPnl - totalFeesPaid;
  const winRate = (winCount + lossCount) > 0 ? (winCount / (winCount + lossCount)) * 100 : 0;
  const roi = totalInvested > 0 ? (netPnl / totalInvested) * 100 : 0;
  return { totalPnl: grossPnl, netPnl, totalFeesPaid, totalInvested, winRate, roi, winCount, lossCount, pendingCount };
};

const generatePnlChartData = (trades: Trade[]): PnlChartData[] => {
  const pnlByDate: { [key: string]: number } = {};
  for (const trade of trades) {
    if (trade.status === 'PENDING') continue;
    const dateStr = trade.timestamp.toISOString().split('T')[0];
    pnlByDate[dateStr] = (pnlByDate[dateStr] || 0) + (trade.realizedPnl - trade.feesPaid);
  }
  const sortedDates = Object.keys(pnlByDate).sort();
  let cumulativePnl = 0;
  return sortedDates.map(date => {
    cumulativePnl += pnlByDate[date];
    return { date, cumulativePnl };
  });
};

const generateCategoryChartData = (trades: Trade[]): { name: string; value: number }[] => {
  const investmentByCategory: { [key: string]: number } = {};
  for (const trade of trades) {
    investmentByCategory[trade.category] = (investmentByCategory[trade.category] || 0) + trade.amount;
  }
  return Object.entries(investmentByCategory).map(([name, value]) => ({ name, value }));
};
