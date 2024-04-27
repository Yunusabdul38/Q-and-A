import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "../services/getQuestions";

export default function useFetch(close) {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.playReducer);
  useEffect(() => {
    if (!category) return;
    async function fetchData() {
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
