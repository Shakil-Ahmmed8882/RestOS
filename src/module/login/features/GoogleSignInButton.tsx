// GoogleSignInButton.jsx
import React from "react";
import { useTheme } from "next-themes";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
// @ts-ignore
import google_icon from "../../../assets/img/icons8-google-48.png";
import { useAuth } from "../../../Utils/useAuthHelper";
import { useLoginUserMutation } from "../../../redux/features/auth/auth.api";
import { useAppDispatch } from "../../../redux/hooks";
import { setUser } from "../../../redux/features/auth/auth.slice";
import verifyToken from "../../../helpers/verifyToken";

const GoogleSignInButton = () => {
  const { theme } = useTheme();
  const goTo = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  // @ts-ignore
  const { googleSignIn } = useAuth();
  const [LoginUserFromDB, { data }] = useLoginUserMutation();
  const dispatch = useAppDispatch()
  const handleGoogleSignIn = () => {
    googleSignIn().then(async (result) => {


      // storing user here
      const LoginUsercurrentUserToSaveInDB = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        photo: result?.user?.photoURL,
      };

      try {
        const response: any = await LoginUserFromDB(
          LoginUsercurrentUserToSaveInDB
        );
       
        if (response.data.success) {
          const { accessToken } = response.data.data;
          
          const decodedUser = verifyToken(accessToken);
          dispatch(setUser({user:decodedUser,token:accessToken}))
          // Redirect user and notify success
          goTo(from, { replace: true });
          toast.success("Successfully signed in");
        }
      } catch (err) {
        console.log(err.message);
      }
    });
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
