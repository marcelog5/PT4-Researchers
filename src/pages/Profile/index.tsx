import React, {
  useState,
  useEffect,
  ChangeEvent,
  useCallback,
  useRef,
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  FiMail,
  FiUser,
  FiCalendar,
  FiBookOpen,
  FiMapPin,
} from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import axios from 'axios';
import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import { useToast } from '../../hooks/Toast';

import UpBar from '../../components/UpBar';
import DownBar from '../../components/DownBar';
import ButtonDefault from '../../components/ButtonDefault';
import Input from '../../components/input';
import Select from '../../components/select';

import { Background, Container, Content } from './styles';
import { useAuth } from '../../hooks/Auth';

interface IBGECityResponse {
  nome: string;
}

interface DataValidation {
  city: string;
  country: string;
  date: string;
  email: string;
  gender: string;
  schooling: string;
  institution: string;
  lattes: string;
  name: string;
  orcid: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { userData, signOut } = useAuth();

  const history = useHistory();

  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState('0');

  useEffect(() => {
    axios
      .get<IBGECityResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      )
      .then((response) => {
        const cityNames = response.data.map((city) => city.nome);

        setCities(cityNames.sort());
      });
  }, []);

  useEffect(() => {
    try {
      formRef.current?.setFieldValue('name', userData.name);
      formRef.current?.setFieldValue('email', userData.email);
      formRef.current?.setFieldValue('lattes', userData.lattes);
      formRef.current?.setFieldValue('orcid', userData.orcid);
      formRef.current?.setFieldValue('institution', userData.institution);
      formRef.current?.setFieldValue('gender', userData.gender);
      formRef.current?.setFieldValue('schooling', userData.schooling);
      formRef.current?.setFieldValue('city', userData.state);
      formRef.current?.setFieldValue(
        'date',
        userData.age.toString().substring(0, 10),
      );
    } catch {
      history.push('/');
    }
  }, [userData, cities, history]);

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;

    setSelectedCity(city);
  }

  const handleSubmit = useCallback(
    async (data: DataValidation) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome Obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          date: Yup.date()
            .required()
            .typeError('Data de nascimento obrigatória'),
          gender: Yup.string().required('Campo obrigatório'),
          schooling: Yup.string().required('Escolaridade obrigatória'),
          city: Yup.string().required('Cidade obrigatória'),
        });

        let postData = {
          id: userData.id,
          name: data.name,
          email: data.email,
          gender: data.gender,
          age: data.date,
          institution: data.institution,
          schooling: data.schooling,
          orcid: data.orcid,
          lattes: data.lattes,
          state: data.city,
        };

        if (data.city === '1') {
          const minischema = Yup.object().shape({
            name: Yup.string().required('Nome Obrigatório'),
            email: Yup.string()
              .required('E-mail obrigatório')
              .email('Digite um e-mail válido'),
            date: Yup.date()
              .required()
              .typeError('Data de nascimento obrigatória'),
            gender: Yup.string().required('Campo obrigatório'),
            schooling: Yup.string().required('Escolaridade obrigatória'),
            country: Yup.string().required('País obrigatório'),
          });

          await minischema.validate(data, {
            abortEarly: false,
          });

          postData.state = data.country;
        }

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put('/users/userdata', postData);

        addToast({
          type: 'success',
          title: 'Perfil atualizado com sucesso!',
          description:
            'Agora só realizar o login novamente para visualizar suas mudanças!',
        });

        signOut();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente!',
        });
      }
    },
    [addToast, userData, signOut],
  );

  return (
    <>
      <UpBar />

      <Background>
        <Container>
          <Content display={'1' === selectedCity ? 'flex' : 'none'}>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Atualize o seu perfil</h1>

              <Input name="name" icon={FiUser} placeholder="Nome" />

              <Input name="email" icon={FiMail} placeholder="E-mail" />

              <Input
                name="date"
                icon={FiCalendar}
                type="date"
                placeholder="Data de nascimento"
              />

              <Input name="lattes" icon={FiBookOpen} placeholder="Lattes" />

              <Input name="orcid" icon={FiBookOpen} placeholder="ORCID" />

              <Input
                name="institution"
                icon={FiBookOpen}
                placeholder="Instituição"
              />

              <Select name="gender" icon={FiUser} id="gender">
                <option value="">Selecione o seu sexo</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Prefiro não declarar">
                  Prefiro não declarar
                </option>
              </Select>

              <Select name="schooling" icon={FiBookOpen} id="schooling">
                <option value="">Selecione uma escolaridade</option>
                <option value="Médio - Incompleto">Médio - Incompleto</option>
                <option value="Médio - Completo">Médio - Completo</option>
                <option value="Superior - Incompleto">
                  Superior - Incompleto
                </option>
                <option value="Superior - Completo">Superior - Completo</option>
                <option value="Pós-graduação (Lato senso) - Completo">
                  Pós-graduação (Lato senso)
                </option>
                <option value="Pós-graduação (Stricto sensu, nível mestrado) - Completo">
                  Pós-graduação (Stricto sensu, nível mestrado)
                </option>
                <option value="Pós-graduação (Stricto sensu, nível doutor) - Completo">
                  Pós-graduação (Stricto sensu, nível doutor)
                </option>
              </Select>

              <Select
                name="city"
                icon={FiMapPin}
                id="city"
                value={selectedCity}
                onChange={handleSelectCity}
              >
                <option value="">Selecione o seu Estado</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
                <option value="1">Outro país</option>
              </Select>

              <div id="texto">
                <Input
                  icon={FiMapPin}
                  type="text"
                  name="country"
                  placeholder="Digite onde você reside"
                />
              </div>

              <section className="ButtonContainer">
                <Link to="/">
                  <ButtonDefault>Voltar</ButtonDefault>
                </Link>

                <ButtonDefault type="submit">Atualizar</ButtonDefault>
              </section>

              <Link to="/">Deseja Alterar sua senha?</Link>
            </Form>
          </Content>
        </Container>
      </Background>

      <DownBar />
    </>
  );
};

export default Profile;
