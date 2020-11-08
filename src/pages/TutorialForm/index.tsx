import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// import UpBar from '../../components/UpBar';
import DownBar from '../../components/DownBar';
import ButtonDefault from '../../components/ButtonDefault';

import { Background, Container, ContainerButton } from './styles';

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

interface Form {
  pass: {
    id: string;
    name: string;
    term: string;
    link: string;
    inventory: Inventory;
  }
}

const TutorialForm: React.FC = () => {
  const location = useLocation<Form>();

  return (
    <>
      {/* <UpBar /> */}

      <Background>
        <Container>
          <div className="infor">
            <p>O formulário a seguir é composto de questões dispostas em uma faixa de 1 a 5</p>

            <div className="labels">
              <label>1</label>
              <span>...</span>
              <label>5</label>
            </div>

            <p>
              Marque 1 se você discorda com o item proposto e marque 5 se
              você concorda com o item proposto.
            </p>

            <p>
              É obrigatório responder a todos os itens, caso não responda, você será empedido de continuar
              o questionário.
            </p>
          </div>
          <ContainerButton>
            <Link to={{
              pathname: "/questionsform",
              state: {
                pass: location.state.pass
              }
            }}>
              <ButtonDefault type="button">
                Continuar
              </ButtonDefault>
            </Link>
          </ContainerButton>
        </Container>
      </Background>

      <DownBar />
    </>
  );
};

export default TutorialForm;
