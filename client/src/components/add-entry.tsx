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
      <div className="bg-white dark:bg-black dark:shadow-white rounded shadow-lg p-8">
        <div className="mb-5">
          <h2 className="dark:text-white text-3xl font-bold">Add Entry</h2>
        </div>
        <form className="mb-6" onSubmit={handleAddEntry}>
          <input
            type="number"
            className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4"
            placeholder="Bet amount"
            min={minBet}
            max={maxBet}
            name="bet"
            value={bet}
            onChange={(e) => setBet(Number(e.target.value))}
          />
          <select
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="p-2 w-full mb-4 border border-gray-300"
          >
            <option value="" className="text-black">
              Select your answer
            </option>
            <option value="yes" className="text-black">
              Yes
            </option>
            <option value="no" className="text-black">
              No
            </option>
          </select>
          <button
            type="submit"
            className={`w-fit bg-${primaryColor}-700 text-white px-4 py-2 rounded-md hover:bg-${primaryColor}-800 transitions-colors disabled:bg-${primaryColor}-300`}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Add Entry"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddEntry;
