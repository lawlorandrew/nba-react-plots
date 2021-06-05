import React from 'react';
import { Form } from 'react-bootstrap';
import { FlexWrapper } from '../../../shared/styled-components';

const modeOptions = [
  {
    name: 'Efficiency',
    id: 'PPP',
  },
  {
    name: 'Frequency',
    id: 'POSS_PCT',
  },
];

const TeamSelector = ({
  onSelectTeam,
  selectedTeam,
  teamOptions,
  onSelectSeason,
  selectedSeason,
  seasons,
  onSelectMode,
  selectedMode,
}) => {
  const onChangeTeam = e => {
    onSelectTeam(parseInt(e.target.value));
  };

  const onChangeMode = e => {
    onSelectMode(e.target.value);
  };

  const onChangeSeason = e => {
    onSelectSeason(parseInt(e.target.value));
  };

  return (
    <FlexWrapper>
      <Form.Control as="select" onChange={onChangeSeason} value={selectedSeason}>
        {seasons.map(season => <option key={season.id} value={season.id}>{season.name}</option>)}
      </Form.Control>
      <Form.Control as="select" onChange={onChangeTeam} value={selectedTeam}>
        {teamOptions.map(team => <option key={team.id} value={team.id}>{team.name}</option>)}
      </Form.Control>
      <Form.Control as="select" onChange={onChangeMode} value={selectedMode}>
        {modeOptions.map(mode => <option key={mode.id} value={mode.id}>{mode.name}</option>)}
      </Form.Control>
    </FlexWrapper>
  );
};

export default TeamSelector;
