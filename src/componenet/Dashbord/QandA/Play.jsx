import QandA from "./QandA";
import { useState } from "react";
export default function Play() {
  const [play, setPlay] = useState("idle");

  if (play === "active") return <QandA />;
  const startPlayHandle = function () {
    setPlay("active");
  };
  return (
    <div className="px-8 md:px-0 text-gray-50 font-medium py-11">
      <h1 className="font-extrabold text-3xl font-tekur text-center">
        Welcome to our Quiz Challenge!
      </h1>
      <div className="md:w-3/4 mx-auto text-xl grid gap-4 my-4">
        <p>
          Test your knowledge and compete for the top spots on our leaderboard.
          Choose from a variety of categories including General Knowledge,
          Football, Science, History, and more.
        </p>
        <p>
          Answer questions correctly to earn points and climb the leaderboard
          ranks. Keep an eye on the top 5 highest scores to see how you stack up
          against other players. Are you ready to become the quiz champion?
        </p>
        <p>
            If your answer is yes 
            <br />
            Select the category you wish to anawer questions from 
        </p>
        <div className="capitalize">
          <span>
            <label>sport</label>
            <input type="checkbox" className="mx-3" />
          </span>
          <span>
            <label>history</label>
            <input type="checkbox" className="mx-3" />
          </span>
          <span>
            <label>food</label>
            <input type="checkbox" className="mx-3" />
          </span>
          <span>
            <label>random</label>
            <input type="checkbox" className="mx-3" />
          </span>
        </div>
        <button
          className="hover:bg-gradient-to-r hover:from-gray-600 rounded-md  hover:to-blue-300 transition-all duration-200 bg-gradient-to-t from-blue-300 to-blue-600 px-4 py-2 capitalize float-right w-fit font-tekur"
          onClick={startPlayHandle}
        >
          start
        </button>
      </div>
    </div>
  );
}
