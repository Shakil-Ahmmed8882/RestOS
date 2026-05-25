import { baseApi } from "@/redux/featureApi/baseApi";
import { API_CACHE_TAGS } from "@/cache/API_CACHE_KEY";
import { store } from "@/redux/store";
import blogApi from "@/redux/featureApi/blogApi";
import type { BlogComment } from "@/modules/blog/types/blog.types";

/**
 * Bump the commentsCount on every cached blog list / detail / saved-feed
 * entry that contains the matching blog id. Returns an undo function.
 *
 * Why this is verbose: RTK Query holds separate cache entries per (endpoint,
 * serialized-args) tuple. The same blog row can appear in many cache entries
 * at once (filtered list, search list, saved feed, detail page). We patch
 * every entry that contains it so the surrounding UI updates with no refetch.
 *
 * Walks the raw queries map directly instead of selectCachedArgsForQuery to
 * also catch entries cached by other slices (e.g. saveApi) whose row shape
 * is a blog. Anything we can't patch is silently skipped.
 */
function patchBlogCountEverywhere(
  blogId: string,
  delta: 1 | -1,
): () => void {
  const undoFns: Array<() => void> = [];

  const tryPatch = (api: any, endpointName: string, args: unknown) => {
    try {
      const patch = store.dispatch(
        api.util.updateQueryData(endpointName, args, (draft: any) => {
          // Unwrap common envelope shapes: {data: [...]}, {data: {data:[...]}}, [...]
          const candidates: any[] = [];
          if (Array.isArray(draft)) candidates.push(draft);
          if (Array.isArray(draft?.data)) candidates.push(draft.data);
          if (Array.isArray(draft?.data?.data)) candidates.push(draft.data.data);
          if (Array.isArray(draft?.data?.result)) candidates.push(draft.data.result);

          let bumped = false;
          for (const list of candidates) {
            const target = list.find(
              (row: any) => row && (row._id === blogId || row.id === blogId),
            );
            if (target) {
              const current =
                typeof target.commentsCount === "number" ? target.commentsCount : 0;
              target.commentsCount = Math.max(0, current + delta);
              bumped = true;
            }
          }

          // Detail-shape: single blog object on `draft.data` or `draft` itself.
          if (!bumped) {
            const single = draft?.data ?? draft;
            if (single && typeof single === "object" && (single._id === blogId || single.id === blogId)) {
              const current =
                typeof single.commentsCount === "number" ? single.commentsCount : 0;
              single.commentsCount = Math.max(0, current + delta);
            }
          }
        }),
      );
      undoFns.push(() => patch.undo());
    } catch {
      /* skip this entry */
    }
  };

  try {
    const state: any = store.getState();
    const queries = state?.[baseApi.reducerPath]?.queries ?? {};
    for (const cacheKey of Object.keys(queries)) {
      const entry = queries[cacheKey];
      if (!entry?.endpointName) continue;
      // Only walk *list-shaped* or blog-detail-shaped endpoints. Comment
      // and reply endpoints have their own count derivation and shouldn't
      // be touched here.
      const name: string = entry.endpointName;
      const isBlogEndpoint =
        name === "getAllBlogs" ||
        name === "getSingleBlog" ||
        name.toLowerCase().includes("blog") ||
        name.toLowerCase().includes("saved");
      if (!isBlogEndpoint) continue;
      tryPatch(baseApi, name, entry.originalArgs);
    }
  } catch {
    /* noop */
  }

  // Always also try the canonical blog detail entry by id (cheap, idempotent).
  try {
    const patch = store.dispatch(
      blogApi.util.updateQueryData("getSingleBlog", blogId, (draft: any) => {
        const target = draft?.data ?? draft;
        if (!target || typeof target !== "object") return;
        const current =
          typeof target.commentsCount === "number" ? target.commentsCount : 0;
        target.commentsCount = Math.max(0, current + delta);
      }),
    );
    undoFns.push(() => patch.undo());
  } catch {
    /* noop */
  }

  return () => undoFns.forEach((fn) => fn());
}

// Back-compat alias for any callers still importing the old name.
const bumpBlogCommentsCount = patchBlogCountEverywhere;

/**
 * Comment endpoints — supports optional image upload per the API contract
 * in src/modules/blog/docs/comment-image-upload.md (§4).
 *
 * Optimistic flow: callers pass a `_tempEntry` carrying the doc shape we
 * want to render immediately (populated user from the auth slice, local
 * image preview URL, etc.). `onQueryStarted` inserts it at the top, then
 * splices it out for the server-confirmed row on resolve.
 */

type CreateCommentArgs = {
  blog: string;
  comment: string;
  file?: File | null;
  _tempEntry?: BlogComment;
};

type UpdateCommentArgs = {
  id: string;
  blogId: string;
  comment?: string;
  file?: File | null;
  removeImage?: boolean;
};

type DeleteCommentArgs = {
  id: string;
  blogId: string;
};

/**
 * Build the request body for create/update.
 *
 * - Multipart when there's a file: a single `file` field plus a single
 *   `data` field containing the JSON-stringified payload. The server's
 *   `parseBody` middleware unpacks `data` onto `req.body` before zod.
 * - Plain JSON when there's no file. Update also uses JSON for the
 *   `removeImage: true` flow (no upload).
 */
