import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

// import UpBar from '../../components/UpBar';
import DownBar from '../../components/DownBar';
import ButtonDefault from '../../components/ButtonDefault';
import Input from '../../components/input';

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

              <Input name="email" icon={FiMail} placeholder="E-mail"/>

              <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>

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
