import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import api from '../../services/api';

// import UpBar from '../../components/UpBar';
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

interface LinkForm {
  passLink: string;
}

const ConsentForm: React.FC = () => {
  const location = useLocation<LinkForm>();
  const history = useHistory();

  const [forms, setForms] = useState<Form>();

  useEffect(() => {
    api.get('forms/' + location.state.passLink).then(response => {
      if(response.data.message === 'Form not found.'){
        history.push('/formnotexist');
      } else {
        setForms(response.data);
      }
    });
  }, [location.state.passLink, history]);

  return (
    <>
      {/* <UpBar /> */}

      <Background>
        <Container>
          <ResearchLink>
            <h5>Link para o Termo de consentimento do pesquisador</h5>
            <a href={forms?.link} target="_blanck">{forms?.link}</a>
          </ResearchLink>

          <ResearchTerm>
            <h5>Termo de consentimento do pesquisador</h5>
            <p>{forms?.term}</p>
          </ResearchTerm>

          <ContainerButton>
            <Link to={{
              pathname: "/tutorialform",
              state: {
                pass: forms,
                passLink: location.state.passLink,
              }
            }}>
              <ButtonDefault>
                Aceito participar
              </ButtonDefault>
            </Link>

            <Link to={`/homeform/${location.state.passLink}`}>
              <ButtonDefault>
                Não aceito participar
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
