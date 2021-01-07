import React, { useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

import { useForm } from '../../hooks/Form';

import { Background, Container } from './styles';

// import UpBar from '../../components/UpBar';
import DownBar from '../../components/DownBar';
import ButtonDefault from '../../components/ButtonDefault';

const HomeForm: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const { addForm } = useForm();

  useEffect(() => {
    async function AddForm() {
      if (!(await addForm(location.pathname.substring(10))))
        history.push('/formnotexist');
    }

    AddForm();
  }, [location.pathname, history, addForm]);

  return (
    <>
      {/* <UpBar/> */}

      <Background>
        <Container>
          <div className="InforContainer">
            <h1>Teste do Big 5</h1>

            <p>
              Esse é um método que tenta descrever a sua personalidade em 5
              principais traços a partir de diversas questões que serão
              apresentadas a você.
            </p>

            <p>
              Sua contribuição para esse teste influenciará nos estudos de
              diversos pesquisadores, por isso, responda da maneira que mais se
              assemelha a você.
            </p>

            <Link to={'/consentform'}>
              <ButtonDefault>Comece aqui!</ButtonDefault>
            </Link>
          </div>
        </Container>
      </Background>

      <DownBar />
    </>
  ); /*  */
};

export default HomeForm;
