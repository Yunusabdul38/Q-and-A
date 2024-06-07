import { useForm } from "react-hook-form";
import Password from "./Password";
import Input from "./Input";
import Button from "../Ui/Button";
import { userSignIn } from "../store/firebaseAuthentication";
import { useDispatch } from "react-redux";

export default function SignIn() {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();
  const submitData = async (data) => {
    const { email, password } = data;
    await userSignIn({ email, password },dispatch);
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
        <p className="absolute -bottom-4 text-red-500 text-sm">
          {errors?.password?.message}
        </p>
      </Password>
      <Button top={errors?.password} disabled={isSubmitting}>{isSubmitting?"signinig in .....":"sign in"}</Button>
    </form>
  );
}