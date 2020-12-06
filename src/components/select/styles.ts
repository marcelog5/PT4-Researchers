import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 10px;
  border: 2px solid #ccc;
  padding: 12px;
  width: 100%;
  margin: 10px 0;
  display: flex;
  align-items: center;

  select {
    border: none;
    color: rgb(117, 117, 117);
    width: 100%;
    background-color: transparent;
    appearance: none;
  }

  svg {
    margin-right: 16px;
  }
`;
