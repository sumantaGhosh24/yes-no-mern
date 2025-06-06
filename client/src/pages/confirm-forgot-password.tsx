import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {toast} from "react-toastify";

import {
  useConfirmForgotPasswordMutation,
  useValidateConfirmForgotPasswordMutation,
} from "../app/features/auth/authApiSlice";
import {useTitle} from "../hooks";
import {usePrimaryColor} from "../components/primary-provider";
import {PublicHeader} from "../components";

const ConfirmForgotPassword = () => {
  useTitle("Confirm Forgot Password");

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [cookieToken, setCookieToken] = useState(false);
  const [data, setData] = useState({
    password: "",
    cf_password: "",
  });

  const {primaryColor} = usePrimaryColor();

  const navigate = useNavigate();

  const [validateConfirmForgotPassword, {isLoading}] =
    useValidateConfirmForgotPasswordMutation();
  const [confirmForgotPassword, {isLoading: confirmLoading}] =
    useConfirmForgotPasswordMutation();

  const handleChange = (e: ChangeEvent<any>) => {
    const {name, value} = e.target;
    setData({...data, [name]: value});
  };

  const handleValidateConfirmForgotPassword = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const {message} = await validateConfirmForgotPassword(token).unwrap();
      setCookieToken(true);
      toast.success(message, {toastId: "forgot-password-success"});
    } catch (error: any) {
      if (error.status === "FETCH_ERROR") {
        toast.error("server error", {toastId: "forgot-password-error"});
      } else {
        if (typeof error.data.message === "object") {
          toast.error(error?.data?.message[0], {
            toastId: "forgot-password-error",
          });
        } else {
          toast.error(error?.data?.message, {toastId: "forgot-password-error"});
        }
      }
    }
  };

  const handleConfirmForgotPassword = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (data.password !== data.cf_password) {
        return toast.error("Password and confirm password not match", {
          toastId: "forgot-password-error",
        });
      }

      const {message} = await confirmForgotPassword(data).unwrap();
      setData({
        password: "",
        cf_password: "",
      });
      toast.success(message, {toastId: "forgot-password-success"});
      navigate("/login");
    } catch (error: any) {
      if (error.status === "FETCH_ERROR") {
        toast.error("server error", {toastId: "forgot-password-error"});
      } else {
        if (typeof error.data.message === "object") {
          toast.error(error?.data?.message[0], {
            toastId: "forgot-password-error",
          });
        } else {
          toast.error(error?.data?.message, {toastId: "forgot-password-error"});
        }
      }
    }
  };

  return (
    <>
      <PublicHeader />
      {!cookieToken && !token && (
        <div className="flex h-screen items-center justify-center">
          <div className="container mx-auto text-center rounded-lg bg-white dark:bg-black p-8 shadow-lg dark:shadow-white">
            <h1 className="mb-6 text-4xl font-bold">Visit you email address</h1>
            <div className="text-2xl">
              <p>
                A forgot password link send to your email account, click the
                link to activate you account.
              </p>
            </div>
          </div>
        </div>
      )}
      {!cookieToken && token && (
        <div className="flex h-screen items-center justify-center">
          <div className="container mx-auto text-center rounded-lg bg-white dark:bg-black p-8 shadow-lg dark:shadow-white">
            <h1 className="mb-6 text-4xl font-bold">
              Click the below link to forgot your password
            </h1>
            <button
              className="mb-6 rounded-full bg-blue-500 px-8 py-4 font-bold text-white hover:bg-blue-700 disabled:bg-blue-200 text-xl"
              onClick={handleValidateConfirmForgotPassword}
              disabled={isLoading || confirmLoading}
            >
              {isLoading || confirmLoading ? "Processing..." : "Click Me"}
            </button>
            <div className="text-2xl">
              <p>
                After clicking this button you can add a new password to your
                account.
              </p>
            </div>
          </div>
        </div>
      )}
      {cookieToken && (
        <div className="flex h-screen items-center justify-center">
          <div className="container mx-auto rounded-lg bg-white dark:bg-black p-8 shadow-lg dark:shadow-white">
            <h1 className="mb-6 text-4xl font-bold text-center">
              Add New Password
            </h1>
            <form
              onSubmit={handleConfirmForgotPassword}
              className="flex flex-col gap-4"
            >
              <div>
                <label
                  className="text-black dark:text-white"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                  onChange={handleChange}
                  value={data.password}
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
                  value={data.cf_password}
                  required
                />
              </div>
              <button
                type="submit"
                className={`w-fit bg-${primaryColor}-700 text-white px-4 py-2 rounded-md hover:bg-${primaryColor}-800 transition-colors disabled:bg-${primaryColor}-300 my-5`}
                disabled={isLoading || confirmLoading}
              >
                {isLoading || confirmLoading
                  ? "Processing..."
                  : "Forgot Password"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmForgotPassword;
