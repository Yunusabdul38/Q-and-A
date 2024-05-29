import { SlLogout } from "react-icons/sl";
import { LuUser2 } from "react-icons/lu";
import { userSignOut } from "../store/firebaseAuthentication";
import { useDispatch } from "react-redux";
import { usePlay, useUser } from "../hook/useStore";
import Timer from "./Timer";

export default function Header() {
  const { level, questions,secondsRemaining} = usePlay();
  const {name, photo} = useUser();
  const dispatch = useDispatch();

  // logOut handler (logout and navigate to authentication page)
  const logOutHandler = async function () {
    await userSignOut(dispatch);
  };

  return (
    <header className="bg-gray-50 w-full h-14 border-l-2 flex items-center px-8 md:px-48  justify-between fixed">
      {/* show timer component if conditions are satisfied */}
      {level !== "easy" && questions.length >=1 && secondsRemaining && <Timer />}
      <h1 className="uppercase font-medium">hi {name}</h1>
      <div className="flex gap-6">
        {photo ? (
          <img
            src={photo}
            className="rounded-full w-12 h-12 text-center"
            alt={name}
          />
        ) : (
          <LuUser2 className="rounded-full w-12 h-12" />
        )}

        <button onClick={logOutHandler} className="text-2xl hover:text-sky-500">
          <SlLogout />
        </button>
      </div>
    </header>
  );
}