const buildCreateBody = (args: CreateCommentArgs) => {
  if (args.file) {
    const fd = new FormData();
    fd.append("file", args.file);
    fd.append(
      "data",
      JSON.stringify({ blog: args.blog, comment: args.comment }),
    );
    return fd;
  }
  return { blog: args.blog, comment: args.comment };
};

const buildUpdateBody = (args: UpdateCommentArgs) => {
  if (args.file) {
    const fd = new FormData();
    fd.append("file", args.file);
    fd.append(
      "data",
      JSON.stringify({
        ...(args.comment !== undefined && { comment: args.comment }),
      }),
    );
    return fd;
  }
  const json: Record<string, unknown> = {};
  if (args.comment !== undefined) json.comment = args.comment;
  if (args.removeImage) json.removeImage = true;
  return json;
};

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCommentsOnSingleBlog: builder.query<BlogComment[], string>({
      query: (id) => ({ url: `/comments/${id}`, method: "GET" }),
      transformResponse: (res: any) =>
        Array.isArray(res?.data) ? (res.data as BlogComment[]) : [],
      providesTags: [API_CACHE_TAGS.COMMENT_LIST],
    }),

    addCommentOnBlog: builder.mutation<any, CreateCommentArgs>({
      query: (args) => ({
        url: "/comments/",
        method: "POST",
        body: buildCreateBody(args),
      }),
      async onQueryStarted(
        { blog, _tempEntry },
        { dispatch, queryFulfilled },
      ) {
        if (!_tempEntry) {
          await queryFulfilled.catch(() => undefined);
          return;
        }
        const tempId = _tempEntry._tempId ?? _tempEntry._id;
        const patch = dispatch(
          commentApi.util.updateQueryData(
            "getAllCommentsOnSingleBlog",
            blog,
            (draft) => {
              draft.unshift(_tempEntry);
            },
          ),
        );
        // Bump count on every cached blog list / detail view so the
        // surrounding UI updates without a refetch.
        const undoCount = bumpBlogCommentsCount(blog, 1);
        try {
          const { data } = await queryFulfilled;
          const serverDoc: BlogComment | undefined =
            data?.data && !Array.isArray(data.data)
              ? (data.data as BlogComment)
              : Array.isArray(data?.data)
                ? (data.data[0] as BlogComment)
                : undefined;

          dispatch(
            commentApi.util.updateQueryData(
              "getAllCommentsOnSingleBlog",
              blog,
              (draft) => {
                const idx = draft.findIndex(
                  (c) => c?._tempId === tempId || c?._id === tempId,
                );
                if (idx === -1) return;
                if (serverDoc?._id) {
                  draft[idx] = { ...serverDoc };
                } else {
                  draft[idx] = { ...draft[idx], _pending: false };
                }
              },
            ),
          );

          if (_tempEntry?._localImageUrl) {
            try {
              URL.revokeObjectURL(_tempEntry._localImageUrl);
            } catch {
              /* noop */
            }
          }
        } catch {
          patch.undo();
          undoCount();
        }
      },
      invalidatesTags: [API_CACHE_TAGS.ANALYTICS_BLOG],
    }),

    updateCommentOnBlog: builder.mutation<any, UpdateCommentArgs>({
      query: (args) => ({
        url: `/comments/${args.id}`,
        method: "PATCH",
        body: buildUpdateBody(args),
      }),
      async onQueryStarted(
        { id, blogId, comment, removeImage },
        { dispatch, queryFulfilled },
      ) {
        const patch = dispatch(
          commentApi.util.updateQueryData(
            "getAllCommentsOnSingleBlog",
            blogId,
            (draft) => {
              const c = draft.find((x) => x?._id === id);
              if (!c) return;
              if (comment !== undefined) c.comment = comment;
              if (removeImage) {
                c.image = null;
                c.imagePublicId = null;
              }
            },
          ),
        );
        try {
          const { data } = await queryFulfilled;
          const serverDoc: BlogComment | undefined = data?.data;
          if (!serverDoc?._id) return;
          dispatch(
            commentApi.util.updateQueryData(
              "getAllCommentsOnSingleBlog",
              blogId,
              (draft) => {
                const idx = draft.findIndex((x) => x?._id === id);
                if (idx !== -1) draft[idx] = { ...draft[idx], ...serverDoc };
              },
            ),
          );
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: [API_CACHE_TAGS.ANALYTICS_BLOG],
    }),

    deleteCommentOnBlog: builder.mutation<any, DeleteCommentArgs>({
      query: ({ id }) => ({ url: `/comments/${id}`, method: "DELETE" }),
      async onQueryStarted({ id, blogId }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          commentApi.util.updateQueryData(
            "getAllCommentsOnSingleBlog",
            blogId,
            (draft) => {
              const idx = draft.findIndex((c) => c?._id === id);
              if (idx !== -1) draft.splice(idx, 1);
            },
          ),
        );
        const undoCount = bumpBlogCommentsCount(blogId, -1);
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
          undoCount();
        }
      },
      invalidatesTags: [API_CACHE_TAGS.ANALYTICS_BLOG],
    }),
  }),
});

export const {
  useGetAllCommentsOnSingleBlogQuery,
  useAddCommentOnBlogMutation,
  useUpdateCommentOnBlogMutation,
  useDeleteCommentOnBlogMutation,
} = commentApi;
export default commentApi;
