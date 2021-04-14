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

const PlayerPlaytypeChart = () => {
  const [selectedPlayer, setSelectedPlayer] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState([2021]);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const selectedPlayerData = useMemo(
    () => playerPlaytypeData.filter(
      p => p.season === selectedSeason && p.TEAM_ID === selectedTeam && p.PLAYER_ID === selectedPlayer
    ),
    [selectedSeason, selectedTeam, selectedPlayer]
  );
  const selectedColors = useMemo(
    () => colors.find(c => c.TEAM_ID === selectedTeam),
    [selectedTeam]
  );

  return (
    <Wrapper>
      <SelectionWrapper>
        <PlayerSelector
          playerPlaytypeData={playerPlaytypeData}
          selectedPlayer={selectedPlayer}
          setSelectedPlayer={setSelectedPlayer}
          selectedTeam={selectedTeam}
          setSelectedTeam={setSelectedTeam}
          selectedSeason={selectedSeason}
          setSelectedSeason={setSelectedSeason}
        />
      </SelectionWrapper>
      <ChartWrapper>
        {selectedPlayerData &&
          <ResponsiveContainer minHeight={500}>
            <ScatterChart
              data={selectedPlayerData}
              margin={{ top: 5, right: 30, left: 50, bottom: 15 }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <Scatter
                data={selectedPlayerData}
                fill={selectedColors?.Primary || '#17408B'}
              >
                <LabelList dataKey="playtype_clean" position="right" />
              </Scatter>
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
