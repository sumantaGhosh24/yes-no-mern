import {Outlet} from "react-router-dom";

import {AuthHeader, AuthFooter} from "./";

const AuthLayout = () => {
  return (
    <>
      <AuthHeader />
      <Outlet />
      <AuthFooter />
    </>
  );
};

export default AuthLayout;
