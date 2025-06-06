import {useState, FormEvent} from "react";
import {toast} from "react-toastify";

import {useRefreshMutation} from "../app/features/auth/authApiSlice";
import {useWithdrawMutation} from "../app/features/wallet/walletApiSlice";
import {usePrimaryColor} from "./primary-provider";

const Withdraw = () => {
  const [price, setPrice] = useState("");

  const {primaryColor} = usePrimaryColor();

  const [withdraw, {isLoading}] = useWithdrawMutation();

  const [refresh] = useRefreshMutation();

  const handleWithdraw = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (price === "") {
        return toast.error("Please fill all the fields");
      }

      const {message} = await withdraw({amount: price}).unwrap();

      setPrice("");
      await refresh(undefined).unwrap();
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
    <section className="container mx-auto my-5">
      <div className="bg-white dark:bg-black dark:shadow-white rounded shadow-lg p-8">
        <div className="mb-5">
          <h2 className="dark:text-white text-3xl font-bold">
            Withdraw Amount
          </h2>
        </div>
        <form className="mb-6" onSubmit={handleWithdraw}>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4"
            placeholder="Donation price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button
            type="submit"
            className={`w-fit bg-${primaryColor}-700 text-white px-4 py-2 rounded-md hover:bg-${primaryColor}-800 transitions-colors disabled:bg-${primaryColor}-300`}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Withdraw"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Withdraw;
