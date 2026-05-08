export interface BlogAuthor {
  _id?: string;
  name: string;
  email?: string;
  photo?: string | null;
}

export interface BlogItem {
  _id: string;
  title: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  image?: string;
  category?: string;
  tags?: string[];
  author?: BlogAuthor;
  createdAt?: string;
  upvotes?: number;
  downvotes?: number;
  commentsCount?: number;
}

export interface BlogComment {
  _id: string;
  comment: string;
  user?: BlogAuthor;
  blog: string;
  createdAt?: string;
  replies?: BlogReply[];
  _pending?: boolean;
}

export interface BlogReply {
  _id: string;
  replyText: string;
  user?: BlogAuthor;
  comment: string;
  createdAt?: string;
}
