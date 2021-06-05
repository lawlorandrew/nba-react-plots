import React from 'react';
import { BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Bar, Legend } from 'recharts';

const Chart = ({ data, colors, mode }) => {
  return (
    <ResponsiveContainer>
      <BarChart layout='vertical' data={data} margin={{ top: 25, right: 30, left: 30, bottom: 15 }}>
        <CartesianGrid stroke="#f5f5f5" />
        <YAxis type='category' dataKey='playtype_clean' yAxisId={0} />
        <YAxis type='category' dataKey='playtype_clean' yAxisId={1} hide/>
        <XAxis type='number' />
        <Bar dataKey={mode} name={colors?.Full} fill={colors?.Primary} yAxisId={0} barSize={40} />
        <Bar dataKey={`nba_avg_${mode}`} name='NBA Average' fill={colors?.Secondary} yAxisId={1} barSize={20} />
        <Legend />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;