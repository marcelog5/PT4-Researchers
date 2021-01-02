import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { FiPlusCircle } from "react-icons/fi";
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
}

const Home: React.FC = () => {
  const { userToken } = useAuth();
  const [formsData, setFormsData] = useState<Form[]>([]);

  const config = {
    headers: { Authorization: `Bearer ${userToken}` }
  };

  useEffect(() => {
    api.get('forms', config).then( response => {
      setFormsData(response.data);
    });
  }, [config]);

  return(
    <>
      <UpBar></UpBar>

      <Background>
        <Container>

        <section className="card-sections">
          <Card>
            <Card.Header>Crie um formulário</Card.Header>
            <Card.Body>
              <Link className="addForm" to="/">
                  <FiPlusCircle size={60}/>
              </Link>
            </Card.Body>
          </Card>

            {formsData.map(form => {
              return(
                <Card>
                  <Card.Header>{form.name}</Card.Header>

                  <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text>

                    </Card.Text>

                    <Link to={{
                      pathname: "/",
                      state: {
                        passFormId: form
                      }
                    }}>
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
