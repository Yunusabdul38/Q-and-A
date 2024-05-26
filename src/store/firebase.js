import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDF6yOb_qKFBPzU_z4rCLvrbOSyRx2KCko",
  authDomain: "react-q-and-a.firebaseapp.com",
  projectId: "react-q-and-a",
  storageBucket: "react-q-and-a.appspot.com",
  messagingSenderId: "899388373511",
  appId: "1:899388373511:web:07474c58953f5895d1c8a2",
  measurementId: "G-S04FL9MRC1"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()
//const analytics = getAnalytics(app);

export default db