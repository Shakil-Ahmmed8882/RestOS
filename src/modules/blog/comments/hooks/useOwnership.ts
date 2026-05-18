"use client";

import { useAppSelector } from "@/redux/hooks";

/**
 * Pull the comment/reply's author id out of whatever shape the server
 * gives us:
 *   - "65f0..."                        (raw ObjectId string)
 *   - { _id: "65f0...", name, ... }    (populated User document)
 *   - { _id: { toString() }, ... }     (rare Mongo ObjectId carrier)
 *
 * Returns a normalised string, or undefined when the field is missing.
 */
export function extractUserId(user: unknown): string | undefined {
  if (!user) return undefined;
  if (typeof user === "string") return user;
  const u = user as { _id?: unknown; id?: unknown };
  const raw = u?._id ?? u?.id;
  if (raw == null) return undefined;
  if (typeof raw === "string") return raw;
  // Mongo ObjectId-like: anything that stringifies to a 24-char hex.
  try {
    return String(raw);
  } catch {
    return undefined;
  }
}

/**
 * Strict ownership check.
 *
 * Returns `true` ONLY when the currently-authenticated user's id matches
 * the author id of the supplied user reference. There is no ADMIN
 * override here — the public comments UI hides Edit/Delete for everyone
 * except the author. Admin moderation lives in the dashboard.
 */
export function useIsOwner(targetUser: unknown): boolean {
  const me = useAppSelector((s) => s?.auth?.user);
  if (!me?.id) return false;
  const authorId = extractUserId(targetUser);
  if (!authorId) return false;
  return String(authorId) === String(me.id);
}
