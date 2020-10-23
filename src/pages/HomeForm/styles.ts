import styled from 'styled-components';
import { shade } from 'polished';

import BackgroundImg from '../../assets/BackgroundHome.jpg';

export const Header = styled.div`
  width: 100%;
  display: flex;
  height: 60px;
`;

export const Logo = styled.div`
  width: 10%;
  background-color: #000;
  color: white;
`;

export const Bar = styled.div`
  width: 90%;
  background-color: #c4f1f2;
`;

export const Background = styled.div`
  background-image: url(${BackgroundImg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100vh;
  position: relative;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: absolute;
  right:10%;
  bottom: 40%;
  max-width: 400px;

  h1 {
    font-size: 50px;
    margin-bottom: 24px;
  }

  p {
    font-size: 16px;
    margin-bottom: 18px;
  }

  button {
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

export const Footer = styled.div`
  width: 100%;
  height: 40px;
  color: white;
  background-color: black;
`;
