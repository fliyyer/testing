/* eslint-disable no-use-before-define */
// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import "firebase/compat/auth";
import "firebase/compat/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const app = firebase.initializeApp({
  apiKey: "AIzaSyDKHeF1GMN_eTInfToTyBBClPwtMsjd2t8",
  authDomain: "rekap-a537c.firebaseapp.com",
  projectId: "rekap-a537c",
  storageBucket: "rekap-a537c.appspot.com",
  messagingSenderId: "308297367410",
  appId: "1:308297367410:web:9f2e3b4d258211c60827eb",
  measurementId: "G-2X26JL0ND5"
});
// Initialize Firebase
export const db = firebase.firestore();
export const auth = app.auth();
export default app;