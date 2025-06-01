import {useLocation, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

import {selectCurrentToken} from "../app/features/auth/authSlice";

interface RequireUserProps {
  elm: any;
}

const RequireUser = ({elm}: RequireUserProps) => {
  const location = useLocation();
  const auth = useSelector(selectCurrentToken);
  let content;

  if (auth?.token) {
    content = elm;
  } else {
    content = <Navigate to="/login" state={{from: location}} replace />;
  }

  return content;
};

export default RequireUser;
