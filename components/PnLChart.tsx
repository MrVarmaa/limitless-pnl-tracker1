
import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { PnlChartData } from '../types';

interface CumulativePnlChartProps {
  data: PnlChartData[];
  chartType: 'line' | 'bar';
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface p-2 border border-surface-light rounded-md shadow-lg">
        <p className="label text-text-secondary">{`${label}`}</p>
        <p className={`intro ${payload[0].value >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
          {`PnL: $${payload[0].value.toFixed(2)}`}
        </p>
      </div>
    );
  }
  return null;
};

const CumulativePnlChart: React.FC<CumulativePnlChartProps> = ({ data, chartType }) => {
  const isProfit = data.length > 0 && data[data.length - 1].cumulativePnl >= 0;

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        {chartType === 'line' ? (
          <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2C2C30" />
            <XAxis dataKey="date" stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{fontSize: "14px", color: "#A1A1AA"}}/>
            <Line 
              type="monotone" 
              dataKey="cumulativePnl" 
              stroke={isProfit ? '#4ADE80' : '#F87171'}
              strokeWidth={2}
              dot={false}
              name="Cumulative PnL"
            />
          </LineChart>
        ) : (
          <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2C2C30" />
            <XAxis dataKey="date" stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{fontSize: "14px", color: "#A1A1AA"}}/>
            <Bar dataKey="cumulativePnl" name="Cumulative PnL">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.cumulativePnl >= 0 ? '#4ADE80' : '#F87171'} />
              ))}
            </Bar>
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default CumulativePnlChart;
