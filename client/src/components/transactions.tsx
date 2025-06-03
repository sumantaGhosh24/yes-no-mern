import {useState, ChangeEvent} from "react";

import {useGetWalletQuery} from "../app/features/wallet/walletApiSlice";
import {usePrimaryColor} from "./primary-provider";
import Loading from "./loading";
import ManageTransactions from "./manage-transactions";

const Transactions = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");

  const {
    data: transaction,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetWalletQuery({page, sort, category});

  const {primaryColor} = usePrimaryColor();

  if (isLoading) {
    return <Loading />;
  }

  const handleCategory = (e: ChangeEvent<any>) => {
    setCategory(e.target.value);
  };

  let content;

  if (isError) {
    content = (
      <h3 className="text-xl font-bold capitalize mb-10">{error.message}</h3>
    );
  }

  if (isSuccess) {
    const {ids} = transaction;
    const tableContent =
      ids?.length &&
      ids.map((transactionId: string) => (
        <ManageTransactions
          key={transactionId}
          transactionId={transactionId}
          page={page}
          sort={sort}
          category={category}
        />
      ));

    content = (
      <div className="relative overflow-x-auto mt-10">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg"
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
                Amount
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Message
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Payment Result
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
      <section className="container p-6 mx-auto my-5 shadow-md rounded-md bg-white dark:bg-black shadow-black dark:shadow-white text-black dark:text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold capitalize">Manage Transactions</h2>
        </div>
        <section className="p-6 mx-auto my-5 shadow-md rounded-md bg-white dark:bg-black text-black dark:text-white">
          <h2 className="text-xl font-bold capitalize mb-3">
            Search Transaction
          </h2>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center border-3 p-2 rounded w-full">
              <span className="mr-3 text-xl">Categories: </span>
              <select
                name="category"
                value={category}
                onChange={handleCategory}
                className="p-2 w-full focus:outline-none"
              >
                <option value="" className="text-black">
                  All Categories
                </option>
                <option value="&status=deposit" className="text-black">
                  Deposit
                </option>
                <option value="&status=withdraw" className="text-black">
                  Withdraw
                </option>
                <option value="&status=bet" className="text-black">
                  Bet
                </option>
                <option value="&status=win" className="text-black">
                  Win
                </option>
                <option value="&status=penalty" className="text-black">
                  Penalty
                </option>
                <option value="&status=refund" className="text-black">
                  Refund
                </option>
              </select>
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
                <option value="&sort=-amount" className="text-black">
                  Amount: Hight-Low
                </option>
                <option value="&sort=amount" className="text-black">
                  Amount: Low-Hight
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
            disabled={page * 9 > transaction?.ids?.length}
          >
            Load More
          </button>
        </div>
      </section>
    </>
  );
};

export default Transactions;
