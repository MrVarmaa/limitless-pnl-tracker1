
import { useState, useEffect, useCallback } from 'react';
import { fetchUserTrades } from '../services/limitlessService';
import { Trade, DashboardStats, PnlChartData } from '../types';

interface LimitlessData {
  trades: Trade[];
  stats: DashboardStats;
  pnlChartData: PnlChartData[];
  categoryChartData: { name: string; value: number }[];
}

export const useLimitlessData = (walletAddress: string | null) => {
  const [data, setData] = useState<LimitlessData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingMockData, setIsUsingMockData] = useState(false);

  const fetchData = useCallback(async () => {
    if (!walletAddress) {
        setData(null);
        setLoading(false);
        return;
    }
    setLoading(true);
    setError(null);
    setIsUsingMockData(false);
    try {
      const result = await fetchUserTrades(walletAddress);
      setData({
        trades: result.trades,
        stats: result.stats,
        pnlChartData: result.pnlChartData,
        categoryChartData: result.categoryChartData,
      });
      setIsUsingMockData(result.isMock);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [walletAddress]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const exportToCsv = useCallback(() => {
    if (!data || !data.trades.length) {
      alert("No data to export.");
      return;
    }

    const headers = ['ID', 'Timestamp', 'Market', 'Category', 'Side', 'Status', 'Amount', 'Price', 'Fees Paid', 'Realized PnL'];
    const rows = data.trades.map(t => [
      t.id,
      t.timestamp.toISOString(),
      `"${t.marketTitle.replace(/"/g, '""')}"`,
      t.category,
      t.side,
      t.status,
      t.amount.toFixed(2),
      t.price.toFixed(4),
      t.feesPaid.toFixed(2),
      t.realizedPnl.toFixed(2),
    ].join(','));

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `limitless_trades_export_${walletAddress?.slice(0,6)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [data, walletAddress]);

  return { ...data, loading, error, isUsingMockData, exportToCsv, refetch: fetchData };
};
