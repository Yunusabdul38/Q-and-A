import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import {
  H1,
  Icon,
  QuestionNum,
  QuestionWrapper,
  Questions,
  StyleApp,
} from "../../../Ui/QandAstyle";
import Options from "./Options";
import QuestionsButton from "./QuestionsButton";

const optionCharacter = ["a", "b", "c", "d"];
export default function QandA() {
  const [questionNumber, setQuestionNumber] = useState(0);
  const fetchQuestions = useLoaderData();
  const question = fetchQuestions[questionNumber];

  function nextQuestionHandler() {
    setQuestionNumber((num) => num + 1);
  }
  function previousQuestionHandler() {
    setQuestionNumber((num) => num - 1);
  }
  return (
    <StyleApp>
      <QuestionNum>
        question {questionNumber + 1} of {fetchQuestions.length}
      </QuestionNum>
      <QuestionWrapper>
        <Icon>?</Icon>
        <H1>{question.question}</H1>
      </QuestionWrapper>
      <Questions>
        {question.options.map((options, index) => {
          return (
            <Options
              option={options}
              character={optionCharacter[index]}
              key={index}
            />
          );
        })}
      </Questions>
      <div className="flex justify-between">
        <QuestionsButton
          disabledNum={0}
          eventHandler={previousQuestionHandler}
          questionNumber={questionNumber}
        >
          prev
        </QuestionsButton>
        <QuestionsButton
          disabledNum={10}
          eventHandler={nextQuestionHandler}
          questionNumber={questionNumber}
        >
          next
        </QuestionsButton>
      </div>
    </StyleApp>
  );
}
