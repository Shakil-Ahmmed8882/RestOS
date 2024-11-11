import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define Profile types
type ProfileData = {
  name: string;
  contactNumber: string;
  location: string;
  bio: string;
  cuisinePreferences: string[];
  favoriteRestaurants: string[];
  dietaryRestrictions: string[];
  diningFrequency: string;
  preferredMealTimes: string[];
  paymentMethods: string[];
  instagram?: string;
  facebook?: string;
  twitter?: string;
  photo: string;
  role: string;
  status: string;
  email: string;
  socialMedia: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  _id: string;
  __v: number;
};

// Define the initial state type
interface ProfileState {
  profileData: ProfileData;
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProfileState = {
  profileData: {
    name: "",
    contactNumber: "",
    location: "",
    bio: "",
    cuisinePreferences: [],
    favoriteRestaurants: [],
    dietaryRestrictions: [],
    diningFrequency: "",
    preferredMealTimes: [],
    paymentMethods: [],
    instagram: "",
    facebook: "",
    twitter: "",
    photo: "",
    role: "",
    status: "",
    email: "",
    socialMedia: {},
    _id: "",
    __v: 0,
  },
  isLoading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // Action to set profile data and reset existing fields
    setProfileData: (state, action: PayloadAction<ProfileData>) => {
      // Reset all fields before setting new profile data
      state.profileData = { ...initialState.profileData, ...action.payload };
    },

  },
});

export const { setProfileData } = profileSlice.actions;
export default profileSlice.reducer;
