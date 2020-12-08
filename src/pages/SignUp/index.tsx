import React, { useState, useEffect, ChangeEvent, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiLock, FiUser, FiCalendar, FiBookOpen, FiMapPin } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core'
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import axios from 'axios';

// import UpBar from '../../components/UpBar';
import DownBar from '../../components/DownBar';
import ButtonDefault from '../../components/ButtonDefault';
import Input from '../../components/input';
import Select from '../../components/select';

import { Background, Container, Content } from './styles';

interface IBGECityResponse {
  nome: string;
}


const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

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

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome Obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().min(6,'No mínimo 6 dígitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

    } catch (err) {
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <>
      <Background>
        <Container>
          <Content display={'1' === selectedCity ? 'flex' : 'none'}>
            <span></span>

            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Faça seu Cadastro</h1>

              <Input name="name" icon={FiUser} placeholder="Nome"/>

              <Input name="email" icon={FiMail} placeholder="E-mail"/>

              <Input name="date" icon={FiCalendar} placeholder="Data de nascimento"/>

              <Input name="lattes" icon={FiBookOpen} placeholder="Lattes"/>

              <Input name="orcid" icon={FiBookOpen} placeholder="ORCID"/>

              <Input name="instituicao" icon={FiBookOpen} placeholder="Instituição"/>

              <Select name="gender" icon={FiUser} id="gender">
                <option value="0">Selecione o seu sexo</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Prefiro não declarar">Prefiro não declarar</option>
              </Select>

              <Select icon={FiBookOpen} name="schooling" id="schooling">
                <option value="0">Selecione uma escolaridade</option>
                <option value="Médio - Incompleto">Médio - Incompleto</option>
                <option value="Médio - Completo">Médio - Completo</option>
                <option value="Superior - Incompleto">Superior - Incompleto</option>
                <option value="Superior - Completo">Superior - Completo</option>
                <option value="Pós-graduação (Lato senso) - Completo">Pós-graduação (Lato senso)</option>
                <option value="Pós-graduação (Stricto sensu, nível mestrado) - Completo">Pós-graduação (Stricto sensu, nível mestrado)</option>
                <option value="Pós-graduação (Stricto sensu, nível doutor) - Completo">Pós-graduação (Stricto sensu, nível doutor)</option>
              </Select>

              <Select name="city" icon={FiMapPin} id="city" value={selectedCity} onChange={handleSelectCity}>
                <option value="0">Selecione o seu Estado</option>
                  {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                  ))}
                <option value="1">Outro país</option>
              </Select>

              <div id="texto">
                <Input icon={FiMapPin} type="text" name="Estado" placeholder="Digite onde você reside"/>
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
