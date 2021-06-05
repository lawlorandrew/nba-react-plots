import styled from 'styled-components';

export const GridPageWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 10px;
  display: grid;
  grid-template-rows: 80% 20%;
  grid-template-columns: max(220px, 20%) min(calc(100% - 220px), 80%);
`;

export const ColumnPageWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

export const TableWrapper = styled.div`
`;

export const FlexWrapper = styled.div`
  display: flex;
  column-gap: 10px;
`;


export const SelectionWrapper = styled.div`
  margin-bottom: 10px;
  row-gap: 5px;
  display: flex;
  flex-direction: column;
`;
