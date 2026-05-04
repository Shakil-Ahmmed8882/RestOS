// SignInForm.tsx
import React, { useState } from "react";
import { useTheme } from "next-themes";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Utils/useAuthHelper";
import { useLoginUserMutation } from "../../../redux/features/auth/auth.api";
import { useAppDispatch } from "../../../redux/hooks";
import { setUser } from "../../../redux/features/auth/auth.slice";
import verifyToken from "../../../helpers/verifyToken";
import { USER_ROLE } from "../../../constants";
import { toast } from "sonner";
import { motion } from "framer-motion";
// @ts-ignore
import google_icon from "../../../assets/img/icons8-google-48.png";

// ─── Dummy accounts ────────────────────────────────────────────────────────
// These bypass Firebase and call the backend directly with name+email,
// matching exactly how Google Sign-In works (no password sent to backend).
const DUMMY_ROLES = [
  {
    label: "Admin",
    name: "Demo Admin",
    email: "admin@restos.com",
    color: "from-emerald-500 to-teal-600",
    shadowColor: "shadow-emerald-500/30",
    icon: "🛡️",
    description: "Full system access",
  },
  {
    label: "User",
    name: "Demo User",
    email: "user@restos.com",
    color: "from-violet-500 to-purple-600",
    shadowColor: "shadow-violet-500/30",
    icon: "👤",
    description: "Customer dashboard",
  },
  {
    label: "Delivery",
    name: "Demo Delivery",
    email: "delivery@restos.com",
    color: "from-orange-500 to-red-500",
    shadowColor: "shadow-orange-500/30",
    icon: "🚴",
    description: "Delivery panel",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
  }),
};

