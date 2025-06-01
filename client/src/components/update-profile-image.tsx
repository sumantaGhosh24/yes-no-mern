import {useState, FormEvent} from "react";
import {useSelector} from "react-redux";
import axios from "axios";
import {toast} from "react-toastify";
import {MdUploadFile} from "react-icons/md";

import {selectCurrentToken} from "../app/features/auth/authSlice";
import {useRefreshMutation} from "../app/features/auth/authApiSlice";
import {useUserImageMutation} from "../app/features/user/userApiSlice";
import {usePrimaryColor} from "./primary-provider";

const UpdateProfileImage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState("");

  const {user, token} = useSelector(selectCurrentToken);

  const {primaryColor} = usePrimaryColor();

  const [updateUserImage] = useUserImageMutation();

  const [refresh] = useRefreshMutation();

  const handleUpdateImage = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      if (user.image.url) {
        await axios.post(
          "http://localhost:8080/api/v1/destroy",
          {
            public_id: user.image.public_id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      let formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        "http://localhost:8080/api/v1/upload",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let image = {public_id: response.data.public_id, url: response.data.url};

      const {message} = await updateUserImage({image}).unwrap();
      await refresh(undefined).unwrap();
      setFile("");
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container p-6 mx-auto bg-white dark:bg-black rounded-md shadow-md shadow-black dark:shadow-white my-5">
      <h1 className="text-xl font-bold text-black dark:text-white capitalize mb-5">
        Update Profile Image
      </h1>
      <form onSubmit={handleUpdateImage}>
        <div className="mt-4 flex flex-col gap-4">
          <div>
            <img
              src={
                file
                  ? URL.createObjectURL(file as any)
                  : user.image.url
                  ? user.image.url
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="avatar"
              className="block h-[250px] w-full rounded bg-black dark:bg-white mx-auto mb-5"
            />
          </div>
          <label
            htmlFor="file"
            className="flex items-center gap-3 dark:text-white my-5 cursor-pointer"
          >
            Profile Image <MdUploadFile size={36} />
          </label>
          <input
            type="file"
            id="file"
            onChange={(e: any) => setFile(e.target.files[0])}
            className="hidden"
          />
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

export default UpdateProfileImage;
