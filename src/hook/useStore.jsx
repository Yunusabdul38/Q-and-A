import { useSelector } from "react-redux";

// custom hook for store datas
let name;
let photo;
export function useUser() {
  const { user, loading, updatedUserImage } = useSelector(
    (state) => state.userReducer
  );
  const email = user?.email;
  const fullName = user?.fullName;
  if (user) {
    name = user?.fullName?.split(",");
    photo = user?.image ? user.image : null;
  }

  return { name, photo, loading, email, updatedUserImage, user, fullName };
}
export function useLeads() {
  const { leadbord, loadingLeads } = useSelector(
    (state) => state.leadsReducers
  );
  const table = leadbord.sort((a, b) => a.point - b.point);

  return { loadingLeads, table };
}
export function usePlay() {
  const {
    status,
    level,
    category,
    questionsNum,
    questions,
    isLoading: playIsLoading,
    secondsRemaining,
    secPerQuestion,
    userTable,
  } = useSelector((state) => state.playReducer);

  const point = userTable?.point ? userTable?.point : 0;
  const win = userTable?.win ? userTable?.win : 0;
  const loss = userTable?.loss ? userTable?.loss : 0;

  return {
    category,
    playIsLoading,
    questionsNum,
    questions,
    secPerQuestion,
    secondsRemaining,
    level,
    status,
    win,
    loss,
    point,
  };
}

export function useAnswer() {
  const { answers, userAnswerCount } = useSelector(
    (state) => state.playReducer
  );
  const { unAnswered, answered, correctAnswers, wrongAnswers } =
    userAnswerCount;
  return { answers, answered, correctAnswers, wrongAnswers, unAnswered };
}
