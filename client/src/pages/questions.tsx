import {useState, ChangeEvent} from "react";
import {Link} from "react-router-dom";

import {useGetQuestionsAdminQuery} from "../app/features/question/questionApiSlice";
import {useGetCategoriesQuery} from "../app/features/category/categoryApiSlice";
import {usePrimaryColor} from "../components/primary-provider";
import {useTitle} from "../hooks";
import {Loading, ManageQuestions} from "../components";

const Questions = () => {
  useTitle("Manage Questions");

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("&sort=-createdAt");
  const [sCategory, setSCategory] = useState("");
  const [search, setSearch] = useState("");

  const {
    data: question,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetQuestionsAdminQuery({
    page,
    sort,
    search,
    category: sCategory,
  });

  const {category} = useGetCategoriesQuery("categoryList", {
    selectFromResult: ({data}) => ({
      category: data?.ids.map((id: any) => data?.entities[id]),
    }),
  });

  const {primaryColor} = usePrimaryColor();

  if (!category?.length) {
    return <Loading />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const handleCategory = (e: ChangeEvent<any>) => {
    setSCategory(e.target.value);
  };

  let content;

  if (isError) {
    content = (
      <h3 className="text-xl font-bold capitalize mb-10">{error.message}</h3>
    );
  }

  if (isSuccess) {
    const {ids} = question;
    const tableContent =
      ids?.length &&
      ids.map((questionId: string) => (
        <ManageQuestions
          key={questionId}
          questionId={questionId}
          page={page}
          sort={sort}
          search={search}
          category={sCategory}
        />
      ));

    content = (
      <div className="relative overflow-x-auto mt-10">
        <table className="w-full text-sm text-left">
          <thead className="text-lg uppercase bg-gray-300 dark:bg-neutral-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Question
              </th>
              <th scope="col" className="px-6 py-3">
                Minimum Bet
              </th>
              <th scope="col" className="px-6 py-3">
                Maximum Bet
              </th>
              <th scope="col" className="px-6 py-3">
                Starting
              </th>
              <th scope="col" className="px-6 py-3">
                Ending
              </th>
              <th scope="col" className="px-6 py-3">
                Result
              </th>
              <th scope="col" className="px-6 py-3">
                Answer
              </th>
              <th scope="col" className="px-6 py-3">
                Owner
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th scope="col" className="px-6 py-3">
                Updated At
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </div>
    );
  }

  return (
    <>
      <section className="container p-6 mx-auto my-20 shadow-md rounded-md bg-white dark:bg-black shadow-black dark:shadow-white text-black dark:text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold capitalize">Manage Questions</h2>
          <Link
            className={`bg-${primaryColor}-700 text-white px-4 py-2 rounded-md hover:bg-${primaryColor}-800 transition-colors disabled:bg-${primaryColor}-300 w-fit`}
            to="/create-question"
          >
            Create Question
          </Link>
        </div>
        <section className="p-6 mx-auto my-5 shadow-md rounded-md bg-white dark:bg-black text-black dark:text-white">
          <h2 className="text-xl font-bold capitalize mb-3">Search Question</h2>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center border-3 p-2 rounded w-full">
              <span className="mr-3 text-xl">Categories: </span>
              <select
                name="category"
                value={sCategory}
                onChange={handleCategory}
                className="p-2 w-full focus:outline-none"
              >
                <option value="" className="text-black">
                  All Categories
                </option>
                {category.map((category: {_id: string; name: string}) => (
                  <option
                    value={"&category=" + category._id}
                    key={category._id}
                    className="text-black"
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center border-3 p-2 rounded w-full">
              <span className="mr-3 text-xl">Search: </span>
              <input
                type="text"
                value={search}
                placeholder="Enter your search!"
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
                className="p-2 w-full focus:outline-none"
              />
            </div>
            <div className="flex items-center border-3 p-2 rounded w-full">
              <span className="mr-3 text-xl w-1/4">Sort By: </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="p-2 w-full focus:outline-none"
              >
                <option value="&sort=-createdAt" className="text-black">
                  Newest
                </option>
                <option value="&sort=createdAt" className="text-black">
                  Oldest
                </option>
                <option value="&sort=-minBet" className="text-black">
                  Bet: Hight-Low
                </option>
                <option value="&sort=maxBet" className="text-black">
                  Bet: Low-Hight
                </option>
              </select>
            </div>
          </div>
        </section>
        {content}
        <div className="my-5 flex align-center justify-center">
          <button
            className={`w-fit bg-${primaryColor}-700 text-white px-4 py-2 rounded-md hover:bg-${primaryColor}-800 transition-colors disabled:bg-${primaryColor}-300 my-5`}
            onClick={() => setPage(page + 1)}
            disabled={page * 9 > question?.ids?.length}
          >
            Load More
          </button>
        </div>
      </section>
    </>
  );
};

export default Questions;
