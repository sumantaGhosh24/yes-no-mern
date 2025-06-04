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
      <section className="container p-6 mx-auto my-20 shadow-md rounded-md bg-white dark:bg-black shadow-black dark:shadow-white text-black dark:text-white">
        <h2 className="text-3xl font-bold capitalize mb-10">
          Detailed Question
        </h2>
        <div className="flex flex-col gap-4">
          <h2>
            Id: <span className="font-bold">{question?._id}</span>
          </h2>
          <h2>
            Title:{" "}
            <span className="font-bold capitalize">{question?.question}</span>
          </h2>
          <h2>
            Minimum Bet: <span className="font-bold">{question?.minBet}</span>
          </h2>
          <h2>
            Maximum Bet: <span className="font-bold">{question?.maxBet}</span>
          </h2>
          <h2>
            Starting:{" "}
            <span className="font-bold">
              {new Date(question.starting).toLocaleDateString()}
            </span>
          </h2>
          <h2>
            Ending:{" "}
            <span className="font-bold">
              {new Date(question.ending).toLocaleDateString()}
            </span>
          </h2>
          <h2>
            Result:{" "}
            <span className="font-bold">{question?.result ?? "N/A"}</span>
          </h2>
          <h2>
            Answer:{" "}
            <span className="font-bold">{question?.answer ?? "N/A"}</span>
          </h2>
          <div>
            <h2>Category: </h2>
            <div className="flex items-center gap-3 mt-3">
              <img
                src={question?.category?.image?.url}
                alt="category"
                className="h-12 w-12 rounded-full"
              />
              <span className="font-bold">{question?.category?.name}</span>
            </div>
          </div>
          <div>
            <h2>Owner: </h2>
            <div className="flex items-center gap-3 mt-3">
              <img
                src={question?.owner?.image?.url}
                alt="category"
                className="h-12 w-12 rounded-full"
              />
              <span className="font-bold">{question?.owner?.email}</span>
            </div>
          </div>
          <h2>
            Created At:{" "}
            <span className="font-bold">
              {formatDistanceToNowStrict(question?.createdAt)}
            </span>
          </h2>
          <h2>
            Updated At:{" "}
            <span className="font-bold">
              {formatDistanceToNowStrict(question?.updatedAt)}
            </span>
          </h2>
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
