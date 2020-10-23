import React from 'react';
import { Link } from 'react-router-dom';

import { Header, Logo, Bar, Background, Container, Footer } from './styles';

const HomeForm: React.FC = () => {

  return (
    <>
      <Header>
        <Logo>
          <h1>Logo</h1>
        </Logo>
        <Bar></Bar>
      </Header>

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
            <button>Comece aqui!</button>
          </Link>
        </Container>
      </Background>

      <Footer>
        <p>Foto do freepick</p>
      </Footer>
    </>
  );/*  */
};

export default HomeForm;
