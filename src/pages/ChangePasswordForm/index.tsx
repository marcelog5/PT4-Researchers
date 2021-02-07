import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import { useToast } from '../../hooks/Toast';
import { useAuth } from '../../hooks/Auth';

import DownBar from '../../components/DownBar';
import ButtonDefault from '../../components/ButtonDefault';
import Input from '../../components/input';

import { Background, Container, Content } from './styles';

interface DataValidation {
  password: string;
  newPassword: string;
  repassword: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { userData } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: DataValidation) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
          newPassword: Yup.string().min(6, 'No mínimo 6 dígitos'),
          repassword: Yup.string()
            .oneOf([Yup.ref('newPassword')], 'Senha não confere')
            .required('Repetir senha obrigatório'),
        });

        let postData = {
          id: userData.id,
          password: data.password,
          newPassword: data.newPassword,
        };

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put('/users/changepassword', postData);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Sua senha foi alterada com sucesso!',
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
            'Ocorreu um erro ao alterar sua senha, Verifique as credenciais!',
        });
      }
    },
    [addToast, history, userData],
  );

  return (
    <>
      <Background>
        <Container>
          <Content>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Faça seu Cadastro</h1>
              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Digite sua antiga senha"
              />

              <Input
                name="newPassword"
                icon={FiLock}
                type="password"
                placeholder="Digite sua nova Senha"
              />

              <Input
                name="repassword"
                icon={FiLock}
                type="password"
                placeholder="Repita sua nova senha"
              />

              <ButtonDefault type="submit">Atualizar!</ButtonDefault>
            </Form>

            <Link to="/">
              <FiArrowLeft />
              Voltar para a Home
            </Link>
          </Content>
        </Container>
      </Background>

      <DownBar />
    </>
  );
};

export default SignUp;
