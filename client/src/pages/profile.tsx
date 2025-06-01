import {useTitle} from "../hooks";
import {
  ProfileDetails,
  ResetPassword,
  UpdateProfileAddress,
  UpdateProfileData,
  UpdateProfileImage,
} from "../components";

const Profile = () => {
  useTitle("Profile");

  return (
    <div className="flex flex-col gap-3">
      <ProfileDetails />
      <UpdateProfileImage />
      <UpdateProfileData />
      <UpdateProfileAddress />
      <ResetPassword />
    </div>
  );
};

export default Profile;
