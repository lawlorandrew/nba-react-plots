import styled from 'styled-components';

export const PageWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 10px;
  display: grid;
  grid-template-rows: 80% 20%;
  grid-template-columns: max(200px, 20%) calc(100% - 200px);
`;

export const TableWrapper = styled.div`
`;

export const SelectionWrapper = styled.div`
  margin-bottom: 10px;
  row-gap: 5px;
  display: flex;
  flex-direction: column;
`;
