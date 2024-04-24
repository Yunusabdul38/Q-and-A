import { useForm } from "react-hook-form";
import Password from "./Password";
import Input from "./input";
import { useNavigate } from "react-router-dom";
import Button from "../Ui/Button";

export default function SignIn() {
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { isLoading: formLoading, errors },
  } = useForm();
  const logUser = {
    email: "test@gmail.com",
    password: "testing",
  };
  const submitData = (data) => {
    const { email, password, checkbox } = data;
    // check if inputed user login data is valid with the register data on the server
    const validation = email === logUser.email && password === logUser.password;
    console.log(data)
    if (!validation) return console.log("user does not exist");
    //if (checkbox) setLocalstorage({ email, password, name: "yunus Abdul" });
    navigate("/");
    reset();
  };

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit(submitData)}>
      <Input label={"email"} type={"email"}>
        <label
          htmlFor="email"
          className="text-blue-200 relative bottom-7 transition-all duration-75 ease-linear capitalize text-lg font-tekur"
          data={{ ...register("email") }}
        >
          email
        </label>
      </Input>
      <Password label="password">
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
        <p className={`absolute bottom-0 text-red-500 text-sm`}>
          {errors?.password?.message}
        </p>
      </Password>
      <div className="text-gray-50 capitalize text-bas">
        <span className="mr-2">remember me</span>
        <input
          type="checkbox"
          className="border-red-50 border-dotted border-2"
          {...register("checkbox")}
        />
      </div>

      <a className="text-blue-200 text-end text-base cursor-pointer hover:text-white capitalize ">
        forget password?
      </a>

      <Button disabled={formLoading}>login</Button>
    </form>
  );
}
