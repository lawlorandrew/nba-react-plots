import React from 'react';

const PlayerPlaytypeTooltip = ({ payload }) => {
  if (!payload.length) {
    return <div />
  }
  return (
    <div>
      {payload[0].payload['playtype_clean']}
    </div>
  );
};

export default PlayerPlaytypeTooltip;
