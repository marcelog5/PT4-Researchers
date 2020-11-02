import React, { useEffect, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Background, Container, ContainerButton } from './styles';

import DownBar from '../../components/DownBar';
import ButtonDefault from '../../components/ButtonDefault';

interface IBGECityResponse {
  nome: string;
}

const RespondentInformationForm: React.FC = () => {
  const today = new Date();

  const [cities, setCities] = useState<string[]>([]);

  const [selectedCity, setSelectedCity] = useState('0');
  const [selectedSchooling, setSelectedSchooling] = useState('0');
  const [selectedGender, setSelectedGender] = useState('0');


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

  return (
    <>
      {/* <UpBar/> */}

      <Background>
        <Container>
         <form>
            <label>Data de nascimento</label>
             <input
              type="date"
              max={`${today.getFullYear() - 10}-01-01`}
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
              <Link to="/respondentinformationform">
                <ButtonDefault type="button">
                  Enviar
                </ButtonDefault>
              </Link>
            </ContainerButton>
          </form>
        </Container>
      </Background>

      <DownBar/>
    </>
  );
};

export default RespondentInformationForm;
