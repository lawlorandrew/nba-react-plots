import React, { useMemo, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import { SelectionWrapper } from '../../../shared/styled-components';
import { Button } from 'react-bootstrap';

const PlayerSelector = ({
  playerPlaytypeData,
  selectedPlayerFilter,
  setSelectedPlayerFilter,
  onRemovePlayer,
  canRemove,
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
            .filter(d => d.season === selectedPlayerFilter.season)
            .map(d => ({ id: d.TEAM_ID, name: d.TEAM_NAME })),
          d => d.id
        ),
        d => d.name
      ),
    [selectedPlayerFilter.season, playerPlaytypeData],
  );
  const players = useMemo(
    () =>
      sortBy(
        uniqBy(
          playerPlaytypeData
            .filter(
              p => p.TEAM_ID === selectedPlayerFilter.team && p.season === selectedPlayerFilter.season
            )
            .map(d => ({ id: d.PLAYER_ID, name: d.PLAYER_NAME })),
          p => p.id,
        ),
        p => p.name,
      ),
    [selectedPlayerFilter.team, selectedPlayerFilter.season, playerPlaytypeData],
  );
  useEffect(() => {
    if (!selectedPlayerFilter.team || !teams.find(t => t.id === selectedPlayerFilter.team)) {
      setSelectedPlayerFilter({ ...selectedPlayerFilter, team: teams[0].id });
    }
  }, [teams, setSelectedPlayerFilter, selectedPlayerFilter]);

  useEffect(() => {
    if (players.length && (!selectedPlayerFilter.player || !players.find(p => p.id === selectedPlayerFilter.player ))) {
      setSelectedPlayerFilter({ ...selectedPlayerFilter, player: players[0].id });
    }
  }, [players, setSelectedPlayerFilter, selectedPlayerFilter]);

  const onChangeSeason = e => setSelectedPlayerFilter({ ...selectedPlayerFilter, season: parseInt(e.target.value) });

  const onChangeTeam = e => setSelectedPlayerFilter({ ...selectedPlayerFilter, team: parseInt(e.target.value) });

  const onChangePlayer = e => setSelectedPlayerFilter({ ...selectedPlayerFilter, player: parseInt(e.target.value) });

  return (
    <SelectionWrapper>
      <Form.Control as="select" onChange={onChangeSeason} value={selectedPlayerFilter.season}>
        {seasons.map(s => <option value={s} key={s}>{s}</option>)}
      </Form.Control>
      <Form.Control as="select" onChange={onChangeTeam} value={selectedPlayerFilter.team}>
        {teams.map(t => <option value={t.id} key={t.id}>{t.name}</option>)}
      </Form.Control>
      <Form.Control as="select" onChange={onChangePlayer} value={selectedPlayerFilter.player} disabled={!selectedPlayerFilter.season || !selectedPlayerFilter.team}>
        {players.map(p => <option value={p.id} key={p.id}>{p.name}</option>)}
      </Form.Control>
      <Button variant="danger" onClick={onRemovePlayer} disabled={!canRemove}>Remove</Button>
    </SelectionWrapper>
  )
};

export default PlayerSelector;
