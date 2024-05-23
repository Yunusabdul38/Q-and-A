import { useMemo } from "react";
import {
  H1,
  Icon,
  QuestionNum,
  QuestionWrapper,
  Questions,
  StyleApp,
} from "../Ui/QandAstyle";
import Options from "../component/QandA/Options";
import { usePlay } from "../hook/useStore";
import { useNavigate } from "react-router-dom";
import FinalScore from "../component/FinalScore";

// options character
const optionCharacter = ["a", "b", "c", "d"];

export default function Play() {
  const navigate = useNavigate();
  const { questions, questionsNum, status } = usePlay();
  // correct answer for the specific question
  const answer = questions[questionsNum].correctIndex;
  const { question, options } = questions[questionsNum];

  //shuffle question options
  const shuffle = useMemo(() => {
    return options.slice().sort(() => 0.5 - Math.random());
  }, [options]);

  if (status === "idle") return navigate("/");
  if (status === "inactive") return <FinalScore />;
  return (
    <StyleApp>
      <QuestionNum>
        question {questionsNum + 1} of {questions.length}
      </QuestionNum>
      <QuestionWrapper>
        <Icon>?</Icon>
        <H1>{question}</H1>
      </QuestionWrapper>
      <Questions>
        {shuffle?.map((options, index) => {
          return (
            <Options
              option={options}
              character={optionCharacter[index]}
              key={index}
              correctAnswer={answer}
            />
          );
        })}
      </Questions>
    </StyleApp>
  );
}
