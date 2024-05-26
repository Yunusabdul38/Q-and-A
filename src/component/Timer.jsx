import { useEffect } from "react";
import { useDispatch} from "react-redux";
import { countdown, finish } from "../store/store";
import { usePlay } from "../hook/useStore";

// countdown timer for hard and medium game level
export default function Timer() {
  const dispatch = useDispatch();
  const { secondsRemaining } = usePlay();
  const minutes = Math.trunc(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  //counter interval count 
  useEffect(() => {
    if(minutes<0 && !seconds<0) return dispatch(finish())
    const counter = setInterval(() => {
      dispatch(countdown());
    }, 1000);
    return () => clearInterval(counter);
  },[dispatch,minutes,seconds]);

  return (
    <div className="text-xl font-tekur">{`${
      minutes < 10 ? `0${minutes}` : minutes
    } :${seconds < 10 ? `0${seconds}` : seconds}`}</div>
  );
}