import { useReducer } from "react";
import { createContext } from "react";

const initialState = {
  status: "idle",
  level: "easy",
  category: "random",
  answers: [],
  questionsNum: 0,
  questions: [],
};
export const Context = createContext({
  playState: {},
  dispatchFn: () => {},
});

function reducerFn(state, action) {
  //const curentIndex = state.questions[state.questionsNum];
  if (action.type === "level") {
    const { difficulty, category } = action.payload;
    return { ...state, level: difficulty, category };
  }
  if (action.type === "start") {
    const { questions } = action.payload;
    return {
      ...state,
      status: "active",
      questions: questions,
    };
  }
  if (action.type === "answer") {
    const { correctIndex, userIndex } = action.payload;
    return {
      ...state,
      answers: [
        ...state.answers,
        {
          question: state.questions[state.questionsNum],
          userAnswer: userIndex,
          correctAnswer: correctIndex,
        },
      ],
    };
  }
  if (action.type === "next") {
    return { ...state, questionsNum: state.questionsNum + 1 };
  }
  if (action.type === "prev") {
    return { ...state, questionsNum: state.questionsNum - 1 };
  }
  if (action.type === "finish") {
    return { ...state, status: "inactive" };
  }
  if (action.type === "end") {
    return { ...state, status: "idle" };
  }
  return initialState;
}

const ContexProvider = function ({ children }) {
  const [playState, dispatchFn] = useReducer(reducerFn, initialState);

  return (
    <Context.Provider value={{ playState, dispatchFn }}>
      {children}
    </Context.Provider>
  );
};
export default ContexProvider;
