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
  width: 100%;
  margin: 0 auto;
  text-align: center;
  align-items: center;

  form {
    margin: 60px 2% 40px 2%;
    display: flex;
    flex-direction: column;
  }

  label {
    margin: 20px 0 6px 0;
  }

  input[type=date]{
    width: 100%;
    background-color: #E8F8F8;
    color: black;
    padding: 14px 20px;
    margin: 8px 0;
    border: 1px solid #ccc;
    border-radius: 16px;
  }

  select {
    width: 100%;
    background-color: #E8F8F8;
    color: black;
    padding: 14px 20px;
    margin: 8px 0;
    border: 1px solid #ccc;
    border-radius: 16px;
  }
`;

export const ContainerButton = styled.div`
  display: flex;
  display: 1;
  margin: 60px auto;
`;
