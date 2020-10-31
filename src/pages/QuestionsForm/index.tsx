import React from 'react';
import { useLocation } from 'react-router-dom';

import UpBar from '../../components/UpBar';
import DownBar from '../../components/DownBar';

import { Background, Container } from './styles';

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
  console.log(questions);

  return (
    <>
      <UpBar />

      <Background>
        <Container>
          <form>
            <ul>
              {questions.map(questions => {
                return (
                  <li key={questions.id}>
                    <p>{questions.question}</p>

                    <div className="radio-group">
                      <input type="radio" id="option-one" name={`selector${questions.id}`} />
                      <label
                        htmlFor="option-one"
                      >
                        Muito preciso
                      </label>

                      <input type="radio" id="option-two" name={`selector${questions.id}`} />
                      <label
                        htmlFor="option-two"
                      >
                        Moderadamente preciso
                      </label>

                      <input type="radio" id="option-three" name={`selector${questions.id}`} />
                      <label
                        htmlFor="option-three"
                      >
                        Nem impreciso nem preciso
                      </label>

                      <input type="radio" id="option-four" name={`selector${questions.id}`} />
                      <label
                        htmlFor="option-four"
                      >
                        Moderadamente impreciso
                      </label>

                      <input type="radio" id="option-five" name={`selector${questions.id}`} />
                      <label
                        htmlFor="option-five"
                      >
                        Muito impreciso
                      </label>
                    </div>
                  </li>
                );
              })}
            </ul>
          </form>
        </Container>
      </Background>

      <DownBar />
    </>
  );/*  */
};

export default QuestionsForm;

// {questions.map(question => {
//   return (
//       <li key={question.id}>
//           <p>{question.question}</p>

//           <div className="radio-group">
//               <input type="radio" id="option-one" name={`selector${question.id}`} />
//               <label
//                   onClick={() => handleSelectedAnswer(question.id, 1)}
//                   htmlFor="option-one"
//                   className={selectedQuestions[question.id - 1] === 1 ? 'selected' : ''}
//               >
//                   Muito preciso
//               </label>

//               <input type="radio" id="option-two" name={`selector${question.id}`} />
//               <label
//                   onClick={() => handleSelectedAnswer(question.id, 2)}
//                   htmlFor="option-two"
//                   className={selectedQuestions[question.id - 1] === 2 ? 'selected' : ''}
//               >
//                   Moderadamente impreciso
//               </label>

//               <input type="radio" id="option-three" name={`selector${question.id}`} />
//               <label
//                   onClick={() => handleSelectedAnswer(question.id, 3)}
//                   htmlFor="option-three"
//                   className={selectedQuestions[question.id - 1] === 3 ? 'selected' : ''}
//               >
//                   Nem impreciso nem preciso
//               </label>

//               <input type="radio" id="option-four" name={`selector${question.id}`} />
//               <label
//                   onClick={() => handleSelectedAnswer(question.id, 4)}
//                   htmlFor="option-four"
//                   className={selectedQuestions[question.id - 1] === 4 ? 'selected' : ''}
//               >
//                   Moderadamente preciso
//               </label>

//               <input type="radio" id="option-five" name={`selector${question.id}`} />
//               <label
//                   onClick={() => handleSelectedAnswer(question.id, 5)}
//                   htmlFor="option-five"
//                   className={selectedQuestions[question.id - 1] === 5 ? 'selected' : ''}
//               >
//                   Muito preciso
//               </label>
//           </div>
//       </li>
//   );
// })}
