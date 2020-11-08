import styled from 'styled-components';

import BackgroundImg from '../../assets/BackgroundBase.jpg';

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
    background-color: #E8F8F8;
    font-weight: bold;
    margin: 30px;
    text-align: center;
  }

  .labels {
    width: 100%;
    text-align: center;
  }

  .labels span{
    font-size: 60px;
    font-style: bold;
  }
`

export const ContainerButton = styled.div`
  display: flex;
  display: 1;
  justify-content: space-between;
  margin: 40px 2%;
`;
