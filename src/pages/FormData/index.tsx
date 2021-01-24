import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ExportToCsv } from 'export-to-csv';

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
  const [agreeableness, setAgreeableness] = useState<number[]>([]);
  const [extraversion, setExtraversion] = useState<number[]>([]);
  const [conscientiousness, setConscientiousness] = useState<number[]>([]);
  const [neuroticism, setNeuroticism] = useState<number[]>([]);
  const [openness, setOpenness] = useState<number[]>([]);

  const location = useLocation<FormPass>();
  const form = location.state.Form;
  const history = useHistory();

  const { userToken } = useAuth();
  const { addToast } = useToast();

  const [respondentsData, setRespondentsData] = useState<RespondentData[]>([]);

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${userToken}` },
    };

    api.get(`respondents/${form.id}`, config).then((response) => {
      setRespondentsData(response.data);
    });
  }, [form.id, userToken]);

  useEffect(() => {
    if (respondentsData.length !== 0) {
      setExtraversion([]);
      setConscientiousness([]);
      setAgreeableness([]);
      setOpenness([]);
      setNeuroticism([]);

      let extraversionArray: number[] = [];
      let conscientiousnessArray: number[] = [];
      let agreeablenessArray: number[] = [];
      let opennessArray: number[] = [];
      let neuroticismArray: number[] = [];

      respondentsData.forEach((respondentData) => {
        let extraversionSum = 0;
        let conscientiousnessSum = 0;
        let agreeablenessSum = 0;
        let opennessSum = 0;
        let neuroticismSum = 0;

        for (let i = 0; i < respondentData.questionsAnswer.length; i++) {
          switch (form.inventory.questions[i].trait) {
            case 'Extroversão':
              extraversionSum +=
                respondentData.questionsAnswer[i] *
                (form.inventory.questions[i].inverted ? -1 : 1);
              break;

            case 'Conscienciosidade':
              conscientiousnessSum +=
                respondentData.questionsAnswer[i] *
                (form.inventory.questions[i].inverted ? -1 : 1);
              break;

            case 'Amabilidade':
              agreeablenessSum +=
                respondentData.questionsAnswer[i] *
                (form.inventory.questions[i].inverted ? -1 : 1);
              break;

            case 'Abertura à experiência':
              opennessSum +=
                respondentData.questionsAnswer[i] *
                (form.inventory.questions[i].inverted ? -1 : 1);
              break;

            case 'Neuroticismo':
              neuroticismSum +=
                respondentData.questionsAnswer[i] *
                (form.inventory.questions[i].inverted ? -1 : 1);
              break;
          }
        }

        extraversionArray.push(extraversionSum);
        conscientiousnessArray.push(conscientiousnessSum);
        agreeablenessArray.push(agreeablenessSum);
        opennessArray.push(opennessSum);
        neuroticismArray.push(neuroticismSum);
      });

      setExtraversion(extraversionArray);
      setConscientiousness(conscientiousnessArray);
      setAgreeableness(agreeablenessArray);
      setOpenness(opennessArray);
      setNeuroticism(neuroticismArray);
    }
  }, [respondentsData, form]);

  const handleExportButton = useCallback(async () => {
    try {
      let data = [];

      for (let i = 0; i < respondentsData.length; i++) {
        data[i] = {
          Idade: respondentsData[i].age,
          Genero: respondentsData[i].gender,
          Escolaridade: respondentsData[i].schooling,
          Estado: respondentsData[i].state,
          Realizado: respondentsData[i].created_at,
          Extroversao: extraversion[i],
          Conscienciosidade: conscientiousness[i],
          Amabilidade: agreeableness[i],
          Abertura_a_experiencia: openness[i],
          Neuroticismo: neuroticism[i],
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

      addToast({
        type: 'success',
        title: 'Formulário exportado com sucesso!',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro no cadastro',
        description: 'Ocorreu um erro ao exportar o formulário!',
      });
    }
  }, [
    addToast,
    respondentsData,
    extraversion,
    conscientiousness,
    agreeableness,
    openness,
    neuroticism,
  ]);

  const handleDeleteButton = useCallback(async () => {
    try {
      if (respondentsData.length !== 0) {
        throw new Error();
      }

      const config = {
        headers: { Authorization: `Bearer ${userToken}` },
      };

      await api.delete(`forms/${form.id}`, config);

      addToast({
        type: 'success',
        title: 'Formulário deletado!',
      });

      history.push('/');
    } catch (err) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      addToast({
        type: 'error',
        title: 'Erro no cadastro',
        description: 'Ocorreu um erro ao apagar o formulário!',
      });
    }
  }, [addToast, form, history, respondentsData, userToken]);

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
                    <th>Extroversão</th>
                    <th>Conscienciosidade</th>
                    <th>Amabilidade</th>
                    <th>Abertura à experiência</th>
                    <th>Neuroticismo</th>
                  </tr>
                </thead>
                <tbody>
                  {respondentsData.map((respondent, index) => {
                    return (
                      <tr key={respondent.id}>
                        <td>{respondent.age.substring(0, 10)}</td>
                        <td>{respondent.gender}</td>
                        <td>{respondent.schooling}</td>
                        <td>{respondent.state}</td>
                        <td>{respondent.created_at.substring(0, 10)}</td>
                        <td>{extraversion[index]}</td>
                        <td>{conscientiousness[index]}</td>
                        <td>{agreeableness[index]}</td>
                        <td>{openness[index]}</td>
                        <td>{neuroticism[index]}</td>
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

            <ButtonDefault onClick={handleDeleteButton}>Apagar</ButtonDefault>

            <ButtonDefault onClick={handleExportButton}>Exportar</ButtonDefault>
          </section>
        </Container>
      </Background>

      <DownBar></DownBar>
    </>
  );
};

export default FormData;
