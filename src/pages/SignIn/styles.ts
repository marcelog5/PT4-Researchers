import styled from 'styled-components';
import { shade } from 'polished';

import BackgroundImg from '../../assets/BackgroundHome.jpg';

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
  width: 500px;
  background-color: rgba(235, 235, 235, 0.8);
  position: absolute;
  top: 47%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  width: 100%;
  align-items: center;
  margin-bottom: 30px;

  span {
    margin-top: 32px;
    width: 72px;
    height: 72px;
    border-radius: 100%;
    background-color: #ccc;
  }

  form {
    margin: 40px 0 20px 0;
    text-align: center;
    width: 80%;

    h1 {
      margin-bottom: 24px;
    }

    button {
      margin: 10px 0;
      height: 38px;
      width: 300px;
      line-height: 38px;
      border-radius: 20px;
    }
  }

  a {
      color: #FFBFB9;
      display: block;
      text-decoration: none;
      transition: 0.2s;
  }

  a:hover {
    color: ${shade(0.2, '#FFBFB9')}
  }
`;