const SignInForm = () => {
  const [LoginUserFromDB] = useLoginUserMutation();
  const { theme } = useTheme();
  const dark = theme === "dark";
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // @ts-ignore
  const { login, googleSignIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ── Calls YOUR backend directly (same as Google Sign-In does).
  // No Firebase account needed for demo roles.
  const loginViaBackend = async (name: string, email: string, toastId: string | number) => {
    const response: any = await LoginUserFromDB({ name, email });
    if (response?.data?.success) {
      const { accessToken } = response.data.data;
      const decoded = verifyToken(accessToken);
      dispatch(setUser({ user: decoded, token: accessToken }));
      toast.success(`Welcome, ${name}!`, { id: toastId, duration: 2000 });
      navigate(`/${decoded.role === USER_ROLE.ADMIN ? "admin" : "user"}/dashboard`);
    } else {
      const msg = response?.error?.data?.message ?? "Login failed. Check credentials.";
      toast.error(msg, { id: toastId });
    }
  };

  // ── Dummy role quick-login ──────────────────────────────────────────────
  const handleDummyLogin = async (dummy: typeof DUMMY_ROLES[0]) => {
    if (loading) return;
    setLoading(true);
    const toastId = toast.loading(`Signing in as ${dummy.label}…`);
    try {
      await loginViaBackend(dummy.name, dummy.email, toastId);
    } catch (err: any) {
      toast.error(err?.message ?? "Something went wrong", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // ── Manual email/password login ────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    const toastId = toast.loading("Signing in…");
    try {
      const res = await login(email, password);
      await loginViaBackend(res.user.displayName ?? email, res.user.email, toastId);
    } catch (err: any) {
      toast.error(err?.message ?? "Invalid credentials", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // ── Google sign-in ─────────────────────────────────────────────────────
  const handleGoogleSignIn = async () => {
    if (loading) return;
    setLoading(true);
    const toastId = toast.loading("Signing in with Google…");
    try {
      const result = await googleSignIn();
      await loginViaBackend(result.user.displayName, result.user.email, toastId);
    } catch (err: any) {
      toast.error(err?.message ?? "Google sign-in failed", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // ── Styles ─────────────────────────────────────────────────────────────
  const bg = dark ? "bg-gray-950 text-white" : "bg-white text-gray-900";
  const inputCls = dark
    ? "bg-gray-800/80 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-400 focus:bg-gray-800"
    : "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white";
  const labelCls = dark ? "text-gray-300" : "text-gray-600";
  const dividerCls = dark ? "bg-gray-800" : "bg-gray-200";
  const dividerTextCls = dark ? "text-gray-500" : "text-gray-400";

  return (
    <div className={`flex flex-col w-full flex-1 justify-center px-8 lg:px-14 py-10 ${bg}`}>
      <motion.div
        initial="hidden"
        animate="visible"
        className="max-w-md w-full mx-auto space-y-7"
      >
        {/* ── Header ── */}
        <motion.div variants={fadeUp} custom={0} className="space-y-1">
          <h1 className={`text-3xl font-bold tracking-tight ${dark ? "text-white" : "text-gray-900"}`}>
            Welcome back
          </h1>
          <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>
            Sign in to your RestOS account
          </p>
        </motion.div>

        {/* ── Recruiter quick login ── */}
        <motion.div variants={fadeUp} custom={1} className="space-y-2.5">
          <p className={`text-[11px] font-bold uppercase tracking-widest ${dividerTextCls}`}>
            ⚡ Reviewer quick access
          </p>
          <div className="grid grid-cols-3 gap-2.5">
            {DUMMY_ROLES.map((r) => (
              <motion.button
                key={r.label}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleDummyLogin(r)}
                disabled={loading}
                className={`relative overflow-hidden rounded-2xl p-3.5 text-center bg-gradient-to-br ${r.color} text-white shadow-lg ${r.shadowColor} hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <span className="block text-2xl mb-1">{r.icon}</span>
                <span className="block text-xs font-bold">{r.label}</span>
                <span className="block text-[10px] opacity-75 mt-0.5">{r.description}</span>
                {/* shine overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none" />
              </motion.button>
            ))}
          </div>
          <p className={`text-[10px] ${dividerTextCls}`}>
            No credentials needed — instant demo access for each role.
          </p>
        </motion.div>

        {/* ── Divider ── */}
        <motion.div variants={fadeUp} custom={2} className="flex items-center gap-3">
          <div className={`flex-1 h-px ${dividerCls}`} />
          <span className={`text-xs ${dividerTextCls}`}>or sign in manually</span>
          <div className={`flex-1 h-px ${dividerCls}`} />
        </motion.div>

        {/* ── Form ── */}
        <motion.form variants={fadeUp} custom={3} onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className={`block text-sm font-medium ${labelCls}`}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 ${inputCls}`}
            />
          </div>

          <div className="space-y-1.5">
            <label className={`block text-sm font-medium ${labelCls}`}>Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                required
                className={`w-full rounded-xl border px-4 py-3 pr-12 text-sm outline-none transition-all duration-200 ${inputCls}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className={`absolute right-3.5 top-1/2 -translate-y-1/2 text-base transition-colors duration-200 ${
                  dark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Signing in…
              </span>
            ) : "Sign In"}
          </motion.button>
        </motion.form>

        {/* ── Google ── */}
        <motion.div variants={fadeUp} custom={4} className="space-y-3">
          <div className="flex items-center gap-3">
            <div className={`flex-1 h-px ${dividerCls}`} />
            <span className={`text-xs ${dividerTextCls}`}>or continue with</span>
            <div className={`flex-1 h-px ${dividerCls}`} />
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleSignIn}
            disabled={loading}
            className={`flex w-full items-center justify-center gap-3 rounded-xl border py-3.5 text-sm font-medium transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${
              dark
                ? "border-gray-700 bg-gray-800/50 text-white hover:bg-gray-700/60"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 shadow-sm hover:shadow"
            }`}
          >
            <img src={google_icon} className="w-5 h-5" alt="Google" />
            Continue with Google
          </motion.button>
        </motion.div>

        {/* ── Footer ── */}
        <motion.p
          variants={fadeUp}
          custom={5}
          className={`text-center text-sm ${dark ? "text-gray-500" : "text-gray-500"}`}
        >
          Don&apos;t have an account?{" "}
          <Link
            to="/sign-up"
            className="font-semibold text-emerald-500 hover:text-emerald-400 transition-colors"
          >
            Sign up free →
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SignInForm;
