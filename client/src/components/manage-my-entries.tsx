import {formatDistanceToNowStrict} from "date-fns";

import {useGetMyEntrysQuery} from "../app/features/entry/entryApiSlice";
import {formatterINR} from "../lib/utils";

interface ManageMyEntriesProps {
  entryId: string;
  page: number;
  sort: string;
}

const ManageMyEntries = ({entryId, page, sort}: ManageMyEntriesProps) => {
  const {entry} = useGetMyEntrysQuery(
    {page, sort},
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
          {entry.question.question}
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
                : entry.result === "failed"
                ? "bg-red-100 text-red-800"
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

export default ManageMyEntries;
