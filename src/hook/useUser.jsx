import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";

const auth = getAuth();

let name;
let photo;
export function useUser() {
  const { user } = useSelector((state) => state.userReducer);
  if (user) {
    const { displayName, photoURL } = auth.currentUser;
    name = displayName?.split(" ");
    photo = photoURL;
  }

  return [name, photo];
}
