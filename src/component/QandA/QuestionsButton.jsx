
export default function QuestionsButton({questionNumber,eventHandler,disabledNum,children}) {
  return (
    <button
          className={`${
            questionNumber === disabledNum
              ? "bg-gray-500 hover:bg-gray-500"
              : "bg-[#1d267d]  hover:bg-blue-800"
          } text-gray-50 w-fit p-3 capitalize rounded-md transition-all`}
          onClick={eventHandler}
          disabled={questionNumber === disabledNum}
        >
          {children}
        </button>
  )
}
