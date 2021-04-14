import React from 'react';
import styled from 'styled-components';

const TooltipWrapper = styled.div`
  padding: 5px;
  border: 1px solid black;
  background-color: white;
`;

const PlayerPlaytypeTooltip = ({ payload, ...props }) => {
  console.log(props);
  if (!payload.length) {
    return <div />
  }
  return (
    <TooltipWrapper>
      <div>
        <i>{payload[0].payload['PLAYER_NAME']}, {payload[0].payload['TEAM_ABBREVIATION']}</i>
      </div>
      <div>
        <b>{payload[0].payload['playtype_clean']}</b>
      </div>
      <div>
        Frequency: {payload[0].payload['POSS_PCT']}
      </div>
      <div>
        Points per Possession: {payload[0].payload['PPP']}
      </div>
      <div>
        Percentile: {payload[0].payload['PERCENTILE']}
      </div>
    </TooltipWrapper>
  );
};

export default PlayerPlaytypeTooltip;
