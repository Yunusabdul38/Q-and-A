import { useState } from "react";
import Auth from "../assets/undraw_secure_login_pdn4.svg";
import Button from "../Ui/Button";
// import Spinner from "../Ui/Spinner";
import SignIn from "./Signin";
import SignUp from "./SignUp";

const logUser = {
  email: "test@gmail.com",
  password: "testing",
};

export default function Authentication() {
  const [login, setlogin] = useState(true);

  function loginHandler() {
    if (login) return;
    setlogin(true);
  }
  function signUpHandler() {
    if (!login) return;
    setlogin(false);
  }

  // if (isLoading) return <Spinner />;

  return (
    <div className="bg-blue-900 h-screen flex justify-center items-center">
      <div className="shadow-xl bg-blue-800/35 w-4/5 md:w-3/4 md:px-6 font-lexendDeca">
        <div className="flex justify-center my-4">
          <Button onClick={signUpHandler} type="secondary" state={!login}>
            sign up
          </Button>
          <Button onClick={loginHandler} type="secondary" state={login}>
            login
          </Button>
        </div>
        <h2 className="text-center text-xl md:text-2xl uppercase text-white">
          {login ? "welcome back" : "sign up to get started"}
        </h2>
        <div className=" flex flex-col md:flex-row justify-between">
          {login && <SignIn />}
          {!login && <SignUp />}
          <img src={Auth} className="hidden md:w-1/2 md:block" />
        </div>
      </div>
    </div>
  );
}
