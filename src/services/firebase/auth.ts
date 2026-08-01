import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    deleteUser,
    sendPasswordResetEmail,
  } from "firebase/auth";
  
  import { auth } from "./firebase";
  
  const googleProvider = new GoogleAuthProvider();
  
  export const signup = (
    email: string,
    password: string
  ) => {
    return createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  };
  
  export const login = (
    email: string,
    password: string
  ) => {
    return signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  };
  
  export const googleLogin = () => {
    return signInWithPopup(
      auth,
      googleProvider
    );
  };
  
  export const logout = () => {
    return signOut(auth);
  };

  export const deleteAccount = () => {
    if (!auth.currentUser) {
      throw new Error("No authenticated user was found.");
    }

    return deleteUser(auth.currentUser);
  };
  
  export const resetPassword = (
    email: string
  ) => {
    return sendPasswordResetEmail(
      auth,
      email
    );
  };