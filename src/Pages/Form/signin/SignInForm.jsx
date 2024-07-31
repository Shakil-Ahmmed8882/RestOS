// SignIn.jsx
import React from "react";
import { useTheme } from "next-themes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleSignInButton from "./GoogleSignInButton";
import { useCreateUserMutation } from "../../../redux/features/user/userApi";
import toast from "react-hot-toast";
import { useAuth } from "../../../Utils/useAuthHelper";

const SignInForm = () => {
  const [createUserInDB, { data, isLoading }] = useCreateUserMutation();
  const { theme } = useTheme();
  const goTo = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  // @ts-ignore
  const { login, googleSignIn, user } = useAuth();

  const handleSignin = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form);

    login(data.email, data.password)
      .then((res) => {
        // Navigate to the previous
        // page & save user
        goTo(from, { replace: true });
        toast.success("Successfully signed in");

        // creating a token
        // xios
        //   .post("jwt", { email: user?.email })
        //   .then((res) => console.log(res.data))
        //   .catch((err) => console.log(err));
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
