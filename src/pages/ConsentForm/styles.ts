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
  width: 500px;
  background-color: rgba(235, 235, 235, 0.8);
  border-radius: 50px;
  margin: 30px 0;
`

export const ResearchLink = styled.div`
  margin: 40px 2% 20px 2%;
  text-align: center;

  p {
    font-weight: 700;
  }
`;

export const ResearchTerm = styled.div`
  margin: 40px 2% 20px 2%;
  text-align: center;

  p:first-of-type {
    font-weight: 700;
  }
`;

export const ContainerButton = styled.div`
  display: flex;
  display: 1;
  justify-content: space-between;
  margin: 10px 2% 40px 2%;
`;
