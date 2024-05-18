import { doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import db from "../store/firebase";
import { getAuth } from "firebase/auth";
import { updatePhoto } from "../store/store";

const auth = getAuth();
const user = auth.currentUser;

export async function uploadImage(image,dispatchFn) {
  // Create a root reference
  const storage = getStorage();

  // Create a reference to 'userImage path'
  const imageRef = ref(storage, `usersImage/${image.name}`);

  // upload image to firebase storage and also get the url
  try {
    const uploadByte = await uploadBytes(imageRef, image);
    const getUrl = await getDownloadURL(uploadByte.ref);
    console.log(getUrl);
    //dispatch image url to user store, then send it together with user updatae data to firestore
    dispatchFn(updatePhoto())
  } catch (error) {
    console.log(error);
  }
  // uploadBytes(imageRef, image).then((snapshot) => {
  // getDownloadURL(snapshot.ref).then(url=>uploadImage(url))
  // });
}
export async function updatedUserData(data) {
  try {
    const washingtonRef = doc(db, "users", user.uid);
    // update user data
    await updateDoc(washingtonRef, data);
  } catch (error) {
    console.log(error);
  }
}
