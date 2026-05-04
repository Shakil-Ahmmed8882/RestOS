import React from "react";
import { useTheme } from "next-themes";
import SignInForm from "../features/SignInForm";
import { motion } from "framer-motion";

const FOOD_QUOTES = [
  "Great food is art. Art is life.",
  "Every bite tells a story.",
  "Taste the difference quality makes.",
];

const SignInLayout = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <div className={`md:flex min-h-screen ${dark ? "bg-gray-950" : "bg-gray-50"}`}>
      {/* Left — Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <SignInForm />
      </div>

      {/* Right — Visual panel */}
      <div
        className={`hidden md:flex w-1/2 relative overflow-hidden flex-col justify-end
          ${dark ? "bg-gray-900" : "bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-400"}`}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Floating food blobs */}
        <motion.div
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 right-12 w-28 h-28 rounded-full bg-white/10 backdrop-blur-sm"
        />
        <motion.div
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-40 left-8 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm"
        />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-24 left-1/2 w-10 h-10 rounded-full bg-white/20"
        />

        {/* Content */}
        <div className="relative z-10 p-12 space-y-6">
          {/* Rotating quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4"
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-300 text-xl">★</span>
              ))}
            </div>
            <blockquote className="text-white text-2xl font-bold leading-snug max-w-xs">
              "{FOOD_QUOTES[0]}"
            </blockquote>
            <p className="text-white/70 text-sm">RestOS — where every order matters</p>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-2"
          >
            {["🍕 Fresh Ingredients", "⚡ Fast Delivery", "🎁 Hot Deals", "🌟 Top Rated"].map((tag) => (
              <span
                key={tag}
                className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/30"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
    </div>
  );
};

export default SignInLayout;
