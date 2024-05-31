import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import db from "../store/firebase";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkUserSignIn } from "../store/auth-checkUserSignIn";

const auth = getAuth();

export function uploadData(data, dispatchFn) {
  onAuthStateChanged(auth, async (user) => {
    if (!data.image && !data.fullName) {
      toast.error("empty data");
      return;
    }
    if (!data.fullName) delete data.fullName;
    if (!data.image) delete data.image;

    const storage = getStorage();
    const { image, fullName } = data;
    // Create the file metadata
    const metadata = {
      contentType: "image/jpeg",
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, `usersImage/${image[0]?.name}`);
    if (!image && fullName) {
      updateUserData(data);
      dispatchFn(checkUserSignIn(user));
    }
    // Listen for state changes, errors, and completion of the upload.
    if (image.length > 0) {
      const uploadTask = uploadBytesResumable(storageRef, image[0], metadata);
      console.log("img", image, uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          toast.loading("image Upload is " + progress + "% done");
          console.log(snapshot);
          switch (snapshot.state) {
            case "paused":
              toast.error("Upload is paused");
              break;
            case "running":
              toast.loading("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              toast.error("User doesn't have permission to access the object");
              break;
            case "storage/canceled":
              // User canceled the upload
              toast.error(" User canceled the upload");
              break;
            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              toast.error(
                "We're having trouble finding what you're looking for. Try refreshing the page or searching with different keywords."
              );
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            updateUserData({ fullName, image: downloadURL });
            dispatchFn(checkUserSignIn(auth.currentUser));
          });
        }
      );
    }
  });
  //dispatchFn(idle())
}

export const updateUserData = (data) => {
  onAuthStateChanged(auth, async (user) => {
    if (data.fullName) {
      //update main user object in firebase with a new name
      await updateProfile(user, {
        displayName: data.fullName,
      });
    }
    const uid = user.uid;
    const updatedData = doc(db, "users", uid);
    // update user firstore data
    await updateDoc(updatedData, data);
    //update user table with the same data
    await updateDoc(doc(db, "table", uid), data);
    toast.success("your data has been updated successfully");
  });
};

export const updateOrCreateLeadTable = async (data) => {
  // get currect signed in user to update their table data,
  onAuthStateChanged(auth, async (user) => {
    toast.loading("updating data......");
    //  current signed in user uid,
    const uid = user.uid;
    console.log(user.displayName);
    // Construct the document path using the provided user UID
    const docRef = doc(db, "table", uid);
    // Check if the document exists
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      // If the document exists, update it with the new data
      const updatedData = doc(db, "table", uid);
      // update user table firstore data
      await updateDoc(updatedData, data);
      toast.success("your data has been updated successfully");
    } else {
      // If the document doesn't exist, create it with the new data
      await setDoc(doc(db, "table", uid), data);
      toast.success("your data has been updated successfully");
    }
  });
};
export const updateLeadTable = createAsyncThunk(
  "leads/userdataUpdate",
  (data) => {
    onAuthStateChanged(auth, async (user) => {
      return new Promise((resolve, reject) => {
        if (data) {
          // User is signed in, see docs for a list of available properties
          const uid = user.uid;
          const updatedData = doc(db, "table", uid);
          // update user data
          updateDoc(updatedData, data);
          resolve(data);
          toast.success("your data has been updated successfully");
        } else {
          // user is undefined in this case
          reject("No such document!");

          toast.error(
            "We're having trouble finding what you're looking for. Try refreshing the page or searching with different keywords."
          );
        }
      });
    });
  }
);
