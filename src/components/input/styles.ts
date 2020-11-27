import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  border-radius: 10px;
  border: 2px solid #ccc;
  padding: 12px;
  width: 100%;
  margin: 10px 0;
  display: flex;
  align-items: center;

  ${(props) =>
  props.isFocused &&
  css`
    color: #FFBFB9;
    border-color: #FFBFB9;
  `}

  ${(props) =>
  props.isFilled &&
  css`
    color: #FFBFB9;
  `}

  input {
    background-color: transparent;
    flex: 1;
    border: 0;
  }

  svg {
    margin-right: 16px;
  }
`;
