import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

// import UpBar from '../../components/UpBar';
import DownBar from '../../components/DownBar';
import ButtonDefault from '../../components/ButtonDefault';

import { Background, Container, ContainerButton } from './styles';

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
  }
}

const QuestionsForm: React.FC = () => {
  const location = useLocation<Form>();
  const questions = location.state.pass.inventory.questions;
  const numberQuestions = location.state.pass.inventory.numberOfQuestions;

  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
  const [questionsShow, setQuestionsShow] = useState<number>(5);

  function handleSelectedAnswer(id: number, optionNumber: number) {
    let selected = [];

    selected = selectedQuestions.map(question => question);
    selected[id - 1] = optionNumber;

    setSelectedQuestions(selected);
  }

  function handleContinueButton() {
    let questionShow;

    questionShow = questionsShow;

    setQuestionsShow(questionShow + 5);
  }

  return (
    <>
      {/* <UpBar /> */}

      <Background>
        <Container>
          <form>
            <ul>
              {questions.slice(questionsShow - 5,questionsShow).map(questions => {
                return (
                  <li key={questions.id}>
                    <p>{questions.question}</p>

                    <div className="radio-group">
                      <span>
                        Discordo
                      </span>

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

                      <span>
                        Concordo
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </form>

          <ContainerButton display={numberQuestions - 1 < questionsShow ? 'none' : 'flex'}>
              <ButtonDefault type="button" onClick={handleContinueButton}>
                Continuar
              </ButtonDefault>
          </ContainerButton>

          <ContainerButton display={numberQuestions - 1 >= questionsShow ? 'none' : 'flex'}>
            <Link to={{
              pathname: "/respondentinformationform",
              state: {
                passForm: location.state.pass,
                passAnswer: selectedQuestions
              }
            }}>
              <ButtonDefault type="button">
                Continuar
              </ButtonDefault>
            </Link>
          </ContainerButton>
        </Container>
      </Background>

      <DownBar />
    </>
  );/*  */
};

export default QuestionsForm;
