import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import {toast} from "react-toastify";

import {useTitle} from "../hooks";
import {useLoginMutation} from "../app/features/auth/authApiSlice";
import {PublicHeader} from "../components";
import {usePrimaryColor} from "../components/primary-provider";

const Login = () => {
  useTitle("Login");

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const {primaryColor} = usePrimaryColor();

  const navigate = useNavigate();

  const [login, {isLoading}] = useLoginMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setUser({...user, [name]: value});
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const {message} = await login(user).unwrap();
      toast.success(message, {toastId: "login-success"});
      navigate("/login-verify");
    } catch (error: any) {
      if (error.status === "FETCH_ERROR") {
        toast.error("server error", {toastId: "login-error"});
      } else {
        if (typeof error.data.message === "object") {
          toast.error(error?.data?.message[0], {toastId: "login-error"});
        } else {
          toast.error(error?.data?.message, {toastId: "login-error"});
        }
      }
    }
  };

  return (
    <>
      <PublicHeader />
      <section className="container p-6 mx-auto bg-white dark:bg-black rounded-md shadow-md shadow-black dark:shadow-white my-20">
        <h2 className="text-xl font-bold text-black dark:text-white capitalize mb-5">
          Login User
        </h2>
        <form onSubmit={handleLogin}>
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
          </div>
          <button
            type="submit"
            className={`w-fit bg-${primaryColor}-700 text-white px-4 py-2 rounded-md hover:bg-${primaryColor}-800 transition-colors disabled:bg-${primaryColor}-300 my-5`}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Login"}
          </button>
        </form>
        <p className="text-left text-black dark:text-white text-lg">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className={`text-${primaryColor}-500 hover:underline`}
          >
            register
          </Link>
        </p>
        <p className="text-left text-black dark:text-white text-lg">
          Don&apos;t remember your password?{" "}
          <Link
            to="/forgot-password"
            className={`text-${primaryColor}-500 hover:underline`}
          >
            forgot password
          </Link>
        </p>
      </section>
    </>
  );
};

export default Login;
