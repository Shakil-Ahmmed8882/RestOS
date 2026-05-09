import { baseApi } from "@/redux/featureApi/baseApi";
import { API_CACHE_TAGS } from "@/cache/API_CACHE_KEY";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
  photo?: File;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
  userId: string;
}

export interface AuthResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user?: {
      userId: string;
      name: string;
      email: string;
      role: string;
      photo: string;
    };
  };
}

// Login with email and password, stores access token for authenticated requests
const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<AuthResponse, LoginPayload>({
      query: (data) => ({ url: "/auths/login", method: "POST", body: data }),
      invalidatesTags: [API_CACHE_TAGS.AUTH_ME],
    }),
    // Register new user with optional photo upload, returns tokens and user data
    registerUser: builder.mutation<AuthResponse, SignUpPayload>({
      query: (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        if (data.photo) formData.append("photo", data.photo);
        return { url: "/auths/register", method: "POST", body: formData };
      },
      invalidatesTags: [API_CACHE_TAGS.AUTH_ME],
    }),
    // Request password reset link via email, sends reset token to user's inbox
    forgotPassword: builder.mutation<
      { statusCode: number; success: boolean; message: string; data: null },
      ForgotPasswordPayload
    >({
      query: (data) => ({ url: "/auths/forget-password", method: "POST", body: data }),
    }),
    // Reset password using token from email link, updates password in database
    resetPassword: builder.mutation<
      { statusCode: number; success: boolean; message: string; data: null },
      ResetPasswordPayload
    >({
      query: (data) => ({ url: "/auths/reset-password", method: "POST", body: data }),
    }),
    refreshToken: builder.mutation<AuthResponse, void>({
      query: () => ({ url: "/auths/refresh-token", method: "POST" }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
} = authApi;
export default authApi;
