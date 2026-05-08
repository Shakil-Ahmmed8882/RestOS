"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials, type AuthUser } from "@/redux/slices/authSlice";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  type LoginPayload,
  type SignUpPayload,
  type ForgotPasswordPayload,
  type ResetPasswordPayload,
} from "@/redux/featureApi/authApi";
import { verifyToken } from "@/lib/verifyToken";

export function useAuth() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loginUser, loginState] = useLoginUserMutation();
  const [registerUser, registerState] = useRegisterUserMutation();
  const [forgotPassword, forgotState] = useForgotPasswordMutation();
  const [resetPassword, resetState] = useResetPasswordMutation();

  const writeAccessTokenCookie = (token: string) => {
    if (typeof document === "undefined") return;
    document.cookie = `accessToken=${token}; path=/; max-age=${60 * 60 * 24}`;
    if (typeof window !== "undefined") window.localStorage.setItem("accessToken", token);
  };

  const handleLoginSuccess = (accessToken: string, name: string) => {
    const decoded = verifyToken(accessToken);
    if (decoded) {
      const user: AuthUser = {
        id: decoded.userId,
        email: decoded.email,
        name: decoded.name || name,
        role: decoded.role,
        photoURL: decoded.photo ?? null,
      };
      dispatch(setCredentials({ user, token: accessToken }));
      writeAccessTokenCookie(accessToken);
      return user;
    }
    return null;
  };

  return {
    // Login mutation
    login: async (payload: LoginPayload) => {
      try {
        const response = await loginUser(payload).unwrap();
        if (response.success && response.data.accessToken) {
          const user = handleLoginSuccess(response.data.accessToken, "");
          if (user) router.push("/user/dashboard");
          return { success: true, data: response.data };
        }
      } catch (error: any) {
        return { success: false, error: error?.data?.message || error?.message || "Login failed" };
      }
    },

    // Register mutation
    register: async (payload: SignUpPayload) => {
      try {
        const response = await registerUser(payload).unwrap();
        if (response.success && response.data.accessToken && response.data.user) {
          const user = handleLoginSuccess(response.data.accessToken, payload.name);
          if (user) router.push("/user/dashboard");
          return { success: true, data: response.data };
        }
      } catch (error: any) {
        return { success: false, error: error?.data?.message || error?.message || "Registration failed" };
      }
    },

    // Forgot password mutation
    requestPasswordReset: async (payload: ForgotPasswordPayload) => {
      try {
        const response = await forgotPassword(payload).unwrap();
        if (response.success) {
          return { success: true, email: payload.email };
        }
      } catch (error: any) {
        return { success: false, error: error?.data?.message || error?.message || "Request failed" };
      }
    },

    // Reset password mutation
    resetUserPassword: async (payload: ResetPasswordPayload) => {
      try {
        const response = await resetPassword(payload).unwrap();
        if (response.success) {
          return { success: true };
        }
      } catch (error: any) {
        return { success: false, error: error?.data?.message || error?.message || "Reset failed" };
      }
    },

    // Loading states
    isLoading: loginState.isLoading || registerState.isLoading || forgotState.isLoading || resetState.isLoading,
    loginLoading: loginState.isLoading,
    registerLoading: registerState.isLoading,
    forgotLoading: forgotState.isLoading,
    resetLoading: resetState.isLoading,
  };
}
