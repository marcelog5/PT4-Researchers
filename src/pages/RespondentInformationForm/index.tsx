import React, { useEffect, useState, ChangeEvent } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { Form } from '@unform/web';

import api from '../../services/api';
import axios from 'axios';

import { Background, Container, ContainerButton } from './styles';

import DownBar from '../../components/DownBar';
import ButtonDefault from '../../components/ButtonDefault';
import Input from '../../components/input';

interface IBGECityResponse {
  nome: string;
}

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

interface QuestionsAnswer {
  passAnswer: {
    selectedQuestions: number[];
  },
  passForm: {
    id: string;
    name: string;
    term: string;
    link: string;
    inventory: Inventory;
  },
  passLink: string;
}

interface SubmitData {
  Estado: string;
}

const RespondentInformationForm: React.FC = () => {
  const today = new Date();
  const location = useLocation<QuestionsAnswer>();
  const history = useHistory();

  const [cities, setCities] = useState<string[]>([]);

  const [selectedCity, setSelectedCity] = useState('0');
  const [selectedSchooling, setSelectedSchooling] = useState('0');
  const [selectedGender, setSelectedGender] = useState('0');
  const [selectedAge, setSelectedAge] = useState<string>(`${today.getFullYear() - 2}-01-01`);
  const [show, setShow] = useState(false);


  useEffect(() => {
    axios.get<IBGECityResponse[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(response => {
        const cityNames = response.data.map(city => city.nome);

        setCities(cityNames.sort());
    });
  }, []);

  function handleSelectGender(event: ChangeEvent<HTMLSelectElement>) {
    const gender = event.target.value;

    setSelectedGender(gender);
  }

  function handleSelectSchooling(event: ChangeEvent<HTMLSelectElement>) {
    const schooling = event.target.value;

    setSelectedSchooling(schooling);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;

    setSelectedCity(city);
  }

  function handleSelectAge(event: ChangeEvent<HTMLInputElement>) {
    const age = event.target.value;

    setSelectedAge(age.toString());
  }

  async function handleSubmit(data: SubmitData) {
    const gender = selectedGender
    const schooling = selectedSchooling;
    const age = selectedAge;
    var state = selectedCity;
    const questionsAnswer = location.state.passAnswer;
    const form_id = location.state.passForm.id;

    if(gender === "0" || schooling === "0" || state === "0"){
      setShow(true);
      return;
    }

    if (state === '1') {
      if (data.Estado !== null && data.Estado !== "") {
        state = data.Estado;
      } else {
        setShow(true);
        return;
      }
    }

    const dataSubmit = {
      gender,
      schooling,
      age,
      state,
      questionsAnswer,
      form_id
    };

    await api.post('respondents', dataSubmit)
        .then((response) => {
            history.push({
              pathname: '/finishform',
              state: {
                passForm: location.state.passForm,
              }
            });
        }, (error) => {
            alert('Erro no envio');
            return;
        });
  }

  function AlertQuestion() {
    if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Marque todos os itens</Alert.Heading>
          <p>
            Parece que você ainda não marcou todos os itens
          </p>
        </Alert>
      );
    }
    return <div style={{ display: "none" }}></div>;
  }


  return (
    <>
      {/* <UpBar/> */}

      <Background>
        <Container display={'1' === selectedCity ? 'flex' : 'none'}>
          <AlertQuestion/>

          <h1>Fale sobre você</h1>

          <Form onSubmit={handleSubmit}>
            <label>Data de nascimento</label>
            <input
            type="date"
            onChange={handleSelectAge}
            value={selectedAge.toString()}
            max={`${today.getFullYear() - 1}-01-01`}
            min="1900-06-01"
            />

            <label>Sexo</label>
            <select name="gender" id="gender" value={selectedGender} onChange={handleSelectGender}>
              <option value="0">Selecione o seu sexo</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Prefiro não declarar">Prefiro não declarar</option>
            </select>

            <label>Escolaridade</label>
            <select name="schooling" id="schooling" value={selectedSchooling} onChange={handleSelectSchooling}>
              <option value="0">Selecione uma escolaridade</option>
              <option value="Fundamental - Incompleto">Fundamental - Incompleto</option>
              <option value="Fundamental - Completo">Fundamental - Completo</option>
              <option value="Médio - Incompleto">Médio - Incompleto</option>
              <option value="Médio - Completo">Médio - Completo</option>
              <option value="Superior - Incompleto">Superior - Incompleto</option>
              <option value="Superior - Completo">Superior - Completo</option>
              <option value="Pós-graduação (Lato senso)">Pós-graduação (Lato senso)</option>
              <option value="Pós-graduação (Stricto sensu, nível mestrado)">Pós-graduação (Stricto sensu, nível mestrado)</option>
              <option value="Pós-graduação (Stricto sensu, nível doutor)">Pós-graduação (Stricto sensu, nível doutor)</option>
            </select>

            <label>Estado</label>
            <select name="city" id="city" value={selectedCity} onChange={handleSelectCity}>
              <option value="0">Selecione o seu Estado</option>
                {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                ))}
              <option value="1">Outros</option>
            </select>

            <div id="texto">
              <Input type="text" name="Estado" placeholder="Digite onde você reside"/>
            </div>

            <ContainerButton>
              <Link to={`/homeform/${location.state.passLink}`}>
                <ButtonDefault>
                  Voltar
                </ButtonDefault>
              </Link>

              <ButtonDefault type="submit">
                Enviar
              </ButtonDefault>
            </ContainerButton>
          </Form>
        </Container>
      </Background>

      <DownBar/>
    </>
  );
};

export default RespondentInformationForm;
