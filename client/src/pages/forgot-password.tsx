import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

import {useTitle} from "../hooks";
import {useForgotPasswordMutation} from "../app/features/auth/authApiSlice";
import {PublicHeader} from "../components";
import {usePrimaryColor} from "../components/primary-provider";

const ForgotPassword = () => {
  useTitle("Forgot Password");

  const [email, setEmail] = useState("");

  const {primaryColor} = usePrimaryColor();

  const navigate = useNavigate();

  const [forgotPassword, {isLoading}] = useForgotPasswordMutation();

  const handleForgotPassword = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const {message} = await forgotPassword({email}).unwrap();
      setEmail("");
      toast.success(message, {toastId: "forgot-password-success"});
      navigate("/confirm-forgot-password");
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
      <section className="container p-6 mx-auto bg-white dark:bg-black rounded-md shadow-md shadow-black dark:shadow-white my-20">
        <h1 className="text-xl font-bold text-black dark:text-white capitalize mb-5">
          Forgot Password
        </h1>
        <form onSubmit={handleForgotPassword}>
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
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className={`w-fit bg-${primaryColor}-700 text-white px-4 py-2 rounded-md hover:bg-${primaryColor}-800 transition-colors disabled:bg-${primaryColor}-300 my-5`}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Send Email"}
          </button>
        </form>
      </section>
    </>
  );
};

export default ForgotPassword;
