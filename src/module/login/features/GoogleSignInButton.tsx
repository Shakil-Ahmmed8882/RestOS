// GoogleSignInButton.jsx
import React from "react";
import { useTheme } from "next-themes";
import { useNavigate, useLocation} from "react-router-dom";
// @ts-ignore
import google_icon from "../../../assets/img/icons8-google-48.png";
import { useAuth } from "../../../Utils/useAuthHelper";
import { useLoginUserMutation } from "../../../redux/features/auth/auth.api";
import { useAppDispatch } from "../../../redux/hooks";
import { setUser } from "../../../redux/features/auth/auth.slice";
import verifyToken from "../../../helpers/verifyToken";
import { USER_ROLE } from "../../../constants";
import { toast } from "sonner";

const GoogleSignInButton = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
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

      const loginToastId = toast.loading("Logging in..");

      try {
        const response: any = await LoginUserFromDB(
          LoginUsercurrentUserToSaveInDB
        );
       
        if (response.data.success) {
          const { accessToken } = response.data.data;
          const decodedUser = verifyToken(accessToken);
          dispatch(setUser({user:decodedUser,token:accessToken}))
    
          // goTo( from, { replace: true });
          navigate(`/${decodedUser.role === USER_ROLE.ADMIN?"admin/dashboard":"user"}`);
          toast.success("Successfully signed in", {id: loginToastId});
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
