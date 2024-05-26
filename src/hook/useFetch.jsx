import { useEffect } from "react";
import { useDispatch} from "react-redux";
import { fetchQuestions } from "../services/fetchData";
import { usePlay } from "./useStore";

// effect meant for fetching a specific game category if category variable is true
// also meant for closeing modal after modal form is submitted
export default function useFetch(close) {
  const dispatch = useDispatch();
  const { category } = usePlay();

  useEffect(() => {
    if (!category) return;
    function fetchData() {
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
