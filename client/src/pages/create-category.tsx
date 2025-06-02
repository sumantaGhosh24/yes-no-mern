import {useState, useEffect, FormEvent} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import axios from "axios";
import {toast} from "react-toastify";
import {FaFileUpload} from "react-icons/fa";

import {selectCurrentToken} from "../app/features/auth/authSlice";
import {useCreateCategoryMutation} from "../app/features/category/categoryApiSlice";
import {usePrimaryColor} from "../components/primary-provider";
import {useTitle} from "../hooks";

const CreateCategory = () => {
  useTitle("Create Category");

  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {token} = useSelector(selectCurrentToken);

  const {primaryColor} = usePrimaryColor();

  const [createCategory, {isSuccess, isError, error}] =
    useCreateCategoryMutation();

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setFile("");
      navigate("/categories");
    }
  }, [isSuccess, navigate]);

  const handleCreateCategory = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (name === "" || file === "") {
        return toast.error("Please fill all the fields.");
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

      const obj = {name, image};

      const {message} = await createCategory(obj).unwrap();
      toast.success(message, {toastId: "category-success"});
    } catch (error: any) {
      toast.error(error?.data?.message, {toastId: "category-error"});
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container p-6 mx-auto my-20 shadow-md rounded-md bg-white dark:bg-black shadow-black dark:shadow-white">
      <h2 className="text-3xl font-bold capitalize mb-10 text-black dark:text-white">
        Create Category
      </h2>
      {isError && (
        <h3 className="text-xl font-bold capitalize mb-10 text-black dark:text-white">
          {error.message}
        </h3>
      )}
      <form className="mb-6" onSubmit={handleCreateCategory}>
        <div>
          <img
            src={
              file
                ? URL.createObjectURL(file as any)
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt="avatar"
            className="block h-[250px] w-[80%] rounded z-50 bg-black dark:bg-white mx-auto mb-5"
          />
        </div>
        <label
          htmlFor="file"
          className="flex items-center gap-3 dark:text-white cursor-pointer"
        >
          Category Image <FaFileUpload size={36} />
        </label>
        <input
          type="file"
          id="file"
          onChange={(e: any) => setFile(e.target.files[0])}
          className="hidden"
        />
        <input
          type="text"
          className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4 mt-5"
          placeholder="Category name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className={`bg-${primaryColor}-700 text-white px-4 py-2 rounded-md hover:bg-${primaryColor}-800 transition-colors disabled:bg-${primaryColor}-300 w-fit`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Create Category"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateCategory;
