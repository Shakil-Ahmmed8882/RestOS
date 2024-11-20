// src/store/authSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { JwtPayload } from "jwt-decode";

// User interface
export interface TUser {
  userId: string;
  name: string;
  email: string;
  role: string;
  photo: string;
  iat: number;
  exp: number;
}

// AuthState interface
interface AuthState {
  user: TUser | null;
  token: string | null;
}

// Define the initial state with proper type
const initialState: AuthState = {
  user: null,
  token: null,
};

// Create the authSlice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

// Export actions
export const { setUser, logout } = authSlice.actions;

// Selector to get user from state
export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;

// Export the reducer
export default authSlice.reducer;
