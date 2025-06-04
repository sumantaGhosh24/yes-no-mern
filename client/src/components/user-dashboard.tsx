import {Bar} from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import {toast} from "react-toastify";

import {useGetDashboardQuery} from "../app/features/user/userApiSlice";
import Loading from "./loading";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const UserDashboard = () => {
  const {
    data: dashboard,
    isLoading,
    isError,
    error,
  } = useGetDashboardQuery("userDashboard", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    toast.error(error?.data?.message, {toastId: "admin-dashboard-error"});
    return <Loading />;
  }

  const {
    totalDeposits,
    totalWithdrawals,
    totalBet,
    totalWin,
    totalPenalty,
    totalRefund,
    userTransactions,
    userEntries,
  } = dashboard;

  const transactionAmountChartData = {
    labels: [
      "Total Deposits",
      "Total Withdrawals",
      "Total Bet Amount",
      "Total Win Amount",
      "Total Penalty Amount",
      "Total Refund Amount",
    ],
    datasets: [
      {
        label: "Amount (INR)",
        data: [
          totalDeposits,
          totalWithdrawals,
          totalBet,
          totalWin,
          totalPenalty,
          totalRefund,
        ],
        backgroundColor: [
          "#2196F3",
          "#F44336",
          "#4CAF50",
          "#FFC107",
          "#FF9800",
          "#673AB7",
        ],
        borderColor: [
          "#1976D2",
          "#D32F2F",
          "#46a149",
          "#ecb204",
          "#ee9002",
          "#5c33a3",
        ],
        borderWidth: 1,
      },
    ],
  };
  const transactionAmountChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Transaction Flow",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <section className="container p-6 mx-auto my-5 shadow-md rounded-md bg-white dark:bg-black text-black dark:text-white">
      <h2 className="text-xl font-bold capitalize mb-3">User Dashboard</h2>
      <div className="my-5 flex items-center gap-3 flex-wrap">
        <div className="border p-4 rounded-md h-[400px]">
          <h2>Transaction Amounts</h2>
          <Bar
            data={transactionAmountChartData}
            options={transactionAmountChartOptions}
          />
        </div>
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <div className="border p-4 rounded-md h-[400px]">
          <h3 className="text-xl mb-3 font-bold">Recent Transactions</h3>
          <ul style={{listStyleType: "none", padding: 0}}>
            {userTransactions.map((transaction: any) => (
              <li
                key={transaction._id}
                style={{
                  marginBottom: "8px",
                  borderBottom: "1px dashed #eee",
                  paddingBottom: "5px",
                }}
              >
                <strong>
                  {transaction.user?.name || transaction.user?.email}
                </strong>
                <br />
                <small>
                  {transaction.status} of ${transaction.amount} on{" "}
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </small>
              </li>
            ))}
          </ul>
        </div>
        <div className="border p-4 rounded-md h-[400px]">
          <h3 className="text-xl mb-3 font-bold">Recent Entries</h3>
          <ul style={{listStyleType: "none", padding: 0}}>
            {userEntries.map((entry: any) => (
              <li
                key={entry._id}
                style={{
                  marginBottom: "8px",
                  borderBottom: "1px dashed #eee",
                  paddingBottom: "5px",
                }}
              >
                <strong>{entry.user?.username || entry.user?.email}</strong>{" "}
                answered: "{entry.question?.question}"
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
