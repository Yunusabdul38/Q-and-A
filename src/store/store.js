import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { checkUserSignIn } from "./auth-checkUserSignIn";
import { fetchLeadBord, fetchQuestions } from "../services/fetchData";
import { updateLeadTable, updatedUserData } from "../services/updateUserData";

const initialUserState = {
  user: null,
  loading: true,
  updatedUserImage: null,
};

const initialLeadboard = {
  leadbord: [],
  loadingLeads: false,
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
  answers: [],
  userTable: {},
  userAnswerCount: {
    unAnswered: 0,
    answered: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  },
};

// leadboard slice
const leadersBoard = createSlice({
  name: "leadBorad",
  initialState: initialLeadboard,
  extraReducers: (builder) => {
    builder.addCase(fetchLeadBord.pending, (state) => {
      state.loadingLeads = true;
    }),
      builder.addCase(fetchLeadBord.fulfilled, (state, action) => {
        state.leadbord = action.payload;
        state.loadingLeads = false;
      }),
      builder.addCase(fetchLeadBord.rejected, (state) => {
        state.loadingLeads = false;
      }),
      builder.addCase(updateLeadTable.pending, (state) => {
        state.loadingLeads = true;
      }),
      builder.addCase(updateLeadTable.fulfilled, (state, action) => {
        state.loadingLeads = false;
      }),
      builder.addCase(updateLeadTable.rejected, (state) => {
        state.loadingLeads = false;
      }),
      // this will always run regardless of the promise return state
      // it work like finally in a promise
      builder.addMatcher(fetchLeadBord.settled, (state) => {
        state.loadingLeads = false;
      });
    builder.addMatcher(updateLeadTable.settled, (state) => {
      state.loadingLeads = false;
    });
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
      builder.addCase(updatedUserData.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(updatedUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedUserImage =null
      }),
      builder.addCase(updatedUserData.rejected, (state) => {
        state.loading = false;
      }),
      // this will always run regardless of the promise return state
      // it work like finally in a promise
      builder.addMatcher(checkUserSignIn.settled, (state) => {
        state.loading = false;
      });
    builder.addMatcher(updatedUserData.settled, (state) => {
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
      state.secondsRemaining = null;
      state.secPerQuestion = 0;
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
      state.answers = [];
      state.secondsRemaining = null;
      state.secPerQuestion = 0;
      state.userAnswerCount = {
        correctAnswers: 0,
        wrongAnswers: 0,
        unAnswered: 0,
        answered: 0,
      };
      state.userTable = {};
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
        answered: state.userAnswerCount.answered + 1,
      };
      state.answers = [
        ...state.answers,
        {
          userAnswer: userAnswer,
          correctIndex: correctAnswer,
        },
      ];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(fetchQuestions.fulfilled, (state, action) => {
        const { questions, table } = action.payload;
        state.questions = questions;
        state.secondsRemaining = questions.length * state.secPerQuestion;
        state.userAnswerCount.unAnswered = questions.length;
        state.isLoading = false;
        state.status = "active";
        state.userTable={
          ...table
        };
      }),
      builder.addCase(fetchQuestions.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.error);
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
const leadsReducers = leadersBoard.reducer;
const rootReducer = combineReducers({
  userReducer,
  playReducer,
  leadsReducers,
});
export const {
  end,
  finish,
  level,
  nextQuestion,
  previousQuestion,
  countdown,
  answer,
} = playSlice.actions;
export const { updatePhoto, logUserOut } = authUserSlice.actions;
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      //exclude serializable state check
      serializableCheck: false,
    }),
});
