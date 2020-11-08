import React from 'react';

import { Background, Container } from './styles';

// import UpBar from '../../components/UpBar';
import DownBar from '../../components/DownBar';
import { useLocation } from 'react-router-dom';

interface Question {
  id: string;
  question: string;
  inverted: boolean;
  trait: string;
  factor: string;
  questionNumber: number;
}

interface Inventory {
  id: string;
  author: string;
  numberOfQuestions: number;
  inventoryName: string;
  questions: Question[];
}

interface QuestionsAnswer {
  passForm: {
    id: string;
    name: string;
    term: string;
    link: string;
    inventory: Inventory;
  }
}

const FinishFormPage: React.FC = () => {
  const location = useLocation<QuestionsAnswer>();

  console.log(location.state);

  return (
    <>
      {/* <UpBar/> */}

      <Background>
        <Container>
          <h1>{location.state.passForm.name}</h1>

          <h3>Muito obrigado pela participação nesse formulário de pesquisa!</h3>

          <p>Sua participação ajudará diversos pesquisadores na área da psicometria!</p>

          <p>Entre em contanto com o pesquisador que compartilhou o link</p>

          <p>Email: email@email.email</p>

          <p>Telefone: 01234-1234</p>
        </Container>
      </Background>

      <DownBar/>
    </>
  );
};

export default FinishFormPage;
