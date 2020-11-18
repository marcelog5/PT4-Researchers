import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Background, Container } from './styles';

// import UpBar from '../../components/UpBar';
import DownBar from '../../components/DownBar';
import ButtonDefault from '../../components/ButtonDefault';

const HomeForm: React.FC = () => {
  const location = useLocation();

  return (
    <>
      {/* <UpBar/> */}

      <Background>
        <Container>
          <h1>Teste do Big 5</h1>

          <p>
            Esse é um método que tenta descrever a sua personalidade em 5 principais traços a partir
            de diversas questões que serão apresentadas a você.
          </p>

          <p>
            Sua contribuição para esse teste influenciará nos estudos de diversos pesquisadores, por isso,
            responda da maneira que mais se assemelha a você.
          </p>

          <Link to={{
              pathname: "/consentform",
              state: {
                passLink: location.pathname.substring(10)
              }
            }}>
            <ButtonDefault>
              Comece aqui!
            </ButtonDefault>
          </Link>
        </Container>
      </Background>

      <DownBar/>
    </>
  );/*  */
};

export default HomeForm;
