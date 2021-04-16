import React, { useState } from 'react';
import styled from 'styled-components';
import { PageWrapper } from '../../../shared/styled-components';
import Chart from './chart';
import StatSelector from './stat-selector';

const LeagueLeaders = () => {
  const [selectedStat, setSelectedStat] = useState();
  return (
    <PageWrapper>
      <StatSelector selectedStat={selectedStat} setSelectedStat={setSelectedStat} />
      <Chart />
    </PageWrapper>
  )
};

export default LeagueLeaders;
