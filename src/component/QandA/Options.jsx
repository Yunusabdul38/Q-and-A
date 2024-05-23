import { useEffect, useState } from "react";
import { QuesDiv, QuesH2, QuesOption, Wrapper } from "../../Ui/QandAstyle";
import { useDispatch} from "react-redux";
import { answer, nextQuestion } from "../../store/store";
import PropTypes from "prop-types";
import { useAnswer, usePlay } from "../../hook/useStore";

// questions option function
export default function Options({ option, character, correctAnswer }) {
  const [isAnswered, setIsAnswerd] = useState(false);
  const { questionsNum,questions } = usePlay();
  const { answers, questionLength } = useAnswer();
  const dispatch = useDispatch();

  // function for handling user answers
  function userAnswerHandler() {
    dispatch(answer({ correctAnswer, userAnswer: option }));
  }

  // variable meant to highlight correct and wrong answer after user selection
  const wrongOption =
    answers[questionsNum]?.userAnswer &&
    answers[questionsNum]?.userAnswer !== correctAnswer;
  const correctOption = isAnswered && correctAnswer === option;

  //move to next question after user selection
  useEffect(() => {
    if (!isAnswered) return;
    const timeout = setTimeout(() => {
      dispatch(nextQuestion());
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isAnswered, dispatch]);

  //set question Length to answerSlice 
  useEffect(()=>{
    dispatch(questionLength(questions.length))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  // set user selection
  useEffect(() => {
    setIsAnswerd(wrongOption);
  }, [wrongOption, setIsAnswerd]);

  return (
    <Wrapper
      onClick={userAnswerHandler}
      disabled={answers[questionsNum] ? true : false}
    >
      <QuesDiv
        wrongOption={isAnswered && wrongOption}
        correctOption={correctOption}
      >
        <QuesOption>{character}</QuesOption>
        <QuesH2>{option}</QuesH2>
      </QuesDiv>
    </Wrapper>
  );
}

Options.propTypes = {
  character: PropTypes.string,
  correctAnswer: PropTypes.string,
  index: PropTypes.number,
  option: PropTypes.string,
};
