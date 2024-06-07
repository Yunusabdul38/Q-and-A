import { useForm } from "react-hook-form";
import { uploadData} from "../services/updateUserData";
import { useDispatch } from "react-redux";
import { useUser } from "../hook/useStore";
import PropTypes from "prop-types";

export default function EditProfileForm({ cancleUpdate }) {
  const {email,user} = useUser();
  const dispatchFn = useDispatch()
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    const newUserData = data
    await uploadData(newUserData,dispatchFn)
  }
  return (
    <form
      className="flex flex-col text-black capitalize bg-white w-full md:w-2/3 max-w-4xl mx-auto mt-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex justify-between gap-5 flex-wrap">
        <div className="grid gap-2">
          <label>email address</label>
          <input
            className="bg-inherit border outline-none pl-3 w-[300px] sm:w-96 py-3 disabled:bg-gray-400 disabled:cursor-not-allowed"
            defaultValue={email}
            disabled
          />
        </div>
        <div className="grid gap-2">
          <label>full name</label>
          <input
            className="bg-inherit border outline-none pl-3 w-[300px] sm:w-96 py-3 disabled:cursor-not-allowed"
            defaultValue={user.fullName }
            {...register("fullName")}
            disabled={isSubmitting}
          />
        </div>
      </div>
      <div className="grid gap-2 py-3">
        <label>edit image</label>
        <input
          type="file"
           accept="image/*"
          className="file:bg-sky-500 file:hover:bg-blue-900 file:border-none file:rounded-md file:px-3 file:py-1 file:text-gray-50 disabled:cursor-not-allowed"
          {...register("image")}
          disabled={isSubmitting}
        />
      </div>
      <div className="flex justify-end gap-6 text-gray-50">
        <button
          type="button"
          className="bg-sky-500 w-fit py-2 px-6 rounded-md border hover:bg-blue-800 capitalize disabled:cursor-not-allowed"
          onClick={cancleUpdate}
          disabled={isSubmitting}
        >
          cancle
        </button>
        <button
          className="bg-blue-700 hover:bg-blue-800 w-fit text-center capitalize px-6 py-2 rounded-md disabled:cursor-not-allowed"
          type="submit"
          disabled={isSubmitting}
        >
         {isSubmitting?"updating....":" update profile"}
        </button>
      </div>
    </form>
  );
}

//props type
EditProfileForm.propTypes = {
  cancleUpdate: PropTypes.func,
};