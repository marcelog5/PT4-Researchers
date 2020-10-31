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

  form{
    margin-top: 100px;
  }

  li {
    list-style: none
  }

  li p{
    margin: 40px 0;
    font-size: 22px;
  }

  input[type=radio] {
      position: absolute;
      visibility: hidden;
      display: none;
  }

  label {
      height: 100%;
      width: 20%;
      cursor: pointer;
      font-weight: bold;
      margin: 30px;
  }
`
