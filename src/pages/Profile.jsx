import { useState } from "react";
import Button from "../Ui/Button";
import Form from "../componenet/form";

export default function Profile() {
  const [updateUser, setUpdateUser] = useState(false);
  function userUpdatehandler() {
    setUpdateUser(true);
  }
  function cancleUpdateHandler() {
    setUpdateUser(false);
  }
  return (
    <div className="grid items-center justify-center h-screen">
      <div className="pt-10 p-2 capitalize text-gray-50 flex gap-10 justify-center">
        <img
        src="https://plus.unsplash.com/premium_photo-1658527049634-15142565537a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww"
        alt="YA"
        className="bg-gray-50 text-gray-950 w-60 h-60 grid items-center justify-center  font-NatoSans text-7xl font-bold uppercase"
      />
        <aside className="grid items-center">
          <div>
            <h1>name:</h1>
            <span>yunus abdul</span>
          </div>
          <div>
            <h1>email:</h1>
            <span className="lowercase">yunus@gmail.com</span>
          </div>

          <Button
            style="px-4 bg-blue-600 w-fit disabled:cursor-not-allowed"
            disabled={updateUser}
            onClick={userUpdatehandler}
          >
            Edit profile
          </Button>
        </aside>
      </div>
      {updateUser && (
        <div className="flex justify-center my-5">
          <Form cancleUpdate={cancleUpdateHandler} />
        </div>
      )}
    </div>
  );
}