import { useForm } from "react-hook-form";
import Button from "../Ui/Button";
import Password from "./Password";
import Input from "./input";
import { userSignUp } from "../store/firebaseAuthentication";
import { useDispatch } from "react-redux";

export default function SignUp() {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm();

  const comfirPassWorderror = errors["confirm-password"];
  const submitData = (data) => {
    const { email, password, fullName } = data;
    userSignUp(email, password, fullName, dispatch);
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
          htmlFor="comfirm-password"
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
          confirm password
        </label>
        <p className={`absolute bottom-0 text-red-500 text-sm`}>
          {!!comfirPassWorderror && comfirPassWorderror.message}
        </p>
      </Password>
      <Button disabled={isSubmitting}>{isSubmitting?"signing in ...":"sign in"}</Button>
    </form>
  );
}
