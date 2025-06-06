import {useState, useEffect, FormEvent} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import axios from "axios";
import {toast} from "react-toastify";
import {FaTrash} from "react-icons/fa";
import {MdUploadFile} from "react-icons/md";

import {
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "../app/features/category/categoryApiSlice";
import {usePrimaryColor} from "./primary-provider";
import {selectCurrentToken} from "../app/features/auth/authSlice";
import {BACKEND_URL} from "../config";

interface EditCategoryFormProps {
  category: {
    id: string;
    name: string;
    image: {
      url: string;
      public_id: string;
    };
  };
}

const EditCategoryForm = ({category}: EditCategoryFormProps) => {
  const [updateCategory, {isSuccess, isError, error}] =
    useUpdateCategoryMutation();

  const [deleteCategory, {isSuccess: isDelSuccess}] =
    useDeleteCategoryMutation();

  const {token} = useSelector(selectCurrentToken);

  const navigate = useNavigate();

  const {primaryColor} = usePrimaryColor();

  const [name, setName] = useState(category?.name);
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setName("");
      navigate("/categories");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (file !== "") {
        await axios.post(
          `${BACKEND_URL}/destroy`,
          {
            public_id: category.image.public_id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        let formData = new FormData();
        formData.append("file", file);
        const response = await axios.post(`${BACKEND_URL}/upload`, formData, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        let image = {
          public_id: response.data.public_id,
          url: response.data.url,
        };

        const {message} = await updateCategory({
          id: category.id,
          name,
          image,
        }).unwrap();
        toast.success(message, {toastId: "category-success"});
      }

      const {message} = await updateCategory({
        id: category.id,
        name,
      }).unwrap();
      toast.success(message, {toastId: "category-success"});
    } catch (error: any) {
      toast.error(error?.data?.message, {toastId: "category-error"});
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      await axios.post(
        `${BACKEND_URL}/destroy`,
        {
          public_id: category.image.public_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const {message} = await deleteCategory({id: category.id}).unwrap();
      toast.success(message, {toastId: "category-success"});
    } catch (error: any) {
      toast.error(error?.data?.message, {toastId: "category-error"});
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="container p-6 mx-auto my-10 shadow-lg rounded-md bg-white dark:bg-black dark:shadow-white text-black dark:text-white">
        {isError && (
          <h2 className="text-xl font-bold capitalize text-red-500 mb-5">
            {error.message}
          </h2>
        )}
        <h2 className="text-xl font-bold capitalize mb-5 ">
          Detailed Category
        </h2>
        <div className="rounded overflow-hidden">
          <img
            className="w-[300px] h-[300px]"
            src={category?.image?.url}
            alt={category?.image?.public_id}
          />
          <p className="font-bold text-xl my-3 ">{category?.name}</p>
        </div>
        <button
          className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 transition-colors disabled:bg-red-300 w-fit mt-5 flex items-center gap-1.5"
          onClick={handleDelete}
          disabled={loading}
        >
          <FaTrash className="btn-icons" /> Delete Category
        </button>
      </section>
      <section className="container p-6 mx-auto my-10 shadow-lg rounded-md bg-white dark:bg-black dark:shadow-white text-black dark:text-white">
        <h2 className="text-xl font-bold capitalize mb-5">Update Category</h2>
        <form onSubmit={handleUpdate}>
          <div className="mt-4 flex flex-col gap-4">
            <div>
              <img
                src={
                  file
                    ? URL.createObjectURL(file as any)
                    : category.image.url
                    ? category.image.url
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
            <div>
              <label htmlFor="name">Category Name</label>
              <input
                id="name"
                name="name"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
          </div>
          <button
            className={`bg-${primaryColor}-700 text-white px-4 py-2 rounded-md hover:bg-${primaryColor}-800 transition-colors disabled:bg-${primaryColor}-300 w-fit mt-5`}
            disabled={loading}
            type="submit"
          >
            {loading ? "Processing..." : "Update Category"}
          </button>
        </form>
      </section>
    </>
  );
};

export default EditCategoryForm;
