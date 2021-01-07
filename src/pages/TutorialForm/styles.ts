import styled from 'styled-components';

import BackgroundImg from '../../assets/BackgroundBase.jpg';

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

  .infor {
    margin: 0 2%;
  }

  p {
    margin-top: 40px;
    text-align: center;
  }

  label {
    display: inline-block;
    border-radius: 60px;
    height: 60px;
    width: 60px;
    line-height: 60px;
    background-color: #e8f8f8;
    font-weight: bold;
    text-align: center;
  }

  .labels div {
    display: flex;
    align-items: center;
    justify-content: left;
    margin-left: 16%;
  }

  .labels div p {
    height: 30px;
    margin: 10px 0 0 20px;
  }

  .labels {
    width: 100%;
    text-align: center;
  }

  .labels span {
    font-size: 60px;
    font-style: bold;
  }

  @media screen and (max-width: 1000px) {
    max-width: 500px;

    p {
      font-size: 14px;
    }

    h5 {
      font-size: 18px;
    }
  }

  @media screen and (max-width: 640px) {
    max-width: 400px;

    .labels div {
      flex-direction: column-reverse;
      align-items: center;
      justify-content: center;
      margin: 10px 0 0 0;
    }

    .labels div p {
      margin: 10px 0 0 0;
    }
  }
`;

export const ContainerButton = styled.div`
  display: flex;
  display: 1;
  justify-content: space-between;
  padding: 0 30px;
  margin: 10px 2% 40px 2%;

  @media screen and (max-width: 640px) {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
  }
`;
