import { baseApi } from "@/redux/featureApi/baseApi";
import { API_CACHE_TAGS } from "@/cache/API_CACHE_KEY";
import { store } from "@/redux/store";
import blogApi from "@/redux/featureApi/blogApi";
import type { BlogComment } from "@/modules/blog/types/blog.types";

/**
 * Bump the commentsCount on every cached blog list entry containing
 * the matching blog id. Returns an undo function for rollback.
 *
 * Lives here because the comment mutation is the source of truth for
 * count changes — the blog list cache is just a derived view.
 */
function bumpBlogCommentsCount(blogId: string, delta: 1 | -1): () => void {
  const undoFns: Array<() => void> = [];
  try {
    const state = store.getState();
    const argsList = blogApi.util.selectCachedArgsForQuery(
      state,
      "getAllBlogs",
    );
    argsList.forEach((args) => {
      try {
        const patch = store.dispatch(
          blogApi.util.updateQueryData("getAllBlogs", args, (draft: any) => {
            const list = Array.isArray(draft?.data) ? draft.data : null;
            if (!list) return;
            const blog = list.find((b: any) => b?._id === blogId);
            if (!blog) return;
            const current =
              typeof blog.commentsCount === "number" ? blog.commentsCount : 0;
            blog.commentsCount = Math.max(0, current + delta);
          }),
        );
        undoFns.push(() => patch.undo());
      } catch {
        /* skip this cache entry */
      }
    });
  } catch {
    /* noop */
  }

  // Detail page may also display the count — patch that too.
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
