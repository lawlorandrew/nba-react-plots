import React from 'react';
import { Dot } from 'recharts';

const CustomDot = (props) => {
  console.log(props);
  return <Dot cx={props.cx} cy={props.cy} stroke={props.stroke} />;
};

export default CustomDot;