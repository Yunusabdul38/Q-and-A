import { useState } from "react";
import Auth from "../assets/undraw_secure_login_pdn4.svg";
import Button from "../Ui/Button";
import SignIn from "./Signin";
import SignUp from "./SignUp";

export default function Authentication() {
  const [login, setlogin] = useState(true);

  // functions to either show sign up or sign in ui
  function loginHandler() {
    if (login) return;
    setlogin(true);
  }
  function signUpHandler() {
    if (!login) return;
    setlogin(false);
  }

  return (
    <div className="bg-blue-900 h-screen flex justify-center items-center">
      <div className="shadow-xl bg-blue-800/35 w-[90%] md:w-3/4 md:px-6 font-lexendDeca">
        <div className="flex justify-center my-4">
          <Button onClick={signUpHandler} type="secondary" state={!login}>
            sign up
          </Button>
          <Button onClick={loginHandler} type="secondary" state={login}>
            sign in
          </Button>
        </div>
        <h2 className="text-center text-xl md:text-2xl uppercase text-white">
          {login ? "welcome back, quickly sign in to take the top spot in our ranking table" : "sign up to get started"}
        </h2>
        <div className=" flex flex-col md:flex-row justify-between md:grid md:grid-cols-2 items-center">
          {login && <SignIn />}
          {!login && <SignUp />}
          <img src={Auth} className="hidden md:w-full md:block" />
        </div>
      </div>
    </div>
  );
}
