import { doc, setDoc } from "firebase/firestore";
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