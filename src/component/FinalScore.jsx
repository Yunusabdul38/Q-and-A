import { useForm } from "react-hook-form";
import { useAnswer, usePlay, useUser } from "../hook/useStore";
import Wrapper from "../Ui/Wrapper";
import { useNavigate } from "react-router-dom";
import { updateOrCreateLeadTable } from "../services/updateUserData";
import { useDispatch } from "react-redux";
import { end } from "../store/playSliceStore";
import usePoint from "../hook/usePoint";

export default function FinalScore() {
  const navigate = useNavigate();
  const dispatchFn = useDispatch();
  const {
    formState: { isSubmitting, isSubmitSuccessful },
    handleSubmit,
  } = useForm();
  const { answered, correctAnswers, unAnswered, wrongAnswers } = useAnswer();
  const { point: userPoint, win, loss } = usePlay();
  const { fullName, photo } = useUser();
  const {point,rating} = usePoint()
  async function submitHanlder() {
    // data to be sdded/updated to user table data
    const data = {
      point: point ? userPoint + point : userPoint,
      loss: !point ? loss + 1 : loss,
      win: point ? win + 1 : win,
      image: photo,
      fullName: fullName,
    };

    await updateOrCreateLeadTable(data);
    dispatchFn(end());
    navigate("/leadboard");
  }
  return (
    <Wrapper>
      <div className="flex items-center justify-between">
        <h1>answered questions: </h1>
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
        <h1>unAnswered questions: </h1>
        <span>{unAnswered}</span>
      </div>
      <h1 className="font-thin">
        you finish with {rating}% out of possible 100%
      </h1>
      <h3>
        total point is {point} <span>{point ? "🤩" : "😫"}</span>
      </h3>
      <h3 className="font-thin">
        save your progress to see how you rank among other players
      </h3>
      <form className="flex justify-end" onSubmit={handleSubmit(submitHanlder)}>
        <button
          className="disabled:cursor-not-allowed bg-blue-800 hover:bg-blue-950 p-4 rounded-sm"
          disabled={isSubmitting}
        >
          {isSubmitting ? "submitting...." : "save progress"}
        </button>
      </form>
    </Wrapper>
  );
}
