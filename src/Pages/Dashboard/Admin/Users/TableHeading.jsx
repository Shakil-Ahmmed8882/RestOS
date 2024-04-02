export const TableHeading = () => {
  return (
    <>
      <thead className="text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
          <tr className="bg-gray-100 text-black">
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Role</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Timestamp</th>
          </tr>
        </thead>
    </>
  );
};