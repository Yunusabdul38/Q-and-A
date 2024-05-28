import { doc, updateDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import db from "../store/firebase";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { updatePhoto } from "../store/authUserSliceStore";
import { checkUserSignIn } from "../store/auth-checkUserSignIn";

const auth = getAuth();

export async function uploadData(data,dispatchFn) {
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
  const storageRef = ref(storage, `usersImage/${image?.name}`);
  const uploadTask = uploadBytesResumable(storageRef, image, metadata);
  if (!image && fullName) {
    await updateUserData(data);
    dispatchFn(checkUserSignIn(auth.currentUser))
  }
  console.log(data)
  // Listen for state changes, errors, and completion of the upload.
  if (image) {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        console.log(snapshot)
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          console.log(data)
          await updateUserData({ fullName, image: downloadURL });
          dispatchFn(checkUserSignIn(auth.currentUser))
        });
      }
    );
  }
}

export async function uploadImage(image, dispatchFn) {
  // Create a root reference
  const storage = getStorage();

  // Create a reference to 'userImage path'
  if (!image) return;
  const imageRef = ref(storage, `usersImage/${image?.name}`);

  // upload image to firebase storage and also get the url
  try {
    const uploadByte = await uploadBytes(imageRef, image);
    const getUrl = await getDownloadURL(uploadByte.ref);
    //dispatch image url to user store, then send it together with user updatae data to firestore
    await dispatchFn(updatePhoto(getUrl));
  } catch (error) {
    toast.error(
      "Looks like we encountered a glitch. Don't worry, it happens! Let's give it another shot."
    );
  }
}

export const updateUserData = async (data) => {
  if (data.fullName) {
    //update main user object in firebase with a new name
    await updateProfile(auth.currentUser, {
      displayName: data.fullName,
    });
  }
  const uid = auth.currentUser.uid;
  const updatedData = doc(db, "users", uid);
  // update user firstore data
  await updateDoc(updatedData, data);
  //update user table data
  await updateDoc(doc(db, "table", uid), data);
  toast.success("your data has been updated successfully");
};


export const updateLeadTable = createAsyncThunk(
  "leads/userdataUpdate",
  (data) => {
    onAuthStateChanged(auth, async (user) => {
      return new Promise((resolve, reject) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          const uid = user.uid;
          const updatedData = doc(db, "table", uid);
          // update user data
          updateDoc(updatedData, data);
          toast.success("your data has been updated successfully");
        } else {
          // docSnap.data() will be undefined in this case
          reject("No such document!");
          toast.error(
            "We're having trouble finding what you're looking for. Try refreshing the page or searching with different keywords."
          );
        }
      });
    });
  }
);
