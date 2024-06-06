import { useState } from "react";
import Button from "../Ui/Button";
import { LuUser2 } from "react-icons/lu";
import EditProfileForm from "../component/EditProfileForm";
import { useUser } from "../hook/useStore";
import Spinner from "../Ui/Spinner";
import Wrapper from "../Ui/Wrapper";

export default function Profile() {
  const { name, photo, email, loading, fullName } = useUser();
  const [updateUser, setUpdateUser] = useState(false);

  // form visibility and hidden function
  function userUpdatehandler() {
    setUpdateUser(true);
  }
  function cancleUpdateHandler() {
    setUpdateUser(false);
  }
  if (loading) return <Spinner />;
  return (
    <div className="mb-16 mt-20">
      <Wrapper width="fit" hight="h">
        <div className="p-2 capitalize text-slate-50 flex gap-2 sm:gap-10 justify-center flex-col sm:flex-row">
          {photo ? (
            <img
              src={photo}
              alt={`${name} display photo`}
              className="bg-gray-50 text-gray-950 w-60 h-60 grid items-center justify-center  font-NatoSans text-base font-bold uppercase"
            />
          ) : (
            <LuUser2 className="text-gray-950 w-60 h-60 bg-gray-50" />
          )}
          <aside className="grid items-center">
            <div className="flex gap-2 sm:flex-col">
              <h1>name:</h1>
              <span>{fullName}</span>
            </div>
            <div className="flex gap-2 sm:flex-col">
              <h1>email:</h1>
              <span className="lowercase">{email}</span>
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
      </Wrapper>
      {updateUser && <EditProfileForm cancleUpdate={cancleUpdateHandler} />}
    </div>
  );
}
