import React, { useRef, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/Auth';
import { useToast } from '../../hooks/Toast';
import getValidationErrors from '../../utils/getValidationErrors';

import DownBar from '../../components/DownBar';
import ButtonDefault from '../../components/ButtonDefault';
import Input from '../../components/input';

import { Background, Container, Content } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn({
        email: data.email,
        password: data.password,
      });

      history.push('/home');
    } catch (err) {
      if(err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        type: 'error',
        title: 'Erro na autenticação',
        description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
      });

    }
  }, [signIn, addToast, history]);

  return (
    <>
      <Background>
        <Container>
          <Content>
          <span className="logo"></span>

            <Form ref={formRef} onSubmit={handleSubmit}>
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
