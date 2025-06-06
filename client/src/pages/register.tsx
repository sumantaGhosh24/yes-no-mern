import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import {toast} from "react-toastify";

import {useTitle} from "../hooks";
import {useRegisterMutation} from "../app/features/auth/authApiSlice";
import {PublicHeader} from "../components";
import {usePrimaryColor} from "../components/primary-provider";

const Register = () => {
  useTitle("Register");

  const [user, setUser] = useState({
    email: "",
    mobileNumber: "",
    password: "",
    cf_password: "",
  });

  const {primaryColor} = usePrimaryColor();

  const navigate = useNavigate();

  const [register, {isLoading}] = useRegisterMutation();

  const handleChange = (e: ChangeEvent<any>) => {
    const {name, value} = e.target;
    setUser({...user, [name]: value});
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (user.password !== user.cf_password) {
        return toast.error("Password and confirm password not match", {
          toastId: "register-error",
        });
      }

      const {message} = await register(user).unwrap();
      setUser({
        email: "",
        mobileNumber: "",
        password: "",
        cf_password: "",
      });
      toast.success(message, {toastId: "register-success"});
      navigate("/register-verify");
    } catch (error: any) {
      if (error.status === "FETCH_ERROR") {
        toast.error("server error", {toastId: "register-error"});
      } else {
        if (typeof error.data.message === "object") {
          toast.error(error?.data?.message[0], {toastId: "register-error"});
        } else {
          toast.error(error?.data?.message, {toastId: "register-error"});
        }
      }
    }
  };

  return (
    <>
      <PublicHeader />
      <section className="container p-6 mx-auto bg-white dark:bg-black rounded-md shadow-lg dark:shadow-white my-20">
        <h1 className="text-xl font-bold text-black dark:text-white capitalize mb-5">
          Register User
        </h1>
        <form onSubmit={handleRegister}>
          <div className="mt-4 flex flex-col gap-4">
            <div>
              <label className="text-black dark:text-white" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email address"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                onChange={handleChange}
                value={user.email}
                required
              />
            </div>
            <div>
              <label
                className="text-black dark:text-white"
                htmlFor="mobileNumber"
              >
                Mobile Number
              </label>
              <input
                id="mobileNumber"
                name="mobileNumber"
                type="text"
                placeholder="Enter mobile number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                onChange={handleChange}
                value={user.mobileNumber}
                required
              />
            </div>
            <div>
              <label className="text-black dark:text-white" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                onChange={handleChange}
                value={user.password}
                required
              />
            </div>
            <div>
              <label
                className="text-black dark:text-white"
                htmlFor="cf_password"
              >
                Confirm Password
              </label>
              <input
                id="cf_password"
                name="cf_password"
                type="password"
                placeholder="Enter confirm password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                onChange={handleChange}
                value={user.cf_password}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className={`w-fit bg-${primaryColor}-700 text-white px-4 py-2 rounded-md hover:bg-${primaryColor}-800 transition-colors disabled:bg-${primaryColor}-300 my-5`}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Register"}
          </button>
        </form>
        <p className="text-left text-black dark:text-white text-lg">
          Already have an account?{" "}
          <Link
            to="/login"
            className={`text-${primaryColor}-500 hover:underline`}
          >
            login
          </Link>
        </p>
      </section>
    </>
  );
};

export default Register;
