import { useTheme } from "next-themes";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Utils/useAuthHelper";
// import {NotificationManager} from 'react-notifications';
import toast from "react-hot-toast";

const SignUp = () => {
  const { theme } = useTheme();
  const { createUser, updateUserInfo } = useAuth();
  const goTo = useNavigate();
  // console.log(createUser)

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form);
    const email = data.email;
    const name = data.name;
    const photo = data.photo;
    const password = data.password;

    // input validation
    if (name === "") {
      toast.error("Plase input your name");
      return;
    }

    if (email === "") {
      toast.error("Plase input your email");
      return;
    }

    if (photo === "") {
      toast.error("Plase input your photo url");
      return;
    }

    if (password === "") {
      toast.error("Plase input your password");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (!/^(?=.*[A-Z]).*$/.test(password)) {
      toast.error("Password must contain at least one capital letter.");
      return;
    }
    if (!/^[a-zA-Z0-9]*$/.test(password)) {
      toast.error("Password must contain at least one special character.");
      return;
    }

    e.target.reset();

    // create user here
    createUser(email, password)
      .then(() => {
        toast.success("Successfully created an account");
        goTo(location.state ? location.state : "/");
        updateUserInfo(name, photo);
      })
      .catch((err) => toast.error(err.toString()));
  };

  return (
    <div
      className={`  md:flex ${
        theme == "dark" ? "bg-[black]" : "light-[white]"
      }`}>
      <div
        className={`${
          theme == "dark"
            ? "bg-dark-sign-up text-[white]"
            : "bg-light-sign-up text-[black]"
        } w-full flex-1 h-screen flex flex-col p-3 justify-center items-center`}>
        <h1 className="text-5xl font-bold text-[white] py-4">
          Hey welcome to RestOS{" "}
        </h1>
        <p
          className={`text-center ${
            theme == "dark" ? "text-[white]" : "bg-[#ffffffd1] rounded-lg p-3"
          }`}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis at
          accusamus saepe, dicta deserunt dolorum voluptatem fugit minus tempora
          impedit. Earum consectetur ad tempore perferendis numquam laudantium
          inventore, repudiandae adipisci?
        </p>
      </div>
      <div className="card flex-shrink-0  w-full flex-1 h-screen  justify-center ">
        <div className="flex flex-col justify-center">
          <form onSubmit={handleSignUp} className={`mx-8`}>
            <div className="form-control">
              <label className="label">
                <span
                  className={`label-text ${
                    theme == "dark" ? "text-[white]" : ""
                  } py-2`}>
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
                  } py-2`}>
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
                  } py-2`}>
                  Photo url
                </span>
              </label>
              <input
                type="text"
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
                  } py-2`}>
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
                type="submit">
                Sign up
              </button>
            </div>
          </form>
          <div
            className={`flex gap-3 items-center justify-center pt-7  ${
              theme == "dark" ? "text-[white]" : ""
            }`}>
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className={` ${
                theme == "dark" ? "text-[white] underline" : "text-[blue]"
              }`}>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
