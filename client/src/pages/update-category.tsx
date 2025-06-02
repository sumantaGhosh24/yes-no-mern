import {useParams} from "react-router-dom";

import {useGetCategoriesQuery} from "../app/features/category/categoryApiSlice";
import {useTitle} from "../hooks";
import {EditCategoryForm, Loading} from "../components";

const UpdateCategory = () => {
  useTitle("Update and Delete Category");

  const {id} = useParams();

  if (!id) return null;

  const {category} = useGetCategoriesQuery("categoryList", {
    selectFromResult: ({data}) => ({
      category: data?.entities[id],
    }),
  });

  if (!category) {
    return <Loading />;
  }

  return <EditCategoryForm category={category} />;
};

export default UpdateCategory;
