import {
    doc,
    setDoc,
    getDoc,
    deleteDoc,
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
    const snapshot = await getDoc(
      doc(db, "users", userId)
    );
  
    if (!snapshot.exists()) {
      return null;
    }
  
    return snapshot.data();
  }

  export async function deleteUserProfile(
    userId: string
  ) {
    await deleteDoc(
      doc(db, "users", userId)
    );
  }