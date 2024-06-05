import {useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "./component/Header";
import Navbar from "./component/Navbar";
import { useCallback, useState,useEffect } from "react";
import { checkUserSignIn } from "./store/auth-checkUserSignIn";
import Authentication from "./component/Authentication"
import Spinner from "./Ui/Spinner"
import { usePlay,useUser } from "./hook/useStore";

export default function App() {
  // navigation menu state
  const [fullmenu, setFullMenu] = useState(true);
  const {email:user,loading} = useUser()
  const {status,playIsLoading} = usePlay();
  const dispatch = useDispatch()

  // prompt  user if they try leaving when the game state is not idle
  useEffect(()=>{
    if(status !== "idle"){
      window.addEventListener("beforeunload",(e)=>{
        e.preventDefault()
      })
    }    
  },[status])  

  //check if user is Authenticated 
  useEffect(() => {
    if(user) return
    dispatch(checkUserSignIn())
  }, [dispatch,user]);

  const setMenu = useCallback(() => {
    setFullMenu((prev) => !prev);
  }, []);
  
  if (loading || playIsLoading) return <Spinner />;
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
       <div className="mt-14 mb-32">
       <Outlet />
       </div>
      </section>
    </div>
  );
}
