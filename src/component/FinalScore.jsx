import { useForm } from "react-hook-form";
import { useAnswer, usePlay, useUser } from "../hook/useStore";
import Wrapper from "../Ui/Wrapper";
import { useNavigate } from "react-router-dom";
import { updatedUserData } from "../services/updateUserData";

export default function FinalScore() {
  const navigate = useNavigate()
  const {
    formState: { isSubmitting, isSubmitSuccessful },
    handleSubmit,
  } = useForm();
  const { answered, correctAnswers, unAnswered, wrongAnswers } = useAnswer();
  const { questions, level } = usePlay();
  const { point: userPoint, win, loss } = useUser();

  const rating = Math.round((answered / questions.length) * 100);
  let point;
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

  async function submitHanlder() {
    const data = {
      userScore: {
        point: point ? userPoint + point : userPoint,
        loss: !point ? loss + 1 : loss,
        win: point ? win + 1 : win,
      },
    };
    console.log(data)
    //await updatedUserData(data)
    if (isSubmitSuccessful) {
      navigate("/leadboard");
    }
  }
  return (
    <Wrapper>
      <div className="flex items-center justify-between">
        <h1>answerd questions: </h1>
        <span>{answered}</span>
      </div>
      <div className="flex items-center justify-between">
        <h1>correct answers: </h1>
        <span>{correctAnswers}</span>
      </div>
      <div className="flex items-center justify-between">
        <h1>wrong answers: </h1>
        <span>{wrongAnswers}</span>
      </div>
      <div className="flex items-center justify-between">
        <h1>unAnswerd questions: </h1>
        <span>{unAnswered}</span>
      </div>
      <h1 className="lowercase">you end with {rating}%</h1>
      <h3 className="font-thin">
        save your progress to see how you rank among other players
      </h3>
      <form className="flex justify-end" onSubmit={handleSubmit(submitHanlder)}>
        <button className="bg-blue-800 hover:bg-blue-950 p-4 rounded-sm">
          {isSubmitting ? "submitting...." : "save progress"}
        </button>
      </form>
    </Wrapper>
  );
}
