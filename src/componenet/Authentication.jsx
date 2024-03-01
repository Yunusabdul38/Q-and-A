import {useForm} from "react-hook-form"
import { FiEyeOff,FiEye } from "react-icons/fi";
import { useState } from "react";
import Auth from "../assets/undraw_secure_login_pdn4.svg";
export default function Authentication() {
  const [login, setlogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const {register,reset,handleSubmit,formState:{isLoading,errors},getValues} = useForm()
  function loginHandler() {
    setlogin(true);
    reset()
  }
  function signUpHandler() {
    setlogin(false);
    reset()
  }
  const submitData = (data)=>{
    console.log(data)
    reset()
  }

  return (
    <div className="shadow-xl bg-blue-800/35 w-4/5 md:w-3/4 md:px-6 font-lexendDeca">
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
        <form className="flex flex-col w-full" onSubmit={handleSubmit(submitData)}>
          {!login && (
            <>
              <div className="relative input-box">
                <input
                  type="text"
                  id="first name"
                  required
                  className="text-gray-50 pl-[2px] border-b-2 border-gray-50 border-solid w-full bg-inherit outline-none"
                  {...register("first name")}
                />
                <label
                  htmlFor="first name"
                  className="text-blue-200 relative bottom-7 transition-all duration-75 ease-linear capitalize text-lg font-tekur"
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
                  {...register("last name")}
                />
                <label
                  htmlFor="last name"
                  className="text-blue-200 relative bottom-7 transition-all duration-75 ease-linear capitalize text-lg font-tekur"
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
              {...register("email")}
            />
            <label
              htmlFor="email"
              className="text-blue-200 relative bottom-7 transition-all duration-75 ease-linear capitalize text-lg font-tekur"
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
              {...register("password",{min:6,validate:(value)=>{
                if(value.length < 6){
                  return "Password length must be greater 5"
                }
              }})}
            />
            <label
              htmlFor="password"
              className="text-blue-200 relative bottom-7 transition-all duration-75 ease-linear capitalize text-lg font-tekur"
            >
              password
            </label>
            <span onClick={()=>setShowPassword(prev=>!prev)} className="text-blue-100 absolute right-0 bottom-8 cursor-pointer">{showPassword?<FiEye/>:<FiEyeOff/>}</span>
            <p className={`absolute bottom-0 text-red-500 text-sm`}>{errors?.password?.message}</p>
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
