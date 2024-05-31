import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import db from "../store/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Auth = getAuth();

export const fetchQuestions = createAsyncThunk("play/start", (category) => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(Auth, async (user) => {
      if (user) {
        const uid = user.uid;
        // fetch question with the category and fetch sign-in user table data
        const docRef = doc(db, "questions", category);
        const docSnap = await getDoc(docRef);
        const tableRef = doc(db, "table", uid);
        const tableSnap = await getDoc(tableRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          const table = tableSnap.data();
          // firebase return object of keys and values so we
          // get the values into an array for the questions data
          const questions = Object.values(data);
          
          resolve({ questions, table });
        } else {
          reject("No such document!");
        }
      } else {
        reject("User not authenticated!");
      }
    });
  });
});


export const fetchLeadBord = createAsyncThunk("ranking", async () => {
  console.log(Auth.currentUser.displayName);
  //fetch all table data and this will return an array of data
  const querySnapshot = await getDocs(collection(db, "table"));
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  return new Promise((resolve, reject) => {
    if (data.length > 0) {
      resolve(data);
    } else {
      reject("No such document!");
    }
  });
});
