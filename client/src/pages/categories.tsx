import {Link} from "react-router-dom";

import {useGetCategoriesQuery} from "../app/features/category/categoryApiSlice";
import {useTitle} from "../hooks";
import {usePrimaryColor} from "../components/primary-provider";
import {Loading, ManageCategories} from "../components";

const Categories = () => {
  useTitle("Manage Categories");

  const {
    data: category,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCategoriesQuery("categoryList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const {primaryColor} = usePrimaryColor();

  if (isLoading) {
    return <Loading />;
  }

  let content;

  if (isError) {
    content = (
      <h3 className="text-xl font-bold capitalize mb-10">{error.message}</h3>
    );
  }

  if (isSuccess) {
    const {ids} = category;
    const tableContent =
      ids?.length &&
      ids.map((catId: string) => (
        <ManageCategories key={catId} catId={catId} />
      ));

    content = (
      <div className="relative overflow-x-auto mt-10">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Id
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Image
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
              >
                Created At
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
              >
                Updated At
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:text-black">
            {tableContent}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <>
      <section className="container p-6 mx-auto my-20 shadow-lg rounded-md bg-white dark:bg-black dark:shadow-white text-black dark:text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold capitalize">Manage Categories</h2>
          <Link
            className={`bg-${primaryColor}-700 text-white px-4 py-2 rounded-md hover:bg-${primaryColor}-800 transition-colors disabled:bg-${primaryColor}-300 w-fit`}
            to="/create-category"
          >
            Create Category
          </Link>
        </div>
        {content}
      </section>
    </>
  );
};

export default Categories;
