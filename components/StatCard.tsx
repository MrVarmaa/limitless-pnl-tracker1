
import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  isPositive?: boolean;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, isPositive, icon }) => {
  const valueColorClass = isPositive === undefined ? 'text-text-primary' : isPositive ? 'text-accent-green' : 'text-accent-red';

  return (
    <div className="bg-surface p-5 rounded-lg flex items-center space-x-4">
      <div className="p-3 bg-surface-light rounded-full text-primary">
        {icon}
      </div>
      <div>
        <p className="text-sm text-text-secondary font-medium">{title}</p>
        <p className={`text-2xl font-bold ${valueColorClass}`}>{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
