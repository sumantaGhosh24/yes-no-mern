import {formatDistanceToNowStrict} from "date-fns";

import {useGetAllTransactionsQuery} from "../app/features/wallet/walletApiSlice";
import {formatterINR} from "../lib/utils";

interface AdminManageTransactionsProps {
  transactionId: string;
  page: number;
  category: string;
  sort: string;
}

const AdminManageTransactions = ({
  transactionId,
  page,
  category,
  sort,
}: AdminManageTransactionsProps) => {
  const {transaction} = useGetAllTransactionsQuery(
    {page, category, sort},
    {
      selectFromResult: ({data}) => ({
        transaction: data?.entities[transactionId],
      }),
    }
  );

  if (transaction) {
    return (
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">{transaction.id}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {transaction.user}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <span
            className={`${
              transaction.status != "deposit"
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {formatterINR.format(transaction.amount)}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {transaction.message}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              transaction.status === "deposit"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {transaction.status}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {transaction.paymentResult.id ?? "N/A"}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {formatDistanceToNowStrict(transaction.createdAt)} ago
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {formatDistanceToNowStrict(transaction.updatedAt)} ago
        </td>
      </tr>
    );
  } else return null;
};

export default AdminManageTransactions;
