import { useForm } from "react-hook-form";
import Button from "../Ui/Button";
import Password from "./Password";
import Input from "./input";
import { useNavigate } from "react-router-dom";
const logUser = {
    email: "test@gmail.com",
    password: "testing",
  };
export default function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { isLoading: formLoading, errors },
  } = useForm();

  const comfirPassWorderror = errors["confirm-password"];
  const submitData = (data) => {
    const { email, password, fullName } = data;
    
    // check if inputed user login data is valid with the register data on the server
    const validation = email === logUser.email && password === logUser.password;
    if (!validation) return console.log("user does not exist");
    //if (checkbox) setLocalstorage({ email, password, name: "yunus Abdul" });
    navigate("/");
    reset();
  };
  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit(submitData)}>
      <Input label={"first name"} type={"text"}>
        <label
          htmlFor="first name"
          className="text-blue-200 relative bottom-7 transition-all duration-75 ease-linear capitalize text-lg font-tekur"
          data={{ ...register("fullName") }}
        >
          full name
        </label>
      </Input>
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
      <Password label="comfirm password">
        <label
          htmlFor="password"
          className="text-blue-200 relative bottom-7 transition-all duration-75 ease-linear capitalize text-lg font-tekur"
          data={{
            ...register("confirm-password", {
              min: 6,
              validate: (value) => {
                if (value.length < 6) {
                    return "Password length must be greater 5";
                }
                if (value !== getValues().password) {
                  return "this passord did not correspond with the above password";
                }
              },
            }),
          }}
        >
          password
        </label>
        <p className={`absolute bottom-0 text-red-500 text-sm`}>
          {!!comfirPassWorderror && comfirPassWorderror.message}
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
      <Button disabled={formLoading}>Get started</Button>
    </form>
  );
}
