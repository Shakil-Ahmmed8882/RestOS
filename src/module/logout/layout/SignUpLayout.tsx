import { useTheme } from "next-themes";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import {NotificationManager} from 'react-notifications';
import toast from "react-hot-toast";
import React from "react";

import { validate } from "../../../Utils/Validate";
import { useAuth } from "../../../Utils/useAuthHelper";
import { imageUpload } from "../../../api/utils";
import { useLoginUserMutation } from "../../../redux/features/auth/auth.api";
import verifyToken from "../../../helpers/verifyToken";
import { useAppDispatch } from "../../../redux/hooks";
import { setUser } from "../../../redux/features/auth/auth.slice";

const SignUpLayout = () => {
  const { theme } = useTheme();

  const [LoginUserFromDB] = useLoginUserMutation();
  // @ts-ignore
  const { createUser, updateUserInfo } = useAuth();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const goTo = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form);
    const imageData = await imageUpload(data.photo);
    const email = data.email;
    const name = data.name;
    const photo = imageData?.data?.display_url;
    const password = data.password;

    // data for storing in database

    // input validation
    const hasError = validate(name, email, photo, password);
    if (hasError) return;

    // e.target.reset();

    // create user here
    createUser(email, password).then(async (result) => {
      // goTo(location.state ? location.state : "/");
      updateUserInfo(name, photo);

      // storing user here
      const userDataToSaveInDB = {
        name,
        email,
        photo,
        password,
      };

      try {
        const response: any = await LoginUserFromDB(userDataToSaveInDB);
        if (response.data.success) {
          const { accessToken } = response.data.data;
          // Store the access token in localStorage
          const decodedUser = verifyToken(accessToken);
          dispatch(setUser({ user: decodedUser, token: accessToken }));

          // Redirect user and notify success
          goTo(from, { replace: true });
          toast.success("Successfully signed in");
        }
      } catch (error) {
        console.log(error.message);
      }

      if (data) {
        goTo(from, { replace: true });
        return toast.success("Successfully created an account");
      }
    });
  };

  return (
    <div
      className={`  md:flex ${
        theme == "dark" ? "bg-[black]" : "light-[white]"
      }`}
    >
      <div
        className={`${
          theme == "dark"
            ? "bg-dark-sign-up text-[white]"
            : "bg-light-sign-up text-[black]"
        } w-full flex-1 h-screen flex flex-col p-3 justify-center items-center`}
      ></div>
      <div className="card flex-shrink-0  w-full flex-1 h-screen  justify-center ">
        <div className="flex flex-col justify-center">
          <form onSubmit={handleSignUp} className={`mx-8`}>
            <div className="form-control">
              <label className="label">
                <span
                  className={`label-text ${
                    theme == "dark" ? "text-[white]" : ""
                  } py-2`}
                >
                  Name
                </span>
              </label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                className={`input input-bordered ${
                  theme === "dark" ? "bg-[#3c3c3c] text-[white]" : ""
                }`}
              />
            </div>
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
                placeholder="Email"
                name="email"
                className={`input input-bordered ${
                  theme === "dark" ? "bg-[#3c3c3c] text-[white]" : ""
                }`}
              />
            </div>
            {/* photo url */}
            <div className="form-control">
              <label className="label">
                <span
                  className={`label-text ${
                    theme == "dark" ? "text-[white]" : ""
                  } py-2`}
                >
                  Photo
                </span>
              </label>
              <input
                type="file"
                placeholder="Photo URL"
                name="photo"
                className={`input input-bordered ${
                  theme === "dark" ? "bg-[#3c3c3c] text-[white]" : ""
                }`}
              />
            </div>
            {/* password */}
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
              />
            </div>
            <div className={`form-control mt-6`}>
              <button
                className={`btn ${
                  theme == "dark"
                    ? "bg-[white]"
                    : "bg-primaryColor hover:bg-[#cb3890] text-[white]"
                }`}
                type="submit"
              >
                Sign up
              </button>
            </div>
          </form>
          <div
            className={`flex gap-3 items-center justify-center pt-7  ${
              theme == "dark" ? "text-[white]" : ""
            }`}
          >
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className={` ${
                theme == "dark" ? "text-[white] underline" : "text-[blue]"
              }`}
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpLayout;
