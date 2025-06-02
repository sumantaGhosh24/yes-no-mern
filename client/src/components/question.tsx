import {Link, useNavigate} from "react-router-dom";
import {FaEye} from "react-icons/fa";

import {useGetQuestionsQuery} from "../app/features/question/questionApiSlice";
import {usePrimaryColor} from "./primary-provider";

interface QuestionProps {
  questionId: string;
  page: number;
  category: string;
  search: string;
  sort: string;
}

const Question = ({
  questionId,
  page,
  category,
  search,
  sort,
}: QuestionProps) => {
  const {question} = useGetQuestionsQuery(
    {page, category, search, sort},
    {
      selectFromResult: ({data}) => ({question: data?.entities[questionId]}),
    }
  );

  const navigate = useNavigate();

  const {primaryColor} = usePrimaryColor();

  if (question) {
    return (
      <div className="bg-white dark:bg-black border rounded-md shadow-md shadow-black dark:shadow-white text-black dark:text-white">
        <div className="p-3">
          <Link to={`/details-question/${question.id}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight capitalize">
              {question.question}
            </h5>
          </Link>
          <p className="mb-2 font-normal">Minimum Bet: {question.minBet}</p>
          <p className="mb-2 font-normal">Maximum Bet: {question.maxBet}</p>
          <p className="mb-2 font-normal">
            Starting: {new Date(question.starting).toLocaleDateString()}
          </p>
          <p className="mb-2 font-normal">
            Ending: {new Date(question.ending).toLocaleDateString()}
          </p>
          <p className="mb-2 font-normal">Category: {question.category.name}</p>
          <p className="mb-2 font-normal">Owner: {question.owner.email}</p>
          <button
            onClick={() => navigate(`/details-question/${question.id}`)}
            className={`bg-${primaryColor}-700 text-white px-4 py-2 rounded-md hover:bg-${primaryColor}-800 transition-colors disabled:bg-${primaryColor}-300 my-5 flex`}
          >
            <FaEye className="mr-2 h-5 w-5" size={24} /> View
          </button>
        </div>
      </div>
    );
  } else return null;
};

export default Question;
