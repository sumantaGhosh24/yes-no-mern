import {useState, FormEvent} from "react";
import {toast} from "react-toastify";

import {useResetPasswordMutation} from "../app/features/user/userApiSlice";
import {usePrimaryColor} from "./primary-provider";

const ResetPassword = () => {
  const [previousPassword, setPreviousPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cf_newPassword, setCf_newPassword] = useState("");

  const {primaryColor} = usePrimaryColor();

  const [resetPassword, {isLoading}] = useResetPasswordMutation();

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const {message} = await resetPassword({
        previousPassword,
        newPassword,
        cf_newPassword,
      }).unwrap();
      setPreviousPassword("");
      setNewPassword("");
      setCf_newPassword("");
      toast.success(message, {toastId: "profile-success"});
    } catch (error: any) {
      if (error.status === "FETCH_ERROR") {
        toast.error("server error", {toastId: "profile-error"});
      } else {
        if (typeof error.data.message === "object") {
          toast.error(error?.data?.message[0], {toastId: "profile-error"});
        } else {
          toast.error(error?.data?.message, {toastId: "profile-error"});
        }
      }
    }
  };

  return (
    <section className="container p-6 mx-auto bg-white dark:bg-black rounded-md shadow-md shadow-black dark:shadow-white my-5">
      <h1 className="text-xl font-bold text-black dark:text-white capitalize mb-5">
        Reset Password
      </h1>
      <form onSubmit={handleResetPassword}>
        <div className="mt-4 flex flex-col gap-4">
          <div>
            <label
              className="text-black dark:text-white"
              htmlFor="previousPassword"
            >
              Previous Password
            </label>
            <input
              id="previousPassword"
              name="previousPassword"
              type="password"
              placeholder="Enter previous password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              onChange={(e) => setPreviousPassword(e.target.value)}
              value={previousPassword}
              required
            />
          </div>
          <div>
            <label className="text-black dark:text-white" htmlFor="newPassword">
              New Password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="Enter new password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              required
            />
          </div>
          <div>
            <label
              className="text-black dark:text-white"
              htmlFor="cf_newPassword"
            >
              Confirm New Password
            </label>
            <input
              id="cf_newPassword"
              name="cf_newPassword"
              type="password"
              placeholder="Enter confirm new password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              onChange={(e) => setCf_newPassword(e.target.value)}
              value={cf_newPassword}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className={`w-fit bg-${primaryColor}-700 text-white px-4 py-2 rounded-md hover:bg-${primaryColor}-800 transition-colors disabled:bg-${primaryColor}-300 my-5`}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Reset Password"}
        </button>
      </form>
    </section>
  );
};

export default ResetPassword;
