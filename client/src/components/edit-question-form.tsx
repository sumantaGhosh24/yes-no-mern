import {useState, useEffect, FormEvent} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {FaTrash} from "react-icons/fa";

import {
  useDeleteQuestionMutation,
  useUpdateQuestionMutation,
} from "../app/features/question/questionApiSlice";
import {useGetCategoriesQuery} from "../app/features/category/categoryApiSlice";
import {usePrimaryColor} from "./primary-provider";
import Loading from "./loading";

interface EditQuestionFormProps {
  question: {
    _id: string;
    question: string;
    minBet: string;
    maxBet: string;
    starting: any;
    ending: any;
    category: any;
    result: "completed" | "pending";
  };
}

const EditQuestionForm = ({question}: EditQuestionFormProps) => {
  const [updateQuestion, {isLoading, isSuccess, isError, error}] =
    useUpdateQuestionMutation();

  const [deleteQuestion, {isSuccess: isDelSuccess}] =
    useDeleteQuestionMutation();

  const {category} = useGetCategoriesQuery("categoryList", {
    selectFromResult: ({data}) => ({
      category: data?.ids.map((id: any) => data?.entities[id]),
    }),
  });

  const navigate = useNavigate();

  const {primaryColor} = usePrimaryColor();

  const formatDate = (d: Date) => {
    const date = new Date(d);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
  };

  const [questionData, setQuestionData] = useState({
    question: question.question,
    minBet: question.minBet,
    maxBet: question.maxBet,
    starting: formatDate(question.starting),
    ending: formatDate(question.ending),
    category: question.category._id,
  });

  useEffect(() => {
    if (isSuccess) {
      navigate(`/update-question/${question._id}`);
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isDelSuccess) {
      navigate("/questions");
    }
  }, [isDelSuccess, navigate]);

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const {message} = await updateQuestion({
        id: question._id,
        question: questionData.question,
        minBet: questionData.minBet,
        maxBet: questionData.maxBet,
        starting: questionData.starting,
        ending: questionData.ending,
        category: questionData.category,
      }).unwrap();
      toast.success(message, {toastId: "question-success"});
    } catch (error: any) {
      toast.error(error?.data?.message, {toastId: "question-error"});
    }
  };

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const {message} = await deleteQuestion({id: question._id}).unwrap();
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
      <section className="container p-6 mx-auto my-10 shadow-md rounded-md bg-white dark:bg-black shadow-black dark:shadow-white text-black dark:text-white">
        <h2 className="text-xl font-bold capitalize mb-5 ">Update Question</h2>
        {isError && (
          <h2 className="text-xl font-bold capitalize text-red-500 mb-5">
            {error.message}
          </h2>
        )}
        <button
          className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 transition-colors disabled:bg-red-300 w-fit mt-5 flex items-center gap-1.5 mb-5"
          onClick={handleDelete}
        >
          <FaTrash className="btn-icons" /> Delete Question
        </button>
        <div className="mb-5">
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4 mt-5"
              placeholder="Question Title"
              name="title"
              value={questionData.question}
              onChange={(e) =>
                setQuestionData({...questionData, question: e.target.value})
              }
            />
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4 mt-5"
              placeholder="Question Minimum Bet"
              name="minBet"
              value={questionData.minBet}
              onChange={(e) =>
                setQuestionData({...questionData, minBet: e.target.value})
              }
            />
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4 mt-5"
              placeholder="Question Maximum Bet"
              name="maxBet"
              value={questionData.maxBet}
              onChange={(e) =>
                setQuestionData({...questionData, maxBet: e.target.value})
              }
            />
            <input
              type="date"
              className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4 mt-5"
              placeholder="Question Starting Date"
              name="starting"
              value={questionData.starting}
              onChange={(e) =>
                setQuestionData({...questionData, starting: e.target.value})
              }
            />
            <input
              type="date"
              className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4 mt-5"
              placeholder="Question Ending Date"
              name="ending"
              value={questionData.ending}
              onChange={(e) =>
                setQuestionData({...questionData, ending: e.target.value})
              }
            />
            <select
              className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4 mt-5 text-gray-700"
              defaultValue={questionData.category}
              onChange={(e) =>
                setQuestionData({...questionData, category: e.target.value})
              }
            >
              <option value="">Select a category</option>
              {category.map((cat: {id: string; name: string}) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <button
              className={`bg-${primaryColor}-700 text-white px-4 py-2 rounded-md hover:bg-${primaryColor}-800 transition-colors disabled:bg-${primaryColor}-300 w-fit mt-5`}
              disabled={isLoading || question.result === "completed"}
              type="submit"
            >
              {isLoading ? "Processing..." : "Update Question"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default EditQuestionForm;
