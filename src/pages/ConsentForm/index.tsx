import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import UpBar from '../../components/UpBar';
import DownBar from '../../components/DownBar';
import ButtonDefault from '../../components/ButtonDefault';

import { Background, Container, ResearchLink, ResearchTerm, ContainerButton } from './styles';


interface Question {
  question: string;
  inverted: boolean;
  trait: string;
  factor: string;
}

interface Inventory {
  id: string;
  author: string;
  numberOfQuestions: number;
  question: Question[];
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
    api.get('forms/46582820-ecc6-4530-bff6-ce3c44167e81').then(response => {
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

            <Link to="/questionsform">
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
