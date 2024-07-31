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
        <h1 className="text-5xl font-bold text-[white] py-4">
          Hey welcome to RestOS{" "}
        </h1>
        <p
          className={`text-center ${
            theme == "dark" ? "text-[white]" : "bg-[#ffffffd1] rounded-lg p-3"
          }`}
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis at
          accusamus saepe, dicta deserunt dolorum voluptatem fugit minus tempora
          impedit. Earum consectetur ad tempore perferendis numquam laudantium
          inventore, repudiandae adipisci?
        </p>
      </div>
    </div>
  );
};

export default SignIn;
