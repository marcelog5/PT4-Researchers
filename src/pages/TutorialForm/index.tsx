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
  },
  passLink: string;
}

const TutorialForm: React.FC = () => {
  const location = useLocation<Form>();

  return (
    <>
      {/* <UpBar /> */}

      <Background>
        <Container>
          <div className="infor">
            <p>
            Nas páginas seguintes, serão apresentadas {location.state.pass.inventory.numberOfQuestions} afirmações que
            tratam de características pessoais. Leia cada uma com atenção e, utilizando a escala de resposta abaixo, indique o
            quanto concorda ou discorda com o fato de cada característica descrevê-lo.
            </p>

            <div className="labels">
              <div>
                <label>1</label>
                <p>Para discordo totalmente</p>
              </div>

              <div>
                <label>2</label>
                <p>Para Discordo em parte</p>
              </div>

              <div>
                <label>3</label>
                <p>Para Nem concordo nem discordo</p>
              </div>

              <div>
                <label>4</label>
                <p>Para Concordo em parte</p>
              </div>

              <div>
                <label>5</label>
                <p>Para Concordo totalmente</p>
              </div>
            </div>

            <p>
              cada itém do questionário representa a sua visão de você mesmo, logo cada questão deve
              ser interpretado como: <b>Eu me vejo como alguém que...</b>
            </p>

            <p>
              É obrigatório responder a todos os itens, caso não responda, você será empedido de continuar
              o questionário.
            </p>
          </div>
          <ContainerButton>
            <Link to={`/homeform/${location.state.passLink}`}>
              <ButtonDefault>
                Voltar
              </ButtonDefault>
            </Link>

            <Link to={{
              pathname: "/questionsform",
              state: {
                pass: location.state.pass,
                passLink: location.state.passLink,
              }
            }}>
              <ButtonDefault>
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
