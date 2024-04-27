import { useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { level as playlevel } from "../store/store";
import { HiOutlineXMark } from "react-icons/hi2";
import useModal from "../hook/useModal";
import useFetch from "../hook/useFetch";
function Modal({ close }) {
  const dispatch = useDispatch();
  const ref = useRef();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();

  function onSubmit(data) {
    dispatch(playlevel(data));
  }
  //hook meant to fetch questions data
  useFetch(close)
  //hook for closing modal by clicking outside the modal
  useModal(close,ref)

  return (
    <div
      className="text-slate-700 bg-ovaerlay fixed top-0 left-0 w-full h-dvh z-50 backdrop-blur-[4px] transition-all duration-200 font-lexendDeca"
      ref={ref}
    >
      <div className="rounded-xl fixed top-1/2 left-1/2 p-12 bg-gray-50 -translate-y-1/2 -translate-x-1/2 md:w-[550px] w-[85%] sm:w-2/3 sm:text-center">
        <button
          type="button"
          className="hover:bg-gray-400 rounded-sm text-xl translate-x-3 bg-none  p-1 transition-all hover:text-white border-none absolute  top-5 right-8"
          onClick={close}
        >
          <HiOutlineXMark />
        </button>
        <h2 className="capitalize md:font-medium font-normal text-sm sm:text-base">
          Please select your preferred difficulty level and category to begin
          the quiz. Click on the &apos;Start Quiz&apos; button when you&apos;re
          ready to test your knowledge and compete for the top spot on the
          leaderboard. Good luck!
        </h2>
        <form className="grid gap-7" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 items-center">
            <label>Difficulty:</label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("difficulty")}
            >
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>
          <div className="grid grid-cols-2 items-center">
            <label>Category:</label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("category")}
            >
              <option value="random">random</option>
              <option value="sport">sport</option>
              <option value="food">food</option>
              <option value="football">football</option>
              <option value="history">history</option>
            </select>
          </div>
          <button
            className="text-gray-50 hover:text-slate-700 font-medium absolute right-4 bottom-4 bg-slate-400 hover:bg-inherit transition-all capitalize hover:border-slate-700 border-2  rounded py-2 px-4 disabled:cursor-not-allowed"
            type="submit"
            disabled={isSubmitting}
          >
            play
          </button>
        </form>
      </div>
    </div>
  );
}

function PlayCategory({ close }) {
  return <>{createPortal(<Modal close={close} />, document.body)}</>;
}

Modal.propTypes = {
  close: PropTypes.func,
};
PlayCategory.propTypes = {
  close: PropTypes.func,
};

export default PlayCategory;
