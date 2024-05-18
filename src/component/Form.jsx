import { useForm } from "react-hook-form";
import { updatedUserData, uploadImage } from "../services/updateUserData";
import { useDispatch, useSelector } from "react-redux";
export default function Form({ cancleUpdate }) {
  const {updatedUserImage} = useSelector((state)=>state.userReducer)
  const dispatchFn = useDispatch()
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm();
  async function onSubmit(data) {
    data.avatar= data.avatar[0]
    if(data.avatar[0]){
      uploadImage(data.avatar,dispatchFn)
      data.avatar= updatedUserImage
    }
    await updatedUserData(data)
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
          disabled={isSubmitting}
        >
          cancle
        </button>
        <button
          className="bg-blue-700 hover:bg-blue-800 w-fit text-center capitalize px-6 py-2 rounded-md"
          type="submit"
          disabled={isSubmitting}
        >
         {isSubmitting?"sending....":" update profile"}
        </button>
      </div>
    </form>
  );
}
