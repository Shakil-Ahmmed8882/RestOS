"use client";

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type UserCredential,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";

export async function signInWithEmail(email: string, password: string): Promise<UserCredential> {
  return signInWithEmailAndPassword(getFirebaseAuth(), email, password);
}

export async function signUpWithEmail(email: string, password: string): Promise<UserCredential> {
  return createUserWithEmailAndPassword(getFirebaseAuth(), email, password);
}

export async function signInWithGoogle(): Promise<UserCredential> {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(getFirebaseAuth(), provider);
}

export async function updateFirebaseUser(name: string, photoURL: string): Promise<void> {
  const auth = getFirebaseAuth();
  if (auth.currentUser) await updateProfile(auth.currentUser, { displayName: name, photoURL });
}

export async function signOutFirebase(): Promise<void> {
  return signOut(getFirebaseAuth());
}
