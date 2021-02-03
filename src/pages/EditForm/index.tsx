import React, { useCallback, useEffect, useRef } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
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
import TextArea from '../../components/TextArea';
import UpBar from '../../components/UpBar';
import DownBar from '../../components/DownBar';
import ButtonDefault from '../../components/ButtonDefault';

interface Inventory {
  id: string;
}

interface Form {
  id: string;
  name: string;
  term: string;
  link: string;
  inventory: Inventory;
}

interface FormPass {
  Form: Form;
}

interface CreateFormData {
  name: string;
  link: string;
  term: string;
}

const EditForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const location = useLocation<FormPass>();
  const form = location.state.Form;
  const history = useHistory();

  const { addToast } = useToast();
  const { userData, userToken } = useAuth();

  useEffect(() => {
    formRef.current?.setFieldValue('name', form.name);
    formRef.current?.setFieldValue('link', form.link);
    formRef.current?.setFieldValue('term', form.term);
  }, [form]);

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
          inventory_id: form.inventory.id,
          user_id: userData.id,
        };

        await api.post('/forms', postData, config);

        addToast({
          type: 'success',
          title: 'Formulário Editado!',
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
          title: 'Erro na edição',
          description: 'Ocorreu um erro ao fazer a edição do formulário.',
        });
      }
    },
    [addToast, history, userData, userToken, form],
  );

  return (
    <>
      <UpBar></UpBar>

      <Background>
        <Container>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h2>Edite seu formulário</h2>

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

            <TextArea
              name="term"
              icon={FiFolder}
              placeholder="Termos do formulário"
            />

            <section className="buttonContainer">
              <Link to="/">
                <ButtonDefault>Voltar</ButtonDefault>
              </Link>

              <ButtonDefault type="submit">Editar!</ButtonDefault>
            </section>
          </Form>
        </Container>
      </Background>

      <DownBar></DownBar>
    </>
  );
};

export default EditForm;
