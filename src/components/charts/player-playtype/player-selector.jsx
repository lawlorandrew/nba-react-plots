import React, { useMemo, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';

const PlayerSelector = ({
  playerPlaytypeData,
  selectedPlayer,
  setSelectedPlayer,
  selectedTeam,
  setSelectedTeam,
  selectedSeason,
  setSelectedSeason,
}) => {
  const seasons = useMemo(
    () => uniqBy(playerPlaytypeData, d => d.season).map(d => d.season),
    [playerPlaytypeData],
  );
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
    [selectedSeason, playerPlaytypeData],
  );
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
    [selectedTeam, selectedSeason, playerPlaytypeData],
  );
  useEffect(() => {
    if (!selectedTeam || !teams.find(t => t.id === selectedTeam)) {
      setSelectedTeam(teams[0].id);
    }
  }, [teams, setSelectedTeam, selectedTeam]);

  useEffect(() => {
    if (players.length && (!selectedPlayer || !players.find(p => p.id === selectedPlayer))) {
      setSelectedPlayer(players[0].id);
    }
  }, [players, setSelectedPlayer, selectedPlayer]);

  const onChangeSeason = e => setSelectedSeason(parseInt(e.target.value));

  const onChangeTeam = e => setSelectedTeam(parseInt(e.target.value));

  const onChangePlayer = e => setSelectedPlayer(parseInt(e.target.value));
  return (
    <>
      <Form.Control as="select" onChange={onChangeSeason} value={selectedSeason}>
        {seasons.map(s => <option value={s} key={s}>{s}</option>)}
      </Form.Control>
      <Form.Control as="select" onChange={onChangeTeam} value={selectedTeam}>
        {teams.map(t => <option value={t.id} key={t.id}>{t.name}</option>)}
      </Form.Control>
      <Form.Control as="select" onChange={onChangePlayer} value={selectedPlayer} disabled={!selectedSeason || !selectedTeam}>
        {players.map(p => <option value={p.id} key={p.id}>{p.name}</option>)}
      </Form.Control>
    </>
  )
};

export default PlayerSelector;
