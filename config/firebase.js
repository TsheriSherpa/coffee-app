

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyCPI0I-NprkFw4t-e3VcTiDCDfRkzzpm4M",
    authDomain: "analytics-360ef.firebaseapp.com",
    projectId: "analytics-360ef",
    storageBucket: "analytics-360ef.appspot.com",
    messagingSenderId: "806407107031",
    appId: "1:806407107031:web:6c6a4b731724c30e9d1b92",
    measurementId: "G-KTMKBJZRNL"
};

// initialize Firebase App
const app = initializeApp(firebaseConfig);




const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
}) ;


const database = getFirestore(app);

export {app, auth, database };