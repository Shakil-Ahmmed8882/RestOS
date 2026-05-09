"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials, clearCredentials, type AuthUser } from "@/redux/slices/authSlice";
import { useLoginUserMutation, useRegisterUserMutation } from "@/redux/featureApi/authApi";
import { verifyToken } from "@/lib/verifyToken";
import { USER_ROLE } from "@/constants/roles";

const writeAccessTokenCookie = (token: string) => {
  if (typeof document === "undefined") return;
  const isSecure = typeof window !== "undefined" && window.location.protocol === "https:";
  document.cookie = [
    `accessToken=${token}`,
    "path=/",
    `max-age=${60 * 60 * 24}`,
    "SameSite=Strict",
    isSecure ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
};

export function useAuthFlow() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useSearchParams();
  const [loginUser] = useLoginUserMutation();
  const [registerUser] = useRegisterUserMutation();

  const finalize = (user: AuthUser, token: string, refreshToken = "") => {
    dispatch(setCredentials({ user, token, refreshToken }));
    writeAccessTokenCookie(token);
    const redirect = params.get("redirect");
    const target = redirect ?? `/${user.role === USER_ROLE.ADMIN ? "admin" : "user"}/dashboard`;
    router.push(target);
  };

  const tryBackendLogin = async (
    payload: { name: string; email: string },
  ): Promise<{ token: string; refreshToken: string; user: AuthUser } | null> => {
    if (!process.env.NEXT_PUBLIC_API_BASE_URL) return null;
    try {
      const res: any = await loginUser(payload as any);
      if (res?.data?.success) {
        const { accessToken, refreshToken } = res.data.data;
        const decoded = verifyToken(accessToken);
        if (decoded) {
          return {
            token: accessToken,
            refreshToken: refreshToken ?? "",
            user: {
              id: decoded.userId,
              email: decoded.email,
              name: decoded.name,
              role: decoded.role as AuthUser["role"],
              photoURL: decoded.photo ?? null,
            },
          };
        }
      }
    } catch {
      /* fall through to fallback */
    }
    return null;
  };

  const loginAsDemo = async (demo: { name: string; email: string; role: string }) => {
    const toastId = toast.loading(`Signing in as ${demo.name}…`);
    const synced = await tryBackendLogin({ name: demo.name, email: demo.email });
    if (synced) {
      finalize(synced.user, synced.token, synced.refreshToken);
      toast.success(`Welcome, ${demo.name}!`, { id: toastId });
      return;
    }
    finalize(
      { id: demo.email, email: demo.email, name: demo.name, role: demo.role as AuthUser["role"] },
      "demo-only",
    );
    toast.success(`Welcome, ${demo.name}!`, { id: toastId });
  };

  const tryBackendRegister = async (payload: {
    name: string;
    email: string;
    password: string;
    photo?: string;
  }): Promise<{ token: string; refreshToken: string; user: AuthUser } | null> => {
    if (!process.env.NEXT_PUBLIC_API_BASE_URL) return null;
    try {
      const res: any = await registerUser(payload as any);
      if (res?.data?.success) {
        const { accessToken, refreshToken, user } = res.data.data;
        return {
          token: accessToken,
          refreshToken: refreshToken ?? "",
          user: {
            id: user._id ?? user.id ?? user.email,
            email: user.email,
            name: user.name,
            role: user.role,
            photoURL: user.photo ?? null,
          },
        };
      }
    } catch {
      /* swallow */
    }
    return null;
  };

  return { finalize, tryBackendLogin, tryBackendRegister, loginAsDemo };
}
