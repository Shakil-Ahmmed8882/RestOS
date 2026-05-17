export type TBlogAuthor = {
  name?: string;
  user?:
    | string
    | {
        _id?: string;
        name?: string;
        email?: string;
        photo?: string;
      };
};

export type TBlogStatus = "pending" | "approved" | "test-approved";

export type TBlog = {
  _id: string;
  title: string;
  category?: string;
  description?: string;
  instructions?: string[];
  tags?: string[];
  image?: string;
  author?: TBlogAuthor;
  status?: TBlogStatus;
  upvotes?: number;
  downvotes?: number;
  commentsCount?: number;
  createdAt?: string;
  updatedAt?: string;
};

export const getAuthorName = (author?: TBlogAuthor): string => {
  if (!author) return "Unknown";
  if (typeof author.user === "object" && author.user?.name) return author.user.name;
  return author.name ?? "Unknown";
};

export const getAuthorPhoto = (author?: TBlogAuthor): string | undefined => {
  if (typeof author?.user === "object") return author.user?.photo;
  return undefined;
};
