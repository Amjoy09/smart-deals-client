import { use, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const { logInUser, googleLogIn, setCustomer, resetPassword } =
    use(AuthContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";
  const emailRef = useRef();

  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email?.value;
    const password = e.target.password?.value;

    logInUser(email, password)
      .then((res) => {
        console.log(res);
        toast.success("Log In Successful");
        setCustomer(res.user);
        navigate(from);
      })
      .catch((err) => {
        const code = err.code;

        if (code === "auth/invalid-credential") {
          toast.error("Invalid email or password");
        } else if (code === "auth/user-not-found") {
          toast.error("No account found with this email");
        } else if (code === "auth/wrong-password") {
          toast.error("Incorrect password");
        } else if (code === "auth/invalid-email") {
          toast.error("Invalid email format");
        } else if (code === "auth/user-disabled") {
          toast.error("This account has been disabled");
        } else if (code === "auth/too-many-requests") {
          toast.error("Too many attempts. Try again later");
        } else if (code === "auth/network-request-failed") {
          toast.error("Network error. Check your internet");
        } else if (code === "auth/internal-error") {
          toast.error("Something went wrong. Try again");
        } else {
          toast.error("Login failed");
        }

        console.log(err);
      });
  };

  const handleForgetPass = () => {
    const email = emailRef.current?.value;
    resetPassword(email)
      .then((res) => {
        console.log(res);
        toast.info("Check your Email to verify Password");
      })
      .catch((err) => console.log(err.code));
  };

  const handleGoogleLogIn = () => {
    googleLogIn()
      .then((res) => {
        console.log(res);

        toast.success("Log In with Google Successful");
        setCustomer(res.user);
        navigate(from);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.messages);
      });
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-96 bg-base-100 shadow-xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <form onSubmit={handleLogIn}>
          <input
            name="email"
            ref={emailRef}
            placeholder="Email"
            className="input w-full mb-3"
            required
          />

          <div className="relative">
            <input
              name="password"
              type={show ? "text" : "password"}
              placeholder="Password"
              className="input w-full"
              required
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-2.5 cursor-pointer"
            >
              {show ? "HIDE" : "SHOW"}
            </button>
          </div>

          <button
            onClick={handleForgetPass}
            type="button"
            className="hover:underline cursor-pointer my-3"
          >
            Forget Password?
          </button>

          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
          <div className="divider">OR</div>
          <button
            onClick={handleGoogleLogIn}
            type="button"
            className="btn w-full bg-white text-black border"
          >
            <FcGoogle size={24} />
            Login with Google
          </button>

          <p className="text-center mt-3">
            New here?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
