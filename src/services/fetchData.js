import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import db from "../store/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const fetchQ = async () => {
  const docRef = doc(db, "questions", "random");
  //const docRef2 = doc(db, "users");
  //console.log(docRef2)
  const docSnap = await getDoc(docRef);
  let questions;
  if (docSnap.exists()) {
    const data = docSnap.data();
    // firebase return object of keys and values so we
    // get the values in to array
    questions = Object.values(data);
  }
  return questions;
};
export const fetchQuestions = createAsyncThunk(
  "play/start",
  async (category) => {
    const docRef = doc(db, "questions", category);
    const docSnap = await getDoc(docRef);
    return new Promise((resolve, reject) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        // firebase return object of keys and values so we
        // get the values in to array
        const questions = Object.values(data);
        resolve(questions);
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

export const fetchLeadBord = createAsyncThunk("ranking", async () => {
  const querySnapshot = await getDocs(collection(db, "table"));
  let data =[]
  querySnapshot.forEach((doc) => {
    data.push(doc.data())
    console.log(doc.id, " => ", doc.data());
  });
 
  return new Promise((resolve, reject) => {
    if (data.length >0) {
      console.log(data);
      resolve(data);
    } else {
      reject("No such document!");
      toast.error(
        "We're having trouble finding what you're looking for. Try refreshing the page or searching with different keywords."
      );
    }
  });
});
