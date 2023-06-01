// import initializeApp from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {getFirestore} from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";

const firebaseConfigApp = {
    apiKey: "AIzaSyDJe8EP_101DOf2Nmk9SAR19UdAgIYz_Z4",
    authDomain: "records-712da.firebaseapp.com",
    databaseURL: "https://records-712da-default-rtdb.firebaseio.com",
    projectId: "records-712da",
    storageBucket: "records-712da.appspot.com",
    messagingSenderId: "390500665666",
    appId: "1:390500665666:web:bebb4d8548cd524b4a20db",
    measurementId: "G-QP0Q5MPVS0"
};



// if (window.location.hostname === "localhost") { 
// connectAuthEmulator(auth, "http://localhost:9099"); 
// connectFirestoreEmulator(db, "localhost", 8080) }

 !getApps().length && initializeApp(firebaseConfigApp);
getApps()



export const auth = getAuth();
export const firestore = getFirestore();