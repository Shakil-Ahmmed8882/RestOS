export interface BlogAuthor {
  _id?: string;
  name: string;
  email?: string;
  photo?: string | null;
  role?: string;
}

export interface BlogItem {
  _id: string;
  title: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  description?: string;
  instructions?: string[];
  image?: string;
  category?: string;
  tags?: string[];
  status?: "pending" | "approved" | "test-approved";
  author?: BlogAuthor;
  createdAt?: string;
  upvotes?: number;
  downvotes?: number;
  commentsCount?: number;
}

export interface BlogComment {
  _id: string;
  comment: string;
  /** May be the ObjectId string OR the populated user — handle both. */
  user?: BlogAuthor | string;
  blog: string;
  /** Optional Cloudinary URL. Older comments won't have it. */
  image?: string | null;
  imagePublicId?: string | null;
  createdAt?: string;
  updatedAt?: string;
  replies?: BlogReply[];
  /** Local-only: flagged for optimistic-add rows until the server confirms. */
  _pending?: boolean;
  /** Local-only: temp id used to splice the optimistic doc with the server response. */
  _tempId?: string;
  /** Local-only: blob URL of the picked file — must be revoked on swap. */
  _localImageUrl?: string;
}

export interface BlogReply {
  _id: string;
  /**
   * The server stores the reply body on `comment`. The client API takes
   * `replyText` on submit and the docs use `replyText`, but populated
   * responses come back as `comment`. Read via `reply.comment ?? reply.replyText`.
   */
  comment?: string;
  replyText?: string;
  user?: BlogAuthor | string;
  createdAt?: string;
  updatedAt?: string;
  _pending?: boolean;
  _tempId?: string;
}
