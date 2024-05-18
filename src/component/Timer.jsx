import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countdown } from "../store/store";

export default function Timer() {
  const dispatch = useDispatch();
  const { secondsRemaining } = useSelector((state) => state.playReducer);
  const minutes = Math.trunc(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  useEffect(() => {
    const counter = setInterval(() => {
      dispatch(countdown());
    }, 1000);
    return () => clearInterval(counter);
  },[dispatch]);

  return (
    <div className="text-xl font-tekur">{`${
      minutes < 10 ? `0${minutes}` : minutes
    } :${seconds < 10 ? `0${seconds}` : seconds}`}</div>
  );
}