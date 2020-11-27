import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';

// import UpBar from '../../components/UpBar';
import DownBar from '../../components/DownBar';
import ButtonDefault from '../../components/ButtonDefault';
import Input from '../../components/input';

import { Background, Container, Content } from './styles';

const SignIn: React.FC = () => {
  function handleSubmit(data: object): void {
    console.log(data);
  }

  return (
    <>
      <Background>
        <Container>
          <Content>
            <span></span>

            <Form onSubmit={handleSubmit}>
              <h1>Faça seu Login</h1>

              <Input name="email" icon={FiMail} placeholder="E-mail"/>

              <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>

              <ButtonDefault type="submit">
                Entrar
              </ButtonDefault>

              <a href="https://www.google.com.br/">Esqueci minha senha</a>
            </Form>

            <Link to="/signup">
              <FiLogIn/>
              Criar conta
            </Link>
          </Content>
        </Container>
      </Background>

      <DownBar/>
    </>
  );
}

export default SignIn;
