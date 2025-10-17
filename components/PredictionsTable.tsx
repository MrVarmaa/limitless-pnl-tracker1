
import React, { useState } from 'react';
import { Trade, TradeStatus } from '../types';
import { ExportIcon } from './icons/ExportIcon';

interface TradesTableProps {
  trades: Trade[];
  onExport: () => void;
}

const statusStyles: Record<TradeStatus, string> = {
  WON: 'bg-green-500/10 text-accent-green',
  LOST: 'bg-red-500/10 text-accent-red',
  PENDING: 'bg-yellow-500/10 text-accent-yellow',
};

const TradesTable: React.FC<TradesTableProps> = ({ trades, onExport }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(trades.length / itemsPerPage);
  const paginatedTrades = trades.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
    }
  };

  return (
    <div className="bg-surface p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-text-primary">Trade History</h3>
        <button onClick={onExport} className="flex items-center space-x-2 px-3 py-2 bg-surface-light hover:bg-gray-700 text-text-secondary rounded-md transition-colors">
          <ExportIcon />
          <span>Export CSV</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-surface-light text-text-secondary text-sm">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Market</th>
              <th className="p-3">Category</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-right">Amount</th>
              <th className="p-3 text-right">Fees Paid</th>
              <th className="p-3 text-right">Realized PnL</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTrades.map((t) => (
              <tr key={t.id} className="border-b border-surface-light hover:bg-surface-light/50">
                <td className="p-3 text-sm text-text-secondary">{t.timestamp.toLocaleDateString()}</td>
                <td className="p-3 max-w-xs truncate text-text-primary" title={t.marketTitle}>{t.marketTitle}</td>
                <td className="p-3 text-text-secondary">{t.category}</td>
                <td className="p-3 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[t.status]}`}>
                    {t.status}
                  </span>
                </td>
                <td className="p-3 text-right font-mono text-text-primary">${t.amount.toFixed(2)}</td>
                <td className="p-3 text-right font-mono text-text-secondary">${t.feesPaid.toFixed(2)}</td>
                <td className={`p-3 text-right font-mono ${t.realizedPnl > 0 ? 'text-accent-green' : t.realizedPnl < 0 ? 'text-accent-red' : 'text-text-primary'}`}>
                  {t.realizedPnl > 0 ? '+' : ''}${t.realizedPnl.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 space-x-2">
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 bg-surface-light rounded disabled:opacity-50 hover:bg-gray-700 text-text-primary">Prev</button>
            <span className="text-text-secondary">Page {currentPage} of {totalPages}</span>
            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 bg-surface-light rounded disabled:opacity-50 hover:bg-gray-700 text-text-primary">Next</button>
        </div>
      )}
    </div>
  );
};

export default TradesTable;
