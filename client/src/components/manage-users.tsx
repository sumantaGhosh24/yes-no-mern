import {formatDistanceToNowStrict} from "date-fns";

import {useGetAllUserQuery} from "../app/features/user/userApiSlice";

interface ManageUsersProps {
  userId: string;
}

const ManageUsers = ({userId}: ManageUsersProps) => {
  const {user} = useGetAllUserQuery("userList", {
    selectFromResult: ({data}) => ({user: data?.entities[userId]}),
  });

  if (user) {
    return (
      <tr className="bg-gray-200 dark:bg-neutral-400 border-b text-base font-bold">
        <td className="px-6 py-4">{user.id}</td>
        <td className="px-6 py-4 capitalize">
          {user.firstName} {user.lastName}
        </td>
        <td className="px-6 py-4 capitalize">{user.email}</td>
        <td className="px-6 py-4 capitalize">{user.mobileNumber}</td>
        <td className="px-6 py-4">
          <img
            src={user?.image?.url}
            alt={user?.image?.public_id}
            className="rounded-full h-16 w-16"
          />
        </td>
        <td className="px-6 py-4 capitalize">{user.username}</td>
        <td className="px-6 py-4 capitalize">
          {new Date(user.dob).toLocaleDateString()}
        </td>
        <td className="px-6 py-4 capitalize">{user.gender}</td>
        <td className="px-6 py-4 capitalize">{user.city}</td>
        <td className="px-6 py-4 capitalize">{user.state}</td>
        <td className="px-6 py-4 capitalize">{user.country}</td>
        <td className="px-6 py-4 capitalize">{user.zip}</td>
        <td className="px-6 py-4 capitalize">{user.addressline}</td>
        <td className="px-6 py-4 capitalize">{user.role}</td>
        <td className="px-6 py-4 capitalize">{user.status}</td>
        <td className="px-6 py-4 truncate">
          {formatDistanceToNowStrict(user.createdAt)} ago
        </td>
      </tr>
    );
  } else return null;
};

export default ManageUsers;
