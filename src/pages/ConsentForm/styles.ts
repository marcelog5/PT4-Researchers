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
`

export const ResearchLink = styled.div`
  margin: 40px 2%;
`;

export const ResearchTerm = styled.div`
  margin: 40px 2%;
`;

export const ContainerButton = styled.div`
  display: flex;
  display: 1;
  justify-content: space-between;
  margin: 40px 2%;
`;
