import {useSelector} from "react-redux";

import {selectCurrentToken} from "../app/features/auth/authSlice";
import {AdminDashboard, UserDashboard} from "../components";

const Dashboard = () => {
  const {user} = useSelector(selectCurrentToken);

  return (
    <div>
      <UserDashboard />
      {user.role === "admin" && <AdminDashboard />}
    </div>
  );
};

export default Dashboard;
