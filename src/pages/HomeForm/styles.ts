import styled from 'styled-components';

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
`;
