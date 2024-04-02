export const Brand = ({brandName}) => {
  return (
    <>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#EAEAEA]" />
          <span>{brandName}</span>
        </div>
      </td>
    </>
  );
};
