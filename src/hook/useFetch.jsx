import { useEffect } from "react";
import { useDispatch} from "react-redux";
import { fetchQuestions } from "../services/getQuestions";
import { usePlay } from "./useStore";

export default function useFetch(close) {
  const dispatch = useDispatch();
  const { category } = usePlay();
  useEffect(() => {
    if (!category) return;
    async function fetchData() {
      console.log("fetching..")
      try {
        dispatch(fetchQuestions(category));
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
    close();
  }, [category, close, dispatch]);

  return null
}
