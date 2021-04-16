import React from 'react';
import { Form } from 'react-bootstrap';

const StatSelector = ({ onSelectStat, selectedStat }) => {
  const onChangeStat = e => {
    onSelectStat(e.target.value);
  };

  return (
    <>
      <Form.Control as="select" onChange={onChangeStat} value={selectedStat}>
        {[].map(playtype => <option key={playtype} value={playtype}>{playtype}</option>)}
      </Form.Control>
    </>
  );
};

export default StatSelector;
