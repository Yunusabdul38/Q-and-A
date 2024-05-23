import { useForm } from "react-hook-form";
import { updatePassword } from "../store/firebaseAuthentication";

export default function ChangePassWordForm({cancleUpdate}) {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { isSubmitting, errors,isSubmitSuccessful },
  } = useForm();
  async function onSubmit(data) {
    if(!data.password) return
    delete data["confirm-password"];
    if (!data.password) delete data.password;
    updatePassword(data)
    if (isSubmitSuccessful) {
      cancleUpdate();
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col text-black capitalize bg-white h-dvh sm:h-fit">
      <div className="flex justify-between gap-5 flex-wrap">
        <div className="grid gap-2">
          <label>password</label>
          <input
            className="bg-inherit border outline-none pl-3 w-96 py-3"
            {...register("password",{
              validate: (value) => {
                if (value.length < 6) {
                  return "Password length must be greater 5";
                }
              },
            })}
          />
        </div>
        <div className="grid gap-2">
          <label>confirm password</label>
          <input
            className="bg-inherit border outline-none pl-3 w-96 py-3"
            {...register("confirm-password", {
              validate: (value) => {
                if (value.length < 6) {
                  return "Password length must be greater 5";
                }
                if (value !== getValues("password")) {
                  return "this passord did not correspond with the above password";
                }
              },
            })}
          />
          <span className="text-red-400 lowercase font-medium">
            {errors["confirm-password"] && errors["confirm-password"].message}
          </span>
        </div>
      </div>
      <div className="flex justify-end gap-6 text-gray-50">
        <button
          type="button"
          className="bg-sky-500 w-fit py-2 px-6 rounded-md border hover:bg-blue-800 capitalize"
          onClick={cancleUpdate}
          disabled={isSubmitting}
        >
          cancle
        </button>
        <button
          className="bg-blue-700 hover:bg-blue-800 w-fit text-center capitalize px-6 py-2 rounded-md"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "sending...." : " update profile"}
        </button>
      </div>
    </form>
  );
}
