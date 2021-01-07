import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ExportToCsv } from 'export-to-csv';

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

interface FormPass {
  Form: Form;
}

interface RespondentData {
  id: string;
  age: string;
  gender: string;
  questionsAnswer: number[];
  answer?: string;
  schooling: string;
  state: string;
  created_at: string;
  updated_at: string;
}

const FormData: React.FC = () => {
  const location = useLocation<FormPass>();
  const form = location.state.Form;

  const { userToken } = useAuth();

  const [respondentsData, setRespondentsData] = useState<RespondentData[]>([]);

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${userToken}` },
    };

    api.get(`respondents/${form.id}`, config).then((response) => {
      setRespondentsData(response.data);
    });
  }, [form.id, userToken]);

  function handleExportButton() {
    let data = [];

    for (let i = 0; i < respondentsData.length; i++) {
      data[i] = {
        Idade: respondentsData[i].age,
        Genero: respondentsData[i].gender,
        Escolaridade: respondentsData[i].schooling,
        Estado: respondentsData[i].state,
        Realizado: respondentsData[i].created_at,
        Respostas: respondentsData[i].questionsAnswer.toString(),
      };
    }

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: false,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };

    const csvExporter = new ExportToCsv(options);

    csvExporter.generateCsv(data);
  }

  return (
    <>
      <UpBar></UpBar>

      <Background>
        <Container>
          <p className="title">
            Número de respondentes: {respondentsData.length}
          </p>

          <section className="Items">
            <p className="title">Itens da pesquisa atual:</p>

            <div className="questionContainer">
              <ul>
                {form.inventory.questions.map((question) => {
                  return (
                    <li key={question.id}>
                      <p>{question.question}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>

          <section className="RespondentAnswer">
            <p className="title">Respondentes:</p>

            <div className="RespondentsContainer">
              <table>
                <thead>
                  <tr>
                    <th>Data de nascimento</th>
                    <th>Gênero</th>
                    <th>Escolaridade</th>
                    <th>Estado</th>
                    <th>Realizado</th>
                    <th>Score médio</th>
                  </tr>
                </thead>
                <tbody>
                  {respondentsData.map((respondent) => {
                    return (
                      <tr key={respondent.id}>
                        <td>{respondent.age.substring(0, 10)}</td>
                        <td>{respondent.gender}</td>
                        <td>{respondent.schooling}</td>
                        <td>{respondent.state}</td>
                        <td>{respondent.created_at.substring(0, 10)}</td>
                        <td>20</td>
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

            <ButtonDefault>Apagar</ButtonDefault>

            <ButtonDefault onClick={handleExportButton}>Exportar</ButtonDefault>
          </section>
        </Container>
      </Background>

      <DownBar></DownBar>
    </>
  );
};

export default FormData;
