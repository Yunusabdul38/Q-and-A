import { useEffect, useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { usePlay } from "../hook/useStore";
import PlayCategory from "../component/Modal";
import { useNavigate } from "react-router-dom";
import Spinner from "../Ui/Spinner"
import { fetchQ } from "../services/fetchData";

export default function Home() {
   // Access the client
   const queryClient = useQueryClient()

   // Queries
   const query = useQuery({ queryKey: ['questions'], queryFn:()=>fetchQ })
  const { status } = usePlay();
  const navigate = useNavigate()
  const [start, setStart] = useState(false);
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
      <div className="px-8 md:px-0 text-gray-50 py-11 font-Poppins font-light">
        <h1 className="font-extrabold text-3xl font-openSans text-center">
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
            Click the &apos;Start&apos; button to select a category and
            difficulty level, and get started immediately.
          </p>
          <button
            className="hover:bg-gradient-to-r hover:from-gray-600 rounded-md  hover:to-blue-300 transition-all duration-200 bg-gradient-to-t from-blue-300 to-blue-600 px-4 py-2 capitalize float-right w-fit font-tekur"
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
