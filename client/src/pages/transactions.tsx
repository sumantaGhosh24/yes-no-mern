import {useState, ChangeEvent, FormEvent} from "react";
import {toast} from "react-toastify";

import {
  useGetAllTransactionsQuery,
  usePenaltyMutation,
} from "../app/features/wallet/walletApiSlice";
import {usePrimaryColor} from "../components/primary-provider";
import {AdminManageTransactions, Loading} from "../components";

const Transactions = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState(0);

  const {
    data: transaction,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllTransactionsQuery({page, sort, category});

  const [penalty, {isLoading: isLoadingPenalty}] = usePenaltyMutation();

  const handlePenalty = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (amount === 0 || userId === "") {
        return toast.error("Please fill all the fields");
      }

      const {message} = await penalty({id: userId, amount}).unwrap();

      setAmount(0);
      setUserId("");
      toast.success(message, {toastId: "penalty-success"});
    } catch (error: any) {
      if (error.status === "FETCH_ERROR") {
        toast.error("server error", {toastId: "penalty-error"});
      } else {
        if (typeof error.data.message === "object") {
          toast.error(error?.data?.message[0], {toastId: "penalty-error"});
        } else {
          toast.error(error?.data?.message, {toastId: "penalty-error"});
        }
      }
    }
  };

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
        <AdminManageTransactions
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
      <section className="container mx-auto my-5">
        <div className="bg-white dark:bg-black shadow-black dark:shadow-white rounded shadow-md p-8">
          <div className="mb-5">
            <h2 className="dark:text-white text-3xl font-bold">Penalty User</h2>
          </div>
          <form className="mb-6" onSubmit={handlePenalty}>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4"
              placeholder="Penalty user id"
              name="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <input
              type="number"
              className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4"
              placeholder="Penalty amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <button
              type="submit"
              className={`w-fit bg-${primaryColor}-700 text-white px-4 py-2 rounded-md hover:bg-${primaryColor}-800 transitions-colors disabled:bg-${primaryColor}-300`}
              disabled={isLoadingPenalty}
            >
              {isLoadingPenalty ? "Processing..." : "Penalty"}
            </button>
          </form>
        </div>
      </section>
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
