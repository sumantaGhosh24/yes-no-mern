import {useState, FormEvent} from "react";
import {toast} from "react-toastify";

import {useDeclareResultMutation} from "../app/features/question/questionApiSlice";
import {usePrimaryColor} from "./primary-provider";

interface DeclareResultProps {
  id: string;
}

const DeclareResult = ({id}: DeclareResultProps) => {
  const [answer, setAnswer] = useState("");

  const {primaryColor} = usePrimaryColor();

  const [declareResult, {isLoading}] = useDeclareResultMutation();

  const handleDeclareResult = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (answer === "") {
        return toast.error("Please fill all the fields");
      }

      const {message} = await declareResult({id, answer}).unwrap();

      setAnswer("");
      toast.success(message, {toastId: "result-success"});
    } catch (error: any) {
      if (error.status === "FETCH_ERROR") {
        toast.error("server error", {toastId: "result-error"});
      } else {
        if (typeof error.data.message === "object") {
          toast.error(error?.data?.message[0], {toastId: "result-error"});
        } else {
          toast.error(error?.data?.message, {toastId: "result-error"});
        }
      }
    }
  };

  return (
    <section className="container mx-auto my-5">
      <div className="bg-white dark:bg-black dark:shadow-white rounded shadow-lg p-8">
        <div className="mb-5">
          <h2 className="dark:text-white text-3xl font-bold">Declare Result</h2>
        </div>
        <form className="mb-6" onSubmit={handleDeclareResult}>
          <select
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="p-2 w-full border border-gray-300 mb-4"
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
            {isLoading ? "Processing..." : "Declare Result"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default DeclareResult;
