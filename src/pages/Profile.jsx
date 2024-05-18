import { useState } from "react";
import Button from "../Ui/Button";
import { LuUser2 } from "react-icons/lu";
import Form from "../component/Form";
import { useUser } from "../hook/useUser";

export default function Profile() {
  const [name, photo] = useUser();
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
        {photo ? (
          <img
            src={photo}
            alt={`${name.join(" ")} display photo`}
            className="bg-gray-50 text-gray-950 w-60 h-60 grid items-center justify-center  font-NatoSans text-7xl font-bold uppercase"
          />
        ) : (
          <LuUser2 className="text-gray-950 w-60 h-60" />
        )}
        <aside className="grid items-center">
          <div>
            <h1>name:</h1>
            <span>{name.join(" ")}</span>
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
