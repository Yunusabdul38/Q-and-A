import {
  H1,
  Icon,
  QuestionNum,
  QuestionWrapper,
  Questions,
  StyleApp,
} from "../../Ui/QandAstyle";
import Options from "./Options";
import QuestionsButton from "./QuestionsButton";
import { useSelector } from "react-redux";

const optionCharacter = ["a", "b", "c", "d"];
export default function QandA() {
  const {questions,questionsNum} = useSelector((state)=>state.playReducer)
  
  const { question, correctIndex, options } = questions[questionsNum];
  const shuffle = options?.sort(() => 0.5 - Math.random());
  function nextQuestionHandler() {
    //dispatch({ type: "next" });
  }
  function previousQuestionHandler() {
    //dispatchFn({ type: "prev" });
  }

  if (!questions) return <h1>unable to featch qs</h1>;
  return (
    <StyleApp>
      <QuestionNum>
        question {questionsNum + 1} of {questions.length}
      </QuestionNum>
      <QuestionWrapper>
        <Icon>?</Icon>
        <H1>{question}</H1>
      </QuestionWrapper>
      <Questions>
        {shuffle?.map((options, index) => {
          return (
            <Options
              option={options}
              character={optionCharacter[index]}
              key={index}
              correctIndex={correctIndex}
              index={index}
            />
          );
        })}
      </Questions>
      <div className="flex justify-between">
        <QuestionsButton
          disabledNum={0}
          eventHandler={previousQuestionHandler}
          questionNumber={questionsNum}
        >
          prev
        </QuestionsButton>
        <QuestionsButton
          disabledNum={10}
          eventHandler={nextQuestionHandler}
          questionNumber={questionsNum}
        >
          next
        </QuestionsButton>
      </div>
    </StyleApp>
  );
}
