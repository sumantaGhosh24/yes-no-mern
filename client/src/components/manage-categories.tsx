import {Link} from "react-router-dom";
import {formatDistanceToNowStrict} from "date-fns";

import {useGetCategoriesQuery} from "../app/features/category/categoryApiSlice";
import {usePrimaryColor} from "./primary-provider";

interface ManageCategoriesProps {
  catId: string;
}

const ManageCategories = ({catId}: ManageCategoriesProps) => {
  const {category} = useGetCategoriesQuery("categoryList", {
    selectFromResult: ({data}) => ({category: data?.entities[catId]}),
  });

  const {primaryColor} = usePrimaryColor();

  if (category) {
    return (
      <tr className="bg-gray-200 dark:bg-neutral-400 border-b text-base font-bold">
        <td className="px-6 py-4">{category.id}</td>
        <td className="px-6 py-4 capitalize">{category.name}</td>
        <td className="px-6 py-4">
          <img
            src={category?.image?.url}
            alt={category?.image?.public_id}
            className="rounded-full h-16 w-16"
          />
        </td>
        <td className="px-6 py-4 truncate">
          {formatDistanceToNowStrict(category.createdAt)} ago
        </td>
        <td className="px-6 py-4 truncate">
          {formatDistanceToNowStrict(category.updatedAt)} ago
        </td>
        <td className="px-6 py-4">
          <Link
            className={`block bg-${primaryColor}-700 text-white px-4 py-2 rounded-md hover:bg-${primaryColor}-800 transition-colors disabled:bg-${primaryColor}-300 w-fit truncate`}
            to={`/update-category/${category.id}`}
          >
            Manage Category
          </Link>
        </td>
      </tr>
    );
  } else return null;
};

export default ManageCategories;
