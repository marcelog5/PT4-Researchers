import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import UpBar from '../../components/UpBar';
import DownBar from '../../components/DownBar';
import ButtonDefault from '../../components/ButtonDefault';

import { Background, Container, ResearchLink, ResearchTerm, ContainerButton } from './styles';


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

const ConsentForm: React.FC = () => {
  const [forms, setForms] = useState<Form>();

  useEffect(() => {
    api.get('forms/1b91ed39-1fcd-4862-8a23-51d6d9f336b4').then(response => {
      setForms(response.data);
    });
  }, []);

  return (
    <>
      <UpBar />

      <Background>
        <Container>
          <ResearchLink>
            <p>Link para o Termo de consentimento do pesquisador: <a href={forms?.link}>{forms?.link}</a></p>
          </ResearchLink>

          <ResearchTerm>
            <p>Termo de consentimento escrito: </p>
            <p>{forms?.term}</p>
          </ResearchTerm>

          <ContainerButton>
            <Link to="/">
              <ButtonDefault type="button">
                Cancelar
              </ButtonDefault>
            </Link>

            <Link to={{
              pathname: "/questionsform",
              state: {
                pass: forms
              }
            }}>
              <ButtonDefault type="button">
                Aceito
              </ButtonDefault>
            </Link>
          </ContainerButton>
        </Container>
      </Background>

      <DownBar />
    </>
  );
};

export default ConsentForm;
