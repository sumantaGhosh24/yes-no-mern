import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {FaBars, FaChevronDown, FaTimes} from "react-icons/fa";

import {useSendLogoutMutation} from "../app/features/auth/authApiSlice";
import {selectCurrentToken} from "../app/features/auth/authSlice";
import {usePrimaryColor} from "./primary-provider";
import {Loading, ModeToggle, PrimaryToggle} from "./";

const AuthHeader = () => {
  const [navbar, setNavbar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
        <li className="relative text-white hover:text-gray-300 transition-all">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center justify-between w-full py-2 pl-3 pr-4 md:p-0 md:w-auto focus:outline-none"
          >
            Admin
            <FaChevronDown className="ml-2" />
          </button>
          {dropdownOpen && (
            <div
              className={`md:absolute md:top-full md:left-0 mt-2 md:mt-0 bg-${primaryColor}-700 hover:bg-${primaryColor}-800 rounded-md shadow-lg py-1 z-10 w-48`}
            >
              <Link
                to="/users"
                className="block px-4 py-2 text-white hover:bg-gray-700 transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                Users
              </Link>
              <Link
                to="/categories"
                className="block px-4 py-2 text-white hover:bg-gray-700 transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/questions"
                className="block px-4 py-2 text-white hover:bg-gray-700 transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                Questions
              </Link>
              <Link
                to="/transactions"
                className="block px-4 py-2 text-white hover:bg-gray-700 transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                Transactions
              </Link>
              <Link
                to="/entries"
                className="block px-4 py-2 text-white hover:bg-gray-700 transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                Entries
              </Link>
            </div>
          )}
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
