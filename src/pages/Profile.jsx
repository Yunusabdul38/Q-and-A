import { useState } from "react";
import Button from "../Ui/Button";
import { LuUser2 } from "react-icons/lu";
import EditProfileForm from "../component/EditProfileForm";
import { useUser } from "../hook/useStore";
import ChangePassWordForm from "../component/ChangePassWordForm";
import Spinner from "../Ui/Spinner";

export default function Profile() {
  const { name, photo, email,loading } = useUser();
  const [updateUser, setUpdateUser] = useState(false);
  function userUpdatehandler() {
    setUpdateUser("profile");
  }
  function cancleUpdateHandler() {
    setUpdateUser(false);
  }
  if(loading) return <Spinner/>
  return (
    <div className="grid items-center justify-center h-screen">
      <div className="pt-10 p-2 capitalize text-slate-50 flex gap-10 justify-center">
        {photo ? (
          <img
            src={photo}
            alt={`${name.join(" ")} display photo`}
            className="bg-gray-50 text-gray-950 w-60 h-60 grid items-center justify-center  font-NatoSans text-xl font-bold uppercase"
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
            <span className="lowercase">{email}</span>
          </div>
          <Button
            style="px-4 bg-blue-600 w-fit disabled:cursor-not-allowed"
            disabled={updateUser === "profile"}
            onClick={userUpdatehandler}
          >
            Edit profile
          </Button>

          <Button
            style="px-4 bg-blue-600 w-fit disabled:cursor-not-allowed"
            disabled={updateUser === "password"}
            onClick={() => setUpdateUser("password")}
          >
            change password
          </Button>
        </aside>
      </div>
      {updateUser === "profile" && (
        <div className="flex justify-center my-5">
          <EditProfileForm cancleUpdate={cancleUpdateHandler} />
        </div>
      )}
      {updateUser === "password" && (
        <div className="flex justify-center my-5">
          <ChangePassWordForm cancleUpdate={cancleUpdateHandler} />
        </div>
      )}
    </div>
  );
}