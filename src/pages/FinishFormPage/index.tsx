import React from 'react';

import { Background, Container } from './styles';

// import UpBar from '../../components/UpBar';
import DownBar from '../../components/DownBar';

const FinishFormPage: React.FC = () => {
  return (
    <>
      {/* <UpBar/> */}

      <Background>
        <Container>
          <h1>Nome do Projeto</h1>

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
