import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

// import UpBar from '../../components/UpBar';
import DownBar from '../../components/DownBar';
import ButtonDefault from '../../components/ButtonDefault';

import { Background, Container, Content } from './styles';

const SignIn: React.FC = () => {
  return (
    <>
      <Background>
        <Container>
          <Content>
            <span></span>

            <form>
              <h1>Faça seu Login</h1>

              <input placeholder="E-mail"/>

              <input type="password" placeholder="Senha"/>

              <ButtonDefault type="submit">
                Entrar
              </ButtonDefault>

              <a href="">Esqueci minha senha</a>
            </form>

            <a href="">
              <FiLogIn/>
              Criar conta
            </a>
          </Content>
        </Container>
      </Background>

      <DownBar/>
    </>
  );
}

export default SignIn;
