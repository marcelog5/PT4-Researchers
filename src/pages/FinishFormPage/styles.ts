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
  width: 800px;
  position: absolute;
  top: 47%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50px;
  text-align:center;

  h1 {
    font-size: 50px;
    margin-bottom: 24px;
  }

  h3{
    margin-bottom: 24px;
  }

  p {
    font-size: 16px;
    margin-bottom: 18px;
  }
`;
