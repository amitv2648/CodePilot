import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAG7g1KNt612rilaPVrpIrknGTs5ox5FUg",
  authDomain: "codepilot-2026.firebaseapp.com",
  projectId: "codepilot-2026",
  storageBucket: "codepilot-2026.firebasestorage.app",
  messagingSenderId: "743030980013",
  appId: "1:743030980013:web:0b4e419313b24a68edf524",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);