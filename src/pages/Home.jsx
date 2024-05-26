import { useEffect, useState } from "react";
import { usePlay } from "../hook/useStore";
import PlayCategory from "../component/Modal";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { status } = usePlay();
  const navigate = useNavigate()
  const [start, setStart] = useState(false);

  // modal function to open  and close modal
  const openCategoryModal = function () {
    setStart(true);
  };
  function closeCategoryModal() {
    setStart(false);
  }

  // navigate to play route once status is not idle
  useEffect(()=>{
    if(status === "active") return navigate("/play")
  },[status,navigate])
  return (
    <>
       {start && <PlayCategory close={closeCategoryModal} />}
      <div className="px-4 md:px-0 text-gray-50 py-11 font-openSans font-light">
        <h1 className="font-extrabold text-3xl font-tekur text-center">
          Quiz 
          <br />
          Challenge
        </h1>
        <div className="md:w-3/4 mx-auto text-lg sm:text-xl grid gap-4 my-4">
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
            Click the &apos;Start&apos; button to select a category and
            difficulty level, and get started immediately.
          </p>
          <button
            className="hover:bg-blue-600 bg-blue-800 rounded-md transition-all duration-200  px-4 py-2 capitalize w-fit font-lexendDeca"
            onClick={openCategoryModal}
            disabled={status !== "idle"}
          >
            start
          </button>
        </div>
      </div>
    </>
  );
}
