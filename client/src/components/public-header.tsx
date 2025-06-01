import {useState} from "react";
import {Link} from "react-router-dom";
import {FaBars, FaTimes} from "react-icons/fa";

import ModeToggle from "./mode-toggle";
import PrimaryToggle from "./primary-toggle";
import {usePrimaryColor} from "./primary-provider";

const PublicHeader = () => {
  const [navbar, setNavbar] = useState(false);

  const {primaryColor} = usePrimaryColor();

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
              <li className="text-white hover:text-gray-300 transition-all">
                <Link to="/">Public</Link>
              </li>
              <li className="text-white hover:text-gray-300 transition-all">
                <Link to="/register">Register</Link>
              </li>
              <li className="text-white hover:text-gray-300 transition-all">
                <Link to="/login">Login</Link>
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

export default PublicHeader;
