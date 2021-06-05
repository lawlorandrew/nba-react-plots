import React, { useMemo, useState } from 'react';
import playerPlaytypeData from '../../../data/P-playtypes.json';
import colors from '../../../data/colors.json';
import PlayerSelector from './player-selector';
import { Button } from 'react-bootstrap';
import uniqBy from 'lodash/uniqBy';
import { PageWrapper, TableWrapper } from '../../../shared/styled-components';
import Chart from './chart';
import StatsTable from './stats-table';

const blankPlayer = { player: undefined, season: 2021, team: undefined };
const PlayerPlaytypeChart = () => {
  const [selectedPlayerFilters, setSelectedPlayerFilters] = useState([{ ...blankPlayer }]);
  const selectedPlayerData = useMemo(
    () => selectedPlayerFilters.map(
      (selectedPlayerFilter) => ({
        data: playerPlaytypeData.filter(
          p => p.season === selectedPlayerFilter.season &&
            p.TEAM_ID === selectedPlayerFilter.team &&
            p.PLAYER_ID === selectedPlayerFilter.player &&
            p.POSS > 0
        ),
        colors: colors.find(c => c.TEAM_ID === selectedPlayerFilter.team),
      })
    ),
    [selectedPlayerFilters]
  );

  const tableData = useMemo(
    () => selectedPlayerData.reduce((acc, cur) => [...acc, ...cur.data], []),
    [selectedPlayerData],
  );

  const playtypes = uniqBy(playerPlaytypeData, p => p.playtype_clean).map(p => p.playtype_clean);

  const onAddPlayer = () => setSelectedPlayerFilters([...selectedPlayerFilters, { ...blankPlayer }])

  return (
    <PageWrapper>
      <div style={{ gridRow: '1 / span 1', gridColumn: '1 / span 1'}}>
        {selectedPlayerFilters.map((spf, index) =>
          <PlayerSelector
            key={index}
            canRemove={selectedPlayerFilters.length > 1}
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
            onRemovePlayer={() => setSelectedPlayerFilters(
              selectedPlayerFilters.filter(
                (_innerSpf, i) => {
                  return index !== i;
                }
              )
            )}
          />)}
        <Button onClick={onAddPlayer}>Add Player</Button>
      </div>
      <div style={{ gridRow: '1 / span 1', gridColumn: '2 / span 1'}}>
      {selectedPlayerData &&
        <Chart
          selectedPlayerData={selectedPlayerData}
          selectedPlayerFilters={selectedPlayerFilters}
        />
      }
      </div>
      <TableWrapper style={{ gridRow: '2 / span 1', gridColumn: '1 / span 2'}}>
        <StatsTable
          data={tableData}
          columns={playtypes}
          shouldBold={true}
        />
      </TableWrapper>
    </PageWrapper>
  );
};

export default PlayerPlaytypeChart;
