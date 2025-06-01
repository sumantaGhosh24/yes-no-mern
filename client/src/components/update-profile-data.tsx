import {useState, ChangeEvent, FormEvent} from "react";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

import {useRefreshMutation} from "../app/features/auth/authApiSlice";
import {selectCurrentToken} from "../app/features/auth/authSlice";
import {useUserDataMutation} from "../app/features/user/userApiSlice";
import {usePrimaryColor} from "./primary-provider";

const UpdateProfileData = () => {
  const {user} = useSelector(selectCurrentToken);

  const [data, setData] = useState({
    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    username: user.username ?? "",
    dob: user.dob ?? "",
    gender: user.gender ?? "",
  });

  const {primaryColor} = usePrimaryColor();

  const [updateUserData, {isLoading}] = useUserDataMutation();

  const [refresh] = useRefreshMutation();

  const handleChangeData = (e: ChangeEvent<any>) => {
    const {name, value} = e.target;
    setData({...data, [name]: value});
  };

  const handleUpdateData = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const {message} = await updateUserData(data).unwrap();
      await refresh(undefined).unwrap();
      toast.success(message, {toastId: "profile-success"});
    } catch (error: any) {
      if (error.status === "FETCH_ERROR") {
        toast.error("server error", {toastId: "profile-error"});
      } else {
        if (typeof error.data.message === "object") {
          toast.error(error?.data?.message[0], {toastId: "profile-error"});
        } else {
          toast.error(error?.data?.message, {toastId: "profile-error"});
        }
      }
    }
  };

  return (
    <section className="container p-6 mx-auto bg-white dark:bg-black rounded-md shadow-md shadow-black dark:shadow-white my-5">
      <h1 className="text-xl font-bold text-black dark:text-white capitalize mb-5">
        Update User Data
      </h1>
      <form onSubmit={handleUpdateData}>
        <div className="mt-4 flex flex-col gap-4">
          <div>
            <label className="text-black dark:text-white" htmlFor="firstName">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Enter first name"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              onChange={handleChangeData}
              value={data.firstName}
              required
            />
          </div>
          <div>
            <label className="text-black dark:text-white" htmlFor="lastName">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Enter last name"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              onChange={handleChangeData}
              value={data.lastName}
              required
            />
          </div>
          <div>
            <label className="text-black dark:text-white" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter username"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              onChange={handleChangeData}
              value={data.username}
              required
            />
          </div>
          <div>
            <label className="text-black dark:text-white" htmlFor="dob">
              DOB
            </label>
            <input
              id="dob"
              name="dob"
              type="date"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              onChange={handleChangeData}
              value={data.dob}
              required
            />
          </div>
          <div>
            <label className="text-black dark:text-white" htmlFor="gender">
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              onChange={handleChangeData}
              value={data.gender}
              required
            >
              <option>select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className={`w-fit bg-${primaryColor}-700 text-white px-4 py-2 rounded-md hover:bg-${primaryColor}-800 transition-colors disabled:bg-${primaryColor}-300 my-5`}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Update"}
        </button>
      </form>
    </section>
  );
};

export default UpdateProfileData;
