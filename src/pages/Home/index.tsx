import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiPlusCircle } from 'react-icons/fi';
import { Card } from 'react-bootstrap';

import api from '../../services/api';

import { useAuth } from '../../hooks/Auth';

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

  return (
    <>
      <UpBar></UpBar>

      <Background>
        <Container>
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
                    <Card.Text>
                      <p>Criado em: {form.created_at.substring(0, 10)}</p>
                      <p>Atualizado em: {form.updated_at.substring(0, 10)}</p>
                    </Card.Text>

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
