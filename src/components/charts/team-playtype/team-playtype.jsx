import React, { useState, useMemo } from 'react';
import { ColumnPageWrapper } from '../../../shared/styled-components';
import TeamSelector from './team-selector';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import meanBy from 'lodash/meanBy';
import teamPlaytypeData from '../../../data/T-playtypes.json';
import colors from '../../../data/colors.json';
import Chart from './chart';

const nbaAverages = uniqBy(
  teamPlaytypeData,
  t => t.playtype_clean,
).map(t => {
  const filteredData = teamPlaytypeData.filter(tpd => tpd.playtype_clean === t.playtype_clean);
  return {
    playtype: t.playtype_clean,
    avg_PPP: meanBy(
      filteredData,
      tpd => tpd.PPP,
    ),
    avg_POSS_PCT: meanBy(
      filteredData,
      tpd => tpd.POSS_PCT,
    ),
  };
});

const TeamPlaytypeChart = () => {
  const [selectedTeam, setSelectedTeam] = useState(1610612737);
  const [selectedSeason, setSelectedSeason] = useState(2021);
  const [selectedMode, setSelectedMode] = useState('POSS_PCT');
  const seasons = uniqBy(teamPlaytypeData, d => d.season).map(d => ({
      id: d.season,
      name: `${d.season - 1}-${d.season % 100}`,
    }));
  const teams = useMemo(
    () =>
      sortBy(
        uniqBy(
          teamPlaytypeData
            .filter(d => d.season === selectedSeason)
            .map(d => ({ id: d.TEAM_ID, name: d.TEAM_ABBREVIATION })),
          d => d.id
        ),
        d => d.name
      ),
    [selectedSeason],
  );
  const selectedTeamData = useMemo(
    () => ({
        data: teamPlaytypeData.filter(
          t => t.season === selectedSeason &&
            t.TEAM_ID === selectedTeam
        ).map(d => ({
          ...d,
          nba_avg_PPP: nbaAverages.find(a => a.playtype === d.playtype_clean).avg_PPP,
          nba_avg_POSS_PCT: nbaAverages.find(a => a.playtype === d.playtype_clean).avg_POSS_PCT,
        })),
        colors: colors.find(c => c.TEAM_ID === selectedTeam),
    }),
    [selectedMode, selectedSeason, selectedTeam]
  );
  return (
    <ColumnPageWrapper>
      <TeamSelector
        selectedTeam={selectedTeam}
        onSelectTeam={setSelectedTeam}
        teamOptions={teams}
        selectedSeason={selectedSeason}
        onSelectSeason={setSelectedSeason}
        seasons={seasons}
        onSelectMode={setSelectedMode}
        selectedMode={selectedMode}
      />
      <Chart
        data={selectedTeamData.data}
        colors={selectedTeamData.colors}
        mode={selectedMode}
      />
    </ColumnPageWrapper>
  );
};

export default TeamPlaytypeChart;