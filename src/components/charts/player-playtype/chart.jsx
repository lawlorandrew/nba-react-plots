import React from 'react';
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from 'recharts';
import { getPlayerInitials } from '../../../shared/utils';
import PlayerPlaytypeTooltip from './player-playtype-tooltip';


const Chart = ({ selectedPlayerData, selectedPlayerFilters }) => (
  <ResponsiveContainer minHeight={500}>
    <ScatterChart
      margin={{ top: 5, right: 30, left: 50, bottom: 15 }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      {selectedPlayerData.map((datum, i) => <Scatter
        key={i}
        data={datum.data}
        fill={datum.colors?.Primary || '#17408B'}
      >
        <LabelList
          position="right"
          valueAccessor={(val) => {
            return selectedPlayerFilters.length > 1 ? `${getPlayerInitials(val.PLAYER_NAME)} ${val.season} ${val.playtype_clean}` : val.playtype_clean;
          }}
          fontSize={selectedPlayerFilters.length > 1 ? 10 : 14}
        />
      </Scatter>)}
      <XAxis
        type="number"
        dataKey="POSS_PCT"
        domain={[0, 1]}
        label={{
          value: "Frequency",
          position: "center",
          dy: 10,
        }}
      />
      <YAxis
        dataKey="PERCENTILE"
        type="number"
        domain={[0, 1]}
        label={{
          value: "Efficiency",
          position: "insideLeft",
          offset: -50,
        }}
      />
      <Tooltip content={<PlayerPlaytypeTooltip />} />
    </ScatterChart>
  </ResponsiveContainer>
);

export default Chart;