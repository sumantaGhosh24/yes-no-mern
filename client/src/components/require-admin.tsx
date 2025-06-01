import {useLocation, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

import {selectCurrentToken} from "../app/features/auth/authSlice";

interface RequireAdminProps {
  elm: any;
}

const RequireAdmin = ({elm}: RequireAdminProps) => {
  const location = useLocation();
  const auth = useSelector(selectCurrentToken);
  let content;

  if (auth?.token) {
    content =
      auth?.user?.role === "admin" ? (
        elm
      ) : (
        <Navigate to="/home" state={{from: location}} replace />
      );
  } else {
    content = <Navigate to="/login" state={{from: location}} replace />;
  }

  return content;
};

export default RequireAdmin;
