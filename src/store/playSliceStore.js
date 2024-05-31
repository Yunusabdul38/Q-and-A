import toast from "react-hot-toast";
import { fetchQuestions } from "../services/fetchData";
import { createSlice } from "@reduxjs/toolkit";

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
    // game is finish state which will score the concluded play stat of user for the played game
    finish: (state) => {
      state.status = "inactive";
      state.secondsRemaining = null;
      state.secPerQuestion = 0;
    },
    // counter for medium and hard level
    countdown: (state) => {
      if(!state.secondsRemaining) return
      state.secondsRemaining--;
      state.secondsRemaining === 0 ? (state.status = "inactive") : state.status;
      state.secondsRemaining === 0 ? state.secondsRemaining = null : state.secondsRemaining;
    },
    //end game by kogging out or after game is completed (play ends)
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
    userTable:(state,action)=>{
      console.log(action)
    }
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
        state.userTable = {
          ...table,
        };
      }),
      builder.addCase(fetchQuestions.rejected, (state) => {
        state.isLoading = false;
        toast.error(
          "We're having trouble finding what you're looking for. Try refreshing the page or searching with different keywords."
        );
      }),
      // this will always run regardless of the promise return state
      // it work like finally in a promise
      builder.addMatcher(fetchQuestions.settled, (state) => {
        state.isLoading = false;
      });
  },
});
export const playReducer = playSlice.reducer;
export const {
    end,
    finish,
    level,
    nextQuestion,
    previousQuestion,
    countdown,
    answer,
    userTable
  } = playSlice.actions;