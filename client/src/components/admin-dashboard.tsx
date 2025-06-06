import {Pie, Bar} from "react-chartjs-2";
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

import {useGetAdminDashboardQuery} from "../app/features/user/userApiSlice";
import {usePrimaryColor} from "./primary-provider";
import Loading from "./loading";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const AdminDashboard = () => {
  const {
    data: dashboard,
    isLoading,
    isError,
    error,
  } = useGetAdminDashboardQuery("dashboard", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const {primaryColor} = usePrimaryColor();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    toast.error(error?.data?.message, {toastId: "admin-dashboard-error"});
    return <Loading />;
  }

  const {
    activeUsers,
    totalUsers,
    totalDepositAmount,
    totalWithdrawalAmount,
    totalBetAmount,
    totalWinAmount,
    totalPenaltyAmount,
    totalRefundAmount,
    totalQuestions,
    pendingQuestions,
    totalTransactions,
    totalCategories,
    totalEntries,
    recentUsers,
    recentTransactions,
    recentQuestions,
    recentEntries,
    recentCategories,
  } = dashboard;

  const userStatusChartData = {
    labels: ["Active Users", "Inactive Users"],
    datasets: [
      {
        data: [activeUsers, totalUsers - activeUsers],
        backgroundColor: ["#4CAF50", "#FFC107"],
        hoverOffset: 4,
      },
    ],
  };
  const userStatusChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "User Activity",
      },
    },
  };

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
          totalDepositAmount,
          totalWithdrawalAmount,
          totalBetAmount,
          totalWinAmount,
          totalPenaltyAmount,
          totalRefundAmount,
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

  const questionStatusChartData = {
    labels: ["Pending Questions", "Resolved Questions"],
    datasets: [
      {
        data: [pendingQuestions, totalQuestions - pendingQuestions],
        backgroundColor: ["#FF9800", "#673AB7"],
        hoverOffset: 4,
      },
    ],
  };
  const questionStatusChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Question Resolution Status",
      },
    },
  };

  return (
    <section className="container p-6 mx-auto my-5 shadow-lg rounded-md bg-white dark:bg-black text-black dark:text-white dark:shadow-white">
      <h2 className="text-xl font-bold capitalize mb-3">Admin Dashboard</h2>
      <div className="flex items-center gap-3 flex-wrap">
        <div className="border p-4 rounded-md">
          <h3 className="text-xl font-bold">Total Transactions</h3>
          <p className={`text-3xl font-bold text-${primaryColor}-500`}>
            {totalTransactions}
          </p>
        </div>
        <div className="border p-4 rounded-md">
          <h3 className="text-xl font-bold">Total Categories</h3>
          <p className={`text-3xl font-bold text-${primaryColor}-500`}>
            {totalCategories}
          </p>
        </div>
        <div className="border p-4 rounded-md">
          <h3 className="text-xl font-bold">Total Entries</h3>
          <p className={`text-3xl font-bold text-${primaryColor}-500`}>
            {totalEntries}
          </p>
        </div>
      </div>
      <div className="my-5 flex items-center gap-3 flex-wrap">
        <div className="border p-4 rounded-md h-[400px]">
          <h2>User Status</h2>
          <Pie
            data={userStatusChartData}
            options={userStatusChartOptions as any}
          />
        </div>
        <div className="border p-4 rounded-md h-[400px]">
          <h2>Transaction Amounts</h2>
          <Bar
            data={transactionAmountChartData}
            options={transactionAmountChartOptions}
          />
        </div>
        <div className="border p-4 rounded-md h-[400px]">
          <h2>Question Status</h2>
          <Pie
            data={questionStatusChartData}
            options={questionStatusChartOptions as any}
          />
        </div>
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <div className="border p-4 rounded-md h-[400px]">
          <h3 className="text-xl mb-3 font-bold">Recent Users</h3>
          <ul style={{listStyleType: "none", padding: 0}}>
            {recentUsers.map((user: any) => (
              <li
                key={user._id}
                style={{
                  marginBottom: "8px",
                  borderBottom: "1px dashed #eee",
                  paddingBottom: "5px",
                }}
              >
                <strong>{user.name || user.email}</strong>
                <br />
                <small>
                  Joined: {new Date(user.createdAt).toLocaleDateString()}
                </small>
              </li>
            ))}
          </ul>
        </div>
        <div className="border p-4 rounded-md h-[400px]">
          <h3 className="text-xl mb-3 font-bold">Recent Transactions</h3>
          <ul style={{listStyleType: "none", padding: 0}}>
            {recentTransactions.map((transaction: any) => (
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
          <h3 className="text-xl mb-3 font-bold">Recent Questions</h3>
          <ul style={{listStyleType: "none", padding: 0}}>
            {recentQuestions.map((question: any) => (
              <li
                key={question._id}
                style={{
                  marginBottom: "8px",
                  borderBottom: "1px dashed #eee",
                  paddingBottom: "5px",
                }}
              >
                <strong>
                  {question.owner?.username || question.owner?.email}
                </strong>{" "}
                asked about <strong>{question.category?.name}</strong>
                <br />
                <small>Status: {question.result}</small>
              </li>
            ))}
          </ul>
        </div>
        <div className="border p-4 rounded-md h-[400px]">
          <h3 className="text-xl mb-3 font-bold">Recent Entries</h3>
          <ul style={{listStyleType: "none", padding: 0}}>
            {recentEntries.map((entry: any) => (
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
        <div className="border p-4 rounded-md h-[400px]">
          <h3 className="text-xl mb-3 font-bold">Recent Categories</h3>
          <ul style={{listStyleType: "none", padding: 0}}>
            {recentCategories.map((category: any) => (
              <li
                key={category._id}
                style={{
                  marginBottom: "8px",
                  borderBottom: "1px dashed #eee",
                  paddingBottom: "5px",
                }}
              >
                <strong>{category.name}</strong>
                <br />
                <small>
                  Created: {new Date(category.createdAt).toLocaleDateString()}
                </small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
