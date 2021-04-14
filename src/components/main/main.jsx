import React, { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import styled from 'styled-components';
import PlayerPlaytypeChart from '../charts/player-playtype/player-playtype';
import TeamPlaytypeChart from '../charts/team-playtype/team-playtype';

const AppWrapper = styled.div`
  height: 100vh;
  width: 100%;

  .tab-content {
    height: calc(100% - 42px);
  }

  .tab-pane {
    height: 100%;
  }
`;

const CHARTS = [
  {
    key: 'PLAYER_PLAYTYPE',
    title: 'Player Playtype',
    component: PlayerPlaytypeChart,
  },
  {
    key: 'TEAM_PLAYTYPE',
    title: 'Team Playtype',
    component: TeamPlaytypeChart,
  },
]

const Main = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(CHARTS[0].key);
  return (
    <AppWrapper>
      <Tabs activeKey={selectedTabIndex} onSelect={(key) => setSelectedTabIndex(key)}>
        {CHARTS.map(c => <Tab eventKey={c.key} title={c.title} key={c.key}>
          {c.component()}
        </Tab>)}
      </Tabs>
    </AppWrapper>
  );
};

export default Main;
