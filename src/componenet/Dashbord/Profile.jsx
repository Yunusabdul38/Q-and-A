import { useState } from "react";
import Button from "../../Ui/Button";

export default function Profile() {
  const [updateUser, setUpdateUser] = useState(false);
  return (
    <div className="">
      <div className="pt-10 p-2 capitalize text-gray-50 flex gap-10 justify-center">
        <div className="bg-gray-50 text-gray-950 w-60 h-60 grid items-center justify-center  font-NatoSans text-7xl font-bold uppercase">
          YA
        </div>
        <aside className="grid items-center">
          <div>
            <h1>name:</h1>
            <span>yunus abdul</span>
          </div>
          <div>
            <h1>email:</h1>
            <span className="lowercase">yunus@gmail.com</span>
          </div>

          <Button style="bg-blue-600 w-fit">Edit profile</Button>
        </aside>
      </div>
      {updateUser && (
        <form className="flex flex-col text-gray-50 capitalize">
          <div className="grid gap-2">
            <label>email address</label>
            <input
              className="bg-inherit border outline-none pl-3 w-96 py-3 disabled:bg-gray-400"
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
          <div className="grid gap-2 py-3">
            <label>edit avatar</label>
            <input
              type="file"
              className="file:bg-blue-800 file:hover:bg-blue-900 file:border-none file:rounded-md file:px-3 file:py-1 file:text-gray-50"
            />
          </div>
          <div className="grid gap-2">
            <label>password</label>
            <input className="bg-inherit border outline-none pl-3 w-96 py-3" />
          </div>
          <div className="grid gap-2">
            <label>confirm password</label>
            <input className="bg-inherit border outline-none pl-3 w-96 py-3" />
          </div>
          <div className="flex justify-end gap-6 text-gray-50">
            <button className="bg-blue-none w-fit py-2 px-6 rounded-md border hover:bg-blue-800 capitalize">
              cancle
            </button>
            <button className="bg-blue-700 hover:bg-blue-800 w-fit text-center capitalize px-6 py-2 rounded-md">
              update profile
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
