export type TUserSocialMedia = {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
};

export type TUserDetail = {
  _id: string;
  name: string;
  email: string;
  photo?: string;
  role?: string;
  status?: string;
  bio?: string;
  location?: string;
  contactNumber?: string;
  diningFrequency?: string;
  cuisinePreferences?: string[];
  favoriteRestaurants?: string[];
  dietaryRestrictions?: string[];
  preferredMealTimes?: string[];
  paymentMethods?: string[];
  socialMedia?: TUserSocialMedia;
  createdAt?: string;
  updatedAt?: string;
};

export type TUserProduction = {
  id: string;
  title: string;
  artist: string;
  timing: string;
  listenings: string;
  cover?: string;
};
