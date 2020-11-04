import React from 'react';

import { Background, Container } from './styles';

// import UpBar from '../../components/UpBar';
import DownBar from '../../components/DownBar';

const RedirectPage: React.FC = () => {
  return (
    <>
      {/* <UpBar/> */}

      <Background>
        <Container>
          <h1>Sinto muito, mas a página que você tentou acessar não existe</h1>

          <p>Contate o pesquisador que compartilhou o link para obter mais informações</p>
        </Container>
      </Background>

      <DownBar/>
    </>
  );
};

export default RedirectPage;
