import {useParams} from "react-router-dom";
import {formatDistanceToNowStrict} from "date-fns";

import {useGetQuestionQuery} from "../app/features/question/questionApiSlice";
import {useTitle} from "../hooks";
import {AddEntry, Loading} from "../components";

const DetailsQuestion = () => {
  useTitle("Question Detailed");

  const {id} = useParams();

  if (!id) return null;

  const {data: question, isLoading} = useGetQuestionQuery(id);

  if (!question || isLoading) {
    return <Loading />;
  }

  return (
    <>
      <section className="container p-6 mx-auto my-5 shadow-md rounded-md dark:shadow-gray-400">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold capitalize">
              {question?.question}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Question ID: {question?._id}
            </p>
          </div>
          <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold uppercase">
            {question?.result}
          </span>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800">
            <p className="text-sm text-gray-500">Minimum Bet</p>
            <p className="text-xl font-bold">{question?.minBet}</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800">
            <p className="text-sm text-gray-500">Maximum Bet</p>
            <p className="text-xl font-bold">{question?.maxBet}</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800">
            <p className="text-sm text-gray-500">Result</p>
            <p className="text-xl font-bold">{question?.result ?? "Pending"}</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-sm text-gray-500">Starting Date</p>
            <p className="font-semibold">
              {new Date(question.starting).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Ending Date</p>
            <p className="font-semibold">
              {new Date(question.ending).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-100 dark:bg-gray-800">
            <img
              src={question?.category?.image?.url}
              alt="category"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-semibold">{question?.category?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-100 dark:bg-gray-800">
            <img
              src={question?.owner?.image?.url}
              alt="owner"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <p className="text-sm text-gray-500">Owner</p>
              <p className="font-semibold">{question?.owner?.email}</p>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <p className="text-sm text-gray-500">Correct Answer</p>
          <p className="font-semibold">
            {question?.answer ?? "Not announced yet"}
          </p>
        </div>
        <div className="border-t pt-4 text-sm text-gray-500 flex justify-between">
          <span>
            Created {formatDistanceToNowStrict(question?.createdAt)} ago
          </span>
          <span>
            Updated {formatDistanceToNowStrict(question?.updatedAt)} ago
          </span>
        </div>
      </section>
      <AddEntry
        id={question?._id}
        minBet={question?.minBet}
        maxBet={question?.maxBet}
      />
    </>
  );
};

export default DetailsQuestion;
