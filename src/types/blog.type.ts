export interface User {
    _id: string;
    name: string;
    email: string;
    photo: string;
  }
  
  export interface Reply {
    _id: string;
    user: string;
    comment: string;
    createdAt: string;
  }
  
  export interface TCommentData {
    _id: string;
    blog: string;
    user: User;
    comment: string;
    replies: Reply[];
    createdAt: string;
    updatedAt: string;
  }