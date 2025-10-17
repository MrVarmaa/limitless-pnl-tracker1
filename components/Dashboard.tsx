
import React, { useState } from 'react';
import { useLimitlessData } from '../hooks/useLimitlessData';
import StatCard from './StatCard';
import CumulativePnlChart from './PnLChart';
import CategoryPieChart from './CategoryPieChart';
import TradesTable from './PredictionsTable';
import PromotionalBanners from './PromotionalBanners';
import { StaticLogo } from './icons/AnimatedStar';
import { PnlIcon, FeesIcon, InvestedIcon, WinRateIcon, RoiIcon, TrophyIcon } from './icons/StatIcons';

interface DashboardProps {
  walletAddress: string;
}

const Dashboard: React.FC<DashboardProps> = ({ walletAddress }) => {
  const { trades, stats, pnlChartData, categoryChartData, loading, error, refetch, exportToCsv } = useLimitlessData(walletAddress);
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  
  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
            <StaticLogo className="animate-spin" />
            <span className="mt-4 text-text-primary text-lg">Analyzing your performance...</span>
        </div>
    );
  }

  if (error) {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center">
            <h2 className="text-2xl font-bold text-accent-red mb-4">Oops! Something went wrong.</h2>
            <p className="text-text-secondary mb-6">{error}</p>
            <button
                onClick={refetch}
                className="px-6 py-2 bg-primary hover:bg-primary-hover text-text-on-primary font-semibold rounded-lg transition-colors"
            >
                Try Again
            </button>
        </div>
    );
  }

  if (!stats || !trades || !pnlChartData || !categoryChartData) {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-4">No Data Found</h2>
            <p className="text-text-secondary">We couldn't find any trading activity for this address.</p>
        </div>
    );
  }

  return (
    <div className="space-y-6">
      <PromotionalBanners />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <StatCard title="Net PnL" value={`${stats.netPnl >= 0 ? '+' : ''}$${stats.netPnl.toFixed(2)}`} isPositive={stats.netPnl >= 0} icon={<PnlIcon />}/>
        <StatCard title="Win Rate" value={`${stats.winRate.toFixed(1)}%`} isPositive={stats.winRate >= 50} icon={<WinRateIcon />}/>
        <StatCard title="ROI" value={`${stats.roi.toFixed(1)}%`} isPositive={stats.roi >= 0} icon={<RoiIcon />}/>
        <StatCard title="Wins / Losses" value={`${stats.winCount} / ${stats.lossCount}`} icon={<TrophyIcon />}/>
        <StatCard title="Total Invested" value={`$${stats.totalInvested.toFixed(2)}`} icon={<InvestedIcon />}/>
        <StatCard title="Total Fees Paid" value={`$${stats.totalFeesPaid.toFixed(2)}`} icon={<FeesIcon />}/>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-surface p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-text-primary">Cumulative PnL</h3>
                <div className="flex space-x-1 bg-surface-light p-1 rounded-md">
                    <button onClick={() => setChartType('line')} className={`px-3 py-1 text-sm rounded transition-colors ${chartType === 'line' ? 'bg-primary text-text-on-primary font-semibold' : 'text-text-secondary hover:bg-gray-700'}`}>Line</button>
                    <button onClick={() => setChartType('bar')} className={`px-3 py-1 text-sm rounded transition-colors ${chartType === 'bar' ? 'bg-primary text-text-on-primary font-semibold' : 'text-text-secondary hover:bg-gray-700'}`}>Bar</button>
                </div>
            </div>
            <CumulativePnlChart data={pnlChartData} chartType={chartType} />
        </div>
        <div className="lg:col-span-2 bg-surface p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-text-primary mb-4">Investment by Category</h3>
            <CategoryPieChart data={categoryChartData} />
        </div>
      </div>
      <TradesTable trades={trades} onExport={exportToCsv} />
    </div>
  );
};

export default Dashboard;
