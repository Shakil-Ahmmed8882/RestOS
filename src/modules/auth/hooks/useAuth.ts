"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials, clearCredentials, type AuthUser } from "@/redux/slices/authSlice";
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
import { USER_ROLE } from "@/constants/roles";

export function useAuth() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loginUser, loginState] = useLoginUserMutation();
  const [registerUser, registerState] = useRegisterUserMutation();
  const [forgotPassword, forgotState] = useForgotPasswordMutation();
  const [resetPassword, resetState] = useResetPasswordMutation();

  // Set access token as a non-httpOnly cookie (required for Next.js middleware) with security flags.
  const writeAccessTokenCookie = (token: string) => {
    if (typeof document === "undefined") return;
    const isSecure = window.location.protocol === "https:";
    document.cookie = [
      `accessToken=${token}`,
      "path=/",
      `max-age=${60 * 60 * 24}`, // 24 hours
      "SameSite=Strict",
      isSecure ? "Secure" : "",
    ]
      .filter(Boolean)
      .join("; ");
  };

  const clearAccessTokenCookie = () => {
    if (typeof document === "undefined") return;
    document.cookie = "accessToken=; path=/; max-age=0; SameSite=Strict";
  };

  const getDashboardUrl = (role: string): string => {
    return role === USER_ROLE.ADMIN ? "/admin/dashboard" : "/user/dashboard";
  };

  const handleAuthSuccess = (accessToken: string, refreshToken: string) => {
    const decoded = verifyToken(accessToken);
    if (!decoded) return null;

    const user: AuthUser = {
      id: decoded.userId,
      email: decoded.email,
      name: decoded.name,
      role: decoded.role as AuthUser["role"],
      photoURL: decoded.photo ?? null,
    };

    dispatch(setCredentials({ user, token: accessToken, refreshToken }));
    writeAccessTokenCookie(accessToken);
    return user;
  };

  return {
    login: async (payload: LoginPayload) => {
      try {
        const response = await loginUser(payload).unwrap();
        if (response.success && response.data.accessToken) {
          const user = handleAuthSuccess(response.data.accessToken, response.data.refreshToken);
          if (user) router.push(getDashboardUrl(user.role!));
          return { success: true, data: response.data };
        }
      } catch (error: any) {
        return { success: false, error: error?.data?.message || error?.message || "Login failed" };
      }
    },

    register: async (payload: SignUpPayload) => {
      try {
        const response = await registerUser(payload).unwrap();
        if (response.success && response.data.accessToken) {
          const user = handleAuthSuccess(response.data.accessToken, response.data.refreshToken);
          if (user) router.push(getDashboardUrl(user.role!));
          return { success: true, data: response.data };
        }
      } catch (error: any) {
        return { success: false, error: error?.data?.message || error?.message || "Registration failed" };
      }
    },

    requestPasswordReset: async (payload: ForgotPasswordPayload) => {
      try {
        const response = await forgotPassword(payload).unwrap();
        if (response.success) return { success: true, email: payload.email };
      } catch (error: any) {
        return { success: false, error: error?.data?.message || error?.message || "Request failed" };
      }
    },

    resetUserPassword: async (payload: ResetPasswordPayload) => {
      try {
        const response = await resetPassword(payload).unwrap();
        if (response.success) return { success: true };
      } catch (error: any) {
        return { success: false, error: error?.data?.message || error?.message || "Reset failed" };
      }
    },

    logout: () => {
      dispatch(clearCredentials());
      clearAccessTokenCookie();
      router.push("/");
    },

    isLoading: loginState.isLoading || registerState.isLoading || forgotState.isLoading || resetState.isLoading,
    loginLoading: loginState.isLoading,
    registerLoading: registerState.isLoading,
    forgotLoading: forgotState.isLoading,
    resetLoading: resetState.isLoading,
  };
}
