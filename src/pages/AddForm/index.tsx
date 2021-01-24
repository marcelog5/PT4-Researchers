import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { FiFolder } from 'react-icons/fi';

import api from '../../services/api';

import { useToast } from '../../hooks/Toast';
import { useAuth } from '../../hooks/Auth';
import getValidationErrors from '../../utils/getValidationErrors';

import { Background, Container } from './styles';

import Input from '../../components/input';
import UpBar from '../../components/UpBar';
import DownBar from '../../components/DownBar';
import ButtonDefault from '../../components/ButtonDefault';

interface CreateFormData {
  name: string;
  link: string;
  term: string;
}

const AddForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { addToast } = useToast();
  const { userData, userToken } = useAuth();

  const handleSubmit = useCallback(
    async (data: CreateFormData) => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userToken}` },
        };

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          link: Yup.string().required('Link obrigatório'),
          term: Yup.string().required('Termo obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const postData = {
          name: data.name,
          link: data.link,
          term: data.term,
          inventory_id: 'ef523bcc-b3d1-44d5-b726-4bf7e97bdc04',
          user_id: userData.id,
        };

        await api.post('/forms', postData, config);

        addToast({
          type: 'success',
          title: 'Formulário cadastrado!',
          description:
            'Agora você já pode enviar o link para os participantes!',
        });

        history.push('/home');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na criação',
          description: 'Ocorreu um erro ao fazer a criação do formulário.',
        });
      }
    },
    [addToast, history, userData.id, userToken],
  );

  return (
    <>
      <UpBar></UpBar>

      <Background>
        <Container>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h2>Crie seu formulário</h2>

            <Input
              name="name"
              icon={FiFolder}
              placeholder="Nome do formulário"
            />

            <Input
              name="link"
              icon={FiFolder}
              placeholder="Link dos termos do formulário"
            />

            <Input
              type="text"
              name="term"
              icon={FiFolder}
              placeholder="Termos do formulário"
            />

            <section className="buttonContainer">
              <Link to="/">
                <ButtonDefault>Voltar</ButtonDefault>
              </Link>

              <ButtonDefault type="submit">Criar!</ButtonDefault>
            </section>
          </Form>
        </Container>
      </Background>

      <DownBar></DownBar>
    </>
  );
};

export default AddForm;
