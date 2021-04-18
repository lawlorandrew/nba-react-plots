import React, { useMemo, useState } from 'react';
import { PageWrapper } from '../../../shared/styled-components';
import Chart from './chart';
import StatSelector from './stat-selector';
import playerPlaytypeData from '../../../data/P-playtypes.json';
import colors from '../../../data/colors.json';
import uniqBy from 'lodash/uniqBy';
import orderBy from 'lodash/orderBy';
import take from 'lodash/take';
import isEmpty from 'lodash/isEmpty';
import Search from './search';
import StatsTable from '../player-playtype/stats-table';

const LeagueLeaders = () => {
  const statOptions = uniqBy(playerPlaytypeData, d => d.playtype_clean).map(d => d.playtype_clean);
  const seasons = uniqBy(playerPlaytypeData, d => d.season).map(d => d.season);
  const [selectedStat, setSelectedStat] = useState(statOptions[0]);
  const [selectedSeason, setSelectedSeason] = useState(2021);
  const [searchValue, setSearchValue] = useState('');
  const selectedData = useMemo(
    () =>
      // take(
      orderBy(
        playerPlaytypeData
          .filter(d => d.playtype_clean === selectedStat && d.season === selectedSeason)
          .map(d => ({
            ...d,
            ...colors.find(c => c.TEAM_ID === d.TEAM_ID)
          })),
        d => d.POSS,
        'desc'
      ),
    //   50
    // ),
    [selectedStat, selectedSeason],
  );
  const highlightedData = useMemo(
    () =>
      take(
        orderBy(
          selectedData.filter(
            (d) => d.PLAYER_NAME.toLowerCase().includes(searchValue.toLowerCase())
          ),
          d => d.POSS,
          'desc',
        ),
        10,
      ),
    [searchValue, selectedData],
  );

  return (
    <PageWrapper>
      <StatSelector
        selectedStat={selectedStat}
        onSelectStat={setSelectedStat}
        statOptions={statOptions}
        selectedSeason={selectedSeason}
        onSelectSeason={setSelectedSeason}
        seasons={seasons}
      />
      <Chart
        data={selectedData}
        highlightedData={highlightedData}
        shouldHighlight={!isEmpty(searchValue)}
      />
      <Search
        onSearch={setSearchValue}
        searchValue={searchValue}
        highlightedData={highlightedData}
      />
      <StatsTable
        data={highlightedData}
        columns={[selectedStat]}
        shouldBold={false}
      />
    </PageWrapper>
  )
};

export default LeagueLeaders;
