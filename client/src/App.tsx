import {Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
  AuthLayout,
  Layout,
  PersistLogin,
  RequireUser,
  RequireAdmin,
} from "./components";
import {
  Public,
  Register,
  Login,
  Home,
  Profile,
  RegisterVerify,
  LoginVerify,
  ForgotPassword,
  ConfirmForgotPassword,
  Users,
} from "./pages";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />
          <Route path="login-verify" element={<LoginVerify />} />
          <Route path="register" element={<Register />} />
          <Route path="register-verify" element={<RegisterVerify />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route
            path="confirm-forgot-password"
            element={<ConfirmForgotPassword />}
          />
          <Route element={<PersistLogin />}>
            <Route element={<AuthLayout />}>
              <Route path="home" element={<RequireUser elm={<Home />} />} />
              <Route
                path="profile"
                element={<RequireUser elm={<Profile />} />}
              />
              <Route path="users" element={<RequireAdmin elm={<Users />} />} />
              {/* <Route
                path="details-question/:id"
                element={<RequireAdmin elm={<Question />} />}
              /> */}
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
