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
  border-radius: 50px;
  margin: 30px 2%;

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
`

export const ResearchLink = styled.div`
  margin: 40px 2% 20px 2%;
  text-align: center;

  h5 {
    font-weight: 700;
  }
`;

export const ResearchTerm = styled.div`
  margin: 40px 2% 20px 2%;
  text-align: center;

  h5:first-of-type {
    font-weight: 700;
    margin-bottom: 16px;
  }
`;

export const ContainerButton = styled.div`
  display: flex;
  display: 1;
  justify-content: space-between;
  padding: 0 30px;
  margin: 10px 2% 40px 2%;

  @media screen and (max-width: 640px)
  {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
