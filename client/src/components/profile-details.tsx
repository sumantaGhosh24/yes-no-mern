import {useSelector} from "react-redux";

import {useTitle} from "../hooks";
import {selectCurrentToken} from "../app/features/auth/authSlice";

const ProfileDetails = () => {
  useTitle("Profile");

  const {user} = useSelector(selectCurrentToken);

  return (
    <div className="container flex items-center flex-wrap mx-auto shadow-md p-5 rounded-md my-5 bg-white dark:bg-black shadow-black dark:shadow-white">
      <h1 className="text-3xl font-bold text-capitalize text-black dark:text-white">
        Profile Details
      </h1>
      <div className="w-full">
        <div className="text-left lg:text-left text-black dark:text-white">
          {user.image.url && (
            <img
              src={user.image?.url}
              alt={user.image?.public_id}
              className="rounded-xl h-[350px] w-full mt-3"
            />
          )}
          <p className="mt-3 text-lg font-medium">
            <span className="font-bold">Email: </span>
            {user.email}
          </p>
          <p className="mt-3 text-lg font-medium">
            <span className="font-bold">Mobile Number: </span>
            {user.mobileNumber}
          </p>
          {user.firstName && (
            <>
              <p className="mt-3 text-lg font-medium">
                <span className="font-bold">Full Name: </span>
                {user.firstName} {user.lastName}
              </p>
              <p className="mt-3 text-lg font-medium">
                <span className="font-bold">Username: </span>
                {user.username}
              </p>
              <p className="mt-3 text-lg font-medium">
                <span className="font-bold">DOB: </span>
                {new Date(user.dob).toLocaleDateString()}
              </p>
              <p className="mt-3 text-lg font-medium">
                <span className="font-bold">Gender: </span>
                {user.gender}
              </p>
            </>
          )}
          {user.city && (
            <>
              <p className="mt-3 text-lg font-medium">
                <span className="font-bold">City: </span>
                {user.city}
              </p>
              <p className="mt-3 text-lg font-medium">
                <span className="font-bold">State: </span>
                {user.state}
              </p>
              <p className="mt-3 text-lg font-medium">
                <span className="font-bold">Country: </span>
                {user.country}
              </p>
              <p className="mt-3 text-lg font-medium">
                <span className="font-bold">Zip: </span>
                {user.zip}
              </p>
              <p className="mt-3 text-lg font-medium">
                <span className="font-bold">Address: </span>
                {user.addressline}
              </p>
            </>
          )}
          <p className="mt-3 text-lg font-medium">
            <span className="font-bold">Status: </span>
            {user.status}
          </p>
          <p className="mt-3 text-lg font-medium">
            <span className="font-bold">Role: </span>
            {user.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
