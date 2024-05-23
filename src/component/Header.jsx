import { SlLogout } from "react-icons/sl";
import { LuUser2 } from "react-icons/lu";
import { userSignOut } from "../store/firebaseAuthentication";
import { useDispatch } from "react-redux";
import { usePlay, useUser } from "../hook/useStore";
import Timer from "./Timer";

export default function Header() {
  const { level, questions } = usePlay();
  const {name, photo} = useUser();
  const dispatch = useDispatch();

  // logOut handler (logout and navigate to authentication page)
  const logOutHandler = function () {
    userSignOut(dispatch);
  };

  return (
    <header className="bg-gray-50 w-full h-14 border-l-2 flex items-center px-5 gap-3 justify-between fixed">
      {level !== "easy" && questions.length && <Timer />}
      <h1 className="uppercase font-medium">hi {name[0]}</h1>
      <div className="flex gap-6">
        {photo ? (
          <img
            src={photo}
            className="rounded-full w-12 h-12 text-center"
            alt="YA"
          />
        ) : (
          <LuUser2 className="rounded-full w-12 h-12" />
        )}

        <button onClick={logOutHandler}>
          <SlLogout className="text-2xl hover:text-sky-500" />
        </button>
      </div>
    </header>
  );
}
