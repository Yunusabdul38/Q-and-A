import { useAnswer, usePlay } from "./useStore";

export default function usePoint(){
  const { correctAnswers } = useAnswer();
  const { questions, level} = usePlay();
  const rating = Math.round((correctAnswers / questions.length) * 100);
  
  let point;
  //point calculation base on ranting after user end/finish play
  if (rating >= 50)
    level == "easy"
      ? (point = 3)
      : level == "medium"
      ? (point = 8)
      : (point = 16);
  if (rating >= 40)
    level == "easy"
      ? (point = 2)
      : level == "medium"
      ? (point = 6)
      : (point = 12);
  if (rating >= 30)
    level == "easy"
      ? (point = 1)
      : level == "medium"
      ? (point = 4)
      : (point = 8);
  if (rating < 30)
    level == "easy"
      ? (point = 0)
      : level == "medium"
      ? (point = 0)
      : (point = 0);

    return {point,rating}  
}
