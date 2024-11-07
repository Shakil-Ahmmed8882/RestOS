// src/store/commentSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the Comment type
type Reply = {
  _id: string;
  user: string;
  comment: string;
  createdAt: string;
};

type Comment = {
  _id: string;
  blog: string;
  user: {
    _id: string;
    name: string;
    email: string;
    photo: string;
  };
  comment: string;
  replies: Reply[];
  createdAt: string;
  updatedAt: string;
};

// Define the initial state type
interface CommentState {
  comments: Comment[]; 
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: CommentState = {
  comments: [],
  isLoading: false,
  error: null,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    addLocalComment: (state, action: PayloadAction<Comment>) => {
      state.comments.unshift(action.payload);
    },
    removeLocalComment: (state, action: PayloadAction<string>) => {
      state.comments = state.comments.filter(
        (comment) => comment._id !== action.payload
      );
    },
    updateLocalComment: (state, action: PayloadAction<{ _id: string; text: string }>) => {
      const comment = state.comments.find(
        (comment) => comment._id === action.payload._id
      );
      if (comment) {
        comment.comment = action.payload.text;
      }
    },
  },
});

export const { setComments, addLocalComment, removeLocalComment, updateLocalComment } =
  commentSlice.actions;
export default commentSlice.reducer;
