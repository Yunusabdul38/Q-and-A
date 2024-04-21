import { useContext } from "react";
import { QuesDiv, QuesH2, QuesOption, Wrapper } from "../../../Ui/QandAstyle";
import { Context } from "../../../context/UserContextProvider";

export default function Options({ option, character, correctIndex, index }) {
  const { dispatchFn,playState:{answers,questionsNum} } = useContext(Context);
  function userAnswerHandler() {
    dispatchFn({type:"answer",payload:{correctIndex,userIndex:index}})
  }
  const highlighting = answers[questionsNum]?.userAnswer === index
  console.log(highlighting)
  return (
    <Wrapper onClick={userAnswerHandler} disabled={answers[questionsNum]?true:false}>
      <QuesDiv answer={highlighting}>
        <QuesOption>{character}</QuesOption>
        <QuesH2>{option}</QuesH2>
      </QuesDiv>
    </Wrapper>
  );
}
