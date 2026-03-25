import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { use, useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const {
    createUser,
    logOutUser,
    nameAndPhotoUpdate,
    verifyEmail,
    setCustomer,
  } = use(AuthContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email?.value;
    const password = e.target.password?.value;
    const displayName = e.target.displayName?.value;
    const photoURL = e.target.photoURL?.value;

    const regExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!regExp.test(password)) {
      return toast.error(
        "Please use 8+ characters with a mix of letters (upper & lower), numbers, and symbols.",
      );
    }

    createUser(email, password)
      .then(() => {
        return nameAndPhotoUpdate(displayName, photoURL);
      })
      .then(() => {
        return verifyEmail();
      })
      .then(() => {
        return logOutUser();
      })
      .then(() => {
        setCustomer(null);
        toast.success("Account created! Please verify your email");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })

      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-96 bg-base-100 shadow-xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

        <form onSubmit={handleRegister}>
          <input
            name="name"
            placeholder="Name"
            className="input w-full mb-3"
            required
          />
          <input
            name="photo"
            placeholder="Photo URL"
            className="input w-full mb-3"
            required
          />
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
            <span className="absolute right-3 top-2.5 cursor-pointer">
              <button
                onClick={() => setShow(!show)}
                type="button"
                className="cursor-pointer"
              >
                {show ? "HIDE" : "SHOW"}
              </button>
            </span>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
          <div className="divider">OR</div>
          <button
            type="button"
            className="btn w-full bg-white text-black border"
          >
            <FcGoogle size={24} />
            Register with Google
          </button>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:underline
            "
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
