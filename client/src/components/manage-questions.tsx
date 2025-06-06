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
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">{question.id}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {question.question}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {question.minBet}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {question.maxBet}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {new Date(question.starting).toLocaleDateString()}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {new Date(question.ending).toLocaleDateString()}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              question.result === "completed"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {question.result}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {question.answer ?? "N/A"}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {question.owner.email}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {question.category.name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {formatDistanceToNowStrict(question.createdAt)} ago
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
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
