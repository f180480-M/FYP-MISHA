import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "fypweb-cf26e.firebaseapp.com",
  projectId: "fypweb-cf26e",
  storageBucket: "fypweb-cf26e.appspot.com",
  messagingSenderId: "19056241135",
  appId: "1:19056241135:web:3919a6a4386e6f3113ae1a"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);