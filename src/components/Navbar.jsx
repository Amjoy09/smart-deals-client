import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { use } from "react";
import { toast } from "react-toastify";
import { MoonLoader } from "react-spinners";

const Navbar = () => {
  const { customer, logOutUser, setCustomer, loading } = use(AuthContext);

  const navigate = useNavigate();
  const handleLogOut = () => {
    logOutUser()
      .then((res) => {
        console.log(res);
        toast.success("Sign Out Successful");
        setCustomer(null);
        navigate("/login");
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

      {customer && (
        <>
          {" "}
          <li>
            <NavLink to="/my-profile">Profile</NavLink>
          </li>
          <li>
            {" "}
            <NavLink to="/my-products">My Products</NavLink>
          </li>
          <li>
            <NavLink to="/my-bids">My Bids</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm px-8">
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
          <NavLink to="/" className="text-2xl font-bold cursor-pointer">
            <span>Smart</span>
            <span className="text-gradient">Deals</span>
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{Links}</ul>
        </div>
        <div className="navbar-end space-x-10">
          {loading ? (
            <MoonLoader color="blue" size={37} />
          ) : customer ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="cursor-pointer m-1">
                <img
                  className="h-12 w-12 rounded-full"
                  src={
                    customer?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt=""
                />
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm space-y-1"
              >
                <li>
                  <p className="text-lg text-center">{customer?.displayName}</p>
                </li>
                <li>
                  <p>{customer?.email}</p>
                </li>
                <button className="btn btn-primary" onClick={handleLogOut}>
                  LogOut
                </button>
              </ul>
            </div>
          ) : (
            <NavLink to="/login">
              <button className="btn bg-gradient">Login</button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
