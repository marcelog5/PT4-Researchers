import React from 'react';

import { Header, Section, Logo, Bar, Background, Container, Button, Footer } from './styles';

const HomeForm: React.FC = () => (
  <>
    <Header>
      <Logo>
        <h1>Logo</h1>
      </Logo>
      <Bar></Bar>
    </Header>

    <Section>
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
          <Button>
            <p>Comece aqui!</p>
          </Button>
        </Container>
      </Background>
    </Section>

    <Footer>
      <p>Foto do freepick</p>
    </Footer>
  </>
);

export default HomeForm;
