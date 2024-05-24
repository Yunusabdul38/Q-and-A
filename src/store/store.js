import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { checkUserSignIn } from "./auth-checkUserSignIn";
import { fetchQuestions } from "../services/getQuestions";

const initialUserState = {
  user: null,
  loading: true,
  updatedUserImage: null,
};

const initialPlayState = {
  status: "idle",
  level: "easy",
  category: "",
  questionsNum: 0,
  questions: [],
  isLoading: false,
  secondsRemaining: null,
  secPerQuestion: 0,
};

const initialUserAnswer = {
  isSubmitting:false,
  answers: [],
  userAnswerCount: {
    unAnswered: 0,
    answered: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  },
};

const answerSlice = createSlice({
  initialState: initialUserAnswer,
  name: "user",
  reducers: {
    questionLength:(state,action)=>{
      state.userAnswerCount.unAnswered = action.payload
    },
    answer: (state, action) => {
      const { correctAnswer, userAnswer } = action.payload;
      const answerChecker = correctAnswer === userAnswer;
      state.userAnswerCount = {
        ...state.userAnswerCount,
        correctAnswers: answerChecker
          ? state.userAnswerCount.correctAnswers + 1
          : state.userAnswerCount.correctAnswers,
        wrongAnswers: !answerChecker
          ? state.userAnswerCount.wrongAnswers + 1
          : state.userAnswerCount.wrongAnswers,
        unAnswered: state.userAnswerCount.unAnswered - 1,
        answered:state.userAnswerCount.answered+1,
      };
      state.answers = [
        ...state.answers,
        {
          question: state.questions[state.questionsNum],
          userAnswer: userAnswer,
          correctIndex: correctAnswer,
        },
      ];
    },
  },
});
//slice for checking if user has been sign in before on the browser and has not log out by him/her self
const authUserSlice = createSlice({
  name: "auth",
  initialState: initialUserState,
  reducers: {
    logUserOut: (state) => {
      state.user = null;
    },
    updatePhoto: (state, action) => {
      state.updatedUserImage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkUserSignIn.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(checkUserSignIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      }),
      builder.addCase(checkUserSignIn.rejected, (state) => {
        state.loading = false;
      }),
      // this will always run regardless of the promise return state
      // it work like finally in a promise
      builder.addMatcher(checkUserSignIn.settled, (state) => {
        state.loading = false;
      });
  },
});
const playSlice = createSlice({
  name: "play",
  initialState: initialPlayState,
  reducers: {
    level: (state, action) => {
      const { difficulty, category } = action.payload;
      state.level = difficulty;
      state.category = category;
      difficulty === "hard"
        ? (state.secPerQuestion = 10)
        : difficulty === "medium"
        ? (state.secPerQuestion = 15)
        : (state.secPerQuestion = null);
    },
    nextQuestion: (state) => {
      state.questionsNum++;
    },
    finish: (state) => {
      state.status = "inactive";
    },
    countdown: (state) => {
      state.secondsRemaining--;
      state.secondsRemaining === 0 ? (state.status = "inactive") : state.status;
    },
    end: (state) => {
      state.status = "idle";
      state.level = "easy";
      state.category = "";
      state.questionsNum = 0;
      state.questions = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.secondsRemaining = action.payload.length * state.secPerQuestion;
        state.isLoading = false;
        state.status = "active";
      }),
      builder.addCase(fetchQuestions.rejected, (state) => {
        state.isLoading = false;
      }),
      // this will always run regardless of the promise return state
      // it work like finally in a promise
      builder.addMatcher(fetchQuestions.settled, (state) => {
        state.isLoading = false;
      });
  },
});
const userReducer = authUserSlice.reducer;
const playReducer = playSlice.reducer;
const answerReducer = answerSlice.reducer;
const rootReducer = combineReducers({
  userReducer,
  playReducer,
  answerReducer,
});
export const { end, finish, level, nextQuestion, previousQuestion, countdown } =
  playSlice.actions;
export const { updatePhoto, logUserOut } = authUserSlice.actions;
export const { answer,questionLength } = answerSlice.actions;
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      //exclude serializable state check
      serializableCheck: false,
    }),
});
