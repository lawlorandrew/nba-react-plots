import React from 'react';
import { Form } from 'react-bootstrap';
import { SelectionWrapper } from '../../../shared/styled-components';

const StatSelector = ({
  onSelectStat,
  selectedStat,
  statOptions,
  onSelectSeason,
  selectedSeason,
  seasons,
}) => {
  const onChangeStat = e => {
    onSelectStat(e.target.value);
  };

  const onChangeSeason = e => {
    onSelectSeason(e.target.value);
  };

  return (
    <SelectionWrapper>
      <Form.Control as="select" onChange={onChangeSeason} value={selectedSeason}>
        {seasons.map(season => <option key={season} value={season}>{season}</option>)}
      </Form.Control>
      <Form.Control as="select" onChange={onChangeStat} value={selectedStat}>
        {statOptions.map(playtype => <option key={playtype} value={playtype}>{playtype}</option>)}
      </Form.Control>
    </SelectionWrapper>
  );
};

export default StatSelector;
