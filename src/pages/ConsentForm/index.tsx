import React from 'react';
import { Link } from 'react-router-dom';

import { useForm } from '../../hooks/Form';

// import UpBar from '../../components/UpBar';
import DownBar from '../../components/DownBar';
import ButtonDefault from '../../components/ButtonDefault';

import { Background, Container, ResearchLink, ResearchTerm, ContainerButton } from './styles';

const ConsentForm: React.FC = () => {
  const { formData } = useForm();

  return (
    <>
      {/* <UpBar /> */}

      <Background>
        <Container>
          <ResearchLink>
            <h5>Link para o Termo de consentimento do pesquisador</h5>
            <a href={formData.link} target="_blanck">{formData.link}</a>
          </ResearchLink>

          <ResearchTerm>
            <h5>Termo de consentimento do pesquisador</h5>
            <p>{formData.term}</p>
          </ResearchTerm>

          <ContainerButton>
            <Link to={"/tutorialform"}>
              <ButtonDefault>
                Aceito participar
              </ButtonDefault>
            </Link>

            <Link to={`/homeform/${formData.id}`}>
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
