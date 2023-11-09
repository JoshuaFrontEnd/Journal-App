// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from "../helpers/getEnvironments";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const env = getEnvironments();

console.log( env );

// console.log( process.env );
// console.log( import.meta.env );

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCrxiQxey_9D46uVleebGE8O8Z7_E1jIWc",
//   authDomain: "react-tests-bb07e.firebaseapp.com",
//   projectId: "react-tests-bb07e",
//   storageBucket: "react-tests-bb07e.appspot.com",
//   messagingSenderId: "594202988967",
//   appId: "1:594202988967:web:0e709f56cc00307d232682"
// };

// Testing
const firebaseConfig = {
  apiKey: "AIzaSyBxDlFdkFqgf7iTArKUuujRWbuqoY1_754",
  authDomain: "database-tests-75042.firebaseapp.com",
  projectId: "database-tests-75042",
  storageBucket: "database-tests-75042.appspot.com",
  messagingSenderId: "423532176276",
  appId: "1:423532176276:web:47649014ae35ab9120a581"
};

// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );

// Seteando la autentificación
export const FirebaseAuth = getAuth( FirebaseApp );

// Seteando la base de datos
export const FirebaseDB = getFirestore( FirebaseApp );

