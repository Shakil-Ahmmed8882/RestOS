// types.ts (or at the top of your file)
import { User } from "firebase/auth";

export interface AuthContextType {
  createUser: (email: string, password: string) => Promise<void>;
  user: User | null; // Firebase user or null
  login: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  googleSignIn: () => Promise<void>;
  loading: boolean;
  updateUserInfo: (name: string, photoURL: string) => Promise<void | undefined>;
}
