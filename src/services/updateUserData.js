import { doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import db from "../store/firebase";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { updatePhoto } from "../store/store";
import toast from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";

const auth = getAuth();

export async function uploadImage(image, dispatchFn) {
  // Create a root reference
  const storage = getStorage();

  // Create a reference to 'userImage path'
  const imageRef = ref(storage, `usersImage/${image.name}`);

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
    console.log(error);
  }
}
// export async function updatedUserData(data) {
//   try {
//     const updatedData = doc(db, "users", user.uid);
//     // update user data
//     await updateDoc(updatedData, data);
//      toast.success("your data has been updated successfully")
//   } catch (error) {
//     toast.error(
//       "Looks like we encountered a glitch. Don't worry, it happens! Let's give it another shot."
//     );
//     console.log(error)
//   }
// }
export const  updatedUserData = createAsyncThunk(
  "auth/userdataUpdate",
  async (data) => {
    if (data.fullName) {
      updateProfile(auth.currentUser, {
        displayName: data.fullName,
      });
    }
    const uid = auth.currentUser.uid
    const updatedData = doc(db, "users", uid);
    return new Promise((resolve, reject) => {
      if (data.fullName || data.image) {
         // update user data
         updateDoc(updatedData, data);
         updateDoc(doc(db, "table", uid,), data);
         resolve("done");
         toast.success("your data has been updated successfully");
      } else {
        // docSnap.data() will be undefined in this case
        reject("No such document!");
        toast.error(
          "We're having trouble finding what you're looking for. Try refreshing the page or searching with different keywords."
        );
      }
    });
  }
);

// export const updatedUserData = createAsyncThunk("userdataUpdate", (data) => {
//   onAuthStateChanged(auth, async (user) => {
//     return new Promise((resolve, reject) => {
//       if (user) {
//         if (data.fullName) {
//           updateProfile(auth.currentUser, {
//             displayName: data.fullName,
//           });
//         }
//         const uid = user.uid;
//         const updatedData = doc(db, "users", uid);
//         // update user data
//         updateDoc(updatedData, data);
//         updateDoc(doc(db, "table/userScore", uid), data);
//         resolve(user);
//         toast.success("your data has been updated successfully");
//       } else {
//         // docSnap.data() will be undefined in this case
//         reject("No such document!");
//         toast.error(
//           "We're having trouble finding what you're looking for. Try refreshing the page or searching with different keywords."
//         );
//       }
//     });
//   });
// });

// export async function updatedUserData(data) {
//   try {
//     onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         await updateProfile(auth.currentUser, {
//           displayName: data.fullName,
//         });
//         const uid = user.uid;
//         const updatedData = doc(db, "users", uid);
//         // update user data
//         await updateDoc(updatedData, data);
//         toast.success("your data has been updated successfully");
//       }
//     });
//   } catch (error) {
//     toast.error(
//       "Looks like we encountered a glitch. Don't worry, it happens! Let's give it another shot."
//     );
//   }
// }

// export async function updateLeadTable(data) {
//   try {
//     onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         // User is signed in, see docs for a list of available properties
//         const uid = user.uid;
//         const updatedData = doc(db, "table", uid);
//         // update user data
//         await updateDoc(updatedData, data);
//         toast.success("your data has been updated successfully");
//       }
//     });
//   } catch (error) {
//     toast.error(
//       "Looks like we encountered a glitch. Don't worry, it happens! Let's give it another shot."
//     );
//   }
// }

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
