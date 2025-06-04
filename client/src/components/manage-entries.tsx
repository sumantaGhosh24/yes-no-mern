import {formatDistanceToNowStrict} from "date-fns";

import {useGetAllEntrysQuery} from "../app/features/entry/entryApiSlice";
import {formatterINR} from "../lib/utils";

interface ManageEntriesProps {
  entryId: string;
  page: number;
  sort: string;
  question: string;
  user: string;
}

const ManageEntries = ({
  entryId,
  page,
  sort,
  question,
  user,
}: ManageEntriesProps) => {
  const {entry} = useGetAllEntrysQuery(
    {page, sort, question, user},
    {
      selectFromResult: ({data}) => ({
        entry: data?.entities[entryId],
      }),
    }
  );

  if (entry) {
    return (
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">{entry.id}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {entry.user.email}({entry.user._id})
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {entry.question.question}({entry.question._id})
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {entry.answer}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          {formatterINR.format(entry.bet)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          {formatterINR.format(entry.win ?? 0)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              entry.result === "success"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {entry.result}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {formatDistanceToNowStrict(entry.createdAt)} ago
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {formatDistanceToNowStrict(entry.updatedAt)} ago
        </td>
      </tr>
    );
  } else return null;
};

export default ManageEntries;
