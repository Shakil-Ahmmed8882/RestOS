import React, { useState, useRef } from "react";
import { useTheme } from "next-themes";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { validate } from "../../../Utils/Validate";
import { useAuth } from "../../../Utils/useAuthHelper";
import { imageUpload } from "../../../api/utils";
import { useLoginUserMutation } from "../../../redux/features/auth/auth.api";
import verifyToken from "../../../helpers/verifyToken";
import { useAppDispatch } from "../../../redux/hooks";
import { setUser } from "../../../redux/features/auth/auth.slice";
import { USER_ROLE } from "../../../constants";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: "easeOut" },
  }),
};

const SignUpLayout = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const [LoginUserFromDB] = useLoginUserMutation();
  // @ts-ignore
  const { createUser, updateUserInfo } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form);
    const name = data.name as string;
    const email = data.email as string;
    const password = data.password as string;

    if (!photoFile) {
      toast.error("Please upload a profile photo.");
      return;
    }

    setLoading(true);
    setUploadProgress(true);
    const toastId = toast.loading("Creating your account…");

    try {
      const imageData = await imageUpload(photoFile);
      setUploadProgress(false);
      const photo = imageData?.data?.display_url;

      const hasError = validate(name, email, photo, password);
      if (hasError) {
        toast.dismiss(toastId);
        setLoading(false);
        return;
      }

      await createUser(email, password);
      await updateUserInfo(name, photo);

      const response: any = await LoginUserFromDB({ name, email, photo, password });

      if (response?.data?.success) {
        const { accessToken } = response.data.data;
        const decodedUser = verifyToken(accessToken);
        dispatch(setUser({ user: decodedUser, token: accessToken }));
        toast.success("Account created! Welcome to RestOS 🎉", { id: toastId, duration: 3000 });
        navigate(`/${decodedUser.role === USER_ROLE.ADMIN ? "admin" : "user"}/dashboard`);
      } else {
        toast.error(response?.error?.data?.message ?? "Sign up failed.", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err?.message ?? "Something went wrong.", { id: toastId });
    } finally {
      setLoading(false);
      setUploadProgress(false);
    }
  };

  const inputCls = dark
    ? "bg-gray-800/80 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-400 focus:bg-gray-800"
    : "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white";
  const labelCls = dark ? "text-gray-300" : "text-gray-600";
  const dividerCls = dark ? "bg-gray-800" : "bg-gray-200";

  return (
    <div className={`min-h-screen md:flex ${dark ? "bg-gray-950" : "bg-gray-50"}`}>
      {/* ── Left visual panel ── */}
      <div
        className={`hidden md:flex w-1/2 relative overflow-hidden flex-col justify-end
          ${dark
            ? "bg-gradient-to-br from-gray-900 via-violet-950 to-gray-900"
            : "bg-gradient-to-br from-violet-600 via-purple-500 to-fuchsia-500"
          }`}
      >
        {/* dot pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* floating orbs */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 right-16 w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm"
        />
        <motion.div
          animate={{ y: [0, 16, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-1/3 left-10 w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-1/3 w-12 h-12 rounded-full bg-white/20"
        />

        {/* content */}
        <div className="relative z-10 p-12 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4"
          >
            <p className="text-5xl">🍽️</p>
            <h2 className="text-3xl font-extrabold text-white leading-tight">
              Join 50,000+<br />food lovers
            </h2>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Create your free RestOS account and unlock exclusive deals, fast delivery, and a world of flavors.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-2"
          >
            {["✅ Free to join", "🎁 Welcome offer", "🚀 Instant access", "📦 Track orders"].map((tag) => (
              <span
                key={tag}
                className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/30"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* ── Right form panel ── */}
      <div className={`flex items-center justify-center w-full md:w-1/2 px-8 lg:px-14 py-12 ${dark ? "bg-gray-950" : "bg-white"}`}>
        <motion.div
          initial="hidden"
          animate="visible"
          className="max-w-md w-full mx-auto space-y-6"
        >
          {/* Header */}
          <motion.div variants={fadeUp} custom={0} className="space-y-1">
            <h1 className={`text-3xl font-bold tracking-tight ${dark ? "text-white" : "text-gray-900"}`}>
              Create account
            </h1>
            <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>
              Start your RestOS journey today — it's free.
            </p>
          </motion.div>

          <motion.form
            variants={fadeUp}
            custom={1}
            onSubmit={handleSignUp}
            className="space-y-4"
          >
            {/* Photo upload */}
            <motion.div variants={fadeUp} custom={2} className="flex flex-col items-center gap-3">
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`relative w-20 h-20 rounded-full cursor-pointer overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                  dark
                    ? "border-gray-600 bg-gray-800 hover:border-emerald-500"
                    : "border-gray-200 bg-gray-100 hover:border-emerald-400"
                }`}
              >
                <AnimatePresence mode="wait">
                  {photoPreview ? (
                    <motion.img
                      key="preview"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      src={photoPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="w-full h-full flex flex-col items-center justify-center"
                    >
                      <span className="text-2xl">📷</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Upload overlay */}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/30 flex items-center justify-center transition-all duration-200">
                  <span className="text-white text-xs font-medium opacity-0 hover:opacity-100 transition-opacity">
                    Change
                  </span>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                name="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`text-xs font-medium transition-colors ${
                    dark ? "text-emerald-400 hover:text-emerald-300" : "text-emerald-600 hover:text-emerald-500"
                  }`}
                >
                  {photoPreview ? "Change photo" : "Upload profile photo"}
                </button>
                {uploadProgress && (
                  <p className="text-xs text-emerald-500 mt-0.5 animate-pulse">Uploading image…</p>
                )}
              </div>
            </motion.div>

            {/* Name */}
            <motion.div variants={fadeUp} custom={3} className="space-y-1.5">
              <label className={`block text-sm font-medium ${labelCls}`}>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                required
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 ${inputCls}`}
              />
            </motion.div>

            {/* Email */}
            <motion.div variants={fadeUp} custom={4} className="space-y-1.5">
              <label className={`block text-sm font-medium ${labelCls}`}>Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 ${inputCls}`}
              />
            </motion.div>

            {/* Password */}
            <motion.div variants={fadeUp} custom={5} className="space-y-1.5">
              <label className={`block text-sm font-medium ${labelCls}`}>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Min. 6 characters"
                  required
                  minLength={6}
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
            </motion.div>

            {/* Submit */}
            <motion.button
              variants={fadeUp}
              custom={6}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-violet-500/20 hover:shadow-violet-500/40 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  {uploadProgress ? "Uploading photo…" : "Creating account…"}
                </span>
              ) : "Create Account"}
            </motion.button>
          </motion.form>

          {/* Footer */}
          <motion.p
            variants={fadeUp}
            custom={7}
            className={`text-center text-sm ${dark ? "text-gray-500" : "text-gray-500"}`}
          >
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="font-semibold text-emerald-500 hover:text-emerald-400 transition-colors"
            >
              Sign in →
            </Link>
          </motion.p>

          <motion.p
            variants={fadeUp}
            custom={8}
            className={`text-center text-[11px] ${dark ? "text-gray-600" : "text-gray-400"}`}
          >
            By creating an account you agree to our{" "}
            <span className={`underline cursor-pointer ${dark ? "text-gray-500" : "text-gray-500"}`}>Terms</span>{" "}
            and{" "}
            <span className={`underline cursor-pointer ${dark ? "text-gray-500" : "text-gray-500"}`}>Privacy Policy</span>.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpLayout;
