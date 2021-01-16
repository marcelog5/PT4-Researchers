import styled from 'styled-components';

import BackgroundImg from '../../assets/BackgroundBase.jpg';

interface isAdmin {
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
`;

export const Container = styled.div<isAdmin>`
  display: ${(props) => props.display};
  justify-content: center;
  text-align: center;
  max-width: 1440px;
  width: 100%;
  margin-top: 100px;

  section {
    display: flex;
    justify-content: left;
  }

  .buttonContainer section {
    display: flex;
    flex-direction: column;
    max-height: 300px;
    justify-content: center;
    align-items: center;
    width: 500px;
    background-color: rgba(235, 235, 235, 0.8);
    margin: 30px 2%;
    padding: 20px 0;
    border-radius: 50px;
  }

  .buttonContainer section > div:last-of-type {
    margin-top: 32px;
  }

  .card {
    margin: 20px 10px;
    min-width: 300px;
    max-height: 200px;
    text-align: center;
  }

  .card-text ul {
    list-style: none;
  }

  .addForm {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .addForm svg {
    color: #66cabc;
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
  }
`;
