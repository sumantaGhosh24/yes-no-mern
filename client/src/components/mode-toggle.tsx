import {useState} from "react";
import {FaMoon, FaSun} from "react-icons/fa";

import {useTheme} from "./theme-provider";

const ModeToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const {setTheme, theme} = useTheme();

  return (
    <div className="relative inline-block text-left mb-5 md:mb-0">
      <div>
        <button
          onClick={toggleDropdown}
          type="button"
          className="inline-flex justify-center w-fit rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white dark:bg-black text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <button className="flex items-center justify-center">
            {theme === "dark" ? <FaMoon /> : <FaSun />}

            <span className="sr-only">Toggle theme</span>
          </button>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-black ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            <button
              className="text-gray-700 dark:text-white block px-4 py-2 text-sm"
              onClick={() => setTheme("light")}
            >
              Light
            </button>
            <button
              className="text-gray-700 dark:text-white block px-4 py-2 text-sm"
              onClick={() => setTheme("dark")}
            >
              Dark
            </button>
            <button
              className="text-gray-700 dark:text-white block px-4 py-2 text-sm"
              onClick={() => setTheme("system")}
            >
              System
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModeToggle;
