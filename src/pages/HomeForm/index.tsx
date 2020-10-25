import React from 'react';
import { Link } from 'react-router-dom';

import { Background, Container } from './styles';

import UpBar from '../../components/UpBar';
import DownBar from '../../components/DownBar';
import ButtonDefault from '../../components/ButtonDefault';

const HomeForm: React.FC = () => {

  return (
    <>
      <UpBar/>

      <Background>
        <Container>
          <h1>Teste das grande 5 personalidades</h1>

          <p>
            Esse é um método que tenta descrever a personalidade em 5 principais traços a partir
            de diversas questões que serão apresentadas a você.
          </p>

          <p>
            Sua contribuição para esse teste influenciará nos estudos de diversos pesquisadores, por isso,
            responda da maneira que mais se assemelha a você.
          </p>

          <Link to="/consentform">
            <ButtonDefault type="button">Comece aqui!</ButtonDefault>
          </Link>
        </Container>
      </Background>

      <DownBar/>
    </>
  );/*  */
};

export default HomeForm;
