import { useSelector } from "react-redux";

// custom hook for store datas
let name;
let photo;
export function useUser() {
  const { user, loading, updatedUserImage } = useSelector(
    (state) => state.userReducer
  );
  const email = user?.email;
  let point =0
  let win =0
  let loss =0
  if(user?.userScore){
    point = user?.userScore.point
    win = user?.userScore.win
    loss = user?.userScore.loss
  }
  if (user) {
    name = user?.fullName?.split(",");
    photo = user?.image ? user.image : null;
  }

  return { name, photo, loading, email, updatedUserImage, user,loss,win,point };
}

export function usePlay() {
  const {
    status,
    level,
    category,
    questionNum,
    questions,
    isLoading,
    secondsRemaining,
    secPerQuestion,
  } = useSelector((state) => state.playReducer);
  return {
    category,
    isLoading,
    questionNum,
    questions,
    secPerQuestion,
    secondsRemaining,
    level,
    status,
  };
}

export function useAnswer() {
  const { answers,userAnswerCount,isSubmitting } = useSelector(
    (state) => state.answerReducer
  );
  const {
    unAnswered,
    answered,
    correctAnswers,
    wrongAnswers,
  } = userAnswerCount
  return { answers,answered,correctAnswers,wrongAnswers,unAnswered,isSubmitting};
}
