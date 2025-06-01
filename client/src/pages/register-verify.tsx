import {FormEvent} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {toast} from "react-toastify";

import {useTitle} from "../hooks";
import {useRegisterVerifyMutation} from "../app/features/auth/authApiSlice";
import {PublicHeader} from "../components";
import {usePrimaryColor} from "../components/primary-provider";

const RegisterVerify = () => {
  useTitle("Register Verification");

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const {primaryColor} = usePrimaryColor();

  const navigate = useNavigate();

  const [registerVerify, {isLoading}] = useRegisterVerifyMutation();

  const handleRegisterVerify = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const {message} = await registerVerify(token).unwrap();
      toast.success(message, {toastId: "register-success"});
      navigate("/login");
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
      {token ? (
        <div className="flex h-screen items-center justify-center">
          <div className="container mx-auto text-center rounded-lg bg-white dark:bg-black p-8 shadow-lg shadow-black dark:shadow-white">
            <h1 className="mb-6 text-4xl font-bold">
              Click the below link to activate you account
            </h1>
            <button
              className={`mb-6 rounded-full px-8 py-4 font-bold text-white text-xl bg-${primaryColor}-700 hover:bg-${primaryColor}-800 disabled:bg-${primaryColor}-300`}
              onClick={handleRegisterVerify}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Click Me"}
            </button>
            <div className="text-2xl">
              <p>
                A activate email link send to your email account, click the link
                to activate your account.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-screen items-center justify-center">
          <div className="container mx-auto text-center rounded-lg bg-white dark:bg-black p-8 shadow-lg shadow-black dark:shadow-white">
            <h1 className="mb-6 text-4xl font-bold">
              Visit your email address
            </h1>
            <div className="text-2xl">
              <p>
                A activate email link send to your email account, click the link
                to activate your account.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterVerify;
