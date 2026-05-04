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

const DUMMY_ROLES = [
  {
    label: "Admin",
    role: "ADMIN",
    email: "admin@restos.com",
    password: "Admin@123",
    color: "from-emerald-500 to-teal-600",
    icon: "🛡️",
    description: "Full system access",
  },
  {
    label: "User",
    role: "USER",
    email: "user@restos.com",
    password: "User@123",
    color: "from-violet-500 to-purple-600",
    icon: "👤",
    description: "Customer dashboard",
  },
  {
    label: "Delivery",
    role: "DELIVERY_MAN",
    email: "delivery@restos.com",
    password: "Delivery@123",
    color: "from-orange-500 to-red-500",
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

  const doLogin = async (email: string, password: string) => {
    setLoading(true);
    const toastId = toast.loading("Signing in…");
    try {
      const res = await login(email, password);
      const payload = { name: res.user.displayName, email: res.user.email };
      const response: any = await LoginUserFromDB(payload);
      if (response?.data?.success) {
        const { accessToken } = response.data.data;
        const decoded = verifyToken(accessToken);
        dispatch(setUser({ user: decoded, token: accessToken }));
        toast.success("Welcome back!", { id: toastId, duration: 2000 });
        navigate(`/${decoded.role === USER_ROLE.ADMIN ? "admin" : "user"}/dashboard`);
      } else {
        toast.error("Login failed. Check credentials.", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err?.message ?? "Something went wrong", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    doLogin(form.get("email") as string, form.get("password") as string);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const toastId = toast.loading("Signing in with Google…");
    try {
      const result = await googleSignIn();
      const payload = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };
      const response: any = await LoginUserFromDB(payload);
      if (response?.data?.success) {
        const { accessToken } = response.data.data;
        const decoded = verifyToken(accessToken);
        dispatch(setUser({ user: decoded, token: accessToken }));
        toast.success("Welcome!", { id: toastId });
        navigate(`/${decoded.role === USER_ROLE.ADMIN ? "admin" : "user"}/dashboard`);
      }
    } catch (err: any) {
      toast.error(err?.message ?? "Google sign-in failed", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const bg = dark
    ? "bg-gray-950 text-white"
    : "bg-white text-gray-900";
  const inputCls = dark
    ? "bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-400"
    : "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-emerald-500";
  const labelCls = dark ? "text-gray-300" : "text-gray-600";

  return (
    <div className={`flex flex-col w-full flex-1 justify-center px-8 lg:px-14 py-10 ${bg}`}>
      <motion.div
        initial="hidden"
        animate="visible"
        className="max-w-md w-full mx-auto space-y-7"
      >
        {/* Header */}
        <motion.div variants={fadeUp} custom={0} className="space-y-1">
          <h1 className={`text-3xl font-bold tracking-tight ${dark ? "text-white" : "text-gray-900"}`}>
            Welcome back
          </h1>
          <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>
            Sign in to your RestOS account
          </p>
        </motion.div>

        {/* Recruiter Quick Login */}
        <motion.div variants={fadeUp} custom={1} className="space-y-2">
          <p className={`text-xs font-semibold uppercase tracking-widest ${dark ? "text-gray-500" : "text-gray-400"}`}>
            Quick login — reviewer access
          </p>
          <div className="grid grid-cols-3 gap-2">
            {DUMMY_ROLES.map((r, i) => (
              <motion.button
                key={r.role}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => doLogin(r.email, r.password)}
                disabled={loading}
                className={`relative overflow-hidden rounded-xl p-3 text-center bg-gradient-to-br ${r.color} text-white shadow-md hover:shadow-lg transition-shadow disabled:opacity-50`}
              >
                <span className="block text-xl">{r.icon}</span>
                <span className="block text-xs font-bold mt-0.5">{r.label}</span>
                <span className="block text-[10px] opacity-80 mt-0.5">{r.description}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div variants={fadeUp} custom={2} className="flex items-center gap-3">
          <div className={`flex-1 h-px ${dark ? "bg-gray-800" : "bg-gray-200"}`} />
          <span className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>or sign in manually</span>
          <div className={`flex-1 h-px ${dark ? "bg-gray-800" : "bg-gray-200"}`} />
        </motion.div>

        {/* Form */}
        <motion.form variants={fadeUp} custom={3} onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className={`block text-sm font-medium ${labelCls}`}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors duration-200 ${inputCls}`}
            />
          </div>

          <div className="space-y-1">
            <label className={`block text-sm font-medium ${labelCls}`}>Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                required
                className={`w-full rounded-xl border px-4 py-3 pr-11 text-sm outline-none transition-colors duration-200 ${inputCls}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 text-lg ${dark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"}`}
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
            className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3 text-sm font-semibold text-white shadow-md hover:shadow-emerald-500/30 transition-all duration-200 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </motion.button>
        </motion.form>

        {/* Google */}
        <motion.div variants={fadeUp} custom={4} className="space-y-3">
          <div className="flex items-center gap-3">
            <div className={`flex-1 h-px ${dark ? "bg-gray-800" : "bg-gray-200"}`} />
            <span className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>or continue with</span>
            <div className={`flex-1 h-px ${dark ? "bg-gray-800" : "bg-gray-200"}`} />
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleSignIn}
            disabled={loading}
            className={`flex w-full items-center justify-center gap-3 rounded-xl border py-3 text-sm font-medium transition-all duration-200 disabled:opacity-60 ${
              dark
                ? "border-gray-700 bg-gray-800 text-white hover:bg-gray-700"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 shadow-sm"
            }`}
          >
            <img src={google_icon} className="w-5 h-5" alt="Google" />
            Sign in with Google
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.p variants={fadeUp} custom={5} className={`text-center text-sm ${dark ? "text-gray-500" : "text-gray-500"}`}>
          Don&apos;t have an account?{" "}
          <Link
            to="/sign-up"
            className="font-semibold text-emerald-500 hover:text-emerald-400 transition-colors"
          >
            Sign up free
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SignInForm;
