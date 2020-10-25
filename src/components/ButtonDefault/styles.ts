import styled from 'styled-components';

import { shade } from 'polished';

export const Button = styled.div`
  button{
    width: 170px;
    margin-top: 15px;
    line-height: 24px;
    text-align: center;
    height: 24px;
    border-radius: 8px;
    color: #000;
    border-width: 0;
    background: #72E1D1;
    opacity: 1;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  button:hover {
    background: ${shade(0.1, '#72E1D1')};
  }
`;
