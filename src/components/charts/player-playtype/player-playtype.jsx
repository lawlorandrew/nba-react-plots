import React, { useMemo, useState } from 'react';

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
import styled from 'styled-components';

import playerPlaytypeData from '../../../data/P-playtypes.json';
import colors from '../../../data/colors.json';
import PlayerPlaytypeTooltip from './player-playtype-tooltip';
import PlayerSelector from './player-selector';
import { Button } from 'react-bootstrap';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

const SelectionWrapper = styled.div`

`;

const ChartWrapper = styled.div`
  flex-grow: 1;
`;

const blankPlayer = { player: undefined, season: 2021, team: undefined };
const PlayerPlaytypeChart = () => {
  const [selectedPlayerFilters, setSelectedPlayerFilters] = useState([{ ...blankPlayer }]);
  const selectedPlayerData = useMemo(
    () => selectedPlayerFilters.map(
      (selectedPlayerFilter) => ({
        data: playerPlaytypeData.filter(
          p => p.season === selectedPlayerFilter.season && p.TEAM_ID === selectedPlayerFilter.team && p.PLAYER_ID === selectedPlayerFilter.player
        ),
        colors: colors.find(c => c.TEAM_ID === selectedPlayerFilter.team),
      })
    ),
    [selectedPlayerFilters]
  );

  const onAddPlayer = () => setSelectedPlayerFilters([...selectedPlayerFilters, {...blankPlayer}])

  return (
    <Wrapper>
      <SelectionWrapper>
        {selectedPlayerFilters.map((spf, index) => <PlayerSelector
          key={index}
          playerPlaytypeData={playerPlaytypeData}
          selectedPlayerFilter={spf}
          setSelectedPlayerFilter={
            (val) =>
              setSelectedPlayerFilters(selectedPlayerFilters.map((innerSpf, i) => {
                if (index === i) {
                  return val;
                }
                return innerSpf;
              }))
          }
        />)}
        <Button onClick={onAddPlayer}>Add Player</Button>
      </SelectionWrapper>
      <ChartWrapper>
        {selectedPlayerData &&
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
                    console.log(val)
                    return selectedPlayerFilters.length > 1 ? `${val.PLAYER_NAME}, ${val.TEAM_ABBR} - ${val.season} ${val.playtype_clean}` : val.playtype_clean;
                  }}
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
          </ResponsiveContainer>}
      </ChartWrapper>
    </Wrapper>
  );
};

export default PlayerPlaytypeChart;
