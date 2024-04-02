import { useEffect, useState } from "react";
import { getUsers } from "../../../../api/auth";
import { TableHeading } from "./TableHeading";
import { TableRow } from "./TableRow";
import { ContactInfo } from "./ContactInfo";



export const ManageUser = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    getUsers().then((data) => setUsers(data));
  }, []);
  return (
    <div>
      <div className="space-y-6">
      <ContactInfo/>
        <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <TableHeading />
              <tbody className="text-sm text-gray-500 dark:text-gray-400">
                {users?.map((user) => (
                  <TableRow key={user?._id} data={user} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
