import {useState} from "react";
import {FaPen} from "react-icons/fa";

import {usePrimaryColor} from "./primary-provider";

const PrimaryToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const {setPrimaryColor} = usePrimaryColor();

  return (
    <div className="relative inline-block text-left mb-5 md:mb-0">
      <div>
        <button
          onClick={toggleDropdown}
          type="button"
          className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white dark:bg-black text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <button className="flex items-center justify-center">
            <FaPen />
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
          <div className="flex flex-wrap gap-3 p-3" role="none">
            <button
              className="bg-red-700 rounded-full block px-3 py-3 text-sm w-fit"
              onClick={() => setPrimaryColor("red")}
            >
              <span className="bg-red-700 hover:bg-red-800 text-red-500 disabled:bg-red-300"></span>
            </button>
            <button
              className="bg-orange-700 rounded-full block px-3 py-3 text-sm"
              onClick={() => setPrimaryColor("orange")}
            >
              <span className="bg-orange-700 hover:bg-orange-800 text-orange-500 disabled:bg-orange-300"></span>
            </button>
            <button
              className="bg-amber-700 rounded-full block px-3 py-3 text-sm"
              onClick={() => setPrimaryColor("amber")}
            >
              <span className="bg-amber-700 hover:bg-amber-800 text-amber-500 disabled:bg-amber-300"></span>
            </button>
            <button
              className="bg-yellow-700 rounded-full block px-3 py-3 text-sm"
              onClick={() => setPrimaryColor("yellow")}
            >
              <span className="bg-yellow-700 hover:bg-yellow-800 text-yellow-500 disabled:bg-yellow-300"></span>
            </button>
            <button
              className="bg-lime-700 rounded-full block px-3 py-3 text-sm"
              onClick={() => setPrimaryColor("lime")}
            >
              <span className="bg-lime-700 hover:bg-lime-800 text-lime-500 disabled:bg-lime-300"></span>
            </button>
            <button
              className="bg-green-700 rounded-full block px-3 py-3 text-sm"
              onClick={() => setPrimaryColor("green")}
            >
              <span className="bg-green-700 hover:bg-green-800 text-green-500 disabled:bg-green-300"></span>
            </button>
            <button
              className="bg-emerald-700 rounded-full block px-3 py-3 text-sm"
              onClick={() => setPrimaryColor("emerald")}
            >
              <span className="bg-emerald-700 hover:bg-emerald-800 text-emerald-500 disabled:bg-emerald-300"></span>
            </button>
            <button
              className="bg-teal-700 rounded-full block px-3 py-3 text-sm"
              onClick={() => setPrimaryColor("teal")}
            >
              <span className="bg-teal-700 hover:bg-teal-800 text-teal-500 disabled:bg-teal-300"></span>
            </button>
            <button
              className="bg-cyan-700 rounded-full block px-3 py-3 text-sm"
              onClick={() => setPrimaryColor("cyan")}
            >
              <span className="bg-cyan-700 hover:bg-cyan-800 text-cyan-500 disabled:bg-cyan-300"></span>
            </button>
            <button
              className="bg-sky-700 rounded-full block px-3 py-3 text-sm"
              onClick={() => setPrimaryColor("sky")}
            >
              <span className="bg-sky-700 hover:bg-sky-800 text-sky-500 disabled:bg-sky-300"></span>
            </button>
            <button
              className="bg-blue-700 rounded-full block px-3 py-3 text-sm"
              onClick={() => setPrimaryColor("blue")}
            >
              <span className="bg-blue-700 hover:bg-blue-800 text-blue-500 disabled:bg-blue-300"></span>
            </button>
            <button
              className="bg-indigo-700 rounded-full block px-3 py-3 text-sm"
              onClick={() => setPrimaryColor("indigo")}
            >
              <span className="bg-indigo-700 hover:bg-indigo-800 text-indigo-500 disabled:bg-indigo-300"></span>
            </button>
            <button
              className="bg-violet-700 rounded-full block px-3 py-3 text-sm"
              onClick={() => setPrimaryColor("violet")}
            >
              <span className="bg-violet-700 hover:bg-violet-800 text-violet-500 disabled:bg-violet-300"></span>
            </button>
            <button
              className="bg-purple-700 rounded-full block px-3 py-3 text-sm"
              onClick={() => setPrimaryColor("purple")}
            >
              <span className="bg-purple-700 hover:bg-purple-800 text-purple-500 disabled:bg-purple-300"></span>
            </button>
            <button
              className="bg-fuchsia-700 rounded-full block px-3 py-3 text-sm"
              onClick={() => setPrimaryColor("fuchsia")}
            >
              <span className="bg-fuchsia-700 hover:bg-fuchsia-800 text-fuchsia-500 disabled:bg-fuchsia-300"></span>
            </button>
            <button
              className="bg-pink-700 rounded-full block px-3 py-3 text-sm"
              onClick={() => setPrimaryColor("pink")}
            >
              <span className="bg-pink-700 hover:bg-pink-800 text-pink-500 disabled:bg-pink-300"></span>
            </button>
            <button
              className="bg-rose-700 rounded-full block px-3 py-3 text-sm"
              onClick={() => setPrimaryColor("rose")}
            >
              <span className="bg-rose-700 hover:bg-rose-800 text-rose-500 disabled:bg-rose-300"></span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrimaryToggle;
