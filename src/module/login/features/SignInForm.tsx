// SignIn.jsx
import React from "react";
import { useTheme } from "next-themes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleSignInButton from "./GoogleSignInButton";

import toast from "react-hot-toast";
import { useAuth } from "../../../Utils/useAuthHelper";
import { useLoginUserMutation } from "../../../redux/features/auth/auth.api";
import { useAppDispatch } from "../../../redux/hooks";
import { setUser } from "../../../redux/features/auth/auth.slice";
import verifyToken from "../../../helpers/verifyToken";

const SignInForm = () => {
  const [LoginUserFromDB] = useLoginUserMutation();
  const { theme } = useTheme();
  const goTo = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const dispatch = useAppDispatch();
  // @ts-ignore
  const { login } = useAuth();

  const handleSignin = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form);

    // Login user to firebase
    login(data.email, data.password)
      .then(async (res) => {
        const userDataToSaveInDatabase = {
          name: res.user.displayName,
          email: res.user.email,
        };

        // Login user to database
        const response = await LoginUserFromDB(userDataToSaveInDatabase);
        if (response.data.success) {
          const { accessToken } = response.data.data;

          const decodedUser = verifyToken(accessToken);
          // Set {user:"",token:""} in local state
          dispatch(setUser({ user: decodedUser, token: accessToken }));
          goTo(from, { replace: true });
          toast.success("Successfully signed in");
        }
      })
      .catch((err) => toast.error(err.toString()));
  };

  return (
    <div className="card flex-shrink-0  w-full flex-1 h-screen  justify-center ">
      <div className="flex flex-col justify-center">
        <form onSubmit={handleSignin} className={`mx-8`}>
          <div className="form-control">
            <label className="label">
              <span
                className={`label-text ${
                  theme == "dark" ? "text-[white]" : ""
                } py-2`}
              >
                Email
              </span>
            </label>
            <input
              type="email"
              placeholder="email"
              name="email"
              className={`input input-bordered ${
                theme === "dark" ? "bg-[#3c3c3c] text-[white]" : ""
              }`}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span
                className={`label-text ${
                  theme == "dark" ? "text-[white]" : ""
                } py-2`}
              >
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="password"
              name="password"
              className={`input input-bordered ${
                theme === "dark" ? "bg-[#3c3c3c] text-[white]" : ""
              }`}
              required
            />
          </div>
          <div className={`form-control mt-6`}>
            <button
              className={`btn ${
                theme == "dark"
                  ? "bg-[white]"
                  : "bg-[#2CA58D] hover:bg-[#0FA564] text-[white]"
              }`}
              type="submit"
            >
              Sign in
            </button>
          </div>
        </form>
        <div
          className={`flex gap-3 items-center justify-center pt-7  ${
            theme == "dark" ? "text-[white]" : ""
          }`}
        >
          Don&apos;t have account?{" "}
          <Link
            to="/sign-up"
            className={` ${
              theme == "dark" ? "text-[white] underline" : "text-[blue]"
            }`}
          >
            Sign up
          </Link>
        </div>

        <GoogleSignInButton />
      </div>
    </div>
  );
};

export default SignInForm;
