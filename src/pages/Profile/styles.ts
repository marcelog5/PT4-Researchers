import styled from 'styled-components';
import { shade } from 'polished';

import BackgroundImg from '../../assets/BackgroundBase.jpg';

interface ContentProps {
  display: string;
}

export const Background = styled.div`
  background-image: url(${BackgroundImg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 600px;
  width: 100%;
  background-color: rgba(235, 235, 235, 0.8);
  margin: 30px 2%;
  border-radius: 50px;

  @media screen and (max-width: 1000px) {
    max-width: 500px;

    p {
      font-size: 14px;
    }
  }

  @media screen and (max-width: 640px) {
    max-width: 400px;
  }
`;

export const Content = styled.div<ContentProps>`
  display: flex;
  flex-direction: column;
  place-content: center;
  width: 100%;
  align-items: center;
  margin-bottom: 30px;

  .logo {
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

    div#texto div {
      display: ${(props) => props.display};
    }
  }

  a {
    color: #ffbfb9;
    display: block;
    text-decoration: none;
    transition: 0.2s;
  }

  a:hover {
    color: ${shade(0.2, '#FFBFB9')};
  }

  @media screen and (max-width: 640px) {
    button {
      margin: 10px 0;
      height: 38px;
      width: 100%;
      max-width: 200px;
      line-height: 38px;
      border-radius: 20px;
    }
  }
`;
