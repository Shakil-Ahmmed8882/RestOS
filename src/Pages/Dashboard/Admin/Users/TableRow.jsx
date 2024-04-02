import { formatDate } from "../../../../api/utils";

export const TableRow = ({data}) => {

    const {_id,email,name,role,status,timestamp} = data || {}
    const time = formatDate(timestamp)
  return (
    <>
      <tr className="hover:bg-gray-50 dark:hover:bg-gray-900">
        <td className="px-4 py-4 whitespace-nowrap">
          <div className="flex items-center space-x-2">{name}</div>
        </td>
        <td className="px-4 py-4 whitespace-nowrap">{email}</td>
        <td className="px-4 py-4 whitespace-nowrap">{role}</td>
        <td className="px-4 py-4 whitespace-nowrap">{status}</td>
        <td className="px-4 py-4 whitespace-nowrap">{time}</td>
      </tr>
    </>
  );
};
