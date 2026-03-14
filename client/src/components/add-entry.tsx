import {useState, FormEvent} from "react";
import {toast} from "react-toastify";

import {useAddEntryMutation} from "../app/features/entry/entryApiSlice";
import {usePrimaryColor} from "./primary-provider";

interface AddEntryProps {
  id: string;
  minBet: number;
  maxBet: number;
}

const AddEntry = ({id, minBet, maxBet}: AddEntryProps) => {
  const [bet, setBet] = useState(0);
  const [answer, setAnswer] = useState("");

  const {primaryColor} = usePrimaryColor();

  const [addEntry, {isLoading}] = useAddEntryMutation();

  const handleAddEntry = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (bet === 0 || answer === "") {
        return toast.error("Please fill all the fields");
      }

      const {message} = await addEntry({id, bet, answer}).unwrap();

      setBet(0);
      setAnswer("");
      toast.success(message, {toastId: "entry-success"});
    } catch (error: any) {
      if (error.status === "FETCH_ERROR") {
        toast.error("server error", {toastId: "entry-error"});
      } else {
        if (typeof error.data.message === "object") {
          toast.error(error?.data?.message[0], {toastId: "entry-error"});
        } else {
          toast.error(error?.data?.message, {toastId: "entry-error"});
        }
      }
    }
  };

  return (
    <section className="container mx-auto my-5">
      <div className="dark:shadow-gray-400 rounded shadow-md p-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold">Place Your Prediction</h2>
          <p className="text-sm text-gray-500 mt-1">
            Bet between <span className="font-semibold">{minBet}</span> and{" "}
            <span className="font-semibold">{maxBet}</span>
          </p>
        </div>
        <form onSubmit={handleAddEntry} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Bet Amount
            </label>
            <input
              type="number"
              min={minBet}
              max={maxBet}
              name="bet"
              value={bet}
              onChange={(e) => setBet(Number(e.target.value))}
              placeholder="Enter bet amount"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Your Prediction
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setAnswer("yes")}
                className={`p-3 rounded-md border font-semibold
              ${
                answer === "yes"
                  ? "bg-green-600 text-white border-green-600"
                  : "border-gray-300"
              }`}
              >
                YES
              </button>
              <button
                type="button"
                onClick={() => setAnswer("no")}
                className={`p-3 rounded-md border font-semibold
              ${
                answer === "no"
                  ? "bg-red-600 text-white border-red-600"
                  : "border-gray-300"
              }`}
              >
                NO
              </button>
            </div>
          </div>
          {(bet || answer) && (
            <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-3 text-sm">
              <p>
                Bet: <span className="font-semibold">{bet || 0}</span>
              </p>
              <p>
                Prediction:{" "}
                <span className="font-semibold capitalize">
                  {answer || "Not selected"}
                </span>
              </p>
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-md text-white font-semibold
          bg-${primaryColor}-700 hover:bg-${primaryColor}-800
          disabled:bg-${primaryColor}-300 transition-colors`}
          >
            {isLoading ? "Processing..." : "Place Bet"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddEntry;
