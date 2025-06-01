interface QuestionProps {
  questionId: string;
}

const Question = ({questionId}: QuestionProps) => {
  // const {question} = useGetQuestionsQuery("questionList", {
  //   selectFromResult: ({data}) => ({question: data?.entities[questionId]}),
  // });

  // const navigate = useNavigate();

  // const {primaryColor} = usePrimaryColor();

  // if (question) {
  //   return (
  //     <div className="bg-white dark:bg-black border rounded-md shadow-md shadow-black dark:shadow-white text-black dark:text-white">
  //       <Link to={`/details-question/${question.id}`}>
  //         <img
  //           className="rounded-t-lg"
  //           src={question.images[0].url}
  //           alt={question.images[0].public_id}
  //         />
  //       </Link>
  //       <div className="p-3">
  //         <Link to={`/details-question/${question.id}`}>
  //           <h5 className="mb-2 text-2xl font-bold tracking-tight capitalize">
  //             {question.title}
  //           </h5>
  //         </Link>
  //         <p className="mb-2 font-normal">{question.description}</p>
  //         <button
  //           onClick={() => navigate(`/details-question/${question.id}`)}
  //           className={`bg-${primaryColor}-700 text-white px-4 py-2 rounded-md hover:bg-${primaryColor}-800 transition-colors disabled:bg-${primaryColor}-300 my-5 flex`}
  //         >
  //           <FaEye className="mr-2 h-5 w-5" size={24} /> View
  //         </button>
  //       </div>
  //     </div>
  //   );
  // } else return null;

  return <></>;
};

export default Question;
