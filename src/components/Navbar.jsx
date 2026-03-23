import { NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { use } from "react";
import { toast } from "react-toastify";

const Navbar = () => {
  const { customer, logOutUser, setCustomer } = use(AuthContext);
  const handleLogOut = () => {
    logOutUser()
      .then((res) => {
        console.log(res);
        toast.success("Sign Out Successful");
        setCustomer(null);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  const Links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <NavLink to="/all-products">All Products</NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {Links}
            </ul>
          </div>
          <NavLink to="/" className="text-2xl font-semibold cursor-pointer">
            <span className="text-primary">Smart</span>
            <span className="text-primary-gradient">Deals</span>
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{Links}</ul>
        </div>
        <div className="navbar-end space-x-10">
          {customer && (
            <img
              className="h-17 w-17 rounded-full"
              src={customer.photoURL || "https://via.placeholder.com/88"}
              alt=""
            />
          )}
          {customer ? (
            <NavLink onClick={handleLogOut} className="btn btn-primary">
              LogOut
            </NavLink>
          ) : (
            <NavLink className="btn btn-primary" to="/login">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
