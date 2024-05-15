import { useSelector,useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "./componenet/Header";
import Navbar from "./componenet/Navbar";
import { useCallback, useState,useEffect } from "react";
import { checkUserSignIn } from "./store/auth-checkUserSignIn";
import Authentication from "./componenet/Authentication"
import Spinner from "./Ui/Spinner"

export default function App() {
  const [fullmenu, setFullMenu] = useState(true);
  const { loading, user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch()
  // let secondsRemaining  = 1200
  // useEffect(()=>{
  //   const int = setInterval(() => {
  //     secondsRemaining --
  //     const minutes = Math.trunc(secondsRemaining / 60);
  //     const seconds =Math.floor(secondsRemaining % 60);
  //     console.log(minutes +":" + seconds)
  //   }, 1000);

  //   ()=> clearInterval(int)
  // })  
  useEffect(() => {
    if(user) return
    dispatch(checkUserSignIn())
  }, [dispatch,user]);

  const setMenu = useCallback(() => {
    setFullMenu((prev) => !prev);
  }, []);
  
  if (loading) return <Spinner />;
  if (!user) return <Authentication />;
  return (
    <div
      className={`h-screen grid ${
        fullmenu ? "sm:grid-cols-[0.1fr_2fr]" : "sm:grid-cols-[0.2fr_2fr]"
      } transition-all duration-200 ease-out`}
    >
      <Navbar fullmenu={fullmenu} setFullMenu={setMenu} />
      <section className="bg-[#074173] h-screen w-full overflow-y-scroll">
        <Header />
        <Outlet />
      </section>
    </div>
  );
}
