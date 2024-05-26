import {useEffect, useMemo, useState } from "react";
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
import { Link } from "react-router-dom";
import FinalScore from "../component/FinalScore";
import Button from "../Ui/Button";
import { useDispatch } from "react-redux";
import { finish, nextQuestion } from "../store/store";
import Wrapper from "../Ui/Wrapper";
import Spinner from "../Ui/Spinner";

// options character
const optionCharacter = ["a", "b", "c", "d"];

export default function Play() {
  const [isAnswered, setIsAnswered] = useState(false);
  const dispatchFn = useDispatch();
  const { questions, status, isLoading,questionsNum } = usePlay();
  const options = questions[questionsNum]?.options;
  const question = questions[questionsNum]?.question;
   // correct answer for the specific question
   const correctIndex = questions[questionsNum]?.correctIndex;
   const answer =options && options[correctIndex]
  
  //shuffle question options
  const shuffle = useMemo(() => {
    return options?.slice().sort(() => 0.5 - Math.random());
  }, [options]);

  //move to next question after user selection
  useEffect(() => {
    if (!isAnswered) return;
    const timeout = setTimeout(() => {
      dispatchFn(nextQuestion());
      setIsAnswered(false)
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isAnswered, dispatchFn]);

  if (isLoading) return <Spinner />;
  if (status === "idle")
    return (
      <Wrapper>
        <h1 className="font-tekur font-extralight">
          Playing begins when you go to the homepage, pick the level and
          category you wish to participate in.
        </h1>
        <Link
          to="/"
          className="bg-blue-800 hover:bg-blue-950 p-4 rounded-sm w-fit"
        >
          home
        </Link>
      </Wrapper>
    );
  if (status === "inactive") return <FinalScore />;
  function endGameHandler() {
    dispatchFn(finish());
  }
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
              setIsAnswered={setIsAnswered}
              isAnswered={isAnswered}
            />
          );
        })}
      </Questions>
      <Button onClick={endGameHandler}>end game</Button>
    </StyleApp>
  );
}
