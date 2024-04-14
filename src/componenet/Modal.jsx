import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ close }) {
  const ref = useRef();
  useEffect(() => {
    function closeModal(e) {
      if (e === ref.current) {
        close();
      }
    }
    document.addEventListener("click", (e) => {
      closeModal(e.target);
    });
    return () =>
      document.addEventListener("click", (e) => {
        closeModal(e.target);
      });
  }, [close]);

  return (
    <div
      className="text-slate-700 bg-ovaerlay fixed top-0 left-0 w-full h-dvh z-50 backdrop-blur-[4px] transition-all duration-200 font-lexendDeca"
      ref={ref}
    >
      <div className="rounded-xl fixed top-1/2 left-1/2 p-12 bg-gray-50 -translate-y-1/2 -translate-x-1/2 md:w-[550px] w-[85%] sm:w-2/3 sm:text-center">
        <button
          className="hover:bg-gray-400 rounded-sm text-xl translate-x-3 bg-none  p-1 transition-all hover:text-white border-none absolute  top-5 right-8"
          onClick={close}
        >
          &#10005;
        </button>
        <h2 className="capitalize md:font-medium font-normal">
          Please select your preferred difficulty level and category to begin
          the quiz. Click on the 'Start Quiz' button when you're ready to test
          your knowledge and compete for the top spot on the leaderboard. Good
          luck!
        </h2>
        <form className="grid gap-7">
          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Choose difficulty </option>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
          <div className="capitalize">
            <div className="flex-wrap grid sm:justify-center sm:grid-cols-2">
              <span>
                <label>sport</label>
                <input type="checkbox" className="mx-3" />
              </span>
              <span>
                <label>history</label>
                <input type="checkbox" className="mx-3" />
              </span>
            </div>
            <div className="grid sm:justify-center sm:grid-cols-2">
              <span>
                <label>food</label>
                <input type="checkbox" className="mx-3" />
              </span>
              <span>
                <label>random</label>
                <input type="checkbox" className="mx-3" />
              </span>
            </div>
          </div>
          <button className="text-gray-50 hover:text-slate-700 font-medium absolute right-4 bottom-4 bg-slate-400 hover:bg-inherit transition-all capitalize hover:border-slate-700 border-2  rounded py-2 px-4">
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
export default PlayCategory;
