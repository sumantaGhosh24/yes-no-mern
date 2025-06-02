import {useState, ChangeEvent} from "react";

import {useGetCategoriesQuery} from "../app/features/category/categoryApiSlice";
import {useGetQuestionsQuery} from "../app/features/question/questionApiSlice";
import {usePrimaryColor} from "../components/primary-provider";
import {useTitle} from "../hooks";
import {Loading, Question} from "../components";

const Home = () => {
  useTitle("Home");

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
  } = useGetQuestionsQuery({
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
        <Question
          key={questionId}
          questionId={questionId}
          page={page}
          sort={sort}
          search={search}
          category={sCategory}
        />
      ));

    content = (
      <div className="container mx-auto shadow-xl rounded-xl my-10 p-5 text-black dark:text-white">
        <h1 className="mb-5 text-2xl font-bold">All Questions</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tableContent}
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="container p-6 mx-auto my-5 shadow-md rounded-md bg-white dark:bg-black text-black dark:text-white">
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
          disabled={page * 9 >= question?.ids?.length}
        >
          Load More
        </button>
      </div>
    </>
  );
};

export default Home;
