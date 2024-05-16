import { useForm } from "react-hook-form";
import { useUser } from "../hook/useUser";
import { uploadImage } from "../services/uploadImage";
export default function Form({ cancleUpdate }) {
  // const [name,photo] =  useUser()
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm();
  function onSubmit(data) {
    data.avatar= data.avatar[0]
    uploadImage(data.avatar)
    if (isSubmitSuccessful) {
      cancleUpdate();
    }
  }
  return (
    <form
      className="flex flex-col text-black capitalize bg-white"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex justify-between gap-5 flex-wrap">
        <div className="grid gap-2">
          <label>email address</label>
          <input
            className="bg-inherit border outline-none pl-3 w-96 py-3 disabled:bg-gray-400 disabled:cursor-not-allowed"
            defaultValue="yunusabdul@gmail.com"
            disabled
            {...register("email", { value: "yunusabdul@gmail.com" })}
          />
        </div>
        <div className="grid gap-2">
          <label>full name</label>
          <input
            className="bg-inherit border outline-none pl-3 w-96 py-3"
            defaultValue="yunus abdul"
            {...register("fullName")}
          />
        </div>
      </div>
      <div className="grid gap-2 py-3">
        <label>edit avatar</label>
        <input
          type="file"
           accept="image/*"
          className="file:bg-sky-500 file:hover:bg-blue-900 file:border-none file:rounded-md file:px-3 file:py-1 file:text-gray-50"
          {...register("avatar")}
        />
      </div>
      <div className="flex justify-between gap-5 flex-wrap">
        <div className="grid gap-2">
          <label>password</label>
          <input
            className="bg-inherit border outline-none pl-3 w-96 py-3"
            {...register("password")}
          />
        </div>
        <div className="grid gap-2">
          <label>confirm password</label>
          <input
            className="bg-inherit border outline-none pl-3 w-96 py-3"
            {...register("confirm-password", {
              validate: (value) => {
                if (value !== getValues("password")) {
                  return "this password did not match the above password";
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
        >
          cancle
        </button>
        <button
          className="bg-blue-700 hover:bg-blue-800 w-fit text-center capitalize px-6 py-2 rounded-md"
          type="submit"
          disabled={isSubmitting}
        >
          update profile
        </button>
      </div>
    </form>
  );
}
