import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 10px;
  border: 2px solid #ccc;
  padding: 12px;
  width: 100%;
  margin: 10px 0;
  display: flex;
  align-items: center;

  input {
    background-color: transparent;
    flex: 1;
    border: 0;
  }

  svg {
    margin-right: 16px;
  }
`;
