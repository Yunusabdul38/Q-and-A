import { useEffect, useState } from "react";
import { QuesDiv, QuesH2, QuesOption, Wrapper } from "../../Ui/QandAstyle";
import { useDispatch, useSelector } from "react-redux";
import { answer, nextQuestion } from "../../store/store";
import PropTypes from "prop-types";

export default function Options({ option, character, correctIndex, index }) {
  const [isAnswered,setIsAnswerd] =useState(false)
  const {answers,questionsNum} = useSelector((state)=>state.playReducer)
  const dispatch = useDispatch()

  // function for handling usser answers
  function userAnswerHandler() {
    dispatch(answer({correctIndex,userIndex:index}))
  }

  // variable meant to highlight user answered option 
  const highlighting = answers[questionsNum]?.userAnswer === index
  useEffect(()=>{
    if(!isAnswered) return
    const timeout = setTimeout(()=>{
      dispatch(nextQuestion)
    },2000)
    return ()=> clearTimeout(timeout)
  },[isAnswered,dispatch])
  useEffect(()=>{
    setIsAnswerd(highlighting)
  },[highlighting,setIsAnswerd])
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

Options.propTypes = {
  character:PropTypes.string,
  correctIndex:PropTypes.number,
  index:PropTypes.number,
  option:PropTypes.string
};