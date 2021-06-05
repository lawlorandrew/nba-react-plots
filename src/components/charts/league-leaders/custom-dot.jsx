import React from 'react';
import { Dot } from 'recharts';
import styled from 'styled-components';

const StyledDot = styled(Dot)`
  opacity: ${({ opacity }) => opacity};
`;

const CustomDot = (props) => {
  const getOpacity = () => {
    if (
      !props.shouldHighlight ||
      props.highlightedData.find(
        d => d.key === props.payload.key
      )
    ) {
      return 1;
    }
    return 0.2;
  };
  return (
    <StyledDot
      cx={props.cx}
      cy={props.cy}
      fill={props.Primary}
      r={5}
      opacity={getOpacity()}
    />
  );
};

export default CustomDot;