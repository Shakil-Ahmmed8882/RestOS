// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBArGH8i_ALxw3xmgESpRZa-ieseHlm3yg",
  authDomain: "restos-748ac.firebaseapp.com",
  projectId: "restos-748ac",
  storageBucket: "restos-748ac.appspot.com",
  messagingSenderId: "191017248972",
  appId: "1:191017248972:web:416b5f00591ce42c39fa69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 
export const auth = getAuth(app);

