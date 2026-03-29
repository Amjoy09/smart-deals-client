import { FcGoogle } from "react-icons/fc";
import { Link, Navigate, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { use, useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const {
    createUser,
    logOutUser,
    nameAndPhotoUpdate,
    verifyEmail,
    customer,
    setCustomer,
  } = use(AuthContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  if (customer) {
    return <Navigate to="/" />;
  }

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
      .then((result) => {
        console.log(result);

        return nameAndPhotoUpdate(displayName, photoURL).then(() => {
          return result.user;
        });
      })
      .then((user) => {
        const newCustomer = {
          name: displayName,
          email: user.email,
          image: photoURL,
        };

        return fetch("http://localhost:3000/customers", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newCustomer),
        });
      })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data after user save", data);
        return verifyEmail;
      })
      .then(() => {
        return logOutUser();
      })
      .then(() => {
        setCustomer(null);
        toast.success("Account Created. Please Verify Email");
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
        <h2 className="text-2xl font-semibold text-center mb-6">
          Register Now!
        </h2>

        <form onSubmit={handleRegister}>
          <input
            name="displayName"
            placeholder="Name"
            className="input w-full mb-3"
            required
          />
          <input
            name="photoURL"
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

          <button type="submit" className="btn bg-gradient w-full">
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
              className="text-gradient font-semibold hover:underline
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
