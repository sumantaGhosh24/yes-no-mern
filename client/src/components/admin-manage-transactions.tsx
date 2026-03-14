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

  const amountStyle: any = {
    deposit: "text-green-600",
    withdraw: "text-red-600",
    bet: "text-yellow-600",
    win: "text-green-600",
    penalty: "text-red-600",
    refund: "text-yellow-600",
  };
  const statusStyle: any = {
    deposit: "bg-green-100 text-green-800",
    withdraw: "bg-red-100 text-red-800",
    bet: "bg-yellow-100 text-yellow-800",
    win: "bg-green-100 text-green-800",
    penalty: "bg-red-100 text-red-800",
    refund: "bg-yellow-100 text-yellow-800",
  };

  if (transaction) {
    return (
      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-black text-black dark:text-white">
        <td className="px-6 py-4 whitespace-nowrap">{transaction.id}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {transaction.user}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <span className={amountStyle[transaction.status]}>
            {formatterINR.format(transaction.amount)}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {transaction.message}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full uppercase ${
              statusStyle[transaction.status] as any
            }`}
          >
            {transaction.status}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {transaction.paymentResult.id ?? "N/A"}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {formatDistanceToNowStrict(transaction.createdAt)} ago
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {formatDistanceToNowStrict(transaction.updatedAt)} ago
        </td>
      </tr>
    );
  } else return null;
};

export default AdminManageTransactions;
