"use client";

import { motion } from "framer-motion";

interface AuthVisualPanelProps {
  quote: string;
  caption: string;
  tags: string[];
}

export function AuthVisualPanel({ quote, caption, tags }: AuthVisualPanelProps) {
  return (
    <div className="relative hidden w-1/2 flex-col justify-end overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-400 md:flex">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <motion.div
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-12 top-16 h-28 w-28 rounded-full bg-white/10 backdrop-blur-sm"
      />
      <motion.div
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute left-8 top-40 h-16 w-16 rounded-full bg-white/10 backdrop-blur-sm"
      />
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute left-1/2 top-24 h-10 w-10 rounded-full bg-white/20"
      />

      <div className="relative z-10 space-y-6 p-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-4"
        >
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-xl text-yellow-300">
                ★
              </span>
            ))}
          </div>
          <blockquote className="max-w-xs text-2xl font-bold leading-snug text-white">“{quote}”</blockquote>
          <p className="text-sm text-white/70">{caption}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap gap-2"
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/30 bg-white/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}
