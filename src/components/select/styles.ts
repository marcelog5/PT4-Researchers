import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
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
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #ffbfb9;
      border-color: #ffbfb9;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #ffbfb9;
    `}

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

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
