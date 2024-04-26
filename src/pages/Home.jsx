import Authentication from "../componenet/Authentication";
import { getAuth } from "firebase/auth";
import { useSelector,useDispatch } from "react-redux";
import Spinner from "../Ui/Spinner"
import { useEffect } from "react";
import { checkUserSignIn } from "../store/auth-checkUserSignIn";


const auth = getAuth();
const user = auth.currentUser;
console.log(user)
export default function Home() {
  const {loading,user} = useSelector(state=> state.userReducer)
  // console.log(user)
  const dispatch = useDispatch()
 
  useEffect(()=>{
    dispatch(checkUserSignIn())
  },[dispatch])
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
