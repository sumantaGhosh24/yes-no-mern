import {useState, ChangeEvent, FormEvent} from "react";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

import {useRefreshMutation} from "../app/features/auth/authApiSlice";
import {selectCurrentToken} from "../app/features/auth/authSlice";
import {useUserAddressMutation} from "../app/features/user/userApiSlice";
import {usePrimaryColor} from "./primary-provider";

const UpdateProfileAddress = () => {
  const {user} = useSelector(selectCurrentToken);

  const [address, setAddress] = useState({
    city: user.city ?? "",
    state: user.state ?? "",
    country: user.country ?? "",
    zip: user.zip ?? "",
    addressline: user.addressline ?? "",
  });

  const {primaryColor} = usePrimaryColor();

  const [updateUserAddress, {isLoading}] = useUserAddressMutation();

  const [refresh] = useRefreshMutation();

  const handleChangeAddress = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setAddress({...address, [name]: value});
  };

  const handleUpdateAddress = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const {message} = await updateUserAddress(address).unwrap();
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
        Update User Address
      </h1>
      <form onSubmit={handleUpdateAddress}>
        <div className="mt-4 flex flex-col gap-4">
          <div>
            <label className="text-black dark:text-white" htmlFor="city">
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              placeholder="Enter city"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              onChange={handleChangeAddress}
              value={address.city}
              required
            />
          </div>
          <div>
            <label className="text-black dark:text-white" htmlFor="state">
              State
            </label>
            <input
              id="state"
              name="state"
              type="text"
              placeholder="Enter state"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              onChange={handleChangeAddress}
              value={address.state}
              required
            />
          </div>
          <div>
            <label className="text-black dark:text-white" htmlFor="country">
              Country
            </label>
            <input
              id="country"
              name="country"
              type="text"
              placeholder="Enter country"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              onChange={handleChangeAddress}
              value={address.country}
              required
            />
          </div>
          <div>
            <label className="text-black dark:text-white" htmlFor="zip">
              Zip
            </label>
            <input
              id="zip"
              name="zip"
              type="text"
              placeholder="Enter zip"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              onChange={handleChangeAddress}
              value={address.zip}
              required
            />
          </div>
          <div>
            <label className="text-black dark:text-white" htmlFor="addressline">
              Addressline
            </label>
            <input
              id="addressline"
              name="addressline"
              type="text"
              placeholder="Enter addressline"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
              onChange={handleChangeAddress}
              value={address.addressline}
              required
            />
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

export default UpdateProfileAddress;
