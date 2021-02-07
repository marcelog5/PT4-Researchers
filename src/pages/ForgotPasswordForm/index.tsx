import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import { useToast } from '../../hooks/Toast';

import DownBar from '../../components/DownBar';
import ButtonDefault from '../../components/ButtonDefault';
import Input from '../../components/input';

import { Background, Container, Content } from './styles';

interface DataValidation {
  email: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: DataValidation) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });

        let postData = {
          email: data.email,
        };

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put('/users/sendforgotpassword', postData);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Foi enviado uma nova senha para o seu email!',
          description: 'Visualiza seu email para realizar seu login novamente!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na alteração de senha',
          description:
            'Ocorreu um erro ao alterar sua senha, Verifique se o seu e-mail está correto!',
        });
      }
    },
    [addToast, history],
  );

  return (
    <>
      <Background>
        <Container>
          <Content>
            <span className="logo"></span>

            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Alteração de senha</h1>

              <p>
                Digite seu E-mail para que possamos lhe enviar uma nova senha
              </p>

              <Input name="email" icon={FiMail} placeholder="E-mail" />

              <ButtonDefault type="submit">Enviar</ButtonDefault>
            </Form>

            <Link to="/">
              <FiArrowLeft />
              Voltar para o Login
            </Link>
          </Content>
        </Container>
      </Background>

      <DownBar />
    </>
  );
};

export default SignUp;
