import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Config/🔥 firebase.config";


// types.ts (or at the top of your file)

const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext<any| null>(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // || CREATE USER
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // GOOGLE SIGN-IN
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //LOGIN USER
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // SIGN out
  const logOut = () => {
    setLoading(true); //
    return signOut(auth);
  };

  // TRACK THE USER'S AUTHENTICATION STATUS
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // @ts-ignore
        setUser(currentUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // UPDATE USER INFORMATION
  const updateUserInfo = (name, photoURL) => {
    const user = auth.currentUser;

    if (user !== null) {
      return updateProfile(user, {
        displayName: name,
        photoURL: photoURL});
    }
  };

  // || DEFINING USER INFORMATION
  const userInfo = {
    createUser,
    user,
    login,
    logOut,
    googleSignIn,
    loading,
    updateUserInfo,
  };

  return (
    // @ts-ignore
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
