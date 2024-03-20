import { useNavigate } from "react-router-dom";
import { clearLocalstorage } from "../../services/locatStorage";

export default function Header() {
  const navigate = useNavigate()  
  const logOutHandler = function(){
    clearLocalstorage()
    navigate("/")
  }
  return (
    <header className="bg-gray-50 w-full h-14 border-l-2 flex items-center justify-end pr-5 gap-3">
      <span className="bg-purple-900 text-gray-50 w-12 h-12 grid items-center justify-center rounded-full font-NatoSans text-xl uppercase">
        YA
      </span>
      <button onClick={logOutHandler}>logout</button>
    </header>
  );
}
