import React from 'react';
import { CartesianGrid, ResponsiveContainer, ScatterChart } from 'recharts';

const Chart = () => {
  return (
    <ResponsiveContainer>
      <ScatterChart>
        <CartesianGrid />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default Chart;
