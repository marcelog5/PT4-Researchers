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
    margin: 40px 0 10px 0;
    font-size: 22px;
  }

  input[type=radio] {
      position: absolute;
      visibility: hidden;
      display: none;
  }

  label {
      display: inline-block;
      border-radius: 60px;
      height: 60px;
      width: 60px;
      line-height: 60px;
      background-color: #E8F8F8;
      cursor: pointer;
      font-weight: bold;
      margin: 30px;
      transition: 1s;
  }

  section {
    display: flex;
    flex-direction: row;
    margin: 40px 2% 80px 2%;
  }

  .selected {
    background-color: #77BABA;
  }
`;

export const ContainerButton = styled.div<ContainerProps>`
  display: ${(props) => props.display};
  padding: 0 60px;
`;
