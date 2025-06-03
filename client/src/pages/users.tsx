import {useState} from "react";

import {useTitle} from "../hooks";
import {useGetAllUserQuery} from "../app/features/user/userApiSlice";
import {usePrimaryColor} from "../components/primary-provider";
import {ManageUsers, Loading} from "../components";

const Users = () => {
  useTitle("Manage Users");

  const [page, setPage] = useState(1);

  const {primaryColor} = usePrimaryColor();

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllUserQuery({
    page: page,
  });

  if (isLoading) {
    return <Loading />;
  }

  let content;

  if (isError) {
    content = (
      <h3 className="text-xl font-bold capitalize mb-10">{error.message}</h3>
    );
  }

  if (isSuccess) {
    const {ids} = users;
    const tableContent =
      ids?.length &&
      ids.map((userId: string) => <ManageUsers key={userId} userId={userId} />);

    content = (
      <div className="relative overflow-x-auto mt-10">
        <table className="w-full text-sm text-left">
          <thead className="text-lg uppercase bg-gray-300 dark:bg-neutral-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Mobile Number
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                DOB
              </th>
              <th scope="col" className="px-6 py-3">
                Gender
              </th>
              <th scope="col" className="px-6 py-3">
                City
              </th>
              <th scope="col" className="px-6 py-3">
                State
              </th>
              <th scope="col" className="px-6 py-3">
                Country
              </th>
              <th scope="col" className="px-6 py-3">
                Zip
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Addressline
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </div>
    );
  }

  return (
    <>
      <section className="container p-6 mx-auto my-20 shadow-md rounded-md bg-white dark:bg-black shadow-black dark:shadow-white">
        <h2 className="text-3xl font-bold capitalize mb-10">Manage Users</h2>
        {content}
        <div className="my-5 flex align-center justify-center">
          <button
            className={`w-fit bg-${primaryColor}-700 text-white px-4 py-2 rounded-md hover:bg-${primaryColor}-800 transition-colors disabled:bg-${primaryColor}-300 my-5`}
            onClick={() => setPage(page + 1)}
            disabled={page * 9 > users?.ids?.length}
          >
            Load More
          </button>
        </div>
      </section>
    </>
  );
};

export default Users;
