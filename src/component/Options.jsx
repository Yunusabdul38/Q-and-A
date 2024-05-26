import { useState } from "react";
import { QuesDiv, QuesH2, QuesOption, Wrapper } from "../Ui/QandAstyle";
import { useDispatch } from "react-redux";
import { answer as answerFn,} from "../store/store";
import PropTypes from "prop-types";

// questions option function
export default function Options({ option, character, correctAnswer,setIsAnswered,isAnswered }){ 
  const [userSelection,setUserSelection] = useState(false)
  const dispatchFn = useDispatch();

  // function for handling user answers
  function userAnswerHandler() {
    setUserSelection(option)
    setIsAnswered(true);
    dispatchFn(answerFn({ correctAnswer, userAnswer: option }));
  }
  return (
    <Wrapper
      onClick={userAnswerHandler}
      disabled={isAnswered}
    >
      {/*div tag for handling correct and wrong option colour after user selection */}
      <div className={`${isAnswered && option === correctAnswer?"bg-[#0fe949]":"bg-[#1d267d]"} ${userSelection === option && option !== correctAnswer?"bg-[#f50404]":""} `}>
      <QuesDiv>
        <QuesOption>{character}</QuesOption>
        <QuesH2>{option}</QuesH2>
      </QuesDiv>
      </div>
    </Wrapper>
  );
}

//props type
Options.propTypes = {
  character: PropTypes.string,
  correctAnswer: PropTypes.string,
  index: PropTypes.number,
  option: PropTypes.string,
};
