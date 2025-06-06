import {formatDistanceToNowStrict} from "date-fns";

import {useGetAllUserQuery} from "../app/features/user/userApiSlice";
import {formatterINR} from "../lib/utils";

interface ManageUsersProps {
  userId: string;
}

const ManageUsers = ({userId}: ManageUsersProps) => {
  const {user} = useGetAllUserQuery("userList", {
    selectFromResult: ({data}) => ({user: data?.entities[userId]}),
  });

  if (user) {
    return (
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {user.firstName} {user.lastName}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">{user.email}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {user.mobileNumber}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          <img
            src={user?.image?.url}
            alt={user?.image?.public_id}
            className="rounded-full h-12 w-12"
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">{user.username}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {new Date(user.dob).toLocaleDateString()}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">{user.gender}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">{user.city}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">{user.state}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">{user.country}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">{user.zip}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {formatterINR.format(user.amount)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {user.addressline}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              user.role === "user"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {user.role}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              user.status === "active"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {user.status}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {formatDistanceToNowStrict(user.createdAt)} ago
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {formatDistanceToNowStrict(user.updatedAt)} ago
        </td>
      </tr>
    );
  } else return null;
};

export default ManageUsers;
