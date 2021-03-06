import React, { useMemo, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import { SelectionWrapper } from '../../../shared/styled-components';
import styled from 'styled-components';
import { BsFillTrashFill } from '@react-icons/all-files/bs/BsFillTrashFill';

const StyledIcon = styled(BsFillTrashFill)`
  margin-left: 5px;
`;
const PlayerSelector = ({
  playerPlaytypeData,
  selectedPlayerFilter,
  setSelectedPlayerFilter,
  onRemovePlayer,
  canRemove,
  otherSelectedPlayers,
}) => {
  const seasons = useMemo(
    () => uniqBy(playerPlaytypeData, d => d.season).map(d => ({
      key: d.season,
      label: `${d.season - 1}-${d.season % 100}`,
    })),
    [playerPlaytypeData],
  );
  const teams = useMemo(
    () =>
      sortBy(
        uniqBy(
          playerPlaytypeData
            .filter(d => d.season === selectedPlayerFilter.season)
            .map(d => ({ id: d.TEAM_ID, name: d.TEAM_ABBREVIATION })),
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
            .filter(
              p => !(otherSelectedPlayers.map(f => `${f.player}|${f.team}|${f.season}`)).includes(p.key)
            )
            .map(d => ({ id: d.PLAYER_ID, name: d.PLAYER_NAME })),
          p => p.id,
        ),
        p => p.name,
      ),
    [selectedPlayerFilter.team, selectedPlayerFilter.season, playerPlaytypeData, otherSelectedPlayers],
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
      <div style={{ display: 'flex', columnGap: '5px' }}>
      <Form.Control as="select" onChange={onChangeSeason} value={selectedPlayerFilter.season}>
        {seasons.map(s => <option value={s.key} key={s.key}>{s.label}</option>)}
      </Form.Control>
      <Form.Control as="select" onChange={onChangeTeam} value={selectedPlayerFilter.team}>
        {teams.map(t => <option value={t.id} key={t.id}>{t.name}</option>)}
      </Form.Control>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Control as="select" onChange={onChangePlayer} value={selectedPlayerFilter.player} disabled={!selectedPlayerFilter.season || !selectedPlayerFilter.team}>
        {players.map(p => <option value={p.id} key={p.id}>{p.name}</option>)}
      </Form.Control>
      {canRemove && <StyledIcon color='#dc3545' onClick={onRemovePlayer} />}
      </div>
    </SelectionWrapper>
  )
};

export default PlayerSelector;
