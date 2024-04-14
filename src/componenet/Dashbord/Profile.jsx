import { useState } from "react";
import Button from "../../Ui/Button";
import Form from "../form";

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

          <Button
            style="bg-blue-600 w-fit disabled:cursor-not-allowed"
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
