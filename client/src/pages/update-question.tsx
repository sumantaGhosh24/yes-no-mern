import {useParams} from "react-router-dom";

import {useGetQuestionAdminQuery} from "../app/features/question/questionApiSlice";
import {useTitle} from "../hooks";
import {DeclareResult, EditQuestionForm, Loading} from "../components";

const UpdateQuestion = () => {
  useTitle("Update and Delete Question");

  const {id} = useParams();

  if (!id) return null;

  const {data: question, isLoading} = useGetQuestionAdminQuery(id);

  if (!question || isLoading) {
    return <Loading />;
  }

  return (
    <>
      <EditQuestionForm question={question} />
      {question?.result !== "completed" && <DeclareResult id={id} />}
    </>
  );
};

export default UpdateQuestion;
