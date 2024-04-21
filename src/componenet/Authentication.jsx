import { useForm } from "react-hook-form";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { useEffect, useState } from "react";
import Auth from "../assets/undraw_secure_login_pdn4.svg";
import Input from "./input";
import Button from "../Ui/Button";
import { useLoaderData, useNavigate } from "react-router-dom";
import { setLocalstorage } from "../services/locatStorage";
import Spinner from "../Ui/Spinner";

const logUser = {
  email: "test@gmail.com",
  password: "testing",
};

export default function Authentication() {
  const [isLoading, setisLoading] = useState(true);
  const nvigate = useNavigate();
  const data = useLoaderData();
  const parsedata = JSON.parse(data);
  const [login, setlogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { isLoading: formLoading, errors },
  } = useForm();
  //console.log(JSON.parse(data)?.email);
  useEffect(() => {
    if (parsedata?.email) {
      nvigate("/play");
    }
    setisLoading(false);
  }, [parsedata, nvigate]);
  function loginHandler() {
    if (login) return;
    setlogin(true);
    reset();
  }
  function signUpHandler() {
    if (!login) return;
    setlogin(false);
    reset();
  }
  const submitData = (data) => {
    const { email, password, checkbox } = data;
    // check if inputed user login data is valid with the register data on the server
    const validation = email === logUser.email && password === logUser.password;
    if (!validation) return console.log("user does not exist");
    if (checkbox) setLocalstorage({ email, password, name: "yunus Abdul" });
    nvigate("/dashbord/home");
    reset();
  };
  if (isLoading) return <Spinner />;

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
          <form
            className="flex flex-col w-full"
            onSubmit={handleSubmit(submitData)}
          >
            {!login && (
              <>
                <Input label={"first name"} type={"text"}>
                  <label
                    htmlFor="first name"
                    className="text-blue-200 relative bottom-7 transition-all duration-75 ease-linear capitalize text-lg font-tekur"
                    data={{ ...register("first name") }}
                  >
                    first name
                  </label>
                </Input>
                <Input label={"last name"} type={"text"}>
                  <label
                    htmlFor="last name"
                    className="text-blue-200 relative bottom-7 transition-all duration-75 ease-linear capitalize text-lg font-tekur"
                    data={{ ...register("last name") }}
                  >
                    last name
                  </label>
                </Input>
              </>
            )}
            <Input label={"email"} type={"email"}>
              <label
                htmlFor="email"
                className="text-blue-200 relative bottom-7 transition-all duration-75 ease-linear capitalize text-lg font-tekur"
                data={{ ...register("email") }}
              >
                email
              </label>
            </Input>
            <Input
              label={"password"}
              type={`${showPassword ? "text" : "password"}`}
            >
              <label
                htmlFor="password"
                className="text-blue-200 relative bottom-7 transition-all duration-75 ease-linear capitalize text-lg font-tekur"
                data={{
                  ...register("password", {
                    min: 6,
                    validate: (value) => {
                      if (value.length < 6) {
                        return "Password length must be greater 5";
                      }
                    },
                  }),
                }}
              >
                password
              </label>
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-blue-100 absolute right-0 bottom-8 cursor-pointer"
              >
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </span>
              <p className={`absolute bottom-0 text-red-500 text-sm`}>
                {errors?.password?.message}
              </p>
            </Input>
            <div className="text-gray-50 capitalize text-bas">
              <span className="mr-2">remember me</span>
              <input
                type="checkbox"
                className="border-red-50 border-dotted border-2"
                {...register("checkbox")}
              />
            </div>
            {login && (
              <a className="text-blue-200 text-end text-base cursor-pointer hover:text-white capitalize ">
                forget password?
              </a>
            )}
            <Button disabled={formLoading}>
              {login ? "login" : "Get started"}
            </Button>
          </form>
          <img src={Auth} className="hidden md:w-1/2 md:block" />
        </div>
      </div>
    </div>
  );
}
