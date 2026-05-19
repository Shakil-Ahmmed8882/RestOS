



/**
 * API Request/Response Logger
 *
 * Wraps the RTK Query baseQuery and logs every request+response to the
 * browser console as a collapsible group.
 *
 * HOW TO COPY LOGS FOR THE BACKEND TEAM
 * ─────────────────────────────────────
 * 1. Open DevTools  →  Console tab
 * 2. Make sure "Verbose" or "All levels" is selected in the filter dropdown
 *    (some browsers hide console.group under "Verbose")
 * 3. Reproduce the failing request
 * 4. Right-click anywhere in the Console  →  "Save as..."  →  save the .log file
 *    OR select all (Ctrl+A), copy, paste into a text file / Slack message.
 * 5. Each log block is labelled:  [API] METHOD /path  ✓ 200  or  ✗ 401
 *
 * ONLY active in development (NODE_ENV !== "production").
 */

import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as { auth: { token: string | null } }).auth.token;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

const isDev = process.env.NODE_ENV !== "production";

export const baseQueryWithLogger: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  if (!isDev) return rawBaseQuery(args, api, extraOptions);

  // ── Collect request info ────────────────────────────────────────────────
  const method = typeof args === "string" ? "GET" : (args.method ?? "GET").toUpperCase();
  const url =
    typeof args === "string"
      ? args
      : `${process.env.NEXT_PUBLIC_API_BASE_URL ?? ""}${args.url}`;

  const requestBody = typeof args === "object" ? args.body : undefined;
  const requestParams = typeof args === "object" ? args.params : undefined;

  // Read the token directly from state so we can log whether it was present
  const state = api.getState() as { auth: { token: string | null; user?: { id?: string; email?: string } } };
  const token = state.auth?.token;
  const user = state.auth?.user;

  const requestTime = performance.now();

  // ── Fire the real request ───────────────────────────────────────────────
  const result = await rawBaseQuery(args, api, extraOptions);

  const durationMs = (performance.now() - requestTime).toFixed(1);
  const statusCode = result.meta?.response?.status ?? (result.error ? "ERR" : "?");
  const isError = !!result.error;
  const statusIcon = isError ? "✗" : "✓";
  const labelColor = isError ? "color:#e11d48;font-weight:700" : "color:#10b981;font-weight:700";

  // ── Collect response headers ────────────────────────────────────────────
  const responseHeaders: Record<string, string> = {};
  result.meta?.response?.headers?.forEach((value: string, key: string) => {
    responseHeaders[key] = value;
  });

  // ── Build the log group ─────────────────────────────────────────────────
  const groupLabel = `%c[API] ${method} ${url}  ${statusIcon} ${statusCode}  (${durationMs}ms)`;

  console.groupCollapsed(groupLabel, labelColor);

  // — Auth state —
  console.group("🔑 Auth");
  console.log("Token present:", !!token);
  console.log("Token value  :", token ?? "(none)");
  console.log("User         :", user ?? "(not in store)");
  console.groupEnd();

  // — Request —
  console.group("📤 Request");
  console.log("Method :", method);
  console.log("URL    :", url);
  if (requestParams) console.log("Params :", requestParams);
  if (requestBody !== undefined) console.log("Body   :", requestBody);
  console.groupEnd();

  // — Response —
  console.group("📥 Response");
  console.log("Status :", statusCode);
  console.log("Duration:", `${durationMs}ms`);
  if (Object.keys(responseHeaders).length > 0) {
    console.log("Headers:", responseHeaders);
  }
  if (result.data !== undefined) console.log("Data   :", result.data);
  if (result.error) {
    console.error("Error  :", result.error);
  }
  console.groupEnd();

  // — Full snapshot (easy to copy as JSON) —
  const snapshot = JSON.stringify(
    {
      timestamp: new Date().toISOString(),
      request: {
        method,
        url,
        params: requestParams ?? null,
        body: requestBody ?? null,
        tokenPresent: !!token,
        tokenValue: token ?? null,
        userId: user?.id ?? null,
        userEmail: user?.email ?? null,
      },
      response: {
        status: statusCode,
        durationMs: Number(durationMs),
        headers: responseHeaders,
        data: result.data ?? null,
        error: result.error ?? null,
      },
    },
    null,
    2,
  );

  console.group("📋 Full snapshot (copy this for backend)");
  console.log(snapshot);
  console.groupEnd();

  // ── Auto-copy to clipboard on error ────────────────────────────────────
  // Only fires when the request failed so the clipboard isn't overwritten on
  // every successful call. Requires the page to have focus (browser security).
  if (isError && typeof navigator !== "undefined" && navigator.clipboard) {
    navigator.clipboard.writeText(snapshot).then(
      () => {
        console.info(
          "%c📎 Error snapshot auto-copied to clipboard — paste it directly for the backend team.",
          "color:#e11d48;font-weight:600",
        );
      },
      () => {
        // Clipboard write blocked (page not focused / permission denied)
        console.warn(
          "📎 Clipboard copy failed (page may not have focus). Expand '📋 Full snapshot' above and copy manually.",
        );
      },
    );
  }

  console.groupEnd(); // close outer group

  return result;
};
