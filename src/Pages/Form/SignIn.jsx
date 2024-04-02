import { useTheme } from "next-themes";
import google_icon from "../../assets/img/icons8-google-48.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Utils/useAuthHelper";
import toast from "react-hot-toast";
import { useAxios } from "../../🔗Hook/useAxios";

const SignIn = () => {
  const xios = useAxios();
  const { theme } = useTheme();
  const goTo = useNavigate();
  const location = useLocation();
  const { login, googleSignIn, user } = useAuth();

  const handleSignin = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form);

    login(data.email, data.password)
      .then(() => {
        e.target.reset();
        toast.success("Successfully Signed in");
        goTo(from, { replace: true })

        // creating a token
        xios
          .post("jwt", { email: user?.email })
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => toast.error(err.toString()));
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        toast.success("Signed in with google");
        goTo(from, { replace: true })

        // creating a token
        xios
          .post("jwt", { email: user?.email })
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));

        // storing user here
        const currentUser = {
          name: result?.user?.displayName,
          email: result?.user?.email,
          photo: result?.user?.photoURL,
          role:"user"
        };
        xios
          .post("user", currentUser)
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className={`  md:flex ${
        theme == "dark" ? "bg-[black]" : "light-[white]"
      }`}>
      <div className="card flex-shrink-0  w-full flex-1 h-screen  justify-center ">
        <div className="flex flex-col justify-center">
          <form onSubmit={handleSignin} className={`mx-8`}>
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
                type="submit">
                Sign in
              </button>
            </div>
          </form>
          <div
            className={`flex gap-3 items-center justify-center pt-7  ${
              theme == "dark" ? "text-[white]" : ""
            }`}>
            Don&apos;t have account?{" "}
            <Link
              to="/sign-up"
              className={` ${
                theme == "dark" ? "text-[white] underline" : "text-[blue]"
              }`}>
              Sign up
            </Link>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className={`flex justify-center items-center gap-2 ${
              theme == "dark" ? "text-[white]" : ""
            } py-9`}>
            <img className="w-8" src={google_icon} alt="" />
            Sign in with google
          </button>
        </div>
      </div>
      <div
        className={`${
          theme == "dark"
            ? "bg-dark-sign-in text-[white]"
            : "bg-light-food text-[black]"
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
    </div>
  );
};

export default SignIn;
