import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import db from "../store/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";

const Auth = getAuth()
export const fetchQuestions = createAsyncThunk(
  "play/start",
  async (category) => {
    const uid = Auth.currentUser.uid
    // fetch question with the category and fetch sign in user table data
    const docRef = doc(db, "questions", category);
    const docSnap = await getDoc(docRef);
    const tableRef = doc(db, "table", uid);
    const tableSnap = await getDoc(tableRef);
    
    return new Promise((resolve, reject) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const table = tableSnap.data()
        // firebase return object of keys and values so we
        // get the values in to array for the questins data
        const questions = Object.values(data);

        resolve({questions,table});
      } else {
        // docSnap.data() will be undefined in this case
        reject("No such document!");
      }
    });
  }
);

export const fetchLeadBord = createAsyncThunk("ranking", async () => {
  //fetch all table data and this will return an array of data
  const querySnapshot = await getDocs(collection(db, "table"));
  let data =[]
  querySnapshot.forEach((doc) => {
    data.push(doc.data())
  });
 
  return new Promise((resolve, reject) => {
    if (data.length >0) {
      resolve(data);
    } else {
      reject("No such document!");
    }
  });
});
