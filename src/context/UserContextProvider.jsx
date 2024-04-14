import { useReducer } from "react";
import { createContext } from "react";

const initialState = {
  status: "idle",
  level: null,
  category: [],
  userAnswer: [],
};
export const Context = createContext({
  playState: {},
  dispatchFn: () => {},
});

function reducerFn(state, action) {
  console.log(state);
  if (action.type === "start") {
    return { ...state, status: "active" };
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
