import { FiEyeOff,FiEye } from "react-icons/fi";
import { useState } from "react";
import Auth from "../assets/undraw_secure_login_pdn4.svg";
export default function Authentication() {
  const [login, setlogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  function loginHandler() {
    setlogin(true);
  }
  function signUpHandler() {
    setlogin(false);
  }
  return (
    <div className="shadow-xl bg-blue-800/35 w-4/5 md:w-3/4 md:px-6">
      <div className="flex justify-center my-4">
        <button
          onClick={signUpHandler}
          className={`${
            !login ? "bg-blue-800" : "bg-blue-400 hover:bg-blue-700"
          } capitalize text-gray-50 py-3 px-10`}
        >
          sign up
        </button>
        <button
          onClick={loginHandler}
          className={`${
            login ? "bg-blue-800" : "bg-blue-400 hover:bg-blue-700"
          } capitalize text-gray-50 py-3 px-10`}
        >
          login
        </button>
      </div>
      <h2 className="text-center text-xl md:text-2xl uppercase text-white">
        {login ? "welcome back" : "sign up to get started"}
      </h2>
      <div className=" flex flex-col md:flex-row justify-between">
        <form className="flex flex-col w-full">
          {!login && (
            <>
              <div className="relative input-box">
                <input
                  type="text"
                  id="first name"
                  required
                  className="text-gray-50 pl-[2px] border-b-2 border-gray-50 border-solid w-full bg-inherit outline-none"
                />
                <label
                  htmlFor="first name"
                  className="text-blue-200 relative bottom-7 transition-all duration-75 ease-linear capitalize text-lg"
                >
                  first name
                </label>
              </div>
              <div className="relative input-box">
                <input
                  type="text"
                  id="last name"
                  required
                  className="text-gray-50 pl-[2px] border-b-2 border-gray-50 border-solid w-full bg-inherit outline-none"
                />
                <label
                  htmlFor="last name"
                  className="text-blue-200 relative bottom-7 transition-all duration-75 ease-linear capitalize text-lg"
                >
                  last name
                </label>
              </div>
            </>
          )}
          <div className="relative input-box">
            <input
              type="email"
              id="email"
              required
              className="text-gray-50 pl-[2px] border-b-2 border-gray-50 border-solid w-full bg-inherit outline-none"
            />
            <label
              htmlFor="email"
              className="text-blue-200 relative bottom-7 transition-all duration-75 ease-linear capitalize text-lg"
            >
              email
            </label>
          </div>
          <div className="relative input-box">
            <input
              type={`${showPassword ? "text" : "password"}`}
              id="password"
              required
              className="text-gray-50 pl-[2px] border-b-2 border-gray-50 border-solid w-full bg-inherit outline-none"
            />
            <label
              htmlFor="password"
              className="text-blue-200 relative bottom-7 transition-all duration-75 ease-linear capitalize text-lg"
            >
              password
            </label>
            <span onClick={()=>setShowPassword(prev=>!prev)} className="text-blue-100 absolute right-0 bottom-8 cursor-pointer">{showPassword?<FiEye/>:<FiEyeOff/>}</span>
          </div>
          {login && (
            <a className="text-blue-200 text-end text-base cursor-pointer hover:text-white capitalize ">
              forget password?
            </a>
          )}
          <button
            type="submit"
            className="bg-blue-700 w-fit py-2 px-8 capitalize text-gray-50 hover:bg-blue-400"
          >
            {login ? "login" : "Get started"}
          </button>
        </form>
        <img src={Auth} className="hidden md:w-1/2 md:block" />
      </div>
    </div>
  );
}
