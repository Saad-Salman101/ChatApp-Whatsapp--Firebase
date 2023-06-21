import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAB_5ZYOceMRbRKuwxg9MsU4HceKx9jbpc",
  authDomain: "quizapp-656ba.firebaseapp.com",
  databaseURL: "https://quizapp-656ba-default-rtdb.firebaseio.com",
  projectId: "quizapp-656ba",
  storageBucket: "quizapp-656ba.appspot.com",
  messagingSenderId: "672480787939",
  appId: "1:672480787939:web:fbefa067aa41e72641b4d6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
