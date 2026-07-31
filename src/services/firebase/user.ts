import {
    doc,
    setDoc,
    getDoc,
  } from "firebase/firestore";
  
  import { db } from "./firebase";
  
  
  export async function saveUserPreferences(
    userId: string,
    languages: string[]
  ) {
  
    await setDoc(
      doc(db, "users", userId),
      {
        selectedLanguages: languages,
        updatedAt: new Date(),
      },
      {
        merge: true,
      }
    );
  
  }
  
  
  export async function getUserPreferences(
    userId: string
  ) {
  
    const userDoc = await getDoc(
      doc(db, "users", userId)
    );
  
  
    if(userDoc.exists()) {
  
      return userDoc.data();
  
    }
  
  
    return null;
  
  }