import React from 'react';
import { CartesianGrid, LabelList, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';
import { getPlayerInitials } from '../../../shared/utils';
import PlayerPlaytypeTooltip from '../player-playtype/player-playtype-tooltip';
import CustomDot from './custom-dot';

const Chart = ({ data }) => {
  console.log(data);
  return (
    <ResponsiveContainer>
      <ScatterChart
        margin={{ top: 5, right: 30, left: 50, bottom: 15 }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <Scatter
          data={data}
        >
          <LabelList
            position="right"
            valueAccessor={(val) => {
              return getPlayerInitials(val.PLAYER_NAME);
            }}
          />
        </Scatter>
        <XAxis
          type="number"
          dataKey="POSS"
        />
        <YAxis
          type="number"
          dataKey="PPP"
        />
        <Tooltip content={<PlayerPlaytypeTooltip />} />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default Chart;
