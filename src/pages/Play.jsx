import { Context } from "../context/UserContextProvider";
import PlayCategory from "../componenet/Modal";
import QandA from "../componenet/QandA/QandA";
import { useContext, useState } from "react";
export default function Play() {
  const {
    playState: { status },
  } = useContext(Context);
  const [start, setStart] = useState(false);
  const openCategoryModal = function () {
    setStart(true);
  };
  function closeCategoryModal() {
    setStart(false);
  }
  if (status === "active") return <QandA />;
  return (
    <>
      <div className="px-8 md:px-0 text-gray-50 font-medium py-11">
        <h1 className="font-extrabold text-3xl font-tekur text-center">
          Welcome to our Quiz Challenge!
        </h1>
        <div className="md:w-3/4 mx-auto text-xl grid gap-4 my-4">
          <p>
            Test your knowledge and compete for the top spots on our
            leaderboard. Choose from a variety of categories including General
            Knowledge, Football, Science, History, and more.
          </p>
          <p>
            Answer questions correctly to earn points and climb the leaderboard
            ranks. Keep an eye on the top 5 highest scores to see how you stack
            up against other players. Are you ready to become the quiz champion?
          </p>
          <p>
            If your answer is yes
            <br />
            Select the category you wish to anawer questions from
          </p>
          <p>
            Click the 'Start' button to select a category and difficulty level,
            and get started immediately.
          </p>
          <button
            className="hover:bg-gradient-to-r hover:from-gray-600 rounded-md  hover:to-blue-300 transition-all duration-200 bg-gradient-to-t from-blue-300 to-blue-600 px-4 py-2 capitalize float-right w-fit font-tekur"
            onClick={openCategoryModal}
          >
            start
          </button>
        </div>
      </div>
      {start && <PlayCategory close={closeCategoryModal} />}
    </>
  );
}
