import React, { useMemo } from 'react';
import uniqBy from 'lodash/uniqBy';
import Table from 'react-bootstrap/Table'
import styled from 'styled-components';
import maxBy from 'lodash/maxBy';

const StatCell = styled.td`
  font-weight: ${({ isBold }) => isBold ? 'bold' : 'initial' };
`;

const StyledTable = styled(Table)`
  border-collapse: separate;
  border-spacing: 0;
  tr:first-child th {
    /* Apply both top and bottom borders to the <th> */
    border-top: 1px solid #dee2e6;
    border-bottom: 1px solid #dee2e6;
    border-right: 1px solid #dee2e6;
  }
  
  td {
    /* For cells, apply the border to one of each side only (right but not left, bottom but not top) */
    border-bottom: 1px solid #dee2e6;
    border-right: 1px solid #dee2e6;
  }
  
  th:first-child,
  td:first-child {
    /* Apply a left border on the first <td> or <th> in a row */
    border-left: 1px solid #dee2e6;
  }
  thead th:first-child, td:first-child {
    position: sticky;
    left: 0;
    z-index: 2;
    background-color: white;
  }

  tr th:first-child {
    position: sticky;
    left: 0;
    z-index: 2;
    background-color: white;
  }
`;

const StatsTable = ({ data, columns }) => {
  const rows = useMemo(
    () => uniqBy(data, d => d.key),
    [data],
  );
  const maxima = useMemo(
    () => columns.reduce((acc, cur) => {
      const filteredData = data.filter(d => d.playtype_clean === cur);
      return {
        ...acc,
        [cur]: {
          POSS_PCT: maxBy(filteredData, d => d.POSS_PCT)?.POSS_PCT,
          POSS: maxBy(filteredData, d => d.POSS)?.POSS,
          PPP: maxBy(filteredData, d => d.PPP)?.PPP,
          PERCENTILE: maxBy(filteredData, d => d.PERCENTILE)?.PERCENTILE,
        },
      };
    }, {}),
    [columns, data],
  );

  return (
    <StyledTable size="sm" bordered responsive>
      <thead>
        <tr>
          <th />
          {columns.map(c => <th colSpan={4} key={c}>{c}</th>)}
        </tr>
        <tr>
          <td />
          {columns.map(c => <React.Fragment key={c}>
            <td>Freq</td>
            <td>Poss</td>
            <td>PPP</td>
            <td>Percentile</td>
          </React.Fragment>)}
        </tr>
      </thead>
      <tbody>
        {rows.map(r =>
          <tr key={r.key}>
            <td>{r.PLAYER_NAME}</td>
            {columns.map(c => {
              const statRow = data.find(d => d.key === r.key && d.playtype_clean === c);
              return (
                <React.Fragment key={c}>
                  <StatCell isBold={rows.length > 1 && ((statRow?.POSS_PCT || 0) === maxima[c]?.POSS_PCT)}>{statRow?.POSS_PCT || 0}</StatCell>
                  <StatCell isBold={rows.length > 1 && ((statRow?.POSS || 0) === maxima[c]?.POSS)}>{statRow?.POSS || 0}</StatCell>
                  <StatCell isBold={rows.length > 1 && ((statRow?.PPP || 0) === maxima[c]?.PPP)}>{statRow?.PPP || 0}</StatCell>
                  <StatCell isBold={rows.length > 1 && ((statRow?.PERCENTILE || 0) === maxima[c]?.PERCENTILE)}>{statRow?.PERCENTILE || 0}</StatCell>
                </React.Fragment>
              );
            })}
          </tr>
        )}
      </tbody>
    </StyledTable>
  );
};

export default StatsTable;
