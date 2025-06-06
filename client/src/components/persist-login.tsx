import {Outlet, Link} from "react-router-dom";
import {useEffect, useRef, useState, JSX} from "react";
import {useSelector} from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";

import {useRefreshMutation} from "../app/features/auth/authApiSlice";
import {selectCurrentToken} from "../app/features/auth/authSlice";
import {usePersist} from "../hooks";

const PersistLogin = (): JSX.Element => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);
  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, {isUninitialized, isLoading, isSuccess, isError, error}] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true) {
      const verifyRefreshToken = async () => {
        try {
          await refresh(undefined).unwrap();
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };
      if (!token?.token && persist) verifyRefreshToken();
    }
    return () => {
      effectRan.current = true;
    };
  }, [persist, refresh, token]);

  let content: any;

  if (!persist) {
    content = <Outlet />;
  } else if (isLoading) {
    content = <PulseLoader color={"#0a42ea"} />;
  } else if (isError) {
    content = (
      <p className="text-black dark:text-white">
        {`${error?.data?.message} - `}
        <Link to="/login">Please login again</Link>.
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />;
  } else if (token?.token && isUninitialized) {
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
