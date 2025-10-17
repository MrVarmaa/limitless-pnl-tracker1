
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface CategoryPieChartProps {
  data: { name: string; value: number }[];
}

const COLORS = ['#D9F99D', '#4ADE80', '#FBBF24', '#60A5FA', '#C084FC'];

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
                backgroundColor: '#1A1A1E',
                border: '1px solid #2C2C30',
                borderRadius: '0.5rem',
                color: '#F8FAFC'
            }}
          />
          <Legend wrapperStyle={{fontSize: "14px", color: "#A1A1AA"}}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;
