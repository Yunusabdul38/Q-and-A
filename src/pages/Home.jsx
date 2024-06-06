import { useEffect, useState } from "react";
import { usePlay } from "../hook/useStore";
import PlayCategory from "../component/Modal";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { status } = usePlay();
  const navigate = useNavigate();
  const [start, setStart] = useState(false);

  // modal function to open  and close modal
  const openCategoryModal = function () {
    setStart(true);
  };
  function closeCategoryModal() {
    setStart(false);
  }

  // navigate to play route once status is not idle
  useEffect(() => {
    if (status === "active") return navigate("/play");
  }, [status, navigate]);
  return (
    <div className="mt-10 mb-6">
      {start && <PlayCategory close={closeCategoryModal} />}
      <div className="px-4 md:px-0 text-gray-50 py-11 font-openSans font-light">
        <h1 className="font-extrabold text-3xl font-tekur text-center">
          Quiz
          <br />
          Challenge
        </h1>
        <div className="md:w-3/4 mx-auto text-lg sm:text-xl grid gap-4 my-4">
          <p>
            Get ready to test your knowledge across various categories like
            sports, food, history, and more. Compete with friends and other
            players to climb the leaderboard. You can choose from different quiz
            categories and difficulty levels to suit your interests and
            expertise.Get ready to test your knowledge across various categories
            like sports, food, history, and more. Compete with friends and other
            players to climb the leaderboard. You can choose from different quiz
            categories and difficulty levels to suit your interests and
            expertise.
          </p>
          <h2 className="capitalize">features</h2>
          <ul className="list-disc pl-8">
            <li className="text-gray-300">
              <strong className="text-gray-50">Multiple Categories:</strong> Choose from a wide range of
              topics including sports, food, history, and more
            </li>
            <li className="text-gray-300">
              <strong className="text-gray-50">Difficulty Levels:</strong>Select the difficulty level
              that matches your skill and challenge yourself.
            </li>
            <li className="text-gray-300">
              <strong className="text-gray-50">Leaderboard:</strong>Track your progress and see how you
              rank against other players with our top 5 highest scores feature.
            </li>
            <li className="text-gray-300">
              <strong className="text-gray-50">Point Calculation:</strong>Points are calculated based on
              the difficulty level and the number of questions answered
              correctly. The more difficult the question, the higher the points!
            </li>
          </ul>
          <h2>how to play</h2>
          <ul className="list-decimal pl-8">
            <li className="text-gray-300">
              <strong className="text-gray-50">Choose Your Category and Difficulty:</strong>Select the
              quiz category and difficulty level to begin.
            </li>
            <li className="text-gray-300">
              <strong className="text-gray-50">Answer Questions:</strong> Answer as many questions as you
              can to score points.
            </li>
            <li className="text-gray-300">
              <strong className="text-gray-50">Climb the Leaderboard:</strong> Aim for the top by
              answering correctly and challenging yourself with higher
              difficulty levels
            </li>
          </ul>
          <p>
            Click the button below to select your category and difficulty level
            to get started immediately. Good luck and have fun!
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
    </div>
  );
}
