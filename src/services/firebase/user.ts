import {
    doc,
    setDoc,
    getDoc,
  } from "firebase/firestore";
  
  import { db } from "./firebase";
  
  export async function saveUserPreferences(
    userId: string,
    careerFields: string[],
    languages: string[]
  ) {
    await setDoc(
      doc(db, "users", userId),
      {
        careerFields,
        languages,
        updatedAt: new Date(),
      },
      {
        merge: true,
      }
    );
  }
  
  export async function getUserProfile(
    userId: string
  ) {
    const userDoc = await getDoc(
      doc(db, "users", userId)
    );
  
    if (userDoc.exists()) {
      return userDoc.data();
    }
  
    return null;
  }