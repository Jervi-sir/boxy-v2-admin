import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCM_wS47P5iShZGSTJwFO6HNWduKubTAHE",
    authDomain: "boxy-7f1ba.firebaseapp.com",
    projectId: "boxy-7f1ba",
    storageBucket: "boxy-7f1ba.appspot.com",
    messagingSenderId: "205377736356",
    appId: "1:205377736356:web:14638563216608303c6031"
  };
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
  
export default db