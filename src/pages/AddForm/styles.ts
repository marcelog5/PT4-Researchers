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
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  max-width: 600px;
  width: 100%;
  background-color: rgba(235, 235, 235, 0.8);
  margin: 60px 2%;
  border-radius: 50px;

  form {
    margin: 20px 0 20px 0;
    text-align: center;
    width: 80%;
  }

  form h2 {
    margin-bottom: 32px;
  }

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
