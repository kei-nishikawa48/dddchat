import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA55TJVqoN2Euj5zzeyF0M1G2UA5FGLrns",
  authDomain: "dddchat-3701b.firebaseapp.com",
  projectId: "dddchat-3701b",
  storageBucket: "dddchat-3701b.appspot.com",
  messagingSenderId: "882483634894",
  appId: "1:882483634894:web:c5166073ac89cfd035e69f",
  measurementId: "G-ESQJKGFYX9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export default app;
