import styled from 'styled-components';

import BackgroundImg from '../../assets/BackgroundHome.jpg';

export const Background = styled.div`
  background-image: url(${BackgroundImg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;

  @media screen and (max-width: 2200px) {
    background-position: 40% 0;
  }

  @media screen and (max-width: 1800px) {
    background-position: 30% 0;
  }

  @media screen and (max-width: 1000px) {
    background-position: 80% 0;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: flex-end;
  width: 100%;

  .InforContainer {
    max-width: 480px;
    margin-right: 12%;
  }

  h1 {
    font-size: 50px;
    margin-bottom: 24px;
  }

  p {
    font-size: 16px;
    margin-bottom: 18px;
  }

  @media screen and (max-width: 1800px) {
    .InforContainer {
      max-width: 480px;
      margin-right: 3%;
    }
  }

  @media screen and (max-width: 1000px) {
    align-items: center;

    .InforContainer {
      max-width: 480px;
      margin-right: 2%;
    }
  }

  @media screen and (max-width: 600px) {
    h1 {
      font-size: 40px;
    }

    p {
      font-size: 13px;
    }

    .InforContainer {
      margin: 10px 2%;
    }
  }
`;
