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
  max-width: 1440px;
  width: 100%;
  margin-top: 100px;

  section {
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
  }

  .card {
    margin: 20px 10px;
    min-width: 300px;
    height: auto;
    text-align: center;
  }

  .addForm {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .addForm svg {
    color: #66CABC;
  }

  @media screen and (max-width: 1000px)
  {
    max-width: 500px;

    p {
      font-size: 14px;
    }

    h5 {
      font-size: 18px;
    }
  }

  @media screen and (max-width: 640px)
  {
    max-width: 400px;
  }
`;
