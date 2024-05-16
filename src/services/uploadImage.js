import { getStorage, ref, uploadBytes,getDownloadURL  } from "firebase/storage";

export function uploadImage(image) {
    console.log(image)
  // Create a root reference
  const storage = getStorage();

  // Create a reference to 'userImage path'
  const imageRef = ref(storage, `usersImage/${image.name}`);

  // upload image to firebase storage and also get the url
  uploadBytes(imageRef, image).then((snapshot) => {
    getDownloadURL(snapshot.ref).then(url=>console.log(url))
  });
}
