import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiPlusCircle, FiCopy } from 'react-icons/fi';
import { Card } from 'react-bootstrap';

import api from '../../services/api';

import { useAuth } from '../../hooks/Auth';
import { useToast } from '../../hooks/Toast';

import { Background, Container } from './styles';

import ButtonDefault from '../../components/ButtonDefault';
import UpBar from '../../components/UpBar';
import DownBar from '../../components/DownBar';

interface Question {
  id: string;
  question: string;
  inverted: boolean;
  trait: string;
  factor: string;
  questionNumber: number;
}

interface Inventory {
  id: string;
  author: string;
  numberOfQuestions: number;
  inventoryName: string;
  questions: Question[];
}

interface Form {
  id: string;
  name: string;
  term: string;
  link: string;
  inventory: Inventory;
  created_at: string;
  updated_at: string;
}

const Home: React.FC = () => {
  const { userToken, userData, signOut } = useAuth();
  const [formsData, setFormsData] = useState<Form[]>([]);
  const history = useHistory();
  const { addToast } = useToast();

  useEffect(() => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${userToken}` },
      };

      api
        .get(`forms/findByUser/${userData.id}`, config)
        .then((response) => {
          setFormsData(response.data);
        })
        .catch((error) => {
          signOut();
        });
    } catch (error) {
      signOut();
      history.push('/');
    }
  }, [userData, userToken, signOut, history]);

  const handleCopyButton = useCallback((url: string) => {
    var dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = 'homeform/' + url;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  }, []);

  const handleCopyFormButton = useCallback(
    async (form: Form) => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userToken}` },
        };

        const postData = {
          name: form.name,
          link: form.link,
          term: form.term,
          inventory_id: form.inventory.id,
          user_id: userData.id,
        };

        await api.post('/forms', postData, config);

        addToast({
          type: 'success',
          title: 'Formulário cadastrado!',
          description:
            'Agora você já pode enviar o link para os participantes!',
        });

        history.push('/');
      } catch {
        addToast({
          type: 'error',
          title: 'Erro na criação',
          description: 'Ocorreu um erro ao fazer a criação do formulário.',
        });
      }
    },
    [addToast, history, userData.id, userToken],
  );

  const handleDeleteButton = useCallback(
    async (id: string) => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userToken}` },
        };
        let respondentsNumber = 0;

        await api.get(`respondents/${id}`, config).then((response) => {
          respondentsNumber = response.data.length;
        });

        if (respondentsNumber !== 0) {
          throw new Error();
        }

        await api.delete(`forms/${id}`, config);

        addToast({
          type: 'success',
          title: 'Formulário deletado!',
        });

        history.push('/');
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro',
          description: 'Ocorreu um erro ao apagar o formulário!',
        });
      }
    },
    [addToast, history, userToken],
  );

  return (
    <>
      <UpBar></UpBar>

      <Background>
        <Container
          display={
            userData !== undefined
              ? userData.isAdmin
                ? 'flex'
                : 'none'
              : 'none'
          }
        >
          <div className="buttonContainer">
            <section>
              <div>
                <h3>Visualizar todas as pesquisas:</h3>
                <ButtonDefault>Pesquisas</ButtonDefault>
              </div>

              <div>
                <h3>Visualizar todos os pesquisadores:</h3>
                <ButtonDefault>Pesquisadores</ButtonDefault>
              </div>
            </section>
          </div>
        </Container>

        <Container
          display={
            userData !== undefined
              ? userData.isAdmin
                ? 'none'
                : 'flex'
              : 'unset'
          }
        >
          <section className="card-sections">
            <Card>
              <Card.Header>Crie um formulário</Card.Header>
              <Card.Body className="addForm">
                <Link to="/addform">
                  <FiPlusCircle size={80} />
                </Link>
              </Card.Body>
            </Card>

            {formsData.map((form) => {
              return (
                <Card key={form.id}>
                  <Card.Header>{form.name}</Card.Header>

                  <Card.Body>
                    <div className="card-text">
                      <ul>
                        <li>Criado em: {form.created_at.substring(0, 10)}</li>
                        <li>
                          Atualizado em: {form.updated_at.substring(0, 10)}
                        </li>
                        <li>
                          <ButtonDefault
                            className="copyButton"
                            icon={FiCopy}
                            onClick={() => handleCopyButton(form.id)}
                          ></ButtonDefault>
                        </li>
                        <li>
                          <ButtonDefault
                            onClick={() => handleCopyFormButton(form)}
                          >
                            Duplicar
                          </ButtonDefault>
                        </li>
                        <li>
                          <ButtonDefault
                            onClick={() => handleDeleteButton(form.id)}
                          >
                            Deletar
                          </ButtonDefault>
                        </li>
                        <li>
                          <Link
                            to={{
                              pathname: '/editform',
                              state: {
                                Form: form,
                              },
                            }}
                          >
                            <ButtonDefault>Editar</ButtonDefault>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={{
                              pathname: '/formdata',
                              state: {
                                Form: form,
                              },
                            }}
                          >
                            <ButtonDefault>Visualizar</ButtonDefault>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </Card.Body>
                </Card>
              );
            })}
          </section>
        </Container>
      </Background>

      <DownBar></DownBar>
    </>
  );
};

export default Home;
