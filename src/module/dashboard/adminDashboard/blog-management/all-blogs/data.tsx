import { MessageCircle, Notebook, ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";

export const blogCategories = [
    { title: "Technology", icon: "⚙️" },
    { title: "Food", icon: "🍔" },
    { title: "Travel", icon: "✈️" },
    { title: "Fashion", icon: "👗" },
    { title: "Health", icon: "🏥" },
    { title: "Lifestyle", icon: "🏡" },
    { title: "Education", icon: "📚" },
    { title: "Music", icon: "🎶" },
    { title: "Sports", icon: "⚽" },
    { title: "Finance", icon: "💰" },
  ];
  

  export const blogStats= [
    { title: 'All Blogs', count: '120', icon: <Notebook className="size-5 text-[gray]" /> },
    { title: 'Total Comments', count: '350', icon: <MessageCircle className="text-deepPink" />, highlighted: true },
    { title: 'Total Likes', count: '5,840', icon: <ThumbsUp className="text-primaryColor shadow-primaryColor size-6" /> },
    { title: 'Total Dislikes', count: '1,234', icon: <ThumbsDown className="size-6 text-deepPink font-bold shadow-primaryPink" /> },
  ];