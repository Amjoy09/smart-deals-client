import { use, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const { logInUser, googleLogIn, setCustomer } = use(AuthContext);
  const [show, setShow] = useState(false);

  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email?.value;
    const password = e.target.password?.value;

    logInUser(email, password)
      .then((res) => {
        console.log(res);
        toast.success("Log In Successful");
        setCustomer(res.user);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.messages);
      });
  };

  const handleGoogleLogIn = () => {
    googleLogIn()
      .then((res) => {
        console.log(res);
        toast.success("Log In with Google Successful");
        setCustomer(res.user);
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
            placeholder="Email"
            className="input w-full mb-3"
            required
          />

          <div className="relative">
            <input
              name="password"
              type={show ? "text" : "password"}
              placeholder="Password"
              className="input w-full mb-3"
              required
            />
            <button
              onClick={() => setShow(!show)}
              className="absolute right-3 top-2.5 cursor-pointer"
            >
              {show ? "HIDE" : "SHOW"}
            </button>
          </div>

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
