import React from 'react';
import { Form } from 'react-bootstrap';
import { FlexWrapper } from '../../../shared/styled-components';

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
    onSelectSeason(parseInt(e.target.value));
  };

  return (
    <FlexWrapper>
      <Form.Control as="select" onChange={onChangeSeason} value={selectedSeason}>
        {seasons.map(season => <option key={season.key} value={season.key}>{season.label}</option>)}
      </Form.Control>
      <Form.Control as="select" onChange={onChangeStat} value={selectedStat}>
        {statOptions.map(playtype => <option key={playtype} value={playtype}>{playtype}</option>)}
      </Form.Control>
    </FlexWrapper>
  );
};

export default StatSelector;
