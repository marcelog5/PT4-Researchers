import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiLock, FiUser, FiCalendar, FiBookOpen } from 'react-icons/fi';
import { Form } from '@unform/web';

import axios from 'axios';

// import UpBar from '../../components/UpBar';
import DownBar from '../../components/DownBar';
import ButtonDefault from '../../components/ButtonDefault';
import Input from '../../components/input';

import { Background, Container, Content } from './styles';

interface IBGECityResponse {
  nome: string;
}


const SignUp: React.FC = () => {
  const [cities, setCities] = useState<string[]>([]);

  const [selectedCity, setSelectedCity] = useState('0');

  useEffect(() => {
    axios.get<IBGECityResponse[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(response => {
        const cityNames = response.data.map(city => city.nome);

        setCities(cityNames.sort());
    });
  }, []);

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;

    setSelectedCity(city);
  }

  function handleSubmit(data: object): void {
    console.log(data);
  }

  return (
    <>
      <Background>
        <Container>
          <Content display={'1' === selectedCity ? 'flex' : 'none'}>
            <span></span>

            <Form onSubmit={handleSubmit}>
              <h1>Faça seu Cadastro</h1>

              <Input name="name" icon={FiUser} placeholder="Nome"/>

              <Input name="email" icon={FiMail} placeholder="E-mail"/>

              <Input name="date" icon={FiCalendar} placeholder="Data de nascimento"/>

              <Input name="lattes" icon={FiBookOpen} placeholder="Lattes"/>

              <Input name="orcid" icon={FiBookOpen} placeholder="ORCID"/>

              <Input name="instituicao" icon={FiBookOpen} placeholder="Instituição"/>

              <select name="gender" id="gender">
                <option value="0">Selecione o seu sexo</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Prefiro não declarar">Prefiro não declarar</option>
              </select>

              <select name="schooling" id="schooling">
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

              <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>

              <Input name="repassword" icon={FiLock} type="password" placeholder="Repita sua senha"/>

              <ButtonDefault type="submit">
                Cadastrar
              </ButtonDefault>
            </Form>

            <Link to="/">
              <FiArrowLeft/>
              Voltar para o Login
            </Link>
          </Content>
        </Container>
      </Background>

      <DownBar/>
    </>
  );
}

export default SignUp;
