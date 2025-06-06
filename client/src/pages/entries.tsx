import {useState} from "react";

import {useGetAllEntrysQuery} from "../app/features/entry/entryApiSlice";
import {usePrimaryColor} from "../components/primary-provider";
import {Loading, ManageEntries} from "../components";

const Entries = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const [question, setQuestion] = useState("");
  const [user, setUser] = useState("");

  const {
    data: entry,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllEntrysQuery({
    page,
    sort,
    question: question.length > 0 ? `&question=${question}` : "",
    user: user.length > 0 ? `&user=${user}` : "",
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
    const {ids} = entry;
    const tableContent =
      ids?.length &&
      ids.map((entryId: string) => (
        <ManageEntries
          key={entryId}
          entryId={entryId}
          page={page}
          sort={sort}
          question={question.length > 0 ? `&question=${question}` : ""}
          user={user.length > 0 ? `&user=${user}` : ""}
        />
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
                User
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Question
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Answer
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Bet
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Win
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Result
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Created At
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Updated At
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableContent}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <>
      <section className="container p-6 mx-auto my-5 shadow-lg rounded-md bg-white dark:bg-black dark:shadow-white text-black dark:text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold capitalize">Manage Entries</h2>
        </div>
        <section className="p-6 mx-auto my-5 shadow-lg rounded-md bg-white dark:bg-black text-black dark:text-white">
          <h2 className="text-xl font-bold capitalize mb-3">Search Entries</h2>
          <div className="flex flex-wrap gap-3">
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
                <option value="&sort=-bet" className="text-black">
                  Bet: Hight-Low
                </option>
                <option value="&sort=bet" className="text-black">
                  Bet: Low-Hight
                </option>
                <option value="&sort=-win" className="text-black">
                  Win: Hight-Low
                </option>
                <option value="&sort=win" className="text-black">
                  Win: Low-Hight
                </option>
              </select>
            </div>
            <div className="flex items-center border-3 p-2 rounded w-full">
              <span className="mr-3 text-xl">Question id: </span>
              <input
                type="text"
                value={question}
                placeholder="Enter question id"
                onChange={(e) => setQuestion(e.target.value)}
                className="p-2 w-full focus:outline-none"
              />
            </div>
            <div className="flex items-center border-3 p-2 rounded w-full">
              <span className="mr-3 text-xl">User id: </span>
              <input
                type="text"
                value={user}
                placeholder="Enter user id"
                onChange={(e) => setUser(e.target.value)}
                className="p-2 w-full focus:outline-none"
              />
            </div>
          </div>
        </section>
        {content}
        <div className="my-5 flex align-center justify-center">
          <button
            className={`w-fit bg-${primaryColor}-700 text-white px-4 py-2 rounded-md hover:bg-${primaryColor}-800 transition-colors disabled:bg-${primaryColor}-300 my-5`}
            onClick={() => setPage(page + 1)}
            disabled={page * 9 > entry?.ids?.length}
          >
            Load More
          </button>
        </div>
      </section>
    </>
  );
};

export default Entries;
