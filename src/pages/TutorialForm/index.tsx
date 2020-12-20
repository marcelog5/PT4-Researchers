import React from 'react';
import { Link } from 'react-router-dom';

import { useForm } from '../../hooks/Form';

// import UpBar from '../../components/UpBar';
import DownBar from '../../components/DownBar';
import ButtonDefault from '../../components/ButtonDefault';

import { Background, Container, ContainerButton } from './styles';

const TutorialForm: React.FC = () => {
  const { formData } = useForm();

  return (
    <>
      {/* <UpBar /> */}

      <Background>
        <Container>
          <div className="infor">
            {/* <p>
            Nas páginas seguintes, serão apresentadas {location.state.pass.inventory.numberOfQuestions} afirmações que
            tratam de características pessoais. Leia cada uma com atenção e, utilizando a escala de resposta abaixo, indique o
            quanto concorda ou discorda com o fato de cada característica descrevê-lo.
            </p> */}

            <p>
            Nas páginas seguintes, serão apresentadas {formData.inventory.numberOfQuestions} afirmações que
            tratam de características pessoais. Leia cada uma com atenção e, atribua um valor na escala de 1 a 5, sendo:
            </p>

            <div className="labels">
              <div>
                <label>1</label>
                <p>Discordo totalmente</p>
              </div>

              <div>
                <label>2</label>
                <p>Discordo em parte</p>
              </div>

              <div>
                <label>3</label>
                <p>Nem concordo nem discordo</p>
              </div>

              <div>
                <label>4</label>
                <p>Concordo em parte</p>
              </div>

              <div>
                <label>5</label>
                <p>Concordo totalmente</p>
              </div>
            </div>

            <p>
              É obrigatório responder a todos os itens, caso não responda, você será empedido de continuar
              o questionário.
            </p>

            <p>
              Antes de cada afirmação leia: <b>Eu me vejo como alguém que...</b>
            </p>
          </div>
          <ContainerButton>
            <Link to={"/consentform"}>
              <ButtonDefault>
                Voltar
              </ButtonDefault>
            </Link>

            <Link to={"/questionsform"}>
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
