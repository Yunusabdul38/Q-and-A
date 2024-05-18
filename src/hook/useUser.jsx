import { useSelector } from "react-redux";


let name;
let photo;
export function useUser() {
  const { user } = useSelector((state) => state.userReducer);
  const {image,fullname} = user
  if (user) {
    
    name = fullname?.split(" ");
    photo = image?image:null;
  }

  return [name, photo];
}
