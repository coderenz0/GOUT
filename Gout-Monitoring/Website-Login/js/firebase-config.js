import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";


const firebaseConfig = {

    apiKey: "AIzaSyDhLIFjFfRLEoTv4fIec039YE7n73PIGgw",

    authDomain: "gout-monitoring.firebaseapp.com",

    databaseURL: "https://gout-monitoring-default-rtdb.firebaseio.com",

    projectId: "gout-monitoring",

    storageBucket: "gout-monitoring.firebasestorage.app",

    messagingSenderId: "92536603893",

    appId: "1:92536603893:web:cb65cb3ab0213fe46d31bc",

    measurementId: "G-GY2Y97H9QF"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);


// Firebase Authentication

export const auth = getAuth(app);


// Cloud Firestore

export const db = getFirestore(app);
