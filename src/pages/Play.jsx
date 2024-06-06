import {useEffect, useMemo, useState } from "react";
import {
  H1,
  Icon,
  QuestionNum,
  QuestionWrapper,
  Questions,
  StyleApp,
} from "../Ui/QandAstyle";
import Options from "../component/Options";
import { usePlay } from "../hook/useStore";
import { Link } from "react-router-dom";
import FinalScore from "../component/FinalScore";
import Button from "../Ui/Button";
import { useDispatch } from "react-redux";
import { finish, nextQuestion } from "../store/playSliceStore";
import Wrapper from "../Ui/Wrapper";
import Spinner from "../Ui/Spinner";

// options character
const optionCharacter = ["a", "b", "c", "d"];

export default function Play() {
  const dispatchFn = useDispatch();
  // state to detect if a question has been answered
  const [isAnswered, setIsAnswered] = useState(false);
  const { questions, status, isLoading,questionsNum } = usePlay();

  // options to pick from variable
  const options = questions[questionsNum]?.options;
  // question 
  const question = questions[questionsNum]?.question;
   // correct answer for a specific question
   const correctIndex = questions[questionsNum]?.correctIndex;
   const answer =options && options[correctIndex]
  
  //shuffle question options
  const shuffle = useMemo(() => {
    return options?.slice().sort(() => 0.5 - Math.random());
  }, [options]);

   //end game once the last question is answered
   useEffect(() => {
    if (status=="active" && questionsNum === questions.length){
      dispatchFn(finish());
    }
  }, [dispatchFn,questions,questionsNum,status]);

  //move to next question in 2 seconds after user selection 
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
        It looks like you haven't started the quiz yet. To begin, please head back to the home page and select your desired quiz category and difficulty level.
        </h1>
        <p className="font-tekur text-sm">Click the button below to return to the home page and start your quiz journey!</p>
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
    <div className="my-16">
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
    </div>
  );
}
