import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import db from "./firebase";
const auth = getAuth();

export async function userSignUp(email, password, fullName, navigate, reset) {
  try {
    // creating user function in firbase with email and password
    const setup = await createUserWithEmailAndPassword(auth, email, password);
    const user = setup.currentUser;

    //update user information
    await updateProfile(auth.currentUser, { displayName: fullName });
    // a user data copy to push to firestore without password
    const { displayName, email } = user;
    const userDataCopy = { fullName: displayName, email };
    console.log(user);
    // setting a timestamp for the precise time of user data creation using firebase
    //serverTimestamp function
    userDataCopy.timeStamp = serverTimestamp();

    // sending the copy user data to firestore if condition set in firestore for authentication
    // is true
    await setDoc(doc(db, "users", user.uid), userDataCopy);
    reset();
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

export async function userSignIn(data, navigate) {
  const { Email, Password } = data;
  try {
    await signInWithEmailAndPassword(auth, Email, Password);
    console.log("welcome to back");
    navigate("/");
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
    console.log("log out succesfull")
    navigate("/")
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({ errorCode, errorMessage });
  }
}
