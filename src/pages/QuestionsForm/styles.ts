import styled from 'styled-components';

import BackgroundImg from '../../assets/BackgroundBase.jpg';

interface ContaineButtonProps {
  display: string;
}

interface QuestionProps {
  border: string;
}

export const Background = styled.div`
  background-image: url(${BackgroundImg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  min-height: 100vh;
  display: flex;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
  align-items: center;

  .alert {
    position: fixed;
    margin-top: 100px;
    background-color: #ffbfb9;
  }

  form {
    margin-top: 50px;
  }

  li {
    list-style: none;
  }

  li p {
    margin: 40px 0 10px 0;
    font-size: 22px;
  }

  input[type='radio'] {
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
    background-color: #e8f8f8;
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

  .TutorialInfor {
    margin-top: 30px;
    font-size: 20px;
  }

  .progress {
    margin-top: 30px;
    width: 50%;
    height: 28px;
    border-radius: 20px;
    background-color: #cceff1;
    position: fixed;
  }

  .progress-bar {
    background-color: #77baba;
  }

  .selected {
    background-color: #77baba;
  }

  @media screen and (max-width: 600px) {
    .radio-group {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .radio-group label {
      margin: 10px 0;
    }

    section {
      display: flex;
      flex-direction: column-reverse;
      justify-content: center;
      align-items: center;
    }

    .TutorialInfor {
      max-width: 400px;
      margin: 30px 2% 0 2%;
    }

    .progress {
      width: 80%;
    }
  }
`;

export const RadioGroup = styled.div<QuestionProps>`
  border: ${(props) => props.border};
  border-radius: 16px;
`;

export const ContainerButton = styled.div<ContaineButtonProps>`
  display: ${(props) => props.display};
  padding: 0 60px;

  @media screen and (max-width: 600px) {
    margin-top: 16px;
  }
`;
