import Authentication from "../componenet/Authentication";
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import Spinner from "../Ui/Spinner"

const auth = getAuth();
const user = auth.currentUser;

export default function Home() {
  const {loading,user} = useSelector(state=> state.userReducer)
  console.log(user)
  const dispatch = useDispatch()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(user)
    } else {
      return "User signed out";
    }
  });
  if(loading) return <Spinner/>
  if (!user) return <Authentication />;

  return <div>Home</div>;
}

// if (user !== null) {
//   // The user object has basic properties such as display name, email, etc.
//   const displayName = user.displayName;
//   const email = user.email;
//   const photoURL = user.photoURL;
//   const emailVerified = user.emailVerified;

//   // The user's ID, unique to the Firebase project. Do NOT use
//   // this value to authenticate with your backend server, if
//   // you have one. Use User.getToken() instead.
//   const uid = user.uid;
// }

// import { collection, getDocs } from "firebase/firestore";
// import db from "../store/firebase";

// const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
// });
