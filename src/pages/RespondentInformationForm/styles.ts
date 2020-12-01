import styled from 'styled-components';

import BackgroundImg from '../../assets/BackgroundBase.jpg';

interface ContainerProps {
  display:string
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
  align-items: center;
`;

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  align-items: center;

  .alert {
    position: fixed;
    margin-top: 100px;
    background-color: #FFBFB9;
  }

  h1 {
    margin-top: 40px;
  }

  form {
    margin: 30px 2% 40px 2%;
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

  div#texto div{
    background-color: #E8F8F8;
    border: 1px solid #ccc;
    display: ${(props) => props.display};
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
  width: 90%;
  display: flex;
  display: 1;
  justify-content: space-between;
  margin: 60px auto;

  @media screen and (max-width: 640px)
  {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
  }
`;
