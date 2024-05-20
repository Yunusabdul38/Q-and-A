import { useSelector } from "react-redux";


let name;
let photo;
export function useUser() {
  const { user,loading,updatedUserImage } = useSelector((state) => state.userReducer);
  const email = user?.email
  if (user) {
    name = user?.fullName?.split(",");
    photo = user?.image?user.image:null;
  }

  return {name, photo,loading,email,updatedUserImage,user};
}
