import {Link} from "react-router-dom";
import {formatDistanceToNowStrict} from "date-fns";

import {useGetQuestionsAdminQuery} from "../app/features/question/questionApiSlice";
import {usePrimaryColor} from "./primary-provider";

interface ManageQuestionsProps {
  questionId: string;
  page: number;
  category: string;
  search: string;
  sort: string;
}

const ManageQuestions = ({
  questionId,
  page,
  category,
  search,
  sort,
}: ManageQuestionsProps) => {
  const {question} = useGetQuestionsAdminQuery(
    {page, category, search, sort},
    {
      selectFromResult: ({data}) => ({question: data?.entities[questionId]}),
    }
  );

  const {primaryColor} = usePrimaryColor();

  if (question) {
    return (
      <tr className="bg-gray-200 dark:bg-neutral-400 border-b text-base font-bold">
        <td className="px-6 py-4">{question.id}</td>
        <td className="py-3 px-6 text-left capitalize">{question.question}</td>
        <td className="py-3 px-6 text-left capitalize">{question.minBet}</td>
        <td className="py-3 px-6 text-left capitalize">{question.maxBet}</td>
        <td className="py-3 px-6 text-left capitalize">
          {new Date(question.starting).toLocaleDateString()}
        </td>
        <td className="py-3 px-6 text-left capitalize">
          {new Date(question.ending).toLocaleDateString()}
        </td>
        <td className="py-3 px-6 text-left capitalize">
          {question.result ?? "N/A"}
        </td>
        <td className="py-3 px-6 text-left capitalize">
          {question.answer ?? "N/A"}
        </td>
        <td className="py-3 px-6 text-left">{question.owner.email}</td>
        <td className="py-3 px-6 text-left capitalize">
          {question.category.name}
        </td>
        <td className="py-3 px-6 text-left truncate">
          {formatDistanceToNowStrict(question.createdAt)} ago
        </td>
        <td className="py-3 px-6 text-left truncate">
          {formatDistanceToNowStrict(question.updatedAt)} ago
        </td>
        <td className="px-6 py-4">
          <Link
            className={`block bg-${primaryColor}-700 text-white px-4 py-2 rounded-md hover:bg-${primaryColor}-800 transition-colors disabled:bg-${primaryColor}-300 w-fit truncate`}
            to={`/update-question/${question.id}`}
          >
            Manage Question
          </Link>
        </td>
      </tr>
    );
  } else return null;
};

export default ManageQuestions;
