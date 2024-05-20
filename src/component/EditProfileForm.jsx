import { useForm } from "react-hook-form";
import { updatedUserData, uploadImage } from "../services/updateUserData";
import { useDispatch } from "react-redux";
import { useUser } from "../hook/useUser";
export default function EditProfileForm({ cancleUpdate }) {
  const {email,updatedUserImage,user} = useUser();
  const dispatchFn = useDispatch()
  const {
    handleSubmit,
    register,
    formState: { isSubmitSuccessful, isSubmitting},
  } = useForm();
  async function onSubmit(data) {
    data.avatar= data.avatar[0]
    // if(data.avatar){
    //   console.log("img")
    //   await uploadImage(data.avatar,dispatchFn)
    //   data.avatar= updatedUserImage
    // }
    delete data["confirm-password"]
    if(!data.avatar) delete data.avatar
    if(!data.fullName) delete data.fullName
    console.log(data)
    //await updatedUserData(data)
    if (isSubmitSuccessful) {
      //cancleUpdate();
      console.log("done")
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
            defaultValue={email}
            disabled
            // {...register("email", { value: "yunusabdul@gmail.com" })}
          />
        </div>
        <div className="grid gap-2">
          <label>full name</label>
          <input
            className="bg-inherit border outline-none pl-3 w-96 py-3"
            defaultValue={user.fullName }
            {...register("fullName")}
          />
        </div>
      </div>
      <div className="grid gap-2 py-3">
        <label>edit image</label>
        <input
          type="file"
           accept="image/*"
          className="file:bg-sky-500 file:hover:bg-blue-900 file:border-none file:rounded-md file:px-3 file:py-1 file:text-gray-50"
          {...register("avatar")}
        />
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