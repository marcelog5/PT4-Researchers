import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';

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

const AllForms: React.FC = () => {
  const { userToken } = useAuth();

  const [formsData, setFormssData] = useState<Form[]>([]);

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${userToken}` },
    };

    api.get(`forms/`, config).then((response) => {
      console.log(response.data);
      setFormssData(response.data);
    });
  }, [userToken]);

  return (
    <>
      <UpBar></UpBar>

      <Background>
        <Container>
          <section className="RespondentAnswer">
            <p className="title">Visualizar score de todas as pesquisas:</p>

            <Link to="/">
              <ButtonDefault>visualizar</ButtonDefault>
            </Link>

            <p className="title">Respondentes:</p>

            <div className="RespondentsContainer">
              <table>
                <thead>
                  <tr>
                    <th>Índice</th>
                    <th>Formulários</th>
                    <th>Visualizar</th>
                  </tr>
                </thead>
                <tbody>
                  {formsData.map((form, index) => {
                    return (
                      <tr key={form.id}>
                        <td>{index}</td>
                        <td>{form.name}</td>
                        <td>
                          <Link to="/">
                            <ButtonDefault className="copyButton" icon={FiEye}></ButtonDefault>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <section className="buttonMenu">
            <Link to="/">
              <ButtonDefault>Voltar</ButtonDefault>
            </Link>
          </section>
        </Container>
      </Background>

      <DownBar></DownBar>
    </>
  );
};

export default AllForms;
