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

  .title {
    font-size: 22px;
    margin-top: 40px;
  }

  .questionContainer {
    height: 400px;
    border: 6px solid #cceff1;
    border-radius: 12px;
    background-color: #e8f8f8;
    padding-top: 12px;
    padding-left: 4%;
    overflow-y: auto;
  }

  .questionContainer ul li {
    list-style-type: decimal;
  }

  .RespondentAnswer {
    margin-bottom: 40px;
  }

  .RespondentsContainer {
    height: 400px;
    border: 6px solid #cceff1;
    border-radius: 12px;
    background-color: #e8f8f8;
    padding-top: 12px;
    overflow-y: auto;
    overflow-x: auto;
  }

  .RespondentsContainer table {
    width: 100%;
  }

  .RespondentsContainer tr th {
    padding: 8px 20px;
  }

  .RespondentsContainer tr {
    text-align: center;
  }

  .RespondentsContainer tr td {
    padding: 8px 20px;
  }

  .buttonMenu {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
  }

  .copyButton {
    width: 35px;
    height: 35px;
    margin-bottom: 5px;
    border-radius: 18px;
  }

  .copyButton svg{
    position:absolute;
    top: 50%;
    transform: translate(-50%, -50%);
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
