import React, { useMemo, useState } from 'react';
import Form from 'react-bootstrap/Form';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';

import playerPlaytypeData from '../../../data/P-playtypes.json';
import { CartesianGrid, ResponsiveContainer, ScatterChart, XAxis, YAxis } from 'recharts';
import { Tooltip } from 'bootstrap';

const PlayerPlaytypeChart = () => {
  const seasons = useMemo(
    () => uniqBy(playerPlaytypeData, d => d.season).map(d => d.season),
    [],
  );
  const [selectedSeason, setSelectedSeason] = useState(2021);
  const teams = useMemo(
    () =>
      sortBy(
        uniqBy(
          playerPlaytypeData
            .filter(d => d.season === selectedSeason)
            .map(d => ({ id: d.TEAM_ID, name: d.TEAM_NAME })),
          d => d.id
        ),
        d => d.name
      ),
    [selectedSeason],
  );
  const [selectedTeam, setSelectedTeam] = useState(teams[0].id);
  const players = useMemo(
    () =>
      sortBy(
        uniqBy(
          playerPlaytypeData
            .filter(
              p => p.TEAM_ID === selectedTeam && p.season === selectedSeason
            )
            .map(d => ({ id: d.PLAYER_ID, name: d.PLAYER_NAME })),
          p => p.id,
        ),
        p => p.name,
      ),
    [selectedTeam, selectedSeason],
  );
  const [selectedPlayer, setSelectedPlayer] = useState(players[0].id);
  const selectedPlayerData = useMemo(
    () => playerPlaytypeData.filter(
      p => p.season === selectedSeason && p.TEAM_ID === selectedTeam && p.PLAYER_ID === selectedPlayer
    ),
    [selectedSeason, selectedTeam, selectedPlayer]
  );
  console.log(selectedPlayerData);

  const onChangeSeason = e => setSelectedSeason(parseInt(e.target.value));

  const onChangeTeam = e => setSelectedTeam(parseInt(e.target.value));

  const onChangePlayer = e => setSelectedPlayer(parseInt(e.target.value));

  return (<div>
    <Form.Control as="select" onChange={onChangeSeason} value={selectedSeason}>
      {seasons.map(s => <option value={s} key={s}>{s}</option>)}
    </Form.Control>
    <Form.Control as="select" onChange={onChangeTeam} value={selectedTeam}>
      {teams.map(t => <option value={t.id} key={t.id}>{t.name}</option>)}
    </Form.Control>
    <Form.Control as="select" onChange={onChangePlayer} value={selectedPlayer} disabled={!selectedSeason || !selectedTeam}>
      {players.map(p => <option value={p.id} key={p.id}>{p.name}</option>)}
    </Form.Control>
    {selectedPlayerData && <ResponsiveContainer height={500} width={500}>
      <ScatterChart data={selectedPlayerData}>
        <CartesianGrid />
        <XAxis dataKey="POSS_PCT" />
        <YAxis dataKey="PERCENTILE" />
        <Tooltip />
      </ScatterChart>
    </ResponsiveContainer>}
  </div>);
};

export default PlayerPlaytypeChart;
