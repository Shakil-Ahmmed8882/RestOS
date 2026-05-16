/**
 * Optimistic helpers for user creation.
 *
 * Pattern used here: **post-success optimistic update**.
 *
 * We don't insert a placeholder before the request fires. Instead, when
 * the API confirms creation, we splice the server-returned entity into
 * our local list — replacing what would otherwise be a refetch /
 * cache invalidation. Local state stays in sync with the server without
 * an extra network round-trip.
 *
 * Why a dedicated module?
 *  - Keeps RTK Query endpoint definitions pure transport.
 *  - Centralises the normalisation step from server payload → list row.
 *  - When the API shape changes, you edit one file.
 */

/**
 * The shape every consumer of the user list expects.
 * Mirrors the columns rendered in AllUsersSection.
 */
export interface CreatedUserRow {
  _id: string;
  name: string;
  email: string;
  role?: string;
  photo?: string;
  createdAt?: string;
}

/**
 * Normalises the create-user API response into a list row.
 *
 * The server returns `{ statusCode, success, data: { ...user } }`.
 * Some callers pre-unwrap to `data`; others pass the raw envelope.
 * Accept both — this lives at the boundary between API and UI.
 */
export function normalizeCreatedUser(response: unknown): CreatedUserRow | null {
  if (!response || typeof response !== "object") return null;

  const root = response as Record<string, any>;
  const user = root.data && typeof root.data === "object" ? root.data : root;

  if (!user?._id) return null;

  return {
    _id: String(user._id),
    name: user.name,
    email: user.email,
    role: user.role,
    photo: user.photo,
    createdAt: user.createdAt ?? new Date().toISOString(),
  };
}
