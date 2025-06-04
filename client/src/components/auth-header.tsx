import {useState, useEffect} from "react";
import {FaBars, FaTimes} from "react-icons/fa";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

import {useSendLogoutMutation} from "../app/features/auth/authApiSlice";
import {selectCurrentToken} from "../app/features/auth/authSlice";
import {usePrimaryColor} from "./primary-provider";
import {Loading, ModeToggle, PrimaryToggle} from "./";

const AuthHeader = () => {
  const [navbar, setNavbar] = useState(false);

  const navigate = useNavigate();
  const {primaryColor} = usePrimaryColor();

  const auth = useSelector(selectCurrentToken);
  let navLinks;

  const [sendLogout, {isLoading, isSuccess, isError, error}] =
    useSendLogoutMutation();

  if (auth?.user?.role === "admin") {
    navLinks = (
      <>
        <li className="text-white hover:text-gray-300 transition-all">
          <Link to="/home">Home</Link>
        </li>
        <li className="text-white hover:text-gray-300 transition-all">
          <Link to="/profile">Profile</Link>
        </li>
        <li className="text-white hover:text-gray-300 transition-all">
          <Link to="/users">Users</Link>
        </li>
        <li className="text-white hover:text-gray-300 transition-all">
          <Link to="/categories">Categories</Link>
        </li>
        <li className="text-white hover:text-gray-300 transition-all">
          <Link to="/questions">Questions</Link>
        </li>
        <li className="text-white hover:text-gray-300 transition-all">
          <Link to="/transactions">Transactions</Link>
        </li>
        <li className="text-white hover:text-gray-300 transition-all">
          <Link to="/entries">Entries</Link>
        </li>
        <li className="text-white hover:text-gray-300 transition-all">
          <Link to="/wallet">Wallet</Link>
        </li>
        <li className="text-white hover:text-gray-300 transition-all">
          <Link to="/my-entries">My Entries</Link>
        </li>
        <li className="text-white hover:text-gray-300 transition-all">
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </>
    );
  }

  if (auth?.user?.role === "user") {
    navLinks = (
      <>
        <li className="text-white hover:text-gray-300 transition-all">
          <Link to="/home">Home</Link>
        </li>
        <li className="text-white hover:text-gray-300 transition-all">
          <Link to="/profile">Profile</Link>
        </li>
        <li className="text-white hover:text-gray-300 transition-all">
          <Link to="/wallet">Wallet</Link>
        </li>
        <li className="text-white hover:text-gray-300 transition-all">
          <Link to="/my-entries">My Entries</Link>
        </li>
        <li className="text-white hover:text-gray-300 transition-all">
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </>
    );
  }

  useEffect(() => {
    if (isSuccess) navigate("/login");
  }, [isLoading, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    toast.error(error, {toastId: "header-error"});
  }

  return (
    <nav className={`w-full bg-${primaryColor}-700 shadow`}>
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link to="/">
              <h2 className="text-2xl font-bold text-white">Yes No</h2>
            </Link>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <FaTimes color="white" size={24} />
                ) : (
                  <FaBars color="white" size={24} />
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              {navLinks}
              <li className="text-white hover:text-gray-300 transition-all">
                <Link to="#" onClick={sendLogout}>
                  Logout
                </Link>
              </li>
              <ModeToggle />
              <PrimaryToggle />
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AuthHeader;
