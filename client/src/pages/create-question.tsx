import {useState, useEffect, FormEvent} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

import {useGetCategoriesQuery} from "../app/features/category/categoryApiSlice";
import {useCreateQuestionMutation} from "../app/features/question/questionApiSlice";
import {usePrimaryColor} from "../components/primary-provider";
import {useTitle} from "../hooks";
import {Loading} from "../components";

const CreateQuestion = () => {
  useTitle("Create Question");

  const [data, setData] = useState({
    question: "",
    minBet: "",
    maxBet: "",
    starting: "",
    ending: "",
    category: "",
  });

  const navigate = useNavigate();

  const {primaryColor} = usePrimaryColor();

  const [createQuestion, {isLoading, isSuccess, isError, error}] =
    useCreateQuestionMutation();

  const {category} = useGetCategoriesQuery("categoryList", {
    selectFromResult: ({data}) => ({
      category: data?.ids.map((id: any) => data?.entities[id]),
    }),
  });

  useEffect(() => {
    if (isSuccess) {
      setData({
        question: "",
        minBet: "",
        maxBet: "",
        starting: "",
        ending: "",
        category: "",
      });
      navigate("/questions");
    }
  }, [isSuccess, navigate]);

  const handleCreateQuestion = async (e: FormEvent) => {
    e.preventDefault();

    if (
      data.question === "" ||
      data.minBet === "" ||
      data.maxBet === "" ||
      data.starting === "" ||
      data.ending === "" ||
      data.category === ""
    ) {
      return toast.error("Please fill all the fields.");
    }

    try {
      const {message} = await createQuestion(data).unwrap();
      toast.success(message, {toastId: "question-success"});
    } catch (error: any) {
      toast.error(error?.data?.message, {toastId: "question-error"});
    }
  };

  if (!category?.length) {
    return <Loading />;
  }

  return (
    <>
      <section className="container p-6 mx-auto my-20 shadow-lg rounded-md bg-white dark:bg-black dark:shadow-white">
        <h2 className="text-3xl font-bold capitalize mb-10 text-black dark:text-white">
          Create Question
        </h2>
        {isError && (
          <h3 className="text-xl font-bold capitalize mb-10 text-black dark:text-white">
            {error.message}
          </h3>
        )}
        <form className="mb-6" onSubmit={handleCreateQuestion}>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4 mt-5"
            placeholder="Question Title"
            name="title"
            value={data.question}
            onChange={(e) => setData({...data, question: e.target.value})}
          />
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4 mt-5"
            placeholder="Question Minimum Bet"
            name="minBet"
            value={data.minBet}
            onChange={(e) => setData({...data, minBet: e.target.value})}
          />
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4 mt-5"
            placeholder="Question Maximum Bet"
            name="maxBet"
            value={data.maxBet}
            onChange={(e) => setData({...data, maxBet: e.target.value})}
          />
          <input
            type="date"
            className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4 mt-5"
            placeholder="Question Starting Date"
            name="starting"
            value={data.starting}
            onChange={(e) => setData({...data, starting: e.target.value})}
          />
          <input
            type="date"
            className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4 mt-5"
            placeholder="Question Ending Date"
            name="ending"
            value={data.ending}
            onChange={(e) => setData({...data, ending: e.target.value})}
          />
          <select
            className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4 mt-5"
            value={data.category}
            onChange={(e) => setData({...data, category: e.target.value})}
          >
            <option value="">Select a category</option>
            {category.map((cat: {id: string; name: string}) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className={`bg-${primaryColor}-700 text-white px-4 py-2 rounded-md hover:bg-${primaryColor}-800 transition-colors disabled:bg-${primaryColor}-300 w-fit mt-5`}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Create Question"}
          </button>
        </form>
      </section>
    </>
  );
};

export default CreateQuestion;
