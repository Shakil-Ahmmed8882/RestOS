// GoogleSignInButton.jsx
import React from "react";
import { useTheme } from "next-themes";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
// @ts-ignore
import google_icon from "../../../assets/img/icons8-google-48.png";
import { useAuth } from "../../../Utils/useAuthHelper";
import { useCreateUserMutation } from "../../../redux/features/user/userApi";

const GoogleSignInButton = () => {
  const { theme } = useTheme();
  const goTo = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  // @ts-ignore
  const { googleSignIn } = useAuth();
  const [createUserInDB, { data }] = useCreateUserMutation();



  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        // creating a token
        // xios
        //   .post("jwt", { email: user?.email })
        //   .then((res) => console.log(res.data))
        //   .catch((err) => console.log(err));

        // storing user here
        const currentUser = {
          name: result?.user?.displayName,
          email: result?.user?.email,
          photo: result?.user?.photoURL,
          role: "user",
        };

        // Navigate to the previous
        // page & save user
        goTo(from, { replace: true });
        createUserInDB(currentUser);

        if (data) {
          return toast.success("Successfully signed in");
        }
      })
      .catch((err) => console.log(err.message));
  };
  

  return (
    <button
            onClick={handleGoogleSignIn}
            className={`flex justify-center items-center gap-2 ${
              theme == "dark" ? "text-[white]" : ""
            } py-9`}
          >
            <img className="w-8" src={google_icon} alt="" />
            Sign in with google
          </button>
  );
};

export default GoogleSignInButton;
