import {FormEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

import {useLoginVerifyMutation} from "../app/features/auth/authApiSlice";
import {setCredentials} from "../app/features/auth/authSlice";
import {useTitle, usePersist} from "../hooks";
import {usePrimaryColor} from "../components/primary-provider";
import {PublicHeader} from "../components";

const LoginVerify = () => {
  useTitle("Login Verify");

  const [otp, setOtp] = useState("");

  const [persist, setPersist] = usePersist();

  const {primaryColor} = usePrimaryColor();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginVerify, {isLoading}] = useLoginVerifyMutation();

  const handleToggle = () => setPersist((prev) => !prev);

  const handleLoginVerify = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const data = await loginVerify({otp}).unwrap();
      dispatch(setCredentials(data));
      toast.success("Login successful", {toastId: "login-success"});
      navigate("/home");
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
      <section className="container p-6 mx-auto bg-white dark:bg-black rounded-md shadow-lg dark:shadow-white my-20">
        <h2 className="text-xl font-bold text-black dark:text-white capitalize mb-5">
          Login Verify
        </h2>
        <form onSubmit={handleLoginVerify}>
          <div className="mt-4 flex flex-col gap-4">
            <div>
              <label className="text-black dark:text-white" htmlFor="otp">
                OTP
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                placeholder="Enter your otp"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                required
              />
            </div>
            <div>
              <label
                className="text-black dark:text-white cursor-pointer"
                htmlFor="persist"
              >
                <input
                  type="checkbox"
                  id="persist"
                  onChange={handleToggle}
                  checked={persist}
                  className="mr-5"
                />
                Trust this website
              </label>
            </div>
          </div>
          <button
            type="submit"
            className={`w-fit bg-${primaryColor}-700 text-white px-4 py-2 rounded-md hover:bg-${primaryColor}-800 transition-colors disabled:bg-${primaryColor}-300 my-5`}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Login Verify"}
          </button>
        </form>
      </section>
    </>
  );
};

export default LoginVerify;
