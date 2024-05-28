import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import db from "./firebase";
import { checkUserSignIn } from "./auth-checkUserSignIn";
import toast from "react-hot-toast";
import { end } from "./playSliceStore";
import { logUserOut } from "./authUserSliceStore";


const auth = getAuth();
export async function userSignUp(Email, password, fullName, dispatch) {
  try {
    // creating user with email and password
    const setup = await createUserWithEmailAndPassword(auth, Email, password);
    const USER = setup.user;

    //update user information
    await updateProfile(auth.currentUser, {
      displayName: fullName,
    });
    // a user data copy to push to firestore without password
    const { displayName, email } = USER;
    const userDataCopy = { fullName: displayName, email };
    // setting a timestamp for the precise time of user data creation using firebase
    //serverTimestamp function
    userDataCopy.timeStamp = serverTimestamp();
    // sending the copy user data to firestore if condition set in firestore for authentication is true
    await setDoc(doc(db, "users", USER.uid), userDataCopy);
    // if sign in is successfull store user data in redux store and give user access to the app
    await dispatch(checkUserSignIn(USER));
    toast.success(`nice to have you here ${displayName}`);
  } catch (error) {
    // email address already exist
    if (error.code === "auth/account-exists-with-different-credential") {
      return toast.error(
        "User's email already exists, try signing up or use a different email"
      );
    }
    if(error.code === "auth/email-already-in-use"){
      return toast.error(
        "The provided email is already in use by an existing use"
      );
    }
    // if password or email in not valid with the authenticated users in firebase
    if (error.code === "auth/invalid-credential") {
      return toast.error(
        "Whoops! It looks like your login credentials are incorrect. Double-check your username and password and try again.",
        { duration: 8000 }
      );
    }
    // network failure
    if (error.code === "auth/network-request-failed") {
      return toast.error(
        "No internet connection detected. You might need to connect to Wi-Fi or check your mobile data.",
        { duration: 8000 }
      );
    }
    //general error messsage
    toast.error(
      "Looks like we encountered a glitch. Don't worry, it happens! Let's give it another shot."
    );
  }
}

export async function userSignIn(data, dispatch) {
  const { email, password } = data;
  try {
    // sign user in with email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // if sign in is successfull store user data in redux store and give user access to the app
    await dispatch(checkUserSignIn(userCredential.user));
    toast.success(
      `welcome back ${userCredential.user.displayName.toUpperCase()} 🤗`
    );
  } catch (error) {
    // if password or email in not valid with the authenticated users in firebase
    if (error.code === "auth/invalid-credential") {
      return toast.error(
        "Whoops! It looks like your login credentials are incorrect. Double-check your username and password and try again.",
        { duration: 8000 }
      );
    }
    // network failure
    if (error.code === "auth/network-request-failed") {
      return toast.error(
        "No internet connection detected. You might need to connect to Wi-Fi or check your mobile data.",
        { duration: 8000 }
      );
    }
    //general error messsage
    toast.error(
      "Looks like we encountered a glitch. Don't worry, it happens! Let's give it another shot."
    );
  }
}

// sign user out
export async function userSignOut(dispatch) {
  try {
    await signOut(auth);
    dispatch(logUserOut());
    dispatch(end());
    toast.success("log out succesfull")
  } catch (error) {
    // network failure
    if (error.code === "auth/network-request-failed") {
      return toast.error(
        "We couldn't connect to complete logging you logout. Check your internet connection and try again."
      );
    }
    //general error messsage
    toast.error(
      "Logout unsuccessful. We're checking into this. Please try logging out again in a moment.Logout unsuccessful. We're checking into this. Please try logging out again in a moment."
    );
  }
}