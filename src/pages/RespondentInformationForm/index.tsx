import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import api from '../../services/api';
import axios from 'axios';

import { Background, Container, ContainerButton } from './styles';

import DownBar from '../../components/DownBar';
import ButtonDefault from '../../components/ButtonDefault';

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
  }

  passForm: {
    id: string;
    name: string;
    term: string;
    link: string;
    inventory: Inventory;
  }
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


  useEffect(() => {
    axios.get<IBGECityResponse[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(response => {
        const cityNames = response.data.map(city => city.nome);

        setCities(cityNames);
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

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const gender = selectedGender
    const schooling = selectedSchooling;
    const age = selectedAge;
    const state = selectedCity;
    const questionsAnswer = location.state.passAnswer;
    const form_id = location.state.passForm.id;

    const data = {
      gender,
      schooling,
      age,
      state,
      questionsAnswer,
      form_id
    };

    await api.post('respondents', data)
        .then((response) => {
            history.push('/finishform', response.data);
        }, (error) => {
            alert('Erro no envio');
            return;
        });
  }


  return (
    <>
      {/* <UpBar/> */}

      <Background>
        <Container>
         <form onSubmit={handleSubmit}>
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
              <option value="Pós-graduação (Lato senso) - Incompleto">Pós-graduação (Lato senso) - Incompleto</option>
              <option value="Pós-graduação (Lato senso) - Completo">Pós-graduação (Lato senso) - Completo</option>
              <option value="Pós-graduação (Stricto sensu, nível mestrado) - Incompleto">Pós-graduação (Stricto sensu, nível mestrado) - Incompleto</option>
              <option value="Pós-graduação (Stricto sensu, nível mestrado) - Completo">Pós-graduação (Stricto sensu, nível mestrado) - Completo</option>
              <option value="Pós-graduação (Stricto sensu, nível doutor) - Incompleto">Pós-graduação (Stricto sensu, nível doutor) - Incompleto</option>
              <option value="Pós-graduação (Stricto sensu, nível doutor) - Completo">Pós-graduação (Stricto sensu, nível doutor) - Completo</option>
            </select>

            <label>Estado</label>
            <select name="city" id="city" value={selectedCity} onChange={handleSelectCity}>
              <option value="0">Selecione o seu Estado</option>
                {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                ))}
            </select>

            <ContainerButton>
                <ButtonDefault type="submit">
                  Enviar
                </ButtonDefault>
            </ContainerButton>
          </form>
        </Container>
      </Background>

      <DownBar/>
    </>
  );
};

export default RespondentInformationForm;
