import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ProgressBar, Alert } from 'react-bootstrap';

// import UpBar from '../../components/UpBar';
import DownBar from '../../components/DownBar';
import ButtonDefault from '../../components/ButtonDefault';

import { Background, Container, ContainerButton} from './styles';

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
  pass: {
    id: string;
    name: string;
    term: string;
    link: string;
    inventory: Inventory;
  },
  passLink: string;
}

const QuestionsForm: React.FC = () => {
  const location = useLocation<Form>();
  const questions = location.state.pass.inventory.questions;
  const numberQuestions = location.state.pass.inventory.numberOfQuestions;

  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
  const [questionsShow, setQuestionsShow] = useState<number>(5);
  const [show, setShow] = useState(false);

  function handleSelectedAnswer(id: number, optionNumber: number) {
    let selected = [];

    selected = selectedQuestions.map(question => question);
    selected[id - 1] = optionNumber;

    setSelectedQuestions(selected);
  }

  function handleContinueButton() {
    let questionShow;
    let i = 0;

    questionShow = questionsShow;

    selectedQuestions.forEach(question => {
      i++;
    });

    if(i < questionShow) {
      setShow(true);
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    setQuestionsShow(questionShow + 5);
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


  function handleBackButton() {
    let questionShow;

    questionShow = questionsShow;

    setQuestionsShow(questionShow - 5);
  }

  return (
    <>
      {/* <UpBar /> */}

      <Background>
        <Container>
        <ProgressBar now={selectedQuestions.length * 100 / numberQuestions} label={`${selectedQuestions.length * 100 / numberQuestions}%`}/>

        <AlertQuestion />

          <form>
            <ul>
              {questions.slice(questionsShow - 5,questionsShow).map(questions => {
                return (
                  <li key={questions.id}>
                    <p>{questions.question}</p>

                    <div className="radio-group">
                      <input type="radio" id="option-one" name={`selector${questions.id}`} />
                      <label
                        htmlFor="option-one"
                        onClick={() => handleSelectedAnswer(questions.questionNumber, 1)}
                        className={selectedQuestions[questions.questionNumber - 1] === 1 ? 'selected' : ''}
                      >
                        1
                      </label>

                      <input type="radio" id="option-two" name={`selector${questions.id}`} />
                      <label
                        htmlFor="option-two"
                        onClick={() => handleSelectedAnswer(questions.questionNumber, 2)}
                        className={selectedQuestions[questions.questionNumber - 1] === 2 ? 'selected' : ''}
                      >
                        2
                      </label>

                      <input type="radio" id="option-three" name={`selector${questions.id}`} />
                      <label
                        htmlFor="option-three"
                        onClick={() => handleSelectedAnswer(questions.questionNumber, 3)}
                        className={selectedQuestions[questions.questionNumber - 1] === 3 ? 'selected' : ''}
                      >
                        3
                      </label>

                      <input type="radio" id="option-four" name={`selector${questions.id}`} />
                      <label
                        htmlFor="option-four"
                        onClick={() => handleSelectedAnswer(questions.questionNumber, 4)}
                        className={selectedQuestions[questions.questionNumber - 1] === 4 ? 'selected' : ''}
                      >
                        4
                      </label>

                      <input type="radio" id="option-five" name={`selector${questions.id}`} />
                      <label
                        htmlFor="option-five"
                        onClick={() => handleSelectedAnswer(questions.questionNumber, 5)}
                        className={selectedQuestions[questions.questionNumber - 1] === 5 ? 'selected' : ''}
                      >
                        5
                      </label>
                    </div>
                  </li>
                );
              })}
            </ul>
          </form>

          <section>
            <ContainerButton display={5 === questionsShow ? 'flex' : 'none'}>
              <Link to={`/homeform/${location.state.passLink}`}>
                <ButtonDefault>
                  Voltar
                </ButtonDefault>
              </Link>
            </ContainerButton>

            <ContainerButton display={5 + 1 < questionsShow ? 'flex' : 'none'}>
                <ButtonDefault onClick={handleBackButton}>
                  Voltar
                </ButtonDefault>
            </ContainerButton>

            <ContainerButton display={numberQuestions - 1 < questionsShow ? 'none' : 'flex'}>
                <ButtonDefault onClick={handleContinueButton}>
                  Continuar
                </ButtonDefault>
            </ContainerButton>

            <ContainerButton display={numberQuestions - 1 >= questionsShow ? 'none' : 'flex'}>
              <Link to={{
                pathname: "/respondentinformationform",
                state: {
                  passForm: location.state.pass,
                  passAnswer: selectedQuestions,
                  passLink: location.state.passLink,
                }
              }}>
                <ButtonDefault>
                  Continuar
                </ButtonDefault>
              </Link>
            </ContainerButton>
          </section>
        </Container>
      </Background>

      <DownBar />
    </>
  );/*  */
};

export default QuestionsForm;
