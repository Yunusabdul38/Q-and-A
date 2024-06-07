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
import { checkUserSignIn } from "../store/auth-checkUserSignIn";

const auth = getAuth();

export async function uploadData(data, dispatchFn) {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (!data.image.length && !data.fullName) {
          toast.error("empty data");
          reject("rejected");
          return;
        }
        const storage = getStorage();
        const { image, fullName } = data;

        // Create the file metadata
        const metadata = {
          contentType: "image/jpeg",
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, `usersImage/${image[0]?.name}`);

        // if image is empty
        if (!image.length && fullName) {
          await updateUserData({ fullName });
          //dispatch the function to make use of the user loading state
          dispatchFn(checkUserSignIn(user));
          resolve("user is authenticated");
        }
        // upload image to firebase storage
        if (image.length > 0) {
          const uploadTask = uploadBytesResumable(
            storageRef,
            image[0],
            metadata
          );
          uploadTask.on(
            "state_changed",
            null,
            (error) => {
              // error uploading image
              switch (error.code) {
                case "storage/unauthorized":
                  // User doesn't have permission to access the object
                  toast.error(
                    "User doesn't have permission to access the object"
                  );
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
              //image Upload completed successfully, now we can get the download URL
              getDownloadURL(uploadTask.snapshot.ref).then(
                async (downloadURL) => {
                  await updateUserData({
                    fullName: fullName ? fullName : user.displayName,
                    image: downloadURL,
                  });
                   //dispatch the function to make use of the user loading state
                  dispatchFn(checkUserSignIn(user));
                  resolve("user is authenticated");
                }
              );
            }
          );
        }
      } else {
        reject("unauthenticated user");
      }
    });
  });
}

export const updateUserData = (data) => {
  return new Promise((resolve, reject) => {
    // get currect signed in user to update their firestore data,
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        //update main user object in firebase with a new name
        if (data.fullName) {
          await updateProfile(user, {
            displayName: data.fullName,
          });
        }
        const uid = user.uid;
        const updatedData = doc(db, "users", uid);
        // update user firstore data
        await updateDoc(updatedData, data);
        //update user table with the same data
        const docRef = doc(db, "table", uid);
        const docSnapshot = await getDoc(docRef);
        // Check if the document exists
        if (docSnapshot.exists()) {
          // If the document exists, update it with the new data
          const updatedData = doc(db, "table", uid);
          // update user table firstore data
          await updateDoc(updatedData, data);
        }
        toast.success("your data has been updated successfully");
        resolve("user is authenticated");
      } else {
        reject("unauthenticated user");
      }
    });
  });
};

export const updateOrCreateLeadTable = (data) => {
  // get currect signed in user to update their table data,
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        //  current signed in user uid,
        const uid = user.uid;
        // Construct the document path using the provided user UID
        const docRef = doc(db, "table", uid);
        const docSnapshot = await getDoc(docRef);
        // Check if the document exists
        if (docSnapshot.exists()) {
          // If the document exists, update it with the new data
          const updatedData = doc(db, "table", uid);
          // update user table firstore data
          await updateDoc(updatedData, data);
          toast.success("your data has been updated successfully");
          resolve("user is authenticated");
        } else {
          // If the document doesn't exist, create it with the new data
          await setDoc(doc(db, "table", uid), data);
          toast.success("your data has been updated successfully");
          resolve("user is authenticated");
        }
      } else {
        reject("unauthenticated user");
      }
    });
  });
};
