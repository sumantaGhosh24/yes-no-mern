import {useState, FormEvent} from "react";
import {toast} from "react-toastify";

import {
  useDepositMutation,
  useVerificationMutation,
} from "../app/features/wallet/walletApiSlice";
import {useRefreshMutation} from "../app/features/auth/authApiSlice";
import {usePrimaryColor} from "./primary-provider";
import {RAZORPAY_KEY} from "../config";

const Deposit = () => {
  const [price, setPrice] = useState("");

  const {primaryColor} = usePrimaryColor();

  const [getRazorpay, {isLoading}] = useDepositMutation();

  const [verification, {isLoading: vLoading}] = useVerificationMutation();

  const [refresh] = useRefreshMutation();

  const handleDeposit = async (e: FormEvent) => {
    e.preventDefault();

    if (price === "") {
      return toast.error("Please fill all the fields");
    }

    const result = await getRazorpay({amount: price}).unwrap();

    const {amount, id: order_id, currency} = result;

    const options = {
      key: RAZORPAY_KEY,
      amount: Number(amount),
      currency: currency,
      order_id: order_id,
      name: "Yes No",
      description: "This is test Yes No for only tutorial purpose.",
      handler: async function (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          amount: price,
        };
        const result = await verification(data).unwrap();
        await refresh(undefined).unwrap();
        toast.success(result.message);
      },
    };

    setPrice("");

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <section className="container mx-auto my-5">
      <div className="bg-white dark:bg-black shadow-black dark:shadow-white rounded shadow-md p-8">
        <div className="mb-5">
          <h2 className="dark:text-white text-3xl font-bold">Deposit Amount</h2>
        </div>
        <form className="mb-6" onSubmit={handleDeposit}>
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
            disabled={isLoading || vLoading}
          >
            {isLoading || vLoading ? "Processing..." : "Deposit"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Deposit;
