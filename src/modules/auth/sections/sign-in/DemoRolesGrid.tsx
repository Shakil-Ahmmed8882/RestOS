"use client";

import { motion } from "framer-motion";
import { USER_ROLE } from "@/constants/roles";
import { useAuthFlow } from "@/modules/auth/hooks/useAuthFlow";

const DEMO_ROLES = [
  {
    label: "Admin",
    name: "Demo Admin",
    email: "admin@restos.com",
    role: USER_ROLE.ADMIN,
    color: "from-emerald-500 to-teal-600",
    icon: "🛡️",
    description: "Full system access",
  },
  {
    label: "User",
    name: "Demo User",
    email: "user@restos.com",
    role: USER_ROLE.USER,
    color: "from-violet-500 to-purple-600",
    icon: "👤",
    description: "Customer dashboard",
  },
  {
    label: "Delivery",
    name: "Demo Delivery",
    email: "delivery@restos.com",
    role: USER_ROLE.USER,
    color: "from-orange-500 to-red-500",
    icon: "🚴",
    description: "Delivery panel",
  },
];

export function DemoRolesGrid({ disabled }: { disabled?: boolean }) {
  const { loginAsDemo } = useAuthFlow();

  return (
    <div className="space-y-2.5">
      <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
        ⚡ Reviewer quick access
      </p>
      <div className="grid grid-cols-3 gap-2.5">
        {DEMO_ROLES.map((r) => (
          <motion.button
            key={r.label}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            disabled={disabled}
            onClick={() => loginAsDemo(r)}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${r.color} p-3.5 text-center text-white shadow-lg transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50`}
          >
            <span className="mb-1 block text-2xl">{r.icon}</span>
            <span className="block text-xs font-bold">{r.label}</span>
            <span className="mt-0.5 block text-[10px] opacity-75">{r.description}</span>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0" />
          </motion.button>
        ))}
      </div>
      <p className="text-[10px] text-muted-foreground">
        No credentials needed — instant demo access for each role.
      </p>
    </div>
  );
}
