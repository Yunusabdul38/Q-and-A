export default function Form({ cancleUpdate }) {
  return (
    <form className="flex flex-col text-black capitalize bg-white">
      <div className="flex justify-between gap-5 flex-wrap">
        <div className="grid gap-2">
          <label>email address</label>
          <input
            className="bg-inherit border outline-none pl-3 w-96 py-3 disabled:bg-gray-400 disabled:cursor-not-allowed"
            defaultValue="yunusabdul@gmail.com"
            disabled
          />
        </div>
        <div className="grid gap-2">
          <label>full name</label>
          <input
            className="bg-inherit border outline-none pl-3 w-96 py-3"
            defaultValue="yunus abdul"
          />
        </div>
      </div>
      <div className="grid gap-2 py-3">
        <label>edit avatar</label>
        <input
          type="file"
          className="file:bg-sky-500 file:hover:bg-blue-900 file:border-none file:rounded-md file:px-3 file:py-1 file:text-gray-50"
        />
      </div>
      <div className="flex justify-between gap-5 flex-wrap">
        <div className="grid gap-2">
          <label>password</label>
          <input className="bg-inherit border outline-none pl-3 w-96 py-3" />
        </div>
        <div className="grid gap-2">
          <label>confirm password</label>
          <input className="bg-inherit border outline-none pl-3 w-96 py-3" />
        </div>
      </div>
      <div className="flex justify-end gap-6 text-gray-50">
        <button
          className="bg-sky-500 w-fit py-2 px-6 rounded-md border hover:bg-blue-800 capitalize"
          onClick={cancleUpdate}
        >
          cancle
        </button>
        <button className="bg-blue-700 hover:bg-blue-800 w-fit text-center capitalize px-6 py-2 rounded-md">
          update profile
        </button>
      </div>
    </form>
  );
}
