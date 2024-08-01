import { useTheme } from "next-themes";

import React from "react";
import SignInForm from "./SignInForm";

const SignIn = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`  md:flex ${
        theme == "dark" ? "bg-[black]" : "light-[white]"
      }`}
    >
      <SignInForm />

      <div
        className={`${
          theme == "dark"
            ? "bg-dark-sign-in text-[white]"
            : "bg-light-food text-[black]"
        } w-full flex-1 h-screen flex flex-col p-3 justify-center items-center`}
      >
      
      </div>
    </div>
  );
};

export default SignIn;
