import { useNavigate } from "react-router-dom";
import { clearLocalstorage } from "../services/locatStorage";

export default function Header() {
  const navigate = useNavigate();
  const logOutHandler = function () {
    clearLocalstorage();
    navigate("/");
  };
  return (
    <header className="bg-gray-50 w-full h-14 border-l-2 flex items-center justify-end pr-5 gap-3">
      <img
        src="https://plus.unsplash.com/premium_photo-1658527049634-15142565537a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww"
        className="rounded-full w-12 h-12 text-center"
        alt="YA"
      />
      <button onClick={logOutHandler}>logout</button>
    </header>
  );
}
