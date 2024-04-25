import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import db from "./firebase";
const auth = getAuth();

export async function userSignUp(Email, password, fullName, navigate, reset) {
  try {
    // creating user function in firbase with email and password
    const setup = await createUserWithEmailAndPassword(auth, Email, password);
    const user = setup.user;
    //update user information
    await updateProfile(auth.currentUser, { displayName: fullName });
    // a user data copy to push to firestore without password
    const { displayName, email } = user;
    const userDataCopy = { fullName: displayName, email };

    // setting a timestamp for the precise time of user data creation using firebase
    //serverTimestamp function
    userDataCopy.timeStamp = serverTimestamp();
    userDataCopy.image =
      "https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg=";
    // sending the copy user data to firestore if condition set in firestore for authentication is true
    await setDoc(doc(db, "users", user.uid), userDataCopy);
    // reset();
    //navigate to home page if everything is successful
    navigate("/");
  } catch (error) {
    if (error.code === "auth/account-exists-with-different-credential") {
      return console.log("User's email already exists");
    }
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({ errorCode, errorMessage });
  }
}

export async function userSignIn(data) {
  const { email, password } = data;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("welcome back");
  } catch (error) {
    // if password or email in not valid with the authenticated users in firebase
    if (error.code === "auth/invalid-credential") {
      return console.log("invalid email or password not correct");
    }
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({ errorCode, errorMessage });
    // other error trying to login message
    //   toast.error("Error signing user in");
  }
}

export async function userSignOut(navigate) {
  try {
    await signOut();
    console.log("log out succesfull");
    navigate("/");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({ errorCode, errorMessage });
  }
}
export const handleAuthStateChange = () => {
  const data = onAuthStateChanged(auth, (user) => {
    if (user) {
      return { ...user };
    } else {
      return "User signed out";
    }
  });
  return data
};
