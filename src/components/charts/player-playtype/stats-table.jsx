import React, { useMemo } from 'react';
import uniqBy from 'lodash/uniqBy';
import Table from 'react-bootstrap/Table'

const StatsTable = ({ data, columns }) => {
  const rows = useMemo(
    () => uniqBy(data, d => d.key),
    [data],
  );
  console.log(uniqBy(data, d => d.key))
  console.log(rows);
  console.log(data);
  console.log(columns);
  console.log(data.filter(d => d.key === rows[0].key && d.playtype_clean === columns[0]));
  return (
    <Table size="sm" striped bordered>
      <thead>
        <tr>
          <th />
          {columns.map(c => <th colSpan={4}>{c}</th>)}
        </tr>
        <tr>
          <td/>
          {columns.map(c => <>
            <td>Freq</td>
            <td>Poss</td>
            <td>PPP</td>
            <td>Percentile</td>
          </>)}
        </tr>
      </thead>
      <tbody>
        {rows.map(r =>
          <tr>
            <td>{r.PLAYER_NAME}</td>
            {columns.map(c => {
              const statRow = data.find(d => d.key === r.key && d.playtype_clean === c);
              return (
                <>
                  <td>{statRow?.POSS_PCT || 0}</td>
                  <td>{statRow?.POSS || 0}</td>
                  <td>{statRow?.PPP || 0}</td>
                  <td>{statRow?.PERCENTILE || 0}</td>
                </>
              );
            })}
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default StatsTable;
