import firebase from "firebase/app";

import "firebase/firestore";

//Step 1
import "firebase/auth"

import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyA91u5uTOQVNNaUzfB0Vkk9uGEaPZKyCTA",
    authDomain: "reels-2e48f.firebaseapp.com",
    projectId: "reels-2e48f",
    storageBucket: "reels-2e48f.appspot.com",
    messagingSenderId: "766372593622",
    appId: "1:766372593622:web:7fbc8c2e33bc21e6932e77"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

//Step 2
export const auth = firebase.auth();

export const storage = firebase.storage();

//Step 3=> firebase console; enable google login in auth panel

//Step 4
let provider = new firebase.auth.GoogleAuthProvider()

export const signInWithGoogle = () => auth.signInWithPopup(provider)


export default firebase;